# 08 — Design system

Full enforceable rules: `.claude/rules/design-system.md`. This doc is the
rationale and reference.

## Direction

Custom, editorial, premium-clinical — the authority of a respected medical
institution, the editorial quality of a premium professional publication,
the warmth of a private consultation, the clarity of a well-designed
clinical information system. Not a generic healthcare template, not
futuristic robotics, not luxury-brand styling that reads as untrustworthy
for a medical context. The old site is never the visual reference.

## Tokens (defined in `src/styles/tokens.css`, never hardcoded in components)

- **Colour:** deep ink/navy (authority) · warm ivory/stone (page background)
  · muted surgical teal + soft sage (supportive accents) · one restrained
  bronze/warm-neutral accent (CTA/premium emphasis) · explicit success/
  warning/error. No bright medical-blue wash, no neon, no more than one
  accent competing for attention, no decorative gradients without function.
- **Type:** editorial serif for display headings, highly legible sans for
  body/UI. Fluid responsive scale, 60–70ch measure, no ultra-thin weights,
  self-hosted/`next/font`-optimised.
- **Spacing/layout:** a consistent spacing scale, disciplined grid,
  editorial asymmetric composition, varied section structures — reject
  anything that collapses into repeating 3-card rows or a SaaS-dashboard
  layout.
- **Motion:** opacity/small-translate only, <~250ms, `prefers-reduced-
  motion` respected, no parallax/bounce/constant motion, nothing large
  animates on initial load.

## Component state contract

Every component in `src/components/ui/` implements, as applicable: default,
hover, focus, active, disabled, loading, error, mobile, keyboard,
reduced-motion. A component missing a required state for its purpose is not
done.

## Homepage section composition

The 15 semantic content modules (`02-information-architecture.md`) are the
required *content* coverage. Adjacent, related modules may share one visual
section shell where that reads better than 15 forced standalone blocks
(e.g. surgeon introduction + trust strip; patient journey + locations) —
but each composed section still needs its own distinct communication
purpose. This is a deliberate relaxation agreed during planning, not
licence to compress everything into fewer, denser sections.

## Rejection list (see `.claude/agents/visual-quality-reviewer.md`)

Generic template appearance, excessive gradients/shadows, glassmorphism
without function, unnecessary animation, poor typography, weak mobile
hierarchy, repetitive identical card grids, fake trust indicators,
decorative generic-medical stock imagery, low contrast, inconsistent
spacing, excessively rounded components, oversized empty hero sections,
SaaS-dashboard visual language, visual complexity that hides important
information.

## Imagery

Prioritise approved portraits of Prof. Sheth, approved hospital imagery,
authentic clinical environments, approved robotic-surgery technology
imagery, original diagrams, carefully designed non-deceptive illustrations.
Never: fake photographs of the surgeon, generic stock doctors, graphic
surgical images without context, AI-generated anatomy, robot-hands-touching
-human-hands stock imagery, futuristic holograms, decorative OR imagery
that adds no information. Until real approved imagery is supplied, hero/
profile imagery uses a clearly documented, non-deceptive placeholder
treatment (never a fabricated "photo" of the surgeon) — tracked in
`04-content-verification.md`.
