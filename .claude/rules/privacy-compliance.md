# Privacy & compliance rules

- Claude does not invent legal determinations. The following stay recorded
  as **open, client/legal-owned decisions** in `docs/04-content-verification.md`
  and `docs/12-data-processing-register.csv` until an authorised person
  confirms them: Article 6 lawful basis, Article 9 condition (health data),
  DPIA decision, retention schedule, processor sign-off, international
  transfer assessment, and the approved privacy notice text.
- Default form wording is "privacy acknowledgement," not "privacy consent,"
  unless a client-approved lawful-basis analysis specifically requires
  opt-in consent.
- Every third-party processor (hosting, database, notification adapter,
  bot-protection adapter, analytics) is listed in
  `docs/12-data-processing-register.csv` with purpose, data received, and
  actual hosting/transfer location — including ones only proposed, marked
  pending. Never describe the stack as "UK-only" without the caveat in
  `docs/decisions/ADR-005-uk-hosting.md`.
- Cookie/consent banner is conditional: if the live configuration has no
  non-essential cookies or trackers, no banner ships. If one is needed,
  Accept and Reject must have equal visual prominence and no non-essential
  script loads before a choice is made.
- No analytics event ever carries a name, phone number, email address,
  free-text medical detail, or appointment payload.
- Data minimisation applies everywhere, not just the hero form: collect the
  least data that serves the stated purpose, on every route.
