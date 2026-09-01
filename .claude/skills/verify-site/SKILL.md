---
name: verify-site
description: Run the full functional, accessibility, SEO, GEO, security, visual, responsive, and performance check suite and report real results. Use before any phase sign-off and always before deploy-uk.
---

# Verify site

## When to use

Before signing off any phase's acceptance criteria, and as the mandatory
pre-condition for `deploy-uk`.

## Required inputs

- A running build (dev or production) of the current state.
- `references/quality-gates.md`.

## Steps

1. Run, for real, in this order: install → typecheck → lint → unit tests →
   integration tests → production build → e2e tests (incl. accessibility
   and visual, at all required viewports) → `scripts/check-links.mjs` →
   `check-redirects.mjs` → `check-metadata.mjs` → `check-structured-data.mjs`.
2. Record actual output/results for each — pass, fail, or "not run and why."
3. Compare results against `references/quality-gates.md`.
4. Fix and re-run rather than suppress; if something can't be fixed in
   scope, report it as an explicit blocker, not a silent skip.

## Required outputs

A results table (command → result) suitable for pasting into `TASKS.md` or
the phase sign-off note. No item marked "pass" without having actually run.

## Failure conditions

- Reporting a check as passed without running it.
- Disabling a test, weakening a lint rule, or hiding a type error to force
  a green result without documenting why.
