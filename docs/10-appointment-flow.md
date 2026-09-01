# 10 — Appointment flow

## Appointment-operations decision gate (Phase B — must be resolved or explicitly deferred with safe defaults before the DB/notification architecture is finalised)

| Decision | Answer today | Safe default if unanswered |
|---|---|---|
| Existing hospital/practice booking system to integrate? | No confirmed public API/booking system found for Spire Bushey, Clementine Churchill, or Wellington Elstree in this pass | **Practice-managed request flow** (no fake availability) |
| Authorised recipients for enquiries | Not yet confirmed by client | Held as open — no real recipient wired until confirmed; dev adapter used |
| Staff access method | Not yet confirmed | **Secure notification link**, no authenticated admin UI in this build |
| Authenticated admin interface required? | Not yet confirmed | **No** — out of scope until requested |
| Request-status lifecycle | Not yet confirmed | new → contacted → booked → declined (minimal, extendable) |
| Retention & deletion schedule | Not yet confirmed | Held as open legal item — see `12-data-processing-register.csv` |
| Subject-access-request handling | Not yet confirmed | Held as open legal item |
| Duplicate-enquiry resolution | N/A | Idempotency token + DB uniqueness (see below) — handled at the technical layer regardless |
| Notification-failure recovery | N/A | Notification retry status tracked separately from the enquiry; enquiry itself is never lost even if notification fails |
| Response SLA communicated to patient | Not yet confirmed | Generic "we aim to respond within 2 working days" language, flagged pending client confirmation of the real figure |
| Data controller identity | Not yet confirmed | Held as open legal item |
| Processor contracts required | Not yet confirmed | Tracked per processor in `12-data-processing-register.csv` |

## Hosting/residency statement (corrected — do not overstate)

*"Primary application compute and appointment storage are configured in
London. Every processor, metadata flow, log, backup, support path, and
international transfer must be documented and approved before
production."* — see `11-deployment-architecture.md` and
`decisions/ADR-005-uk-hosting.md`.

## Form fields (public, minimised)

Full name · Telephone · Email · Preferred location · Preferred contact
method · Broad availability (not exact date/time) · Privacy acknowledgement.
Never: diagnosis, symptoms, procedure detail, medical history, NHS number,
insurance number, file uploads, open medical free text.

## Notification content (minimised)

- **Practice notification:** enquiry reference, timestamp, secure
  staff-access link, minimal operational status. No patient contact details
  or free text repeated in the email body.
- **Patient acknowledgement:** enquiry reference, explicit "this is a
  request, not a confirmed appointment," expected-response information,
  emergency-use warning, practice contact details.

## Idempotent submission design

Client generates a one-time submission token → server enforces a DB
uniqueness constraint on it → safe retry on network failure never creates a
duplicate enquiry or a duplicate patient acknowledgement → notification
delivery status is tracked separately from the enquiry record so a failed
email doesn't imply a lost enquiry.

## Provider status

`NotificationProvider` is a provider-neutral interface
(`src/lib/email/`). Only a local/dev logging adapter is built until the
Phase B review approves a real one. **Resend is not preselected** — its
storage of email content/metadata/logs/webhook payloads/account records in
the United States is incompatible with an unqualified UK-only claim.
Amazon SES (`eu-west-2`) is the leading candidate, pending the
processor/retention/transfer review. Bot protection (Cloudflare Turnstile)
is likewise an optional, reviewed adapter — the flow works correctly with
just honeypot + DB-backed rate limiting if Turnstile isn't approved.

## Legal wording default

"Privacy acknowledgement," not "privacy consent," unless a client-approved
lawful-basis analysis specifically requires opt-in consent (see
`12-data-processing-register.csv` and the Phase B legal gate).
