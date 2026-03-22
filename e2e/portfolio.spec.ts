import { test, expect } from "@playwright/test";

test("should be able to see the portfolio index and be able to hit chord-charts, a github portfolio item", async ({
  page,
}) => {
  await page.goto("/portfolio");

  const header = page.getByRole("heading", { level: 1 });
  await expect(header).toBeVisible();
  await expect(header).toContainText("Portfolio");

  const testPortfolioItem = page.getByRole("link", {
    name: "View chord-charts",
  });
  await testPortfolioItem.click();
  await page.waitForURL("**/chord-charts");
  const whatIDid = await page.getByText("What I Did");
  await whatIDid.scrollIntoViewIfNeeded();
  await expect(whatIDid).toBeVisible();

  const technologiesUsed = await page.getByText("Technologies Used");
  await technologiesUsed.scrollIntoViewIfNeeded();
  await expect(technologiesUsed).toBeVisible();

  const contextLabel = page.getByText("project_notes // context");
  await contextLabel.scrollIntoViewIfNeeded();
  await expect(contextLabel).toBeVisible();
});

test("should be able to see the portfolio index and be able to hit VKEY, a portfolio item with a slider", async ({
  page,
}) => {
  await page.goto("/portfolio");

  const header = page.getByRole("heading", { level: 1 });
  await expect(header).toBeVisible();
  await expect(header).toContainText("Portfolio");

  const testPortfolioItem = page.getByRole("link", {
    name: "View VKEY",
  });
  await testPortfolioItem.click();
  await page.waitForURL("**/vkey");

  const whatIDid = await page.getByText("What I Did");
  await whatIDid.scrollIntoViewIfNeeded();
  await expect(whatIDid).toBeVisible();

  const technologiesUsed = await page.getByText("Technologies Used");
  await technologiesUsed.scrollIntoViewIfNeeded();
  await expect(technologiesUsed).toBeVisible();

  const contextLabel = page.getByText("project_notes // context");
  await contextLabel.scrollIntoViewIfNeeded();
  await expect(contextLabel).toBeVisible();

  const next = await page.getByText("Next");
  await next.click();
});
