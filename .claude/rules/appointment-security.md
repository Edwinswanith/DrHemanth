# Appointment security rules

- Public form fields, maximum: full name, telephone, email, preferred
  location, preferred contact method, broad availability, privacy
  acknowledgement. Never diagnosis, symptoms, procedure detail, medical
  history, NHS number, insurance number, file uploads, or open medical free
  text on the public-facing form.
- Server-side Zod validation and sanitisation on every field, every request
  — client-side validation is a UX convenience only, never authoritative.
- Idempotent submission: client generates a one-time submission token; the
  server enforces a DB uniqueness constraint on it; retries after a network
  failure never create a duplicate enquiry or send a duplicate patient
  acknowledgement.
- Rate limiting is DB-backed (sliding window by IP), plus a honeypot field.
  Cloudflare Turnstile is optional and only added once it clears the
  Phase B data-processing/international-transfer review — the flow must
  work correctly with just honeypot + rate limiting if Turnstile isn't
  approved.
- Practice notification content: enquiry reference, timestamp, secure
  staff-access link, minimal operational status. **Never** the patient's
  full contact details or free text repeated in the email body — staff view
  full details via the secure link, not the notification itself.
- Patient acknowledgement content: enquiry reference, explicit "this is a
  request, not a confirmed appointment," expected-response information,
  emergency-use warning, practice contact details.
- No recipient email address appears in any client-side/frontend code —
  route it server-side only.
- No PII in analytics events, application logs, or infrastructure logs.
  Audit logging records that an action happened (submission received,
  notification sent/failed) without the personal payload.
- `NotificationProvider` fails closed: if no provider is configured, the
  system must not report success to the patient. The dev/logging adapter
  makes this state obvious rather than pretending delivery happened.
