# 11 — Deployment architecture

## Corrected hosting/residency statement

Do not claim complete UK data residency from `lhr1` + Neon London alone.

> Primary application compute and appointment storage are configured in
> London. Every processor, metadata flow, log, backup, support path, and
> international transfer must be documented and approved before
> production.

## Chosen components

- **App hosting:** Vercel. Serverless functions/route handlers that touch
  appointment data are pinned via `vercel.json` (`"regions": ["lhr1"]`,
  London). Static/public content may use Vercel's global CDN — that's
  public marketing content, not patient data, so global caching doesn't
  violate the residency statement above.
- **Database:** Neon Postgres, region `eu-west-2` (London). Chosen for
  serverless-friendly operation with Next.js/Vercel without running a
  self-managed VM. Alternatives considered: Supabase (London project
  region available) and Azure Database for PostgreSQL Flexible Server (UK
  South) — either is a reasonable substitute if Neon becomes unsuitable;
  documented here so the choice isn't silently locked in.
- **Notification/email:** provider-neutral adapter, no production provider
  selected yet (see `10-appointment-flow.md`). Amazon SES `eu-west-2` is
  the leading candidate pending the Phase B review.
- **Bot protection:** Cloudflare Turnstile, optional adapter, pending the
  same review — entered in the data-processing register regardless of
  whether it's ultimately used.
- **Rate limiting:** DB-backed (sliding window by IP) in the same Neon
  database — deliberately avoids adding a second vendor (e.g. Upstash)
  purely for this.

## What is NOT yet decided

Everything in the appointment-operations decision gate
(`10-appointment-flow.md`) that depends on client input: authorised
recipients, staff access method, retention schedule, data controller
identity, processor contracts. None of these block Phase C (design/
homepage) but all block Phase D (production appointment integration) going
live with real data.

## Security baseline (Phase F)

HTTPS/HSTS, Content-Security-Policy, Referrer-Policy, Permissions-Policy,
standard secure headers, dependency scanning, automated backups (Neon
point-in-time recovery), uptime/error monitoring that excludes patient
data from error payloads.

## Processor inventory

See `12-data-processing-register.csv` — the authoritative, currently-tracked
list. This doc gives the architecture rationale; that CSV gives the
per-processor approval status.
