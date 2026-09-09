import { test, expect } from "@playwright/test";

test.describe("Qualifications & Professional Memberships page", () => {
  test("is reachable from the homepage surgeon-introduction section", async ({ page }) => {
    await page.goto("/");
    const section = page.locator('[data-section="surgeon-introduction"]');
    await expect(section.getByRole("link", { name: "Qualifications & Memberships" })).toHaveAttribute(
      "href",
      "/qualifications-and-memberships"
    );

    await page.goto("/qualifications-and-memberships");
    await expect(page.getByRole("heading", { level: 1, name: "Qualifications & professional memberships" })).toBeVisible();
  });

  test("renders every sourced section with its pending-verification status visible", async ({ page }) => {
    await page.goto("/qualifications-and-memberships");

    await expect(page.getByRole("heading", { name: "Qualifications", exact: true })).toBeVisible();
    await expect(page.getByText("MBBS")).toBeVisible();
    await expect(page.getByRole("heading", { name: "GMC registration" })).toBeVisible();
    await expect(page.getByText("The registration number is")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Professional memberships & positions held" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Research", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Peer-reviewed publications" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Courses offered to GPs" })).toBeVisible();

    expect(await page.getByText("Pending verification").count()).toBeGreaterThanOrEqual(7);
  });

  test("has no dead links and publication sources open externally", async ({ page }) => {
    await page.goto("/qualifications-and-memberships");

    const sourceLinks = page.getByRole("link", { name: "View source" });
    const count = await sourceLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i += 1) {
      const href = await sourceLinks.nth(i).getAttribute("href");
      expect(href).toMatch(/^https?:\/\//);
    }
    await expect(sourceLinks.first()).toHaveAttribute("target", "_blank");

    await page.getByRole("link", { name: "Request an Appointment" }).first().click();
    await expect(page).toHaveURL(/\/appointments$/);
  });

  test("is marked noindex while unverified", async ({ page }) => {
    const response = await page.goto("/qualifications-and-memberships");
    expect(response?.status()).toBe(200);
    const robotsMeta = page.locator('meta[name="robots"]');
    await expect(robotsMeta).toHaveAttribute("content", /noindex/);
  });
});
