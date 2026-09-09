# ADR-003 — Design system

- **Status:** accepted
- **Date:** 2026-09-01
- **Phase:** A (informs C)

## Context

The client was explicit that this must not be a generic healthcare
template, a futuristic robotics site, or an untrustworthy luxury site, and
that the old site is not the visual reference.

## Decision

A custom, editorial, premium-clinical design system built on tokens (see
`08-design-system.md`): deep ink/navy + warm ivory/stone + muted teal
+ one restrained accent; editorial serif display type + legible sans body;
disciplined asymmetric grid; homepage's 15 content modules may compose into
fewer visual sections where that improves communication, but each retains a
distinct purpose (see the client's explicit correction permitting this).

## Alternatives considered

- A component-library-first approach (e.g. shipping an existing medical UI
  kit) — rejected: the client's rejection list (generic template look, fake
  trust badges, SaaS-dashboard aesthetic) specifically targets what
  off-the-shelf kits tend to produce.

## Consequences

Requires hand-built components rather than a drop-in kit — more upfront
work in Phase C, but avoids the "looks like every other clinic site"
failure mode the client called out repeatedly. Every component's states
(default/hover/focus/active/disabled/loading/error/mobile/keyboard/
reduced-motion) are part of the definition of done, not an afterthought.
