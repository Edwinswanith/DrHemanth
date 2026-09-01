# ADR-005 — UK hosting

- **Status:** accepted
- **Date:** 2026-09-01
- **Phase:** B

## Context

The client corrected an earlier draft's overstated "complete UK data
residency" claim based only on Vercel `lhr1` + Neon London. Data residency
requires knowing every processor, metadata flow, log, backup, and support
path — not just the primary compute/storage region.

## Decision

Adopt the corrected statement, used verbatim everywhere hosting/residency
is discussed (`CLAUDE.md`, `11-deployment-architecture.md`,
`10-appointment-flow.md`):

> Primary application compute and appointment storage are configured in
> London. Every processor, metadata flow, log, backup, support path, and
> international transfer must be documented and approved before
> production.

Vercel functions touching appointment data pinned to `lhr1`; Neon Postgres
in `eu-west-2`. Every third party (including ones only proposed) is
tracked in `12-data-processing-register.csv` with real hosting/transfer
location and an explicit approval status — nothing is called "UK-only"
without that register backing it up.

## Alternatives considered

- Fully self-hosted on a UK VM (Azure UK South / AWS eu-west-2) — stronger
  unqualified residency story, more operational overhead (patching,
  scaling, uptime) for a solo-practice-scale site. Documented as the
  fallback if Vercel's function-region guarantees prove insufficient on
  review.

## Consequences

No claim of "UK-only" can be made in any client-facing or public copy
(privacy notice, marketing) until every register row is `approved`. This
is a hard gate in `15-launch-checklist.md`, not a soft goal.
