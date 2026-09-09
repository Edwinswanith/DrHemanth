# CLAUDE.md

Operating rules for working in this repository. Detailed workflows live in
`.claude/skills/`, standing rules in `.claude/rules/`, and project context in
`docs/`. This file only holds what applies to nearly every task.

## Project

Rebuild https://www.keyholesurgeon.co.uk/ into a modern, credible, UK-hosted
website for Prof. Hemant Sheth, a UK consultant surgeon. The old site is the
**content/URL/SEO migration source only** — never the visual or architecture
reference. Full brief: `docs/00-project-brief.md`.

## Audiences

Patients researching a condition or procedure; patients comparing robotic vs
laparoscopic surgery; patients ready to request a consultation; family
members researching on someone else's behalf; GPs/referrers; local patients
in Hertfordshire/Harrow/Elstree/NW London (locations pending verification).

## Commands

```bash
npm install
npm run dev                  # local dev server
npm run build                # production build
npm run start                # serve the production build

npm run typecheck            # tsc --noEmit
npm run lint                 # eslint .

npm run test                 # Vitest unit/integration, single run
npm run test:watch           # Vitest watch mode
npx vitest run path/to/file.test.ts        # single unit/integration file
npx vitest run -t "test name substring"    # single test by name

npm run test:e2e             # Playwright — builds+starts the prod server itself, then runs
npx playwright test tests/e2e/treatment-page.spec.ts      # single e2e spec
npx playwright test --project=desktop-1440                # single viewport project only
                              # projects: mobile-390, tablet-768, desktop-1440, desktop-1920
                              # (full required set per .claude/rules/testing.md also includes 430x932 and 1024x768)

npm run check:links          # scripts/check-links.mjs
npm run check:redirects      # scripts/check-redirects.mjs — every docs/06-seo-migration-map.csv row resolves, no chains/loops
npm run check:metadata       # scripts/check-metadata.mjs — canonical/title/meta-description uniqueness
npm run check:structured-data # scripts/check-structured-data.mjs — JSON-LD matches visible page facts

npm run audit:crawl          # scripts/audit-crawl.mjs — re-crawl the OLD site for migration audit (not this repo's routes)
npm run audit:content        # scripts/extract-source-content.mjs
npm run audit:map            # scripts/build-migration-map.mjs — regenerates docs/06-seo-migration-map.csv
npm run audit:scroll-density # scripts/measure-scroll-density.mjs

node scripts/check-repository.mjs        # repo hygiene checks (not wired to an npm script)
node scripts/generate-content-report.mjs # content-verification status report (not wired to an npm script)
```

A single `npm test`/`npm run test:e2e` invocation is not enough to call a
feature done — see Testing requirements below and `.claude/rules/testing.md`.

## Architecture

- **Content** is typed data, not a CMS: files under `src/content/` (surgeon
  profile, nav, treatments, site config, patient feedback) are imported
  through the barrel `src/lib/content/index.ts`, which Zod-validates every
  export at import time against schemas in `src/lib/content/schema.ts` — a
  missing/invalid required field fails the build rather than rendering wrong
  data. Add new content by adding a typed file + schema, not by hardcoding
  strings in a component. See `docs/decisions/ADR-002-content-architecture.md`.
- **Appointments** are a self-contained feature module in
  `src/features/appointments/` (`appointment.schema.ts` for Zod validation,
  `appointment.service.ts` for orchestration, `appointment.repository.ts` as
  the repository interface with `in-memory-appointment-repository.ts` /
  `postgres-appointment-repository.ts` implementations, plus
  `appointment-rate-limit.ts` and `appointment.analytics.ts`). The single
  route handler `src/app/api/appointment-request/route.ts` calls into this
  module — it holds no business logic itself. Notification sending is an
  adapter interface (`src/lib/email/notification-provider.ts`); the dev/
  logging adapter is the default until a real provider clears the Phase B
  data-processing review (`docs/decisions/ADR-004-appointment-workflow.md`).
- **Routes exist only where content has cleared verification** — `src/app/`
  intentionally does not mirror the full information architecture in
  `docs/02-information-architecture.md`. Check `TASKS.md` and
  `docs/04-content-verification.md` before assuming a route should exist.
- Full directory map and rationale: `PROJECT_STRUCTURE.md`.

## Trust and medical content — non-negotiable

- Never invent qualifications, GMC details, hospital affiliations, statistics,
  case numbers, success rates, awards, or testimonials.
- Every clinical/professional fact needs a source tier per
  `docs/04-content-verification.md`'s evidence hierarchy (GMC → NHS Trust →
  hospital → academic institution → professional body → peer-reviewed →
  client-approved material → reputable secondary → local news-as-context-only).
- Claude may mark content `draft`, `requires-clinical-review`, or `retired`.
  **Claude must never mark medical content as clinically approved.**
- No claim like "safest," "best," "scarless," "painless," "guaranteed," or
  "no complications" without evidence and explicit sign-off.
- Robotic surgery is presented as surgeon-controlled, not autonomous, and
  never framed as automatically superior to laparoscopic/open surgery.
- The doctor's canonical professional title is **not finalised** — see the
  production gate in `docs/04-content-verification.md` and
  `docs/decisions/ADR-004-appointment-workflow.md` / IA docs. Never publish
  "Robotic Surgeon" as a formal title without client confirmation.

## SEO migration protection

- Every URL on the old site must be classified (keep/improve/merge/redirect/
  retire/investigate) in `docs/06-seo-migration-map.csv` before it can 404.
- Never bulk-redirect unrelated pages to the homepage.
- 410 only for content with no replacement that should genuinely disappear.
- No redirect chains, loops, or canonical conflicts — test before shipping.
- Old site stays live until the new site, appointment flow, and full
  redirect map are tested end-to-end.

## Accessibility

WCAG 2.2 AA minimum. Keyboard operability, visible focus, semantic
landmarks/headings, labelled and announced form errors, sufficient contrast,
`prefers-reduced-motion` respected, no information conveyed by colour alone.
Every shared component needs default/hover/focus/active/disabled/(loading/
error where relevant)/mobile/keyboard/reduced-motion states.

## Appointment data & security

- Public form collects only: name, phone, email, preferred location,
  preferred contact method, broad availability, privacy acknowledgement. No
  diagnosis, symptoms, medical history, NHS/insurance numbers, or file
  uploads on this form.
- Server-side Zod validation, sanitisation, honeypot, DB-backed rate
  limiting, idempotent submission (client token + DB uniqueness).
- Practice notification = reference + timestamp + secure staff link only.
  Patient acknowledgement = reference + "not yet confirmed" + response-time
  info + emergency warning + contact details. Neither repeats full payload
  needlessly.
- No PII to analytics. No recipient address in client-side code. No patient
  data in application/infra logs.
- Every third-party processor (hosting, database, notification, bot
  protection, analytics) is entered in `docs/12-data-processing-register.csv`
  with its real data-handling location — do not claim "UK-only" without the
  caveat sentence in `docs/decisions/ADR-005-uk-hosting.md`.

## UK hosting

Vercel functions pinned to `lhr1` (London) for anything touching appointment
data; Neon Postgres in `eu-west-2` (London). Static/public content may use
global CDN caching — patient data never silently leaves the documented
processor set. Details: `docs/11-deployment-architecture.md`.

## Coding standards

Next.js App Router + TypeScript, RSC-first, minimal client JS, Tailwind CSS
with design tokens (never hardcoded colours in components), Zod for all
server-side input validation, Vitest for unit/integration, Playwright for
e2e/accessibility/visual. Reuse existing components/utilities before adding
new ones. No placeholder interactions, dead buttons, `#` links, or fake
loading/success states in anything presented as finished. Import via the
`@/*` alias (maps to `src/*`), never relative `../../..` chains. Component
files are kebab-case (`appointment-form.tsx`); exported React components are
PascalCase.

## Source of truth

`docs/00-project-brief.md` (goals) · `docs/01-current-site-audit.md` +
`docs/06-seo-migration-map.csv` (migration) · `docs/02-information-architecture.md`
(site map) · `docs/04-content-verification.md` (what's still unverified) ·
`docs/decisions/` (ADRs) · `TASKS.md` (live status).

## Available skills

`initialise-project` · `audit-existing-site` · `plan-feature` · `build-page`
· `review-design` · `review-medical-content` · `seo-migration` ·
`verify-site` · `deploy-uk`. Each has narrow scope, inputs/steps/outputs, and
failure conditions in `.claude/skills/<name>/SKILL.md`.

## Testing requirements

Every feature ships with real tests, not a description of tests. Run
install/build/typecheck/lint/unit/integration/e2e/accessibility for real
before declaring work done; report failures explicitly rather than
suppressing or skipping checks.

## Definition of done (any task)

No fabricated claims · no dead/placeholder UI · accessibility checks pass or
failures are explicitly listed · tests pass or blockers are explicitly
listed · build succeeds · `TASKS.md` updated · verification requirements and
assumptions documented, not silently assumed.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
