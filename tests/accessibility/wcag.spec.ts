import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/appointments", "/privacy", "/accessibility", "/medical-disclaimer", "/treatments/hernia-surgery", "/treatments/gallbladder-surgery"];

test.describe("Accessibility (WCAG 2.2 AA)", () => {
  for (const route of routes) {
    test(`${route} has zero critical/serious axe violations`, async ({ page }) => {
      await page.goto(route);
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
    test.skip(testInfo.project.name !== "mobile-390", "Drawer only renders below the lg breakpoint");
    await page.goto("/");
    await page.getByRole("button", { name: "Request an Appointment" }).first().click();
    const dialog = page.getByRole("dialog", { name: "Request an Appointment" });
    await expect(dialog).toHaveAttribute("aria-modal", "true");

    const results = await new AxeBuilder({ page }).include('[role="dialog"]').analyze();
    const seriousOrCritical = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(seriousOrCritical).toEqual([]);
  });
});
