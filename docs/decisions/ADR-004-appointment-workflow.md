# ADR-004 — Appointment workflow

- **Status:** accepted (Phase B decisions recorded; several sub-items remain
  open pending client input — see below)
- **Date:** 2026-09-01
- **Phase:** B

## Context

The old site's appointment form (name/phone/email only, no consent text, no
emergency disclaimer, no spam protection, no reference number) needed a
full rebuild. The client explicitly corrected an earlier draft that
preselected Resend as the email provider and collected too much data in
the public form.

## Decision

- Minimised public field set: full name, telephone, email, preferred
  location, preferred contact method, broad availability, privacy
  acknowledgement.
- `NotificationProvider` is a provider-neutral interface; only a local/dev
  logging adapter ships until a production provider clears the
  processor/retention/transfer review (`12-data-processing-register.csv`).
  Resend is explicitly rejected as a default (US data storage). Amazon SES
  `eu-west-2` is the leading production candidate.
- Notification content is minimised: practice gets reference + timestamp +
  secure link only; patient gets reference + not-confirmed statement +
  response-time info + emergency warning + contact details.
- Idempotent submission via client token + DB uniqueness constraint.
- Default practice-managed request flow — no confirmed hospital booking-
  system integration found for any of the 3 private locations.
- "Privacy acknowledgement" is the default wording, not "privacy consent,"
  pending a lawful-basis analysis.

## Open items (tracked in `10-appointment-flow.md`, block Phase D go-live with real data, not Phase C build)

Authorised recipients, staff access method details, retention/deletion
schedule, subject-access-request handling, data controller identity,
processor contracts, response SLA figure.

## Consequences

Phase C can build the full UI/flow against the dev adapter safely. Phase D
cannot go live with real patient data until the open items above are
resolved — this is a deliberate, documented blocker, not an oversight.
