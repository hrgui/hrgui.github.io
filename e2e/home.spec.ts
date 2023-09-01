import { test, expect } from "@playwright/test";

test("home is present and all modules work", async ({ page }) => {
  await page.goto("/");

  expect(page.getByTestId("section-hero")).toBeInViewport();

  const section3SP = page.getByTestId("section-three-sell-points");
  await section3SP.scrollIntoViewIfNeeded();
  expect(section3SP).toBeInViewport();

  const sectionTS = page.getByTestId("section-technical-skills");
  await sectionTS.scrollIntoViewIfNeeded();
  expect(sectionTS).toBeInViewport();

  const sectionE = page.getByTestId("section-education");
  await sectionE.scrollIntoViewIfNeeded();
  expect(sectionE).toBeInViewport();

  const sectionPortfolio = page.getByTestId("section-portfolio");
  await sectionPortfolio.scrollIntoViewIfNeeded();
  expect(sectionPortfolio).toBeInViewport();
});
