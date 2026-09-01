# 09 — Component inventory

Tracks what exists vs. planned. Update as Phase C/D land real components —
this table should always match `src/components/` reality.

| Component | Path | Status |
|---|---|---|
| Site header | `components/layout/site-header.tsx` | planned (Phase C) |
| Mobile navigation | `components/layout/mobile-navigation.tsx` | planned |
| Site footer | `components/layout/site-footer.tsx` | planned |
| Page shell | `components/layout/page-shell.tsx` | planned |
| Button / link button | `components/ui/button.tsx`, `link-button.tsx` | planned |
| Container / Section / Heading | `components/ui/*.tsx` | planned |
| Card | `components/ui/card.tsx` | planned |
| Accordion (FAQ) | `components/ui/accordion.tsx` | planned |
| Dialog / Drawer | `components/ui/dialog.tsx`, `drawer.tsx` | planned |
| Tabs (comparison) | `components/ui/tabs.tsx` | planned |
| Form field primitives | `components/ui/form-field.tsx` | planned |
| Homepage hero | `components/sections/homepage-hero.tsx` | planned |
| Trust/evidence strip | `components/sections/trust-evidence-strip.tsx` | planned |
| Surgeon introduction | `components/sections/surgeon-introduction.tsx` | planned |
| Robotic surgery introduction | `components/sections/robotic-surgery-introduction.tsx` | planned |
| Surgery comparison | `components/sections/surgery-comparison.tsx` | planned |
| Treatment explorer | `components/sections/treatment-explorer.tsx` | planned |
| Patient journey | `components/sections/patient-journey.tsx` | planned |
| Location overview | `components/sections/location-overview.tsx` | planned |
| Patient stories | `components/sections/patient-stories.tsx` | planned (content blocked, see `04-content-verification.md`) |
| Research highlights | `components/sections/research-highlights.tsx` | planned |
| FAQ section | `components/sections/frequently-asked-questions.tsx` | planned |
| Final appointment CTA | `components/sections/final-appointment-cta.tsx` | planned |
| Appointment card (hero) | `components/appointment/appointment-card.tsx` | planned |
| Appointment form (full) | `components/appointment/appointment-form.tsx` | planned |
| Appointment mobile drawer | `components/appointment/appointment-mobile-drawer.tsx` | planned |
| Appointment success/error | `components/appointment/appointment-success.tsx`, `appointment-error.tsx` | planned |
| Treatment summary/options/risks/references/review-details/urgent-notice | `components/medical/*.tsx` | planned (Phase E) |
| Breadcrumbs / structured data / article metadata | `components/seo/*.tsx` | planned |
| Cookie banner / preferences | `components/consent/*.tsx` | planned, conditional (see `12-data-processing-register.csv`) |

Reuse rule: before adding a new component, check this table and
`src/components/` — extend an existing primitive rather than duplicating one
with slightly different props.
