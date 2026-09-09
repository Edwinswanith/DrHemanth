import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/appointments",
  "/privacy",
  "/accessibility",
  "/medical-disclaimer",
  "/patient-feedback",
  "/qualifications-and-memberships",
  "/robotic-vs-laparoscopic",
  "/treatments",
  "/treatments/upper-gi-endoscopy",
  "/treatments/anti-reflux-surgery",
  "/treatments/hernia-surgery",
  "/treatments/gallbladder-surgery",
  "/treatments/bile-duct-exploration",
  "/treatments/liver-and-spleen-surgery",
  "/treatments/appendicectomy",
];

test.describe("Responsive layout", () => {
  for (const route of routes) {
    test(`${route} has no horizontal overflow at this viewport`, async ({ page }) => {
      await page.goto(route);
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      // A 1px tolerance absorbs sub-pixel rounding from the CSS engine.
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });
  }

  test("mobile persistent action bar does not cover the footer's legal links", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-390", "Persistent bar only renders below the lg breakpoint");
    await page.goto("/");
    // Scope to the footer specifically — the FAQ answers also link to
    // "the privacy notice" inline, which otherwise collides with this
    // locator.
    const footerPrivacyLink = page.getByRole("contentinfo").getByRole("link", { name: "Privacy Notice" });
    await footerPrivacyLink.scrollIntoViewIfNeeded();
    await expect(footerPrivacyLink).toBeInViewport();
  });

  test("desktop hero keeps portrait and appointment ahead of supporting video", async ({
    page,
  }, testInfo) => {
    test.skip(!["desktop-1440", "desktop-1920"].includes(testInfo.project.name), "Desktop-only layout assertion");
    await page.goto("/");
    const hero = page.locator('section[aria-label="Introduction"]');
    const roboticChapter = page.locator('[data-section="robotic-surgery"]');
    const heading = hero.getByRole("heading", { level: 1, name: "Prof. Hemant Sheth" });
    const portrait = hero.locator('[data-testid="hero-portrait"]');
    const appointment = hero.locator('[data-testid="hero-appointment"]');
    const video = roboticChapter.locator('[data-testid="hero-video-frame"]');
    await expect(heading).toBeVisible();
    await expect(portrait).toBeVisible();
    await expect(appointment).toBeVisible();
    await expect(video).toBeVisible();
    const heroBox = await hero.boundingBox();
    const portraitBox = await portrait.boundingBox();
    const videoBox = await video.boundingBox();
    expect(heroBox && videoBox && videoBox.y > heroBox.y + heroBox.height).toBe(true);
    // The robotic-surgery video is its own section's visual anchor, so it is
    // deliberately large — the invariant worth guarding is that it stays a
    // real media element (wider than the hero portrait), not that it stays
    // smaller than an unrelated hero element.
    expect(portraitBox && videoBox && videoBox.width >= portraitBox.width).toBe(true);
  });

  test("patient journey reflows into a readable editorial structure", async ({ page }) => {
    await page.goto("/");

    const boxes = await page.locator("#patient-journey li").evaluateAll((items) =>
      items.map((item) => {
        const rect = item.getBoundingClientRect();
        return {
          x: Math.round(rect.left),
          y: Math.round(rect.top),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        };
      })
    );
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    const columnCount = new Set(boxes.map((box) => box.x)).size;

    expect(boxes).toHaveLength(7);
    if (viewportWidth < 768) {
      expect(columnCount).toBe(1);
      for (let index = 1; index < boxes.length; index += 1) {
        const current = boxes[index]!;
        const previous = boxes[index - 1]!;
        expect(current.y).toBeGreaterThan(previous.y);
      }
      return;
    }

    if (viewportWidth < 1024) {
      expect(columnCount).toBeLessThanOrEqual(2);
    } else {
      // True two-row 12-column layout from lg upward: steps 1-4 span 3
      // columns each (row one), steps 5-7 span 4 columns each (row two) —
      // the two rows intentionally use different column widths, so a
      // uniform "column count" isn't the right invariant here.
      const rowOneY = boxes.slice(0, 4).map((box) => box.y);
      const rowTwoY = boxes.slice(4, 7).map((box) => box.y);
      expect(new Set(rowOneY).size).toBe(1);
      expect(new Set(rowTwoY).size).toBe(1);
      expect(rowTwoY[0]!).toBeGreaterThan(rowOneY[0]!);

      const rowOneWidths = boxes.slice(0, 4).map((box) => box.width);
      const rowTwoWidths = boxes.slice(4, 7).map((box) => box.width);
      expect(new Set(rowOneWidths).size).toBe(1);
      expect(new Set(rowTwoWidths).size).toBe(1);
      expect(rowTwoWidths[0]!).toBeGreaterThan(rowOneWidths[0]!);
    }
    expect(Math.min(...boxes.map((box) => box.width))).toBeGreaterThanOrEqual(220);
  });

  test("appointment page fields keep a consistent control system", async ({ page }) => {
    await page.goto("/appointments");

    const controls = await page
      .locator('main form input:not([type="checkbox"]):not([tabindex="-1"]), main form select')
      .evaluateAll((items) =>
        items
          .map((item) => {
            const rect = item.getBoundingClientRect();
            return {
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            };
          })
          .filter((rect) => rect.width > 0 && rect.height > 0)
      );

    expect(controls.length).toBeGreaterThanOrEqual(6);
    expect(Math.min(...controls.map((control) => control.height))).toBeGreaterThanOrEqual(48);
    expect(Math.max(...controls.map((control) => control.height))).toBeLessThanOrEqual(52);
    expect(Math.min(...controls.map((control) => control.width))).toBeGreaterThanOrEqual(260);
  });

  test("robotic surgery video keeps a real 16:9 aspect ratio and stays within its column", async ({
    page,
  }, testInfo) => {
    test.skip(!["desktop-1440", "desktop-1920"].includes(testInfo.project.name), "Desktop-only video assertion");
    await page.goto("/");

    const chapter = page.locator('[data-section="robotic-surgery"]');
    const box = await chapter.locator('[data-testid="hero-video-frame"]').boundingBox();
    // The section itself is full-bleed (dark background to the viewport
    // edge) — compare against its inner content container, not the outer
    // full-bleed wrapper, for a meaningful "share of the section" ratio.
    const containerBox = await chapter.locator(".site-container").first().boundingBox();

    expect(box).not.toBeNull();
    expect(containerBox).not.toBeNull();
    expect(box!.width / box!.height).toBeGreaterThan(1.7);
    expect(box!.width / box!.height).toBeLessThan(1.85);
    // The video is this section's visual anchor, so it should occupy a
    // substantial share of the content width, while still fitting inside it.
    expect(box!.width).toBeLessThanOrEqual(containerBox!.width + 1);
    expect(box!.width / containerBox!.width).toBeGreaterThan(0.4);
  });
});
