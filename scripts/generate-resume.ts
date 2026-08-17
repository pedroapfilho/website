import { execFileSync, spawn } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { mkdir, rename, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import path from "node:path";

import { type Browser, launch } from "puppeteer-core";

import { devServerCommand, reapRecordedServer, stopProcessGroup } from "#scripts/process-lifecycle";
import type { ProcessGroup, RecordStore, ServerRecord } from "#scripts/process-lifecycle";

const projectRoot = path.resolve(import.meta.dirname, "..");
const outPath = path.join(projectRoot, "public", "resume.pdf");
const recordPath = path.join(projectRoot, "node_modules", ".cache", "resume-dev-server.json");

const SHUTDOWN_GRACE_MS = 5000;
const GROUP_POLL_MS = 100;

let serverGroup: number | undefined;
let browser: Browser | undefined;
let teardown: Promise<void> | undefined;

const writeAtomically = async (target: string, data: Uint8Array): Promise<void> => {
  // Per-pid temp name: two concurrent generators sharing one path interleave
  // their writes, and `rename` then publishes a mix of both PDFs atomically.
  const temporaryPath = `${target}.${process.pid}.tmp`;
  await writeFile(temporaryPath, data);
  await rename(temporaryPath, target);
};

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

const recordStore: RecordStore = {
  read: () => {
    try {
      return JSON.parse(readFileSync(recordPath, "utf8")) as unknown;
    } catch {
      return undefined;
    }
  },
  remove: () => {
    rmSync(recordPath, { force: true });
  },
};

const processGroup: ProcessGroup = {
  commands: groupCommands,
  signal: killGroup,
  waitForExit: waitForGroupExit,
};

const closeBrowser = async (): Promise<void> => {
  try {
    await browser?.close();
  } catch {
    // A browser that already died is the state we wanted anyway.
  }
};

const runCleanup = async (): Promise<void> => {
  // The detached group outlives this process and holds a port; the browser does
  // neither. Releasing the group first means a `browser.close()` that hangs on
  // profile-lock contention cannot strand a dev server.
  const closing = closeBrowser();

  const group = serverGroup;
  if (group !== undefined) {
    try {
      await stopProcessGroup(group, processGroup, SHUTDOWN_GRACE_MS);
      serverGroup = undefined;
      recordStore.remove();
    } catch (error) {
      // Deliberately leaving serverGroup set: the exit handler's SIGKILL is the
      // only remaining chance to stop a group SIGTERM and SIGKILL both missed.
      console.error("Could not stop the dev server:", error);
    }
  }

  await closing;
};

const cleanup = (): Promise<void> => (teardown ??= runCleanup());

const shutdown = async (): Promise<never> => {
  try {
    await cleanup();
  } catch (error) {
    // Exiting is not optional, so a teardown failure must not take the exit with it.
    console.error("Cleanup failed during shutdown:", error);
  }
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
  await reapRecordedServer({
    graceMs: SHUTDOWN_GRACE_MS,
    log: console.log,
    processGroup,
    store: recordStore,
    warn: console.warn,
  });

  const port = await getFreePort();
  const server = spawn("pnpm", ["exec", ...devServerCommand(port).argv], {
    cwd: projectRoot,
    detached: true,
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  });
  const pgid = server.pid;
  if (pgid === undefined) {
    throw new Error("The dev server failed to spawn");
  }
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
  await writeAtomically(outPath, pdf);
  console.log(`Wrote ${outPath} (${pdf.byteLength} bytes)`);
} catch (error) {
  console.error("Resume generation failed:", error);
  process.exitCode = 1;
} finally {
  await cleanup();
}
