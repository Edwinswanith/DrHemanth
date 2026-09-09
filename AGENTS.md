# Repository Guidelines

## Project Structure & Module Organization

This repository is a Next.js App Router + TypeScript rebuild of `keyholesurgeon.co.uk`. Core application code lives in `src/`: routes and API handlers in `src/app/`, reusable UI in `src/components/`, appointment domain logic in `src/features/appointments/`, typed site content in `src/content/`, shared helpers in `src/lib/`, design tokens in `src/styles/`, and shared types in `src/types/`. Tests live in `tests/unit/`, `tests/integration/`, `tests/e2e/`, and `tests/accessibility/`. Planning, verification, SEO migration, and launch materials live in `docs/`; current phase status is tracked in `TASKS.md`.

## Build, Test, and Development Commands

Use Node.js `>=20`.

- `npm install` installs dependencies.
- `npm run dev` starts the local Next.js dev server.
- `npm run build` creates the production build.
- `npm run start` serves the built app.
- `npm run typecheck` runs `tsc --noEmit`.
- `npm run lint` runs ESLint across the repo.
- `npm run test` runs Vitest unit and integration tests.
- `npm run test:e2e` runs Playwright e2e, accessibility, and responsive checks.
- `npm run check:links`, `check:redirects`, `check:metadata`, and `check:structured-data` run repository validation scripts.

## Coding Style & Naming Conventions

Use strict TypeScript, React Server Components by default, and Client Components only for real interactivity. Prefer imports via the `@/` alias. Reuse existing components and utilities before adding new abstractions. Styling should use tokens from `src/styles/tokens.css`; avoid hard-coded colors in components. Validate server-side input with Zod. Component files use kebab-case, for example `appointment-form.tsx`; exported React components use PascalCase.

## Testing Guidelines

Vitest tests use `*.test.ts` or `*.test.tsx` under `tests/unit/` and `tests/integration/`. Playwright tests use `*.spec.ts` under `tests/`. Add or update tests with any behavior change, especially appointment flow, routing, accessibility, metadata, and structured data. Before declaring work done, run the relevant checks and report any failures explicitly.

## Commit & Pull Request Guidelines

Recent history uses concise imperative subjects, often phase-prefixed: `Phase E: build the hernia surgery treatment page`, `Add scroll/entrance motion polish`, `Update TASKS.md: ...`. Keep commits focused. Pull requests should include a short summary, linked issue or task, test results, screenshots for UI changes, and updates to `TASKS.md` or `docs/` when scope or decisions change.

## Medical Content, Security & Configuration

Follow `CLAUDE.md` for non-negotiable medical, SEO, accessibility, and appointment-data rules. Never invent credentials, affiliations, outcomes, testimonials, or clinical approvals. Use `.env.example` as the source of truth for configuration, and never commit secrets or patient data.
