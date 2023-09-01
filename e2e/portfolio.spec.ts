import { test, expect } from "@playwright/test";

test("should be able to see the portfolio index and be able to hit chord-charts, a github portfolio item", async ({
  page,
}) => {
  await page.goto("/portfolio");

  const header = page.getByRole("heading", { level: 1 });
  expect(header).toBeInViewport();
  expect(header).toContainText("Portfolio");

  const testPortfolioItem = page.getByText("chord-charts");
  await testPortfolioItem.click();
  await page.waitForURL("**/chord-charts");
  const whatIDid = await page.getByText("What I Did");
  await whatIDid.scrollIntoViewIfNeeded();
  expect(whatIDid).toBeInViewport();

  const technologiesUsed = await page.getByText("Technologies Used");
  await technologiesUsed.scrollIntoViewIfNeeded();
  expect(technologiesUsed).toBeInViewport();

  const about = await page.getByText("About");
  await about.scrollIntoViewIfNeeded();
  expect(about).toBeInViewport();
});

test("should be able to see the portfolio index and be able to hit VKEY, a portfolio item with a slider", async ({
  page,
}) => {
  await page.goto("/portfolio");

  const header = page.getByRole("heading", { level: 1 });
  expect(header).toBeInViewport();
  expect(header).toContainText("Portfolio");

  const testPortfolioItem = page.getByText("VKEY");
  await testPortfolioItem.click();
  await page.waitForURL("**/vkey");

  const whatIDid = await page.getByText("What I Did");
  await whatIDid.scrollIntoViewIfNeeded();
  expect(whatIDid).toBeInViewport();

  const technologiesUsed = await page.getByText("Technologies Used");
  await technologiesUsed.scrollIntoViewIfNeeded();
  expect(technologiesUsed).toBeInViewport();

  const about = await page.getByText("About");
  await about.scrollIntoViewIfNeeded();
  expect(about).toBeInViewport();

  const next = await page.getByText("Next");
  await next.click();
});
