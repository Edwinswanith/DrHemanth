import { test, expect } from "@playwright/test";

const routes = ["/", "/appointments", "/privacy", "/accessibility", "/medical-disclaimer", "/treatments/hernia-surgery", "/treatments/gallbladder-surgery", "/treatments/bile-duct-exploration"];

test.describe("Responsive layout", () => {
  for (const route of routes) {
    test(`${route} has no horizontal overflow at this viewport`, async ({ page }) => {
      await page.goto(route);
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      // A 1px tolerance absorbs sub-pixel rounding from the CSS engine.
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });
  }

  test("mobile persistent action bar does not cover the footer's legal links", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-390", "Persistent bar only renders below the lg breakpoint");
    await page.goto("/");
    // Scope to the footer specifically — the FAQ answers also link to
    // "the privacy notice" inline, which otherwise collides with this
    // locator.
    const footerPrivacyLink = page.getByRole("contentinfo").getByRole("link", { name: "Privacy Notice" });
    await footerPrivacyLink.scrollIntoViewIfNeeded();
    await expect(footerPrivacyLink).toBeInViewport();
  });

  test("desktop hero shows the surgeon identity and the inline appointment card side by side", async ({
    page,
  }, testInfo) => {
    test.skip(!["desktop-1440", "desktop-1920"].includes(testInfo.project.name), "Desktop-only layout assertion");
    await page.goto("/");
    const heading = page.getByRole("heading", { level: 1, name: "Prof. Hemant Sheth" });
    const card = page.getByRole("heading", { level: 2, name: "Request an Appointment" }).first();
    await expect(heading).toBeVisible();
    await expect(card).toBeVisible();
    const headingBox = await heading.boundingBox();
    const cardBox = await card.boundingBox();
    expect(headingBox && cardBox && cardBox.x > headingBox.x).toBe(true);
  });
});
