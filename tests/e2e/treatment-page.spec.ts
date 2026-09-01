import { test, expect } from "@playwright/test";

/**
 * Data-driven so each new treatment page (see docs/02-information-architecture.md
 * for the full 7-category list) is a one-line addition here, following the
 * pattern established by hernia surgery and gallbladder surgery.
 */
const treatmentPages = [
  {
    slug: "hernia-surgery",
    name: "Hernia Surgery",
    linkText: /Hernia surgery/,
    firstReferenceName: "NHS — Hernia",
    firstReferenceHref: "https://www.nhs.uk/conditions/hernia/",
  },
  {
    slug: "gallbladder-surgery",
    name: "Gallbladder Surgery",
    linkText: /Gallbladder surgery/,
    firstReferenceName: "NHS — Gallstones",
    firstReferenceHref: "https://www.nhs.uk/conditions/gallstones/",
  },
  {
    slug: "bile-duct-exploration",
    name: "Bile Duct Exploration",
    linkText: /Bile duct exploration/,
    firstReferenceName: "Guy's and St Thomas' NHS Foundation Trust — ERCP (endoscopic retrograde cholangio pancreatography)",
    firstReferenceHref: "https://www.guysandstthomas.nhs.uk/health-information/ercp-endoscopic-retrograde-cholangio-pancreatography",
  },
];

for (const treatment of treatmentPages) {
  test.describe(`${treatment.name} treatment page`, () => {
    test("is reachable from the homepage treatment explorer and renders the full 13-part shape", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("link", { name: treatment.linkText }).click();
      await expect(page).toHaveURL(new RegExp(`/treatments/${treatment.slug}$`));

      await expect(page.getByRole("heading", { level: 1, name: treatment.name })).toBeVisible();
      await expect(page.getByText("pending clinical review", { exact: false })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Symptoms and reasons for referral" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Treatment options" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Risks and possible complications" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Recovery" })).toBeVisible();
      await expect(page.getByLabel("Urgent warning signs")).toBeVisible();
      await expect(page.getByRole("heading", { name: "Frequently asked questions" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Sources and further reading" })).toBeVisible();
      await expect(page.getByRole("link", { name: treatment.firstReferenceName })).toHaveAttribute(
        "href",
        treatment.firstReferenceHref
      );
      await expect(page.getByRole("link", { name: "Request an Appointment" }).last()).toHaveAttribute(
        "href",
        "/appointments"
      );
    });

    test("is marked noindex while pending clinical review", async ({ page }) => {
      const response = await page.goto(`/treatments/${treatment.slug}`);
      const html = await response!.text();
      expect(html).toContain('name="robots" content="noindex');
    });

    test("has no dead links", async ({ page }) => {
      await page.goto(`/treatments/${treatment.slug}`);
      const hrefs = await page.locator("a[href]").evaluateAll((links) => links.map((a) => a.getAttribute("href")));
      for (const href of hrefs) {
        expect(href).not.toBe("#");
      }
    });
  });
}

test.describe("Bile Duct Exploration risk-statistics attribution", () => {
  // A medical-content-reviewer pass flagged that citing specific risk
  // percentages (e.g. pancreatitis rates) without attribution could read
  // as Prof. Sheth's personal outcomes rather than general NHS-published
  // figures — see src/content/treatments/bile-duct-exploration.ts and
  // src/components/medical/risk-information.tsx's riskStatisticsNote prop.
  test("shows the general-rates disclaimer directly beside the risk statistics", async ({ page }) => {
    await page.goto("/treatments/bile-duct-exploration");
    await expect(page.getByText("not Prof. Sheth's personal or practice-specific results", { exact: false })).toBeVisible();
  });
});
