import { test, expect } from "@playwright/test";

test("home is present and all modules work", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByTestId("section-hero")).toBeAttached();
  await expect(page.getByTestId("section-three-sell-points")).toBeAttached();
  await expect(page.getByTestId("section-technical-skills")).toBeAttached();
  await expect(page.getByTestId("section-education")).toBeAttached();
  await expect(page.getByTestId("section-portfolio")).toBeAttached();
  await page.waitForLoadState("networkidle");

  await page.evaluate(async () => {
    await document.fonts.ready;

    const relevantImages = Array.from(document.images).filter((img) => {
      const rect = img.getBoundingClientRect();
      const isNearViewport = rect.top < window.innerHeight * 1.5;
      return !img.complete && (img.loading !== "lazy" || isNearViewport);
    });

    await Promise.race([
      Promise.all(
        relevantImages.map(
          (img) =>
            new Promise<void>((resolve) => {
              img.addEventListener("load", () => resolve(), { once: true });
              img.addEventListener("error", () => resolve(), { once: true });
            })
        )
      ),
      new Promise<void>((resolve) => setTimeout(resolve, 5000)),
    ]);
  });

  await expect(page).toHaveScreenshot("home-page.png", {
    animations: "disabled",
    fullPage: true,
  });
});
