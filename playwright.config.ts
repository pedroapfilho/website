import { defineConfig, devices } from "@playwright/test";

const port = 3100;
const baseURL = `http://127.0.0.1:${port}`;

const config = defineConfig({
  forbidOnly: Boolean(process.env.CI),
  projects: [{ name: "chromium", use: devices["Desktop Chrome"] }],
  reporter: process.env.CI ? "github" : "list",
  testDir: "./tests/e2e",
  use: { baseURL, screenshot: "only-on-failure", trace: "retain-on-failure" },
  webServer: {
    command: `EXPOSE_TESTING_API=1 pnpm build && pnpm start --port ${String(port)}`,
    reuseExistingServer: false,
    timeout: 120_000,
    url: baseURL,
  },
});

export default config;
