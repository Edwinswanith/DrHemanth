# 14 — Accessibility checklist

WCAG 2.2 AA minimum. Checked by `tests/accessibility/wcag.spec.ts`
(`@axe-core/playwright`) and manual keyboard/browser testing during Phase C.

Status as of Phase C completion (routes covered: `/`, `/appointments`,
`/privacy`, `/accessibility`, `/medical-disclaimer`):

- [x] Full keyboard operability, logical tab order, visible focus indicator
      throughout, no keyboard trap — verified via
      `tests/e2e/keyboard-navigation.spec.ts` (skip link, full appointment
      request completed keyboard-only, FAQ accordion, drawer focus trap).
- [x] Skip link present and functional on every page.
- [x] Semantic landmarks, correct heading hierarchy (one H1, no skipped
      levels) — enforced by `scripts/check-metadata.mjs`.
- [x] Every form field has a programmatic label; errors are announced via
      `role="alert"`, not colour-only; required fields marked accessibly.
- [x] Dialogs/drawers trap focus correctly while open, return focus on
      close, close on `Escape`, labelled via `aria-*`. **Fixed during this
      phase:** the closed drawer's form fields remained keyboard-reachable
      despite `aria-hidden` (axe: `aria-hidden-focus`) — switched to the
      `inert` attribute, which correctly removes the whole closed subtree
      from both focus and the accessibility tree.
- [x] Comparison table uses real `<table>` markup with proper `<th scope>`
      headers. **Fixed during this phase:** its horizontally-scrolling
      wrapper wasn't keyboard-operable on narrow viewports (axe:
      `scrollable-region-focusable`) — added `tabIndex={0}` and
      `role="region"` with a descriptive label.
- [x] Text and meaningful UI elements meet AA contrast. **Fixed during this
      phase:** the bronze CTA button measured 3.99:1 against white text
      (fails the 4.5:1 normal-text threshold) — moved to `bronze-700`
      (5.53:1) with `bronze-800` hover/active (7.61:1); `success-600` also
      darkened pre-emptively (4.41→5.81:1) after auditing every token pair.
- [x] Touch targets meet minimum size (44×44px — `min-h-11`/`min-w-11`
      enforced on all interactive controls).
- [x] `prefers-reduced-motion` respected (`typography.css` global rule +
      the design system's <250ms opacity/transform-only motion policy).
- [x] No information conveyed by colour alone (pending-verification badges
      carry text, not just colour; form errors carry text, not just a red
      border).
- [ ] Video/audio captions and transcripts — no video/audio content exists
      yet (Phase E, `/videos-media`); revisit when it's added.
- [x] Zero critical/serious axe violations across all 5 built routes,
      confirmed by `npx playwright test tests/accessibility/` (also run as
      part of the full suite — see `TASKS.md` Phase C).

## Re-running this checklist

```bash
npm run build && npm run start   # in one terminal
npx playwright test tests/accessibility/wcag.spec.ts   # in another
```
