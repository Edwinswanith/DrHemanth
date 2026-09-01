---
name: build-page
description: Build one complete route with real responsive behaviour, metadata, structured data, accessible interactions, tests, and a documented content-verification status. Use for every new page in src/app/.
---

# Build page

## When to use

Whenever a route is added to `src/app/` — homepage sections count as part of
`/`, not separate invocations.

## Required inputs

- Approved content (or explicitly `pending-verification` content, clearly
  flagged, per `.claude/rules/medical-content.md`).
- The page's place in `docs/02-information-architecture.md` and its slug's
  relationship to any old-site URL in `docs/06-seo-migration-map.csv`.
- `references/page-definition-of-done.md`.

## Steps

1. Confirm the route is actually in scope for the current phase (see
   `PROJECT_STRUCTURE.md` → "Why routes are scoped by phase"). If not,
   stop — document it in the IA instead of building a placeholder.
2. Build the route: semantic HTML, one H1, real content (or a clearly
   labelled `requires-clinical-review` state, never search-indexable if
   thin), responsive layout, keyboard/reduced-motion behaviour.
3. Add metadata (title/description/canonical/OG), structured data only for
   verified visible facts, breadcrumbs where applicable.
4. Add/extend tests: unit for any new logic, e2e for the page's key
   interaction, accessibility check.
5. Verify against `references/page-definition-of-done.md` before calling it
   finished.

## Required outputs

- A route that passes its own e2e + accessibility test.
- Metadata and structured data that validate.
- Content status explicitly recorded (verified vs. pending) in the
  component/content file, not just in your head.

## Failure conditions

- Any dead link, `#` href, or non-functional control on the shipped page.
- A route built out of phase-gate order.
- Structured data encoding an unverified fact.
