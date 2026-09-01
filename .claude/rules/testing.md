# Testing rules

- Every feature ships with real, executed tests — not a description of
  tests that should exist. Run them in this session; don't claim a result
  you haven't produced.
- Unit/integration: Vitest, for validation logic, utilities, and the
  appointment service/repository layer (success, duplicate, rate-limited,
  provider-failure paths).
- E2E/accessibility/visual: Playwright, at minimum 390×844, 768×1024,
  1440×900, and 1920×1080 (the full required set for homepage review is
  390×844, 430×932, 768×1024, 1024×768, 1440×900, 1920×1080). Cover
  keyboard-only navigation and the full appointment request flow.
- Accessibility: `@axe-core/playwright` (or equivalent) run against every
  shipped route; zero critical/serious violations to pass; any remaining
  failure is reported explicitly, never hidden.
- SEO/migration: `scripts/check-links.mjs`, `check-redirects.mjs` (asserts
  every `seo-migration-map.csv` entry resolves correctly with no chains/
  loops), `check-metadata.mjs`, `check-structured-data.mjs`.
- Never disable a failing test, weaken a lint rule, or hide a type error to
  make a build pass without documenting why in the relevant ADR or
  `TASKS.md`. Never report a check as passed when it was skipped.
- `TASKS.md` only marks an item done once its corresponding command has
  actually been run in this session.
