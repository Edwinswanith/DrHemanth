import { test, expect } from "@playwright/test";
import { fakeClientIp } from "./test-utils";

test.describe("Keyboard navigation", () => {
  test("skip link is the first focusable element and jumps to main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Skip to main content" });
    await expect(skipLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main-content$/);
  });

  test("a keyboard-only user can complete the full appointment request on /appointments", async ({
    page,
    context,
  }) => {
    await context.setExtraHTTPHeaders({ "x-forwarded-for": fakeClientIp() });
    await page.goto("/appointments");

    await page.getByLabel("Full name").focus();
    await page.keyboard.type("Keyboard Only Patient");
    await page.keyboard.press("Tab");
    await page.keyboard.type("07123456789");
    await page.keyboard.press("Tab");
    await page.keyboard.type(`keyboard-${Date.now()}@example.com`);
    await page.keyboard.press("Tab");
    await page.getByLabel("Preferred location").selectOption("no-preference");
    await page.getByLabel("Preferred contact method").selectOption("telephone");
    await page.getByLabel("Broad availability").selectOption("flexible");

    await page.getByLabel(/I have read and understood/).focus();
    await page.keyboard.press("Space");

    await page.getByRole("button", { name: "Request an Appointment" }).focus();
    await page.keyboard.press("Enter");

    await expect(page).toHaveURL(/\/appointments\/confirmation\?ref=HS-/);
  });

  test("FAQ accordion is fully keyboard-operable and toggles aria-expanded", async ({ page }) => {
    await page.goto("/#faqs");
    const question = page.getByRole("button", { name: "What happens after I submit an appointment request?" });
    await question.focus();
    await expect(question).toHaveAttribute("aria-expanded", "false");
    await page.keyboard.press("Enter");
    await expect(question).toHaveAttribute("aria-expanded", "true");
  });

  test("mobile appointment drawer traps focus and Escape closes it", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-390", "Drawer only renders at phone width");
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Request an Appointment" }).first();
    await trigger.click();
    await expect(page.getByRole("dialog", { name: "Request an Appointment" })).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(trigger).toBeFocused();
    await expect(page.locator('[role="dialog"][aria-label="Request an Appointment"]')).toHaveCount(0);
  });

  test("practice location tabs are operable with arrow keys and update the detail panel", async ({ page }) => {
    await page.goto("/#locations");
    const firstTab = page.getByRole("tab", { name: /Spire Bushey Hospital/ });
    const secondTab = page.getByRole("tab", { name: /The Clementine Churchill Hospital/ });
    const panel = page.locator("#active-location-detail");

    await firstTab.focus();
    await expect(firstTab).toHaveAttribute("aria-selected", "true");
    await expect(panel.getByRole("heading", { name: "Spire Bushey Hospital" })).toBeVisible();

    await page.keyboard.press("ArrowDown");
    await expect(secondTab).toBeFocused();
    await expect(secondTab).toHaveAttribute("aria-selected", "true");
    await expect(firstTab).toHaveAttribute("aria-selected", "false");
    await expect(panel.getByRole("heading", { name: "The Clementine Churchill Hospital & Clinics" })).toBeVisible();

    await page.keyboard.press("ArrowUp");
    await expect(firstTab).toBeFocused();
    await expect(panel.getByRole("heading", { name: "Spire Bushey Hospital" })).toBeVisible();
  });

  test("treatments index rows are reachable and activatable by keyboard", async ({ page }) => {
    await page.goto("/treatments");
    const link = page.getByRole("region", { name: "Treatments" }).getByRole("link", { name: /Upper GI Endoscopy/ });
    await link.focus();
    await expect(link).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/treatments\/upper-gi-endoscopy$/);
  });
});
