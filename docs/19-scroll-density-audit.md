# Scroll Density Audit

Baseline evidence is preserved in `audit-artifacts/scroll-density-baseline-2026-09-02/`. Screenshots were captured at 390 x 844, 430 x 932, 768 x 1024, 1024 x 768, 1280 x 800, 1366 x 768, 1440 x 900, 1600 x 900 and 1920 x 1080 before application-code changes.

| Section | Current height | Useful content height | Suspected wasted height | Root cause | Proposed correction | Before screenshot | Status |
|---|---:|---:|---:|---|---|---|---|
| Hero | 1551 px at 1440 x 900; 1805 px at 390 x 844 | Not isolated in baseline audit | High | Supporting video sits inside the hero after the primary grid, and intermediate desktop keeps too much stacked hero content. | Move video to the robotic chapter, tighten hero padding, compact trust copy, and use a two-column portrait/text composition sooner. | `audit-artifacts/scroll-density-baseline-2026-09-02/home-1440x900.png` | Fixed |
| Robotic surgery | 666 px at 1440 x 900; 1367 px at 390 x 844 | 490 px desktop; 833 px mobile | 176-534 px | Section padding and separate explanatory blocks create vertical depth, especially on mobile. | Use the chapter as the controlled contrast area for the secondary video and compact the evidence/limits ledger. | `audit-artifacts/scroll-density-baseline-2026-09-02/home-390x844.png` | Improved; now intentionally carries the secondary video |
| Comparison | 1127 px at 1440 x 900 | 960 px | 167 px | Homepage repeats ten detailed comparison criteria. | Keep seven high-value criteria and move availability, incision pattern and cost to the patient-specific note. | `audit-artifacts/scroll-density-baseline-2026-09-02/home-1440x900.png` | Fixed |
| Treatments | 970 px at 1440 x 900 | 794 px | 176 px | Treatment index rows, active detail media, and section padding combine into a long module. | Keep the desktop active-detail model, tighten rows and remove mobile active-panel imagery from the homepage. | `audit-artifacts/scroll-density-baseline-2026-09-02/home-430x932.png` | Improved |
| Footer | 475 px desktop; 1300 px at 390 x 844 | Not isolated in baseline audit | High on mobile | Main bottom padding plus footer bottom padding reserve repeated fixed-bar space; mobile footer groups have large gaps. | Remove main phantom padding, keep safe bottom padding only in footer, and compact link groups. | `audit-artifacts/scroll-density-baseline-2026-09-02/home-390x844.png` | Fixed |

## Baseline Heights

| Viewport | Scroll height | Ratio | Hero | Footer | Overflow |
|---|---:|---:|---:|---:|---|
| 390 x 844 | 15533 | 18.40 | 1805 | 1300 | No |
| 430 x 932 | 15036 | 16.13 | 1800 | 1261 | No |
| 768 x 1024 | 12498 | 12.21 | 1662 | 1193 | No |
| 1024 x 768 | 9375 | 12.21 | 1753 | 475 | No |
| 1280 x 800 | 8543 | 10.68 | 1513 | 475 | No |
| 1366 x 768 | 8709 | 11.34 | 1520 | 475 | No |
| 1440 x 900 | 8848 | 9.83 | 1551 | 475 | No |
| 1600 x 900 | 9087 | 10.10 | 1551 | 475 | No |
| 1920 x 1080 | 9260 | 8.57 | 1551 | 475 | No |

## Codebase Audit Notes

- `min-h-screen`, `h-screen`, `100vh` and `100svh` were not found in normal homepage sections.
- `100dvh` exists only in the mobile navigation overlay, where full-height sizing is intentional.
- High section height comes primarily from shared section padding, hero media placement, long comparison criteria, mobile media inside treatment disclosure, duplicated FAQ notices and mobile/footer padding.
- `visibility: hidden` is not used for production content. The honeypot uses the approved `.visually-hidden` utility and should remain.
- Existing horizontal overflow baseline is zero across required screenshot viewports.

## Final Measurement

Final evidence is preserved in `audit-artifacts/scroll-density-final-2026-09-02-v6/`.

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

No final measured viewport reported horizontal overflow, console warnings/errors, failed image loads or detectable layout-shift entries.
