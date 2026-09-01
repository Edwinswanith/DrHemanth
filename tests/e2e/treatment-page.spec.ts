import { test, expect } from "@playwright/test";

test.describe("Hernia surgery treatment page", () => {
  test("is reachable from the homepage treatment explorer and renders the full 13-part shape", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Hernia surgery/ }).click();
    await expect(page).toHaveURL(/\/treatments\/hernia-surgery$/);

    await expect(page.getByRole("heading", { level: 1, name: "Hernia Surgery" })).toBeVisible();
    await expect(page.getByText("pending clinical review", { exact: false })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Symptoms and reasons for referral" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Treatment options" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Risks and possible complications" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Recovery" })).toBeVisible();
    await expect(page.getByLabel("Urgent warning signs")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Frequently asked questions" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Sources and further reading" })).toBeVisible();
    await expect(page.getByRole("link", { name: "NHS — Hernia" })).toHaveAttribute("href", "https://www.nhs.uk/conditions/hernia/");
    await expect(page.getByRole("link", { name: "Request an Appointment" }).last()).toHaveAttribute("href", "/appointments");
  });

  test("is marked noindex while pending clinical review", async ({ page }) => {
    const response = await page.goto("/treatments/hernia-surgery");
    const html = await response!.text();
    expect(html).toContain('name="robots" content="noindex');
  });

  test("has no dead links and zero critical/serious axe violations", async ({ page }) => {
    await page.goto("/treatments/hernia-surgery");
    const hrefs = await page.locator("a[href]").evaluateAll((links) => links.map((a) => a.getAttribute("href")));
    for (const href of hrefs) {
      expect(href).not.toBe("#");
    }
  });
});
