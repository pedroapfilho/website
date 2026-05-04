import { type ChildProcess, spawn } from "node:child_process";
import { mkdir, rename, writeFile } from "node:fs/promises";
import { type AddressInfo, createServer } from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer, { type Browser } from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outPath = path.join(projectRoot, "public", "resume.pdf");

let server: ChildProcess | undefined;
let browser: Browser | undefined;

const cleanup = async (): Promise<void> => {
  try {
    await browser?.close();
  } catch {}
  if (server && server.exitCode === null) {
    server.kill("SIGTERM");
    await new Promise<void>((resolve) => {
      const t = setTimeout(() => {
        try {
          server?.kill("SIGKILL");
        } catch {}
        resolve();
      }, 5000);
      server?.once("exit", () => {
        clearTimeout(t);
        resolve();
      });
    });
  }
};

for (const sig of ["SIGINT", "SIGTERM", "SIGHUP"] as const) {
  process.on(sig, async () => {
    await cleanup();
    process.exit(1);
  });
}
process.on("exit", () => {
  try {
    server?.kill("SIGKILL");
  } catch {}
});

const getFreePort = (): Promise<number> =>
  new Promise((resolve, reject) => {
    const s = createServer();
    s.unref();
    s.on("error", reject);
    s.listen(0, () => {
      const address = s.address() as AddressInfo;
      s.close(() => resolve(address.port));
    });
  });

const waitForReady = async (url: string, timeoutMs = 60000): Promise<void> => {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(url, { cache: "no-store" });
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Timed out waiting for ${url}`);
};

try {
  const port = await getFreePort();
  server = spawn("pnpm", ["exec", "next", "dev", "-p", String(port)], {
    cwd: projectRoot,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, PORT: String(port) },
  });
  server.stdout?.on("data", (d: Buffer) =>
    process.stdout.write(`[next] ${d}`),
  );
  server.stderr?.on("data", (d: Buffer) =>
    process.stderr.write(`[next] ${d}`),
  );

  const base = `http://localhost:${port}`;
  await waitForReady(`${base}/resume`);

  browser = await puppeteer.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage();
  await page.emulateMediaType("print");
  await page.goto(`${base}/resume`, {
    waitUntil: "networkidle0",
    timeout: 30000,
  });

  const pdf = await page.pdf({
    format: "A4",
    margin: { top: "16mm", bottom: "16mm", left: "16mm", right: "16mm" },
    printBackground: true,
    preferCSSPageSize: false,
  });

  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(`${outPath}.tmp`, pdf);
  await rename(`${outPath}.tmp`, outPath);
  console.log(`Wrote ${outPath} (${pdf.byteLength} bytes)`);
} catch (err) {
  console.error("Resume generation failed:", err);
  process.exitCode = 1;
} finally {
  await cleanup();
}
