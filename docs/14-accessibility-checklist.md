# 14 — Accessibility checklist

WCAG 2.2 AA minimum. Checked by the `accessibility-reviewer` agent and
`@axe-core` (or equivalent) run per the `verify-site` skill.

- [ ] Full keyboard operability, logical tab order, visible focus indicator
      throughout, no keyboard trap.
- [ ] Skip link present and functional on every page.
- [ ] Semantic landmarks, correct heading hierarchy (one H1, no skipped
      levels).
- [ ] Every form field has a programmatic label; errors are announced, not
      colour-only; required fields marked accessibly.
- [ ] Dialogs/drawers trap focus correctly while open, return focus on
      close, close on `Escape`, labelled via `aria-*`.
- [ ] Comparison tables use real `<table>` markup with proper headers.
- [ ] Text and meaningful UI elements meet AA contrast.
- [ ] Touch targets meet minimum size (44×44px).
- [ ] `prefers-reduced-motion` genuinely disables non-essential motion.
- [ ] No information conveyed by colour alone.
- [ ] Video/audio has captions and transcripts where substantive.
- [ ] Mobile navigation and appointment drawer are fully accessible,
      including with a screen reader.
- [ ] Zero critical/serious axe violations, or explicitly itemised
      failures with owner and plan.

Status: not yet run — no routes exist yet (Phase A). First real check runs
at the end of Phase C against the homepage and the appointment routes.
