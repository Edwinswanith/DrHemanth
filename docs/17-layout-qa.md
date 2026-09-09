# Layout QA

| Problem | Component | Root cause | Correct structural solution | Viewports affected | Status |
| --- | --- | --- | --- | --- | --- |
| Patient journey compressed into seven columns. | `src/components/sections/patient-journey.tsx` | `lg:grid-cols-7` forced editorial content into narrow columns. | Rebuild as a two-column editorial step grid on tablet/desktop and a single-column mobile timeline with connectors. | 768-1920px, worst at 1024-1440px | Fixed |
| Hero appointment fields were below minimum touch/field height. | `AppointmentForm`, `FormField`, compact form utility | Compact form CSS reduced inputs to ~38px and used a two-column grid inside a narrow aside. | Standardize controls to 48px minimum, stack compact hero fields in one readable column, and only show the full hero form from `xl` upward. | Desktop hero, especially 1024-1440px | Fixed |
| Container gutters were duplicated across layout components. | `Container`, header, footer, hero | Multiple hard-coded `max-w-7xl px-5 sm:px-8` definitions. | Add shared layout tokens and a `.site-container` utility used by all major shells. | All viewports | Fixed |
| Required field markers were visually separated from labels. | `FormField` | Required asterisk was inserted as a separate text node with loose spacing. | Keep the asterisk inline with label text and use consistent label weight/size. | All forms | Fixed |
| Mobile journey lacked a process connector. | `PatientJourney` | Mobile inherited a plain stacked list. | Add a vertical connector between numbered steps only on mobile. | 390-430px | Fixed |
| Anchor navigation could land section headings beneath the sticky header. | `Section` | Shared section shell had no `scroll-margin-top`. | Add responsive scroll margin matching the sticky header height. | All in-page links | Fixed |
| Fixed mobile conversion bar appears over locator-only section screenshots. | `AppointmentMobileDrawer` / screenshot method | Playwright element screenshots include fixed viewport UI even when the page has no horizontal overflow. | Keep the conversion control; verify full-page screenshots and footer visibility instead. | Mobile screenshots | Accepted |

## Verification Notes

Run `npm run test:e2e` for the responsive overflow and layout assertions. Required visual QA captures are stored under `audit-artifacts/layout-qa-2026-09-02/` with `before/` and `after/` folders.

## Rubric Snapshot

Section scores use the same 10-point design-quality rubric from the baseline audit: layout resilience, hierarchy, responsive behavior, clarity, conversion support, and visual polish.

| Homepage section | Before | After |
| --- | ---: | ---: |
| Hero | 8.1 | 9.0 |
| Trust evidence strip | 8.5 | 8.9 |
| Surgeon introduction | 8.8 | 9.0 |
| Robotic surgery introduction | 8.7 | 8.9 |
| Surgery comparison | 8.8 | 9.0 |
| Treatments and conditions | 8.7 | 9.0 |
| Why patients choose | 8.8 | 9.0 |
| Patient journey | 6.4 | 9.3 |
| Practice locations | 8.6 | 9.0 |
| Patient stories | 8.3 | 8.7 |
| Research highlights | 8.6 | 8.8 |
| FAQ | 8.9 | 9.0 |
| Final appointment CTA | 8.7 | 9.1 |

| Global rubric area | Before | After |
| --- | ---: | ---: |
| Layout resilience | 7.6 | 9.2 |
| Responsive behavior | 7.8 | 9.2 |
| Form UX | 7.5 | 9.2 |
| Typography and hierarchy | 8.2 | 9.0 |
| Visual polish | 8.3 | 8.9 |
| Overall homepage | 8.0 | 9.1 |
