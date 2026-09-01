# Design system rules

Full rationale: `docs/08-design-system.md`. This file is the enforceable
subset.

- All colour, spacing, radius, and shadow values come from tokens in
  `src/styles/tokens.css` — never hardcode a hex value or arbitrary Tailwind
  value in a component.
- Palette: deep ink/navy (authority) · warm ivory/stone (background) ·
  muted surgical teal + soft sage (supportive accents) · one restrained
  bronze/warm-neutral accent (CTAs/premium emphasis) · explicit
  success/warning/error colours. No bright medical-blue wash across every
  section, no neon, no more than one accent competing for attention, no
  decorative gradients without a functional purpose.
- Type: an editorial serif for display headings, a highly legible sans for
  body/UI text. Fluid responsive scale, 60–70ch measure for body copy, no
  ultra-thin weights, self-hosted/`next/font`-optimised loading.
- Motion: opacity/small-translate transitions only, under ~250ms, respects
  `prefers-reduced-motion`, never animates a large page area on initial
  load, no parallax/bounce/constant motion.
- Every shared component in `src/components/ui/` documents and implements:
  default, hover, focus, active, disabled, loading (where relevant), error
  (where relevant), mobile, keyboard, and reduced-motion states — not a
  desktop-only happy path.
- Sections must each have a distinct communication purpose and visual
  structure. Reject a homepage (or any page) that degrades into repeating
  3-card grids, generic SaaS-dashboard patterns, or decoration standing in
  for evidence. Adjacent related modules may share one visual composition
  (see `docs/decisions/` Phase C note) but each still needs its own reason
  to exist.
- No fake trust counters, partner logos, star ratings, or availability
  indicators anywhere in the UI, ever.
