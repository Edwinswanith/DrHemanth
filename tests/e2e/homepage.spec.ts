import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads with the surgeon's identity immediately visible, no console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1, name: "Prof. Hemant Sheth" })).toBeVisible();
    await expect(
      page
        .getByLabel("Introduction", { exact: true })
        .getByText("Upper GI, hepatobiliary, hernia and minimally invasive surgical care.")
    ).toBeVisible();
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

  test("does not expose pending verification labels to public visitors", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Pending verification")).toHaveCount(0);
  });

  test("shows the legacy practice contact and location details", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#locations");

    await expect(section.getByRole("heading", { name: "Practice locations" })).toBeVisible();
    await expect(section.getByRole("tab", { name: /Spire Bushey Hospital/ })).toBeVisible();
    await expect(section.getByRole("tab", { name: /The Clementine Churchill Hospital/ })).toBeVisible();
    await expect(section.getByRole("tab", { name: /The Wellington Hospital, Elstree Waterfront/ })).toBeVisible();
    await expect(section.getByText("Heathbourne Road")).toBeVisible();
    await expect(section.getByText("Secretary: Nehali Christian")).toBeVisible();
    await expect(section.getByRole("link", { name: "Call 020 8950 9090" })).toHaveAttribute(
      "href",
      "tel:02089509090"
    );
    await expect(section.getByRole("link", { name: "Email admin@medicalsecs.co.uk" })).toHaveAttribute(
      "href",
      "mailto:admin@medicalsecs.co.uk"
    );
    await expect(section.getByText("Initial consultation")).toBeVisible();
    await expect(section.getByText("£220").first()).toBeVisible();
  });

  test("links to the anonymised patient feedback archive", async ({ page }) => {
    await page.goto("/");
    const section = page.locator('[data-section="patient-stories"]');
    await expect(section.getByRole("link", { name: "View more feedback" })).toHaveAttribute("href", "/patient-feedback");

    await page.goto("/patient-feedback");
    await expect(page.getByRole("heading", { level: 1, name: "Patient feedback archive" })).toBeVisible();
    await expect(page.getByText("Names, signatures and private details are withheld.")).toBeVisible();
    // The 105-scan image gallery was pulled from the page (and out of public/)
    // after several scans turned out to have unredacted patient names/an NHS
    // number despite their captions — see src/content/patient-feedback.ts.
    // Only the pre-checked anonymous text excerpts remain.
    await expect(page.getByRole("heading", { name: "Short excerpts, kept anonymous." })).toBeVisible();
    await expect(page.getByRole("link", { name: /Open larger feedback (card|note) scan/ })).toHaveCount(0);
  });

  test("shows the existing practice YouTube video as secondary homepage content", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator('section[aria-label="Introduction"]');
    const roboticChapter = page.locator('[data-section="robotic-surgery"]');
    await expect(hero.getByRole("button", { name: /play video/i })).toHaveCount(0);
    await expect(roboticChapter.getByRole("button", { name: /play video/i })).toBeVisible();
    await expect(roboticChapter.locator('img[alt*="Video thumbnail"]')).toHaveAttribute("src", /Q__rvX_EEGQ/);

    await roboticChapter.getByRole("button", { name: /play video/i }).click();
    const video = roboticChapter.locator('iframe[title*="Ealing Hospital"]');
    await expect(video).toBeVisible();
    await expect(video).toHaveAttribute("src", /Q__rvX_EEGQ/);
    await expect(video).not.toHaveAttribute("src", /autoplay=1/);
  });

  test("the surgery comparison is real, crawlable markup", async ({ page }, testInfo) => {
    await page.goto("/");
    if (testInfo.project.name === "mobile-390") {
      await expect(page.getByRole("heading", { name: "Who controls the instruments" })).toBeVisible();
      await expect(page.getByText("Robotic-assisted surgery").first()).toBeVisible();
      await expect(page.getByText("Laparoscopic surgery").first()).toBeVisible();
      return;
    }

    const table = page.getByRole("table", { name: /comparison of robotic-assisted and laparoscopic surgery/i });
    await expect(table).toBeVisible();
    await expect(table.getByRole("row")).toHaveCount(6); // 1 header + 5 homepage-priority factor rows
  });
});
