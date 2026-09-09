import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/appointments",
  "/privacy",
  "/accessibility",
  "/medical-disclaimer",
  "/patient-feedback",
  "/qualifications-and-memberships",
  "/robotic-vs-laparoscopic",
  "/treatments",
  "/treatments/upper-gi-endoscopy",
  "/treatments/anti-reflux-surgery",
  "/treatments/hernia-surgery",
  "/treatments/gallbladder-surgery",
  "/treatments/bile-duct-exploration",
  "/treatments/liver-and-spleen-surgery",
  "/treatments/appendicectomy",
];

/**
 * Homepage sections (and any Section-shelled page) fade/translate in once
 * as they scroll into view (src/components/ui/reveal-on-scroll.tsx) —
 * genuinely invisible (opacity: 0) until then, by design, matching what a
 * real visitor sees before they've scrolled that far. A scan immediately
 * after `goto` would catch below-the-fold content mid-"not yet revealed"
 * and misreport it as a permanent contrast/visibility defect. Scrolling
 * through the full page first — the same journey a real user or
 * screen-reader user takes — before analysing is the representative check.
 */
async function scrollThroughPage(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewport = page.viewportSize()?.height ?? 800;
  for (let y = 0; y <= height; y += viewport * 0.8) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(50);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
}

test.describe("Accessibility (WCAG 2.2 AA)", () => {
  for (const route of routes) {
    test(`${route} has zero critical/serious axe violations`, async ({ page }) => {
      await page.goto(route);
      await scrollThroughPage(page);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      const seriousOrCritical = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");

      if (seriousOrCritical.length > 0) {
        console.log(JSON.stringify(seriousOrCritical, null, 2));
      }
      expect(seriousOrCritical).toEqual([]);
    });
  }

  test("the appointment drawer dialog is announced and labelled correctly", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-390", "Drawer only renders at phone width");
    await page.goto("/");
    await page.getByRole("button", { name: "Request an Appointment" }).first().click();
    const dialog = page.getByRole("dialog", { name: "Request an Appointment" });
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    // Let the drawer's slide-in transition (--duration-base, 220ms) finish
    // before scanning — otherwise axe can sample colours mid-transition.
    await page.waitForTimeout(300);

    const results = await new AxeBuilder({ page }).include('[role="dialog"]').analyze();
    const seriousOrCritical = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(seriousOrCritical).toEqual([]);
  });
});
