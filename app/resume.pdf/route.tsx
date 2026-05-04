import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const isDev = process.env.NODE_ENV === "development";

const launchBrowser = async () => {
  if (isDev) {
    return puppeteer.launch({ channel: "chrome", headless: true });
  }
  return puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });
};

const GET = async (request: Request) => {
  const url = new URL(request.url);
  const resumeUrl = `${url.protocol}//${url.host}/resume`;

  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();
    await page.emulateMediaType("print");
    await page.goto(resumeUrl, { waitUntil: "networkidle0", timeout: 30000 });

    const pdf = await page.pdf({
      format: "A4",
      margin: {
        top: "16mm",
        bottom: "16mm",
        left: "16mm",
        right: "16mm",
      },
      printBackground: true,
      preferCSSPageSize: false,
    });

    return new Response(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="pedro-filho-resume.pdf"',
        "Cache-Control":
          "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } finally {
    await browser.close();
  }
};

export { GET };
