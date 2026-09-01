import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads with the surgeon's identity immediately visible, no console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1, name: "Prof. Hemant Sheth" })).toBeVisible();
    await expect(page.getByText("Consultant Upper GI, Laparoscopic & Hepatobiliary Surgeon")).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });

  test("has no dead '#' links and every visible link resolves to a real href", async ({ page }) => {
    await page.goto("/");
    const hrefs = await page.locator("a[href]").evaluateAll((links) => links.map((a) => a.getAttribute("href")));
    for (const href of hrefs) {
      expect(href).not.toBe("#");
      expect(href).toBeTruthy();
    }
  });

  test("does not present any content as a fake statistic or counter", async ({ page }) => {
    await page.goto("/");
    const bodyText = await page.locator("body").innerText();
    // Loose guard against the most obvious fabricated-trust patterns (exact
    // wording will evolve; this exists to catch an accidental regression,
    // not to be an exhaustive content policy check).
    expect(bodyText).not.toMatch(/\d{2,}\+?\s*(years of experience|successful (surgeries|operations)|happy patients)/i);
  });

  test("shows a pending-verification indicator rather than asserting unverified facts as certain", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Pending verification").first()).toBeVisible();
  });

  test("the comparison table is real, crawlable markup", async ({ page }) => {
    await page.goto("/");
    const table = page.getByRole("table", { name: /comparison of robotic-assisted and laparoscopic surgery/i });
    await expect(table).toBeVisible();
    await expect(table.getByRole("row")).toHaveCount(11); // 1 header + 10 factor rows
  });
});
