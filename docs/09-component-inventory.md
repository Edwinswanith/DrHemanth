# 09 — Component inventory

Tracks what exists vs. planned. Kept in sync with `src/components/` as of
Phase C completion.

| Component | Path | Status |
|---|---|---|
| Site header | `components/layout/site-header.tsx` | **built** |
| Mobile navigation + persistent actions | `components/layout/mobile-navigation.tsx` | **built** |
| Site footer | `components/layout/site-footer.tsx` | **built** |
| Page shell | `components/layout/page-shell.tsx` | **built** |
| Button / link button | `components/ui/button.tsx` | **built** (single file, both exports) |
| Container / Section | `components/ui/container.tsx`, `section.tsx` | **built** |
| Card | `components/ui/card.tsx` | **built** |
| Badge / PendingBadge | `components/ui/badge.tsx` | **built** |
| Accordion (FAQ) | `components/ui/accordion.tsx` | **built** |
| Drawer | `components/ui/drawer.tsx` | **built** (hand-rolled focus trap + `inert`, no dependency added) |
| Dialog | `components/ui/dialog.tsx` | not built — no use case yet distinct from Drawer |
| Tabs (comparison) | `components/ui/tabs.tsx` | not built — comparison shipped as an accessible `<table>` instead (see `05-seo-geo-strategy.md`); revisit only if a tabbed presentation is specifically requested |
| Form field primitives | `components/ui/form-field.tsx` | **built** |
| Visually hidden | `components/ui/visually-hidden.tsx` | **built** |
| Reveal on scroll | `components/ui/reveal-on-scroll.tsx` | **built** — wired into `Section` by default; see `08-design-system.md`'s "Motion polish" note |
| Homepage hero | `components/sections/homepage-hero.tsx` | **built** |
| Trust/evidence strip | `components/sections/trust-evidence-strip.tsx` | **built** |
| Surgeon introduction | `components/sections/surgeon-introduction.tsx` | **built** |
| Robotic surgery introduction | `components/sections/robotic-surgery-introduction.tsx` | **built** |
| Surgery comparison | `components/sections/surgery-comparison.tsx` | **built** |
| Treatment explorer | `components/sections/treatment-explorer.tsx` | **built** (informational cards, deliberately not linked — see the component's own comment) |
| Patient journey (+ "why this practice", composed) | `components/sections/patient-journey.tsx` | **built** |
| Location overview | `components/sections/location-overview.tsx` | **built**, all 3 locations shown pending-verification |
| Patient stories | `components/sections/patient-stories.tsx` | **built**, honest empty/pending state — no fabricated quotes |
| Research highlights | `components/sections/research-highlights.tsx` | **built**, honest pending state |
| FAQ section | `components/sections/frequently-asked-questions.tsx` | **built**, process-only FAQs (no clinical-fact dependency) |
| Final appointment CTA | `components/sections/final-appointment-cta.tsx` | **built** |
| Appointment card (hero) | `components/appointment/appointment-card.tsx` | **built** |
| Appointment form (shared) | `components/appointment/appointment-form.tsx` | **built** — used by hero card, mobile drawer, and `/appointments` |
| Appointment mobile drawer | `components/appointment/appointment-mobile-drawer.tsx` | **built** |
| Appointment success/error | `components/appointment/appointment-success.tsx`, `appointment-error.tsx` | **built** |
| Treatment summary/options/risks/references/review-details/urgent-notice | `components/medical/*.tsx` | **built** — first used by `/treatments/hernia-surgery`; content is `requires-clinical-review`, not yet approved, so the route is `noindex` |
| Breadcrumbs | `components/seo/breadcrumbs.tsx` | **built** (includes its own `BreadcrumbList` JSON-LD) |
| Structured data renderer | `components/seo/structured-data.tsx` | **built** |
| Article metadata | `components/seo/article-metadata.tsx` | planned (Phase E — needs a real article/treatment page to attach to) |
| Cookie banner / preferences | `components/consent/*.tsx` | **not built — correctly deferred**: no non-essential cookie/tracker is configured (`12-data-processing-register.csv`), so per `.claude/rules/privacy-compliance.md` none should render |

Reuse rule: before adding a new component, check this table and
`src/components/` — extend an existing primitive rather than duplicating one
with slightly different props.
