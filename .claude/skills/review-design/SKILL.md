---
name: review-design
description: Critically review whether a page looks genuinely premium, custom, and trustworthy — or merely decorative/templated. Use after building or materially changing any user-facing page, before marking it done.
---

# Review design

## When to use

After any homepage/page build or significant visual change, before
declaring it complete. Pairs with the `ux-design-reviewer` and
`visual-quality-reviewer` agents for an independent pass.

## Required inputs

- The rendered page (dev server or preview), at all required viewports.
- `references/premium-design-rubric.md`.

## Steps

1. Render and screenshot the page at each required viewport.
2. Score against every question in `references/premium-design-rubric.md`.
3. Check the design-system rejection list in `.claude/rules/design-system.md`
   — flag any violation explicitly (repeating 3-card grids, fake trust
   counters, low contrast, excessive rounding/shadow/gradient, SaaS-
   dashboard aesthetic, decorative animation).
4. Revise anything scoring "no"/"fail" before reporting the page done.

## Required outputs

A pass/fail note per rubric question, with the page revised until no
important question fails — not a description of what an ideal page would
look like.

## Failure conditions

- Declaring a page "premium" without checking it against the rubric.
- Accepting decoration as a substitute for evidence-based trust signals.
