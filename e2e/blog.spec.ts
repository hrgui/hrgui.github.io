import { test, expect } from "@playwright/test";

test("blog is present and all modules work", async ({ page }) => {
  await page.goto("/posts");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Blog");

  const firstBlogTitle = await page.getByRole("heading", { level: 2 }).first();
  await firstBlogTitle.click();
});
