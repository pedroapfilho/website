import { type ChildProcess, spawn } from "node:child_process";
import { mkdir, rename, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import path from "node:path";

import { type Browser, launch } from "puppeteer-core";

const projectRoot = path.resolve(import.meta.dirname, "..");
const outPath = path.join(projectRoot, "public", "resume.pdf");

const SHUTDOWN_GRACE_MS = 5000;

let server: ChildProcess | undefined;
let browser: Browser | undefined;

const cleanup = async (): Promise<void> => {
  try {
    await browser?.close();
  } catch {
    // A browser that already died is the state we wanted anyway.
  }
  if (server && server.exitCode === null) {
    server.kill("SIGTERM");
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
    if (child.exitCode === null) {
      child.kill("SIGKILL");
    }
  }
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
    server?.kill("SIGKILL");
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
    await new Promise((resolve) => {
      setTimeout(resolve, 250);
    });
  }
  throw new Error(`Timed out waiting for ${url}`);
};

try {
  const port = await getFreePort();
  server = spawn("pnpm", ["exec", "next", "dev", "-p", String(port)], {
    cwd: projectRoot,
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  });
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
