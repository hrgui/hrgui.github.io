import { test, expect } from "@playwright/test";

test("blog is present and all modules work", async ({ page }) => {
  await page.goto("/posts");

  const header = page.getByRole("heading", { level: 1 });
  expect(header).toBeInViewport();
  expect(header).toContainText("Blog");

  const firstBlogTitle = page.getByRole("heading", { level: 2 }).first();
  await firstBlogTitle.click();
});
