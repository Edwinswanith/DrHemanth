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

  test("appointment CTAs reach the correct appointment flow", async ({ page }, testInfo) => {
    await page.goto("/");

    if (testInfo.project.name === "mobile-390") {
      await page.getByRole("button", { name: "Request an Appointment" }).first().click();
      await expect(page.getByRole("dialog", { name: "Request an Appointment" })).toBeVisible();
      return;
    }

    if (testInfo.project.name === "tablet-768") {
      await page.getByRole("link", { name: "Request an Appointment" }).first().click();
    } else {
      await page.getByRole("link", { name: "Request an Appointment" }).first().click();
    }

    await expect(page).toHaveURL(/\/appointments$/);
    await expect(page.getByRole("heading", { name: "Request an Appointment" })).toBeVisible();
  });

  test("a non-existent URL renders the custom not-found page, not a raw error", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Go to homepage" })).toBeVisible();
  });
});
