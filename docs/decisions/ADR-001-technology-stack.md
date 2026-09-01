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

## Amendment (2026-09-01, same day)

Pinned `typescript` to `5.9.3`, not the npm `latest` tag `7.0.2` (a native-
compiler rewrite released very recently). Verified via `npm install` that
`@typescript-eslint` (pulled in by `eslint-config-next`) declares a peer
range of `typescript >=4.8.4 <6.1.0` — TypeScript 7 is outside the
ecosystem's current support window and installing it produced peer-
dependency conflicts. "Current stable version supported by the package
ecosystem" is interpreted as the newest version the actual dependency graph
supports without conflict, not the newest `latest`-tagged release in
isolation. Same reasoning applied to `eslint`: pinned to `9.39.5` rather
than `latest` (`10.9.1`), since `eslint-config-next`'s own plugin
dependencies (`eslint-plugin-jsx-a11y`, `eslint-plugin-react`) declare a
peer range capped at ESLint 9.

## Consequences

Enables static generation for most content routes (good for SEO/Core Web
Vitals) and RSC for keeping JS minimal. Route handlers under `src/app/api/`
provide the appointment API without a separate backend service. See
ADR-002 for the content-layer decision that pairs with this.
