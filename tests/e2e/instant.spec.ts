import { instant } from "@next/playwright";
import { expect, test } from "@playwright/test";

test.describe("Instant navigation", () => {
  test.describe.configure({ retries: 0 });

  test("serves the home page on initial load", async ({ baseURL, page }) => {
    await instant(
      page,
      async () => {
        await page.goto("/");
        await expect(page.getByRole("heading", { level: 1 })).toContainText("Pedro");
      },
      { baseURL },
    );
  });

  test("commits the side page during client navigation", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("link", { exact: true, name: "Side" });

    await instant(page, async () => {
      await trigger.click();
      await page.waitForURL("/side");
      await expect(
        page.getByRole("heading", { exact: true, level: 1, name: "Side" }),
      ).toBeVisible();
    });
  });
});
