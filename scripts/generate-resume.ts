import { createServer } from "node:http";
import path from "node:path";

import { chromium } from "@playwright/test";
import next from "next";

const projectRoot = path.resolve(import.meta.dirname, "..");
const outPath = path.join(projectRoot, "public", "resume.pdf");

const browser = await chromium.launch({ channel: "chrome" });
const app = next({ dir: projectRoot });
const handle = app.getRequestHandler();

const server = createServer((request, response) => {
  void handle(request, response);
});

try {
  await app.prepare();

  await new Promise<void>((resolve) => {
    server.listen(0, resolve);
  });

  const address = server.address();

  if (address === null || typeof address === "string") {
    throw new Error("The resume server has no TCP port");
  }

  const page = await browser.newPage();

  await page.goto(`http://localhost:${address.port}/resume`, { waitUntil: "networkidle" });

  const pdf = await page.pdf({
    height: "297mm",
    margin: { bottom: "16mm", left: "16mm", right: "16mm", top: "16mm" },
    path: outPath,
    printBackground: true,
    tagged: true,
    width: "210mm",
  });

  console.log(`Wrote ${outPath} (${pdf.byteLength} bytes)`);
} catch (error) {
  process.exitCode = 1;

  throw error;
} finally {
  await browser.close();
  server.close();
  await app.close();
}
