---
name: plan-feature
description: Turn a scoped piece of work into an executable plan with acceptance criteria, the exact files it touches, risks, required tests, content/verification requirements, and SEO implications. Use before building any non-trivial route, component, or workflow change.
---

# Plan feature

## When to use

Before starting any feature/route/workflow beyond a trivial fix — especially
anything touching the appointment flow, a new content type, or a route that
will be publicly indexable.

## Required inputs

- The feature request, in the context of the current phase gate (don't plan
  Phase E work while Phase B is still open, etc.).
- Relevant existing code/content to reuse (check first — see
  `.claude/rules/architecture.md`).

## Steps

1. State the goal and which phase/acceptance-criteria it serves.
2. List exact files to create/modify.
3. List content/verification requirements — does this need a
   `pending-verification` fact resolved first? Does it collect any new
   personal data (if so, it needs a Phase B-style review, not a silent
   addition)?
4. List SEO implications — new URL? Redirect needed? Structured data?
5. List risks (security, accessibility, data-protection, medical-content).
6. Define acceptance criteria and the exact tests that will prove them.

## Required outputs

A short plan (in the conversation or a scratch note) covering the above —
not a new permanent doc unless the feature is large enough to warrant an
ADR or content brief.

## Failure conditions

- Building before the content/data it depends on is verified or explicitly
  flagged pending.
- Skipping the reuse check and duplicating an existing component/utility.
- No stated test plan.
