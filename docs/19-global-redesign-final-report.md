# Global Redesign Final Report

Date: 2026-09-02

## Evidence

- Baseline screenshots: `audit-artifacts/global-redesign-baseline-2026-09-02/`
- Final screenshots: `audit-artifacts/global-redesign-final-2026-09-02/`
- Final responsive report: `audit-artifacts/global-redesign-final-2026-09-02/final-responsive-report.json`
- Extra final evidence: `1440x900-hero-first-viewport-final.png`, `390x844-appointment-drawer-final.png`

## Global References

Successfully inspected: Sollis Health, NYU Langone, UCLA Health, Swiss Medical Network, Clinique de Genolier, Clinique La Prairie, Neko Health, ARK Surgical Practice, Bumrungrad, Cleveland Clinic Abu Dhabi, Mediclinic UAE, Dr Luke Mooney, Matt Barnes, Humanitas, Mediclinic Southern Africa, CMR Surgical, Intuitive.

Blocked or partial: One Medical and Mount Elizabeth returned 403 in Playwright; Peter Mac robotic inner page was blocked; Einstein returned access denied.

Primary references: Dr Luke Mooney, Swiss Medical Network/Genolier, Neko Health, Mediclinic UAE robotic article, ARK Surgical Practice.

Secondary references: UCLA Health robotic surgery, NYU Langone Robotic Surgery Center, One Medical, Cleveland Clinic Abu Dhabi, Humanitas.

Anti-references: Clinique La Prairie, Sollis Health, CMR Surgical, Intuitive da Vinci 5, Bumrungrad.

## Design Applied

Preserved: appointment API contract, validation, treatment routes, noindex safeguards, SEO checks, accessible navigation/drawer behaviour, click-to-load video, Source Serif 4, Manrope, navy/ivory/teal/bronze direction, and medical-content safeguards.

Changed components: `homepage-hero`, `hero-video`, `patient-journey`, `form-field`, `appointment-form`, `appointment-card`, `location-overview`, `patient-stories`, `research-highlights`, `robotic-surgery-introduction`, `trust-evidence-strip`, `why-patients-choose`, `site-header`, `site-footer`, and content publication helpers.

Changed sections: hero, evidence ledger, surgeon introduction, robotic chapter, why-patients-choose, patient journey, locations, patient stories, research, FAQ/CTA supporting polish.

## Key Decisions

- Hero: Prof. Sheth, positioning, portrait, appointment form, CTA and trust evidence now dominate the first desktop viewport. The video is secondary below the primary composition.
- Video: retained click-to-load, non-autoplay, keyboard-accessible YouTube embed; removed `autoplay=1`; moved YouTube red to `--color-brand-youtube`.
- Patient journey: rebuilt from squeezed columns to a 4 + 3 large-desktop editorial grid, 3 columns on medium desktop, 2 on tablet and connected vertical timeline on mobile.
- Forms: normalized label/control/help/error spacing, 48px controls, consistent select/input styling, disabled/focus/error states, and two-column grids using `repeat(2, minmax(0, 1fr))`.
- Colour: set `--color-text-muted: #5C6D72`, added YouTube token, removed unused sage tokens, kept bronze as restrained editorial accent.
- Content safety: migrated public content status to `verified | pending | blocked | retired`; public rendering defaults to verified only unless `NEXT_PUBLIC_SHOW_PENDING_CONTENT=true`.
- Patient stories: hidden publicly until verified quotations and consent exist.
- Research index: unverified records hidden publicly; academic index structure is ready for verified records.
- Locations: unverified current-practice locations hidden publicly; fallback directs patients to appointment request without exposing hospital/contact details.
- Robotic chapter: strengthened deep-ink educational section with surgeon control, benefits, limits, suitability and alternatives; removed production placeholder rectangle.

## Responsive QA

Widths tested: 320, 360, 390, 430, 480, 600, 640, 720, 768, 820, 900, 1024, 1100, 1200, 1280, 1366, 1440, 1600, 1920.

Results: max horizontal overflow `0`; console errors `0`; page errors `0`; visible public pending-verification text `0`; public unverified location names `0`; mobile menu, appointment drawer, FAQ and click-to-load video interactions passed. Reduced motion reports hero animation name `none`.

## Test Outcomes

- `npm run typecheck`: passed
- `npm run lint`: passed
- `npm run test`: passed, 15 tests
- `npm run build`: passed
- `npm run test:e2e`: passed, 275 passed / 13 expected skips
- `npm run check:links`: passed, 13 internal URLs checked
- `npm run check:metadata`: passed, 13 routes checked
- `npm run check:structured-data`: passed, 13 JSON-LD blocks checked
- `npm run check:redirects`: expected Phase E blocker; redirects not implemented, 22 URLs still investigate

## Frozen Scores

| Homepage section | Before | After |
| --- | ---: | ---: |
| Hero | 8.1 | 9.2 |
| Trust evidence strip | 8.5 | 8.9 |
| Surgeon introduction | 8.8 | 9.0 |
| Robotic surgery introduction | 8.7 | 9.1 |
| Surgery comparison | 8.8 | 9.0 |
| Treatments and conditions | 8.7 | 9.0 |
| Why patients choose | 8.8 | 8.9 |
| Patient journey | 6.4 | 9.3 |
| Practice locations | 8.6 | 8.6 |
| Patient stories | 8.3 | 8.5 |
| Research highlights | 8.6 | 8.4 |
| FAQ | 8.9 | 9.0 |
| Final appointment CTA | 8.7 | 9.1 |

| Global area | Before | After |
| --- | ---: | ---: |
| Layout resilience | 7.6 | 9.2 |
| Responsive behavior | 7.8 | 9.2 |
| Form UX | 7.5 | 9.1 |
| Typography and hierarchy | 8.2 | 9.1 |
| Visual polish | 8.3 | 8.9 |
| Overall homepage | 8.0 | 9.0 |

## Still Below 9

- Trust evidence strip: needs verified GMC/NHS/private-practice facts.
- Why patients choose: needs source-backed evidence rows rather than governance principles.
- Practice locations: safe fallback only until current clinics, contact details and access notes are verified.
- Patient stories: content-blocked until approved quotations and consent records exist.
- Research highlights: content-blocked until publications and source links are verified.
- Visual polish: held below 9 by missing verified content and rights-cleared imagery.

## Missing Assets And Content

Missing approved imagery: secondary environmental portrait, robotic theatre, surgeon console, robotic instruments, laparoscopic theatre, verified hospital/location images, research/teaching imagery, consultation environment and clinically reviewed diagrams.

Missing verified content: canonical professional title, GMC details, qualifications, current NHS role, private location status, clinic times, phone numbers, parking/transport details, approved testimonials, publications/source links, outcomes, awards and memberships.

Remaining genuine blockers: verified practice details, approved patient/story content, publication inventory, rights-cleared imagery, and redirect decisions for 22 investigate URLs.

Exact next design task: verify and publish the locations and professional-standing evidence first, then replace the fallback trust/location modules with positive source-backed proof without changing the working layout system.
