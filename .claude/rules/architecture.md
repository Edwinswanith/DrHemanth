# Architecture rules

- Stack: Next.js App Router + TypeScript, React Server Components by
  default. Client Components only where real interactivity is needed
  (forms, drawers, accordions, comparison tabs).
- Content lives in `src/content/` as typed JSON/MDX, loaded and validated
  through Zod schemas in `src/lib/content/`. A build must fail on invalid or
  missing required content fields — never render silently-wrong data.
- The appointment feature is self-contained in `src/features/appointments/`
  (schema, types, service, repository, notification, rate-limit, analytics).
  Route handlers in `src/app/api/` call into this feature module; they do
  not contain business logic themselves.
- `NotificationProvider` and bot-protection are adapter interfaces
  (`src/lib/email/`, `src/lib/security/`). The concrete production
  implementation is only wired up after the Phase B data-processing review
  approves it — see `docs/decisions/ADR-004-appointment-workflow.md`. A dev/
  logging adapter is always available and is the default until then.
- Database access goes through the repository layer in
  `src/features/appointments/appointment.repository.ts` — no raw queries
  scattered through route handlers or components.
- Routes are only created once their content has cleared verification and
  the phase gate permits it (see `PROJECT_STRUCTURE.md` → "Why routes are
  scoped by phase"). Do not scaffold a route with placeholder content just
  because it appears in the information architecture.
- Prefer editing/extending an existing component or utility over adding a
  new one. Check `src/components/` and `src/lib/` before writing something
  that might already exist.
- Keep dependencies minimal — a new package needs a real, current reason,
  not convenience for a one-off.
