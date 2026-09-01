# Prof. Hemant Sheth — website rebuild

A rebuild of https://www.keyholesurgeon.co.uk/ as a modern, credible, UK-hosted
consultant surgeon website. The old site is the **content/URL/SEO migration
source only** — not the design or architecture reference.

Start here:

- [`CLAUDE.md`](./CLAUDE.md) — permanent operating rules for working on this repo.
- [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md) — what lives where, and why.
- [`TASKS.md`](./TASKS.md) — current status, phase gates, next task.
- [`docs/00-project-brief.md`](./docs/00-project-brief.md) — full brief and business goals.
- [`docs/15-launch-checklist.md`](./docs/15-launch-checklist.md) — what must be true before this ever goes live.

## Delivery is phase-gated

Work proceeds through Phases A–F (repository/audit → architecture &
data-protection decisions → design system & homepage → production
appointment integration → SEO migration & approved routes →
production-readiness & deployment). A phase does not start until the
previous phase's acceptance criteria are met and documented — see
`docs/decisions/` and each phase's status in `TASKS.md`.

## Getting started (once the app scaffold exists)

```bash
npm install
npm run dev        # local development
npm run build      # production build
npm run typecheck
npm run lint
npm run test        # unit + integration (Vitest)
npm run test:e2e    # Playwright (e2e, accessibility, visual)
```

Commands above are documented ahead of the scaffold landing; see `TASKS.md`
for what is actually runnable today.
