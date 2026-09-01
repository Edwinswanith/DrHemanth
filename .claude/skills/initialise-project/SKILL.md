---
name: initialise-project
description: Inspect the repository, select or confirm the correct architecture, document technical decisions as ADRs, and establish valid, working build/test commands. Use once at project start or whenever the stack/tooling may have drifted from what's documented.
---

# Initialise project

## When to use

At the start of the engagement, after a significant dependency/framework
change, or whenever `npm run <anything>` in `TASKS.md`/`README.md` no longer
matches reality.

## Required inputs

- Current repository state (or confirmation it's empty).
- The approved plan / `docs/decisions/` for any architecture choices already
  made — do not re-decide something already settled without a reason.

## Steps

1. Inspect the repo: package manager, `package.json` scripts, existing
   framework, routes, tests, env vars, deployment config. If non-empty,
   read before writing anything — never overwrite blindly.
2. If empty or unsuitable, scaffold per `.claude/rules/architecture.md`
   (Next.js App Router + TypeScript + Tailwind + Zod + Vitest + Playwright).
3. Wire up `package.json` scripts so `npm run dev|build|typecheck|lint|test|
   test:e2e` all actually work — verify each one by running it, not by
   inspection alone.
4. Record every non-obvious technical decision as a new
   `docs/decisions/ADR-0XX-*.md` (copy `ADR-000-template.md`).
5. Update `README.md`'s command list and `TASKS.md` if scope changed.

## Required outputs

- Working scripts confirmed by actually running them.
- New/updated ADRs for any decision made or changed.
- `PROJECT_STRUCTURE.md` kept accurate if the layout changed.

## Failure conditions

- A documented command that doesn't actually run.
- An architecture change made without an ADR.
- Existing, useful implementation overwritten without being read first.
