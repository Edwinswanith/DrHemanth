# Medical content rules

- British English throughout.
- Every clinical or professional fact must trace to a source tier in the
  evidence hierarchy (`docs/04-content-verification.md`): GMC → official
  NHS Trust → official hospital profile → academic institution →
  professional body → peer-reviewed source → client-approved practice
  material → reputable secondary source → local news (context only, never
  sole support for a personal claim about Prof. Sheth).
- Claude may set a content record's status to `draft`,
  `requires-clinical-review`, or `retired`. **Claude must never set or imply
  `approved`/`clinically-reviewed`** — that status can only be applied by
  Prof. Sheth or an authorised clinical reviewer, outside this tool.
- No page ships to a production route with medical content classified
  `requires-clinical-rewrite` or `requires-doctor-confirmation`.
- Forbidden without specific evidence and explicit sign-off: "safest,"
  "best," "scarless," "painless," "guaranteed," "fastest recovery," "no
  complications," "superior outcomes," or any other unqualified superlative.
- Robotic surgery is always described as surgeon-controlled (never
  autonomous) and never framed as automatically better than laparoscopic or
  open surgery — benefits, limitations, risks, and suitability all get
  stated together.
- The required 13-part treatment-page shape (summary, symptoms/referral
  reasons, assessment, treatment options, benefits, limitations, risks,
  recovery, alternatives, urgent warning signs, FAQs, references,
  author/reviewer + published/last-reviewed dates, appointment CTA) is
  mandatory for every treatment/condition page — see
  `docs/content-briefs/treatments.md`.
- Never migrate old-site clinical text verbatim without checking it's
  actually specific to the procedure it's attached to — the confirmed
  orthopaedic-content defect in the old post-op instructions page
  (`docs/01-current-site-audit.md`) is the standing example of why.
- No testimonial, statistic, award, or case number is published without a
  recorded consent/verification status in `docs/04-content-verification.md`.
