# Scroll Density Final Report

Baseline screenshots and metrics are stored in `audit-artifacts/scroll-density-baseline-2026-09-02/`. Final screenshots, continuous-width metrics and interaction evidence are stored in `audit-artifacts/scroll-density-final-2026-09-02-v6/`.

| Viewport | Before height | After height | Reduction |
|---|---:|---:|---:|
| 390 x 844 | 15533 | 12648 | 18.6% |
| 430 x 932 | 15036 | 12246 | 18.6% |
| 768 x 1024 | 12498 | 10037 | 19.7% |
| 1024 x 768 | 9375 | 7560 | 19.4% |
| 1280 x 800 | 8543 | 6979 | 18.3% |
| 1366 x 768 | 8709 | 7208 | 17.2% |
| 1440 x 900 | 8848 | 7360 | 16.8% |
| 1600 x 900 | 9087 | 7614 | 16.2% |
| 1920 x 1080 | 9260 | 7614 | 17.8% |

## What Changed

- Section spacing now uses `--section-space-compact`, `--section-space-standard` and `--section-space-feature` rather than one oversized default.
- Hero video moved out of the hero and into the robotic-surgery chapter. The hero now prioritises name, title, portrait, appointment action and trust evidence.
- Hero appointment form became a compact appointment-entry panel; the full API-backed form remains on `/appointments` and in the mobile drawer.
- Scroll-reveal content is no longer hidden by default, removing blank full-page screenshot bands and unnecessary invisible-content states.
- Homepage comparison now uses seven high-value criteria rather than ten rows.
- Mobile treatment disclosure no longer loads a large active image panel on the homepage.
- Location fallback no longer repeats a full appointment CTA or reserves space for unverified hospitals.
- FAQ removed repeated notice copy from the intro and stays collapsed by default.
- Footer spacing and mobile link grids were compacted; phantom main bottom padding was removed.
- Mobile navigation and appointment drawer now lock background scroll only while open, use `overscroll-behavior: contain`, restore scroll position and return focus.

## QA Results

- Responsive widths inspected: 320, 360, 390, 430, 480, 600, 640, 720, 768, 820, 900, 1024, 1100, 1200, 1280, 1366, 1440, 1600 and 1920.
- Horizontal overflow: none detected at all inspected widths.
- Console warnings/errors: zero in final scroll-density run.
- Failed image loads: zero in final scroll-density run.
- Layout shift entries: zero detected in final scroll-density run.
- Accessibility: Playwright axe suite passed with zero serious or critical violations.
- Interaction QA: mobile nav scroll lock, appointment drawer scroll lock, focus return, Escape close, reduced motion and click-to-load video all passed in `interaction-qa.json`.

## Test Outcomes

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run test`: passed, 15 tests.
- `npm run build`: passed.
- `npm run test:e2e`: passed, 275 passed and 13 expected skips.
- `npm run check:links -- --base http://localhost:3017`: passed, 13 internal URLs.
- `npm run check:metadata -- --base http://localhost:3017`: passed, 13 routes.
- `npm run check:structured-data -- --base http://localhost:3017`: passed, 13 JSON-LD blocks.

## Remaining Constraints

- Mobile comparison remains the longest section because seven clinically useful criteria are still rendered as readable text.
- Surgeon introduction remains long on mobile because it preserves portrait, safety notes and clinical positioning.
- Robotic surgery is intentionally taller than before on desktop because the secondary YouTube video moved there from the hero.
- Verified testimonials, verified publication records and verified current-practice location details are still missing, so those sections remain production-safe rather than fabricated.

## Next Layout Task

Create a dedicated robotic/laparoscopic comparison page so the homepage can reduce the mobile comparison to a tighter summary without losing crawlable clinical detail.
