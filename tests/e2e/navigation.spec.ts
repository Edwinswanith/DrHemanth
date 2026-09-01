import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("footer legal links go to real, working pages", async ({ page }) => {
    await page.goto("/");
    for (const [label, path] of [
      ["Privacy Notice", "/privacy"],
      ["Medical Disclaimer", "/medical-disclaimer"],
      ["Accessibility Statement", "/accessibility"],
    ] as const) {
      const response = await page.request.get(path);
      expect(response.status(), `${label} (${path})`).toBe(200);
    }
  });

  test("header 'Book an Appointment' / mobile 'Request an Appointment' reaches the appointment flow", async ({
    page,
  }, testInfo) => {
    await page.goto("/");
    // Below the lg (1024px) breakpoint the header collapses to a hamburger
    // and the hero's own "Request an Appointment" trigger opens the drawer
    // instead of a "Book an Appointment" header link — see
    // src/components/layout/site-header.tsx.
    const isCompact = ["mobile-390", "tablet-768"].includes(testInfo.project.name);

    if (isCompact) {
      await page.getByRole("button", { name: "Request an Appointment" }).first().click();
      await expect(page.getByRole("dialog", { name: "Request an Appointment" })).toBeVisible();
    } else {
      await page.getByRole("link", { name: "Book an Appointment" }).click();
      await expect(page).toHaveURL(/\/appointments$/);
      await expect(page.getByRole("heading", { name: "Request an Appointment" })).toBeVisible();
    }
  });

  test("a non-existent URL renders the custom not-found page, not a raw error", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Go to homepage" })).toBeVisible();
  });
});
