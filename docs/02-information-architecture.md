# 02 — Information architecture

Status legend: **build now** (Phase C scope) · **build in Phase E** (once
content clears verification) · **documented only** (not yet a route).

## Header navigation

Logo/name · Robotic Surgery · Treatments · Robotic vs Laparoscopic · About ·
Locations · Patient Information · Research and Media · **Book an
Appointment** (primary CTA). Mobile: persistent Call + Request Appointment
actions, non-obscuring.

## Route map

| Route | Old-site source (see `06-seo-migration-map.csv`) | Phase | Notes |
|---|---|---|---|
| `/` | homepage | **build now** | Interim canonical title fallback until Phase E approval |
| `/appointments`, `/appointments/confirmation` | `general-appointment-...` | **build now** | Full request flow |
| `/privacy` | `/privacy/` | **build now** | Full rewrite, not migrated verbatim |
| `/accessibility` | (none — new) | **build now** | |
| `/medical-disclaimer` | `/disclaimer/` | **build now** | Full rewrite |
| `/cookies` | (none — new) | **build now, conditionally** | Only if a non-essential cookie/tracker is actually configured |
| `/robotic-surgery` | (none — new hub) | Phase E | Personal-role claims blocked until doctor confirmation |
| `/robotic-vs-laparoscopic` | (none — new) | Phase E | |
| `/laparoscopic-surgery` | `services-...`, `laparoscopic-surgery-general-...` | Phase E | |
| `/about` | `dr-hemant-sheth-...` | Phase E | Blocked on canonical-title approval (see `04-content-verification.md`) |
| `/treatments` | `services-...` | Phase E | Hub page |
| `/treatments/upper-gi-endoscopy` | GERD/upper-gi-endoscopy/achalasia cluster | Phase E | Merges 4 old URLs |
| `/treatments/anti-reflux-surgery` | GERD/anti-reflux/hiatal-hernia cluster | Phase E | |
| `/treatments/gallbladder-surgery` | cholecystectomy/gallstones cluster | **built** (Phase E started) | Merges 5 old URLs. `noindex`, `requires-clinical-review` — same pattern as hernia surgery below. |
| `/treatments/bile-duct-exploration` | CBD/ERCP/choledocholithiasis cluster | **built** (Phase E started) | Merges 4 old URLs. `noindex`, `requires-clinical-review`. Higher-stakes than the other two pages built so far — ERCP carries a real, small mortality risk from severe pancreatitis, stated precisely (not softened) with an inline attribution note clarifying the cited rates are general NHS-published figures, not Prof. Sheth's personal outcomes (added after a medical-content-reviewer pass flagged the ambiguity). |
| `/treatments/hernia-surgery` | 10-URL hernia cluster | **built** (Phase E started) | Largest consolidation — see audit. Route is live but `noindex`: content is freshly written and NHS-sourced, screened by the medical-content-reviewer agent, but still `requires-clinical-review` — not yet approved by Prof. Sheth. First real use of the `components/medical/*` set. |
| `/treatments/liver-and-spleen-surgery` | HPB/liver/splenectomy cluster | Phase E | Merges 9 old URLs |
| `/treatments/appendicectomy` | appendectomy cluster | Phase E | |
| `/qualifications-and-memberships` | part of bio page | Phase E | Split out of `/about` for scannability |
| `/research-publications` | `research-and-publications-...` | Phase E | Currency check required |
| `/patient-reviews` | testimonials + 13 survey-permalink URLs | Phase E | Blocked on consent verification |
| `/patient-information` | `patient-resources-...`, `useful-links-...` | Phase E | Hub |
| `/patient-information/preparing-for-your-appointment` | `first-visit-guide-...` | Phase E | |
| `/patient-information/post-operative-guidance` | `post-op-instructions-...` | Phase E | **Written from scratch** — confirmed unsafe to migrate |
| `/patient-information/insurance-and-fees` | `insurance-info-...` | Phase E | |
| `/patient-information/forms` | `patient-forms-...` | Phase E | |
| `/locations` + `/locations/spire-bushey`, `/locations/clementine-churchill-harrow`, `/locations/wellington-elstree` | 3 location pages | Phase E | Each blocked on active-practice/hours confirmation |
| `/for-gps-and-referrers` | (none — new) | Phase E | |
| `/videos-media` | `patient-education-videos-...` | Phase E | Licensing/currency unverified |
| `/faqs` | (none — new, consolidated) | Phase E | |
| `/contact` | `contact-us-...` | Phase E | |
| `/cookies` | (none) | Conditional | See above |
| `/website-terms` | (none — new) | Phase E | |

Routes not in this table (minor-procedure stub pages like skin lesion
excision, abscess drainage, pilonidal sinus) are `investigate` in the
migration map — held pending confirmation of whether they remain part of
the current service line before any route is planned for them.

## Homepage section order (content coverage, not 1:1 with visual sections — see `08-design-system.md` for how modules may compose)

1. Header 2. Surgeon-led hero + appointment request 3. Verified trust/
affiliation strip 4. Surgeon introduction 5. Robotic surgery introduction
6. Robotic vs laparoscopic comparison 7. Treatments/conditions 8. Why
patients choose this practice 9. Patient journey 10. Practice locations
11. Verified patient stories 12. Research/publications/education 13. FAQs
14. Final appointment CTA 15. Footer.
