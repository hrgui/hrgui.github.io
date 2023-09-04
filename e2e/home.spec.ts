import { test, expect } from "@playwright/test";

test("home is present and all modules work", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId("section-hero")).toBeAttached();
  await expect(page.getByTestId("section-three-sell-points")).toBeAttached();
  await expect(page.getByTestId("section-technical-skills")).toBeAttached();
  await expect(page.getByTestId("section-education")).toBeAttached();
  await expect(page.getByTestId("section-portfolio")).toBeAttached();
});
