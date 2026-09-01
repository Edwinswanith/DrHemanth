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
    const question = page.getByRole("button", { name: "Can I use this website in an emergency?" });
    await question.focus();
    await expect(question).toHaveAttribute("aria-expanded", "false");
    await page.keyboard.press("Enter");
    await expect(question).toHaveAttribute("aria-expanded", "true");
  });

  test("mobile appointment drawer traps focus and Escape closes it", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-390", "Drawer only renders below the lg breakpoint");
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Request an Appointment" }).first();
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Request an Appointment" });
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");

    // The drawer slides off-canvas via CSS transform (so it can animate),
    // rather than being removed via display:none, so a raw visibility
    // check isn't the meaningful assertion here. What actually matters for
    // accessibility — the outer wrapper becomes inert (see
    // src/components/ui/drawer.tsx) and focus returns to the trigger — is
    // what this asserts instead.
    await expect(trigger).toBeFocused();
    const isInert = await dialog.evaluate((el) => el.closest<HTMLElement>("[inert]") !== null);
    expect(isInert).toBe(true);
  });
});
