# Content brief — Treatment pages (Phase E)

Every treatment/condition page follows the mandatory 13-part shape
(`.claude/rules/medical-content.md`): summary · symptoms/referral reasons ·
assessment · treatment options · benefits · limitations · risks · recovery
· alternatives · urgent warning signs · FAQs · references · author +
reviewer + published/last-reviewed dates · appointment CTA.

Consolidation targets (see `02-information-architecture.md` for the full
old-URL → new-page mapping):

- `/treatments/upper-gi-endoscopy`, `/treatments/anti-reflux-surgery`,
  `/treatments/gallbladder-surgery`, `/treatments/bile-duct-exploration`,
  `/treatments/hernia-surgery` (largest consolidation — 10 old URLs),
  `/treatments/liver-and-spleen-surgery`, `/treatments/appendicectomy`.

None of these are copy-edited old-site text — the audit found the old
condition pages share formulaic, templated meta-description language
across dozens of pages (a content-mill signal), so every page is written
fresh against the 13-part shape and reviewed per
`.claude/skills/review-medical-content/`. No page ships to a production
route while still `requires-clinical-rewrite`.
