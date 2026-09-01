---
name: deploy-uk
description: Deploy to UK-region production infrastructure, and only when explicitly invoked by the user and every launch gate in docs/15-launch-checklist.md is satisfied. Never runs implicitly as part of another skill.
---

# Deploy UK

## When to use

Only when the user explicitly asks for a deployment. Never self-triggered
at the end of a build or verification pass.

## Required inputs

- A fully passing `verify-site` run (see `.claude/skills/verify-site/`).
- `docs/15-launch-checklist.md` with every item checked or explicitly
  listed as a client-owned open blocker.
- Client-provided domain/DNS access for any production cutover step.

## Steps

1. Confirm every launch-checklist item: redirect map complete and tested,
   appointment flow tested production-like, canonical positioning
   client-approved, no `requires-clinical-rewrite`/`requires-doctor-
   confirmation` content live, legal pages complete, structured data
   validated, staging environments `noindex`, rollback plan documented, old
   site still live pre-cutover.
2. Confirm UK-region configuration: Vercel functions pinned `lhr1` for
   appointment-data paths, Neon `eu-west-2`, every processor in
   `docs/12-data-processing-register.csv` at status `approved` (not
   `pending`).
3. Deploy. Verify production behaviour post-deploy: appointment flow,
   redirects, sitemap submission readiness, security headers.
4. Document the deployment in `docs/11-deployment-architecture.md` and
   update `TASKS.md`.

## Required outputs

A deployed, verified production environment and an updated launch checklist
showing exactly what was confirmed.

## Failure conditions

- Deploying with any processor still `pending` in the data-processing
  register.
- Deploying with unapproved canonical positioning or unresolved
  `requires-doctor-confirmation` content live.
- Deploying without explicit user instruction to do so.
