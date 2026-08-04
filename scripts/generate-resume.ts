import { type ChildProcess, execFileSync, spawn } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { mkdir, rename, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import path from "node:path";

import { type Browser, launch } from "puppeteer-core";

const projectRoot = path.resolve(import.meta.dirname, "..");
const outPath = path.join(projectRoot, "public", "resume.pdf");
const recordPath = path.join(projectRoot, "node_modules", ".cache", "resume-dev-server.json");

const SHUTDOWN_GRACE_MS = 5000;
const GROUP_POLL_MS = 100;

type ServerRecord = { pgid: number; port: number };

let server: ChildProcess | undefined;
let serverGroup: number | undefined;
let browser: Browser | undefined;

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const runLines = (command: string, args: Array<string>): Array<string> => {
  try {
    return execFileSync(command, args, { encoding: "utf8" })
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  } catch {
    // `pgrep` and `ps` exit non-zero when nothing matches, which is an answer, not a failure.
    return [];
  }
};

const groupCommands = (pgid: number): Array<string> => {
  const pids = runLines("pgrep", ["-g", String(pgid)]);
  if (pids.length === 0) {
    return [];
  }
  return runLines("ps", ["-o", "command=", "-p", pids.join(",")]);
};

const killGroup = (pgid: number, signal: NodeJS.Signals): void => {
  try {
    process.kill(-pgid, signal);
  } catch {
    // ESRCH means the group is already empty, which is the state we were aiming for.
  }
};

const waitForGroupExit = async (pgid: number, timeoutMs: number): Promise<boolean> => {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (groupCommands(pgid).length === 0) {
      return true;
    }
    await sleep(GROUP_POLL_MS);
  }
  return groupCommands(pgid).length === 0;
};

const readServerRecord = (): ServerRecord | undefined => {
  try {
    const parsed: unknown = JSON.parse(readFileSync(recordPath, "utf8"));
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("pgid" in parsed) ||
      !("port" in parsed)
    ) {
      return undefined;
    }
    const { pgid, port } = parsed;
    if (typeof pgid !== "number" || !Number.isInteger(pgid) || pgid <= 1) {
      return undefined;
    }
    if (typeof port !== "number" || !Number.isInteger(port)) {
      return undefined;
    }
    return { pgid, port };
  } catch {
    // No record, or one we cannot parse: either way there is nothing to reap.
    return undefined;
  }
};

/**
 * A SIGKILLed parent runs no handlers, so nothing this process does at exit can reach the dev
 * server it left running. The record written at spawn time is the only thing that outlives that,
 * and Next refuses to start a second dev server in the same directory, so the orphan has to go
 * before this run boots one.
 */
const reapOrphanedServer = async (): Promise<void> => {
  const record = readServerRecord();
  rmSync(recordPath, { force: true });
  if (record === undefined) {
    return;
  }

  const commands = groupCommands(record.pgid);
  if (commands.length === 0) {
    return;
  }
  const marker = `next dev -p ${record.port}`;
  if (!commands.some((command) => command.includes(marker))) {
    console.warn(
      `Leaving process group ${record.pgid} alone: nothing in it runs \`${marker}\`, so that id belongs to something else now.`,
    );
    return;
  }

  console.log(
    `Reaping an orphaned dev server on port ${record.port} (process group ${record.pgid}).`,
  );
  killGroup(record.pgid, "SIGTERM");
  if (!(await waitForGroupExit(record.pgid, SHUTDOWN_GRACE_MS))) {
    killGroup(record.pgid, "SIGKILL");
    if (!(await waitForGroupExit(record.pgid, SHUTDOWN_GRACE_MS))) {
      throw new Error(
        `Could not stop the orphaned dev server in process group ${record.pgid}; stop it by hand and retry.`,
      );
    }
  }
};

const cleanup = async (): Promise<void> => {
  try {
    await browser?.close();
  } catch {
    // A browser that already died is the state we wanted anyway.
  }
  const group = serverGroup;
  if (group === undefined) {
    return;
  }

  // Signalled to the group rather than the child: `pnpm exec` stands in front of `next dev`, which
  // stands in front of `next-server`, so signalling the direct child leaves two processes running.
  killGroup(group, "SIGTERM");
  if (server && server.exitCode === null) {
    const child = server;
    await Promise.race([
      new Promise<void>((resolve) => {
        child.once("exit", () => {
          resolve();
        });
      }),
      new Promise<void>((resolve) => {
        // Unref'd so a dev server that exits promptly does not hold the
        // process open for the rest of the grace period.
        setTimeout(resolve, SHUTDOWN_GRACE_MS).unref();
      }),
    ]);
  }
  killGroup(group, "SIGKILL");
  serverGroup = undefined;
  rmSync(recordPath, { force: true });
};

const shutdown = async (): Promise<never> => {
  await cleanup();
  process.exit(1);
};

for (const sig of ["SIGINT", "SIGTERM", "SIGHUP"] as const) {
  process.on(sig, () => {
    void shutdown();
  });
}
process.on("exit", () => {
  try {
    if (serverGroup !== undefined) {
      killGroup(serverGroup, "SIGKILL");
    }
    rmSync(recordPath, { force: true });
  } catch {
    // Nothing to fall back on this late; the process is already leaving.
  }
});

const getFreePort = (): Promise<number> =>
  new Promise((resolve, reject) => {
    const s = createServer();
    s.unref();
    s.on("error", reject);
    s.listen(0, () => {
      const address = s.address();
      if (address === null || typeof address === "string") {
        reject(new Error("Could not resolve a free port"));
        return;
      }
      s.close(() => {
        resolve(address.port);
      });
    });
  });

const waitForReady = async (url: string, timeoutMs = 60_000): Promise<void> => {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (response.ok) {
        return;
      }
    } catch {
      // Connection refused just means the dev server has not bound yet.
    }
    await sleep(250);
  }
  throw new Error(`Timed out waiting for ${url}`);
};

try {
  await reapOrphanedServer();

  const port = await getFreePort();
  server = spawn("pnpm", ["exec", "next", "dev", "-p", String(port)], {
    cwd: projectRoot,
    // Its own process group, so one signal reaches `next dev` and `next-server` as well.
    detached: true,
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  });
  const pgid = server.pid;
  if (pgid === undefined) {
    throw new Error("The dev server failed to spawn");
  }
  // Written synchronously, with nothing awaited in between, to keep the window in which a SIGKILL
  // would orphan an unrecorded process group as small as it can be.
  serverGroup = pgid;
  mkdirSync(path.dirname(recordPath), { recursive: true });
  writeFileSync(recordPath, JSON.stringify({ pgid, port } satisfies ServerRecord));

  server.stdout?.on("data", (chunk: Buffer) => {
    process.stdout.write(`[next] ${chunk.toString()}`);
  });
  server.stderr?.on("data", (chunk: Buffer) => {
    process.stderr.write(`[next] ${chunk.toString()}`);
  });

  const base = `http://localhost:${port}`;
  await waitForReady(`${base}/resume`);

  browser = await launch({ channel: "chrome", headless: true });
  const page = await browser.newPage();
  await page.emulateMediaType("print");
  await page.goto(`${base}/resume`, {
    timeout: 30_000,
    waitUntil: "networkidle0",
  });

  const pdf = await page.pdf({
    format: "A4",
    margin: { bottom: "16mm", left: "16mm", right: "16mm", top: "16mm" },
    preferCSSPageSize: false,
    printBackground: true,
  });

  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(`${outPath}.tmp`, pdf);
  await rename(`${outPath}.tmp`, outPath);
  console.log(`Wrote ${outPath} (${pdf.byteLength} bytes)`);
} catch (error) {
  console.error("Resume generation failed:", error);
  process.exitCode = 1;
} finally {
  await cleanup();
}
