# Homepage Content Density Audit

Baseline and final measurements were captured from the local public preview on 2026-09-02. Baseline screenshots are in `audit-artifacts/homepage-content-density-baseline-2026-09-02/`; production-build final screenshots and JSON evidence are in `audit-artifacts/homepage-content-density-final-2026-09-02-prod/`.

## Outcome

- Visible homepage copy at 1440 x 900: 1,434 words before, 916 after.
- Copy reduction: 36.1%.
- Page height at 1440 x 900: 7,360px before, 6,049px after.
- Height reduction: 17.8%.
- Responsive sweep widths: 320, 360, 390, 430, 480, 600, 640, 720, 768, 820, 900, 1024, 1100, 1200, 1280, 1366, 1440, 1600, 1920.
- Responsive result: max horizontal overflow 0px; console errors 0; public pending-verification labels 0.

## Repeated Concepts Found

Appointment submission was repeatedly explained as not a confirmed booking. Verification governance appeared in the hero, trust ledger, profile, locations, stories, research and footer. Surgery-not-default wording appeared in the hero, comparison, why-choose and journey. Robotic surgeon-control and limitations appeared in both the robotic chapter and comparison.

## Content Changes

Removed visible duplication: repeated governance labels, repeated emergency copy in the final CTA, the duplicated surgeon portrait in the profile section, long appointment-card explainer text, and local staging explanations in the locations section.

Rewritten: hero positioning, trust indicators, surgeon introduction, robotic chapter, comparison intro/conclusion, treatment summaries, why-choose reasons, patient journey steps, FAQ answers, final CTA, footer and shared appointment/emergency notices.

Moved or routed: the full seven-row robotic/laparoscopic comparison now lives at `/robotic-vs-laparoscopic`. Procedure-specific symptoms, risks, treatment options and recovery remain on `/treatments/*`. Future biography, location and research pages are still needed before deeper professional, location or publication detail can move out of staging.

Left unchanged for safety: appointment API payload, appointment validation, privacy acknowledgement, emergency warning, noindex rules for clinical-review pages, conservative public title fallback, verified-only content gate, treatment routes and the click-to-load video behaviour.

## Page Height By Viewport

| Viewport | Before height | After height | Reduction |
|---|---:|---:|---:|
| 390 x 844 | 12,648px | 9,717px | 23.2% |
| 430 x 932 | 12,246px | 9,539px | 22.1% |
| 768 x 1024 | 10,037px | 7,839px | 21.9% |
| 1024 x 768 | 7,560px | 6,099px | 19.3% |
| 1280 x 800 | 6,979px | 5,697px | 18.4% |
| 1366 x 768 | 7,208px | 5,905px | 18.1% |
| 1440 x 900 | 7,360px | 6,049px | 17.8% |
| 1600 x 900 | 7,614px | 6,314px | 17.1% |
| 1920 x 1080 | 7,614px | 6,314px | 17.1% |

## Word Count By Section

| Section | Before words | After words | Reduction |
|---|---:|---:|---:|
| Hero | 114 | 85 | 25.4% |
| Trust evidence | 54 | 37 | 31.5% |
| Surgeon introduction | 127 | 76 | 40.2% |
| Robotic surgery | 147 | 91 | 38.1% |
| Comparison | 241 | 139 | 42.3% |
| Treatments | 126 | 91 | 27.8% |
| Why choose | 95 | 58 | 38.9% |
| Patient journey | 138 | 92 | 33.3% |
| Locations | 34 | 14 | 58.8% |
| Patient stories | 0 | 0 | N/A |
| Research | 0 | 0 | N/A |
| FAQ | 171 | 120 | 29.8% |
| Final CTA | 61 | 28 | 54.1% |
| Footer | 109 | 68 | 37.6% |

## Height By Section At 1440

| Section | Before height | After height | Reduction |
|---|---:|---:|---:|
| Hero | 829px | 798px | 3.7% |
| Trust evidence | 274px | 251px | 8.4% |
| Surgeon introduction | 861px | 513px | 40.4% |
| Robotic surgery | 798px | 712px | 10.8% |
| Comparison | 879px | 629px | 28.4% |
| Treatments | 910px | 764px | 16.0% |
| Why choose | 506px | 376px | 25.7% |
| Patient journey | 698px | 566px | 18.9% |
| Locations | 272px | 215px | 21.0% |
| Patient stories | 0px | 0px | N/A |
| Research | 0px | 0px | N/A |
| FAQ | 407px | 407px | 0.0% |
| Final CTA | 420px | 326px | 22.4% |
| Footer | 427px | 411px | 3.7% |

## Internal Links Added Or Updated

- Added `/robotic-vs-laparoscopic` for the complete comparison.
- Updated robotic chapter CTA to `Compare approaches`.
- Updated homepage comparison CTA to `View full comparison`.
- Updated hero secondary CTA to `View Treatments`.

## Mobile Content Changes

Mobile now sees shorter hero copy, a compact treatment index, a five-row comparison rather than the full seven-row table, concise journey steps, shorter final CTA text and a reduced footer. Important content remains crawlable and accessible rather than hidden behind client-only patterns.

## Appointment Form Copy

The public request message now uses one clear sentence: "Submitting this form requests an appointment. The practice will contact you to confirm the date and time." The emergency notice was shortened and kept visually distinct where it is required.

## Verification

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run test`: 15 passed.
- `npm run build`: passed; 21 app routes generated.
- `npm run test:e2e`: 283 passed, 13 intentional viewport skips.
- `npm run check:links`: checked 14 internal URLs; no broken links or dead `#` hrefs.
- `npm run check:metadata`: 14 routes have unique title, description, canonical and one H1.
- `npm run check:structured-data`: 14 JSON-LD blocks valid.
- Accessibility: Playwright/axe reported zero serious or critical violations across configured routes, including `/robotic-vs-laparoscopic`.
- Reduced motion: hero animation resolved to `none`.
- Click-to-load video: iframe count was 0 before activation; loaded after click; no `autoplay=1`.

## Remaining Content Work

Still text-heavy: FAQ height did not reduce because disclosure controls retain stable row spacing; treatment explorer remains visually substantial because it preserves seven routes and a treatment detail pane.

Content requiring clinical review or client approval: canonical professional title, qualifications, GMC details, current NHS role, private locations, testimonials, publications, memberships, robotic-surgery scope, treatment pages and the new comparison page. Exact next content task: create the full `/about` biography page and move approved career, credential and membership detail out of the homepage.
