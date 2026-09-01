# ADR-001 — Technology stack

- **Status:** accepted
- **Date:** 2026-09-01
- **Phase:** A

## Context

The project directory was empty and not a git repository — no existing
stack to preserve. A production-ready, maintainable stack was needed that
supports RSC/static generation for SEO, minimal client JS for performance,
and a straightforward path to UK-region hosting.

## Decision

Next.js (App Router) + TypeScript, Tailwind CSS, Zod for server-side
validation, Vitest for unit/integration tests, Playwright for e2e/
accessibility/visual tests. RSC by default; Client Components only where
real interactivity is required.

## Alternatives considered

- Remix / SvelteKit — viable but less ecosystem alignment with the client's
  explicitly stated fallback stack ("Next.js App Router... TypeScript...").
- A hosted CMS-driven stack (e.g. WordPress-again, just modernised) —
  rejected: perpetuates the old platform's opacity (no accessible source,
  vendor lock-in) that this rebuild is explicitly meant to escape.

## Consequences

Enables static generation for most content routes (good for SEO/Core Web
Vitals) and RSC for keeping JS minimal. Route handlers under `src/app/api/`
provide the appointment API without a separate backend service. See
ADR-002 for the content-layer decision that pairs with this.
