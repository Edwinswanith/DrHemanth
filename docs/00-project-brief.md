# 00 — Project brief

## What this is

A rebuild of https://www.keyholesurgeon.co.uk/ for Prof. Hemant Sheth, a UK
consultant surgeon, into a modern, credible, high-converting, UK-hosted
website. The old site is the **content/URL/SEO migration source**, never the
visual or architectural reference.

## Business goals

1. Position Prof. Hemant Sheth clearly and prominently.
2. Make robotic surgery a major, credible focus (not science-fiction, not
   an unverified title change).
3. Explain robotic vs laparoscopic surgery accurately and fairly.
4. Increase qualified appointment enquiries.
5. Improve organic and generative-answer-engine visibility.
6. Build trust with patients, families, and referring GPs.
7. Preserve existing search equity through a controlled migration.
8. Host all production infrastructure and appointment data in the UK.

## First-principles design rule

A patient isn't choosing a website — they're deciding whether they can trust
a surgeon with their health. Every page must help answer: who is this
surgeon; is he qualified; does he treat my condition; robotic or
laparoscopic; what's the difference; where does he practise; what should I
expect; how do I request an appointment; is this balanced and current?

## Audiences

Patients researching a condition/procedure; patients comparing robotic vs
laparoscopic surgery; patients ready to request a consultation; family
members researching on someone else's behalf; GPs/referrers; local patients
in Hertfordshire/Harrow/Elstree/NW London (subject to location verification).

## Non-negotiables

- No fabricated qualifications, statistics, hospital relationships, case
  numbers, awards, or testimonials.
- No claim published without a source tier from the evidence hierarchy in
  `04-content-verification.md`.
- Robotic surgery is surgeon-controlled, never framed as autonomous or
  automatically superior.
- WCAG 2.2 AA. UK data residency for appointment infrastructure (with the
  honest caveat in `decisions/ADR-005-uk-hosting.md`). No dead/placeholder UI.

## How delivery is organised

Phase-gated: A (foundation + audit) → B (architecture/appointment-ops/data-
protection decisions) → C (design system + homepage) → D (production
appointment integration) → E (SEO migration + approved routes) → F
(production readiness + deployment). See `TASKS.md` for live status and
`decisions/` for the ADRs recording what was decided in each phase.

## Full source brief

The complete, unabridged brief (colour direction, homepage section order,
component requirements, testing matrix, etc.) was supplied by the client
across several messages during planning and is reflected across this
`docs/` tree and `.claude/rules/`. This file is the condensed orientation
version — where in doubt, the more detailed domain doc (design system, SEO
strategy, appointment flow, etc.) governs implementation detail.
