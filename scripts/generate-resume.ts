import { createServer } from "node:http";
import path from "node:path";

import next from "next";
import { launch } from "puppeteer-core";

const projectRoot = path.resolve(import.meta.dirname, "..");
const outPath = path.join(projectRoot, "public", "resume.pdf");

for (const signal of ["SIGHUP", "SIGTERM"] as const) {
  process.once(signal, () => {
    process.exit(1);
  });
}

const app = next({ dev: true, dir: projectRoot });

await app.prepare();

const handle = app.getRequestHandler();

const server = createServer((request, response) => {
  void handle(request, response);
});

await new Promise<void>((resolve) => {
  server.listen(0, resolve);
});

const address = server.address();

if (address === null || typeof address === "string") {
  throw new Error("The resume server has no TCP port");
}

const browser = await launch({ channel: "chrome", headless: true });
const page = await browser.newPage();

await page.goto(`http://localhost:${address.port}/resume`, { waitUntil: "networkidle0" });

const pdf = await page.pdf({
  format: "A4",
  margin: { bottom: "16mm", left: "16mm", right: "16mm", top: "16mm" },
  path: outPath,
  printBackground: true,
});

console.log(`Wrote ${outPath} (${pdf.byteLength} bytes)`);

process.exit();
