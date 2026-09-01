# 04 — Content verification

Nothing here is authored fact. This is the tracked list of what must be
confirmed by Prof. Sheth, an authorised clinical reviewer, or the client
before it can appear on a production route. Claude may mark content
`draft`, `requires-clinical-review`, or `retired` — never `approved`.

## Evidence hierarchy (governs every professional/clinical fact)

1. GMC register
2. Official NHS Trust sources
3. Official hospital profiles
4. Academic institution
5. Professional body (RCS, ASGBI, AUGIS, IHPBA, EAHPBA, BMA)
6. Peer-reviewed sources
7. Client-approved practice material
8. Reputable secondary sources
9. Local news — context only, never sole support for a personal claim

## Open verification items

| Item | Old-site claim | Tier available today | Status |
|---|---|---|---|
| GMC number | Published on bio page | Unverified against GMC register (tier 1) | **pending** |
| Canonical professional title | Inconsistent across old site (see `01-current-site-audit.md`) | None — needs explicit client decision | **pending — production gate, see below** |
| "Clinical Professor" claim | Published on bio page | Unverified against academic institution (tier 4) | **pending** |
| Current NHS role/trust | Ealing & London North West University Healthcare NHS Trust | Consistent across old-site pages (tier 7); not cross-checked against Trust site (tier 2) | **pending** |
| Robotic surgery — Trust programme exists | N/A (not claimed on old site directly) | Corroborated via local news (tier 9) + would need Trust-site confirmation (tier 2) — [ealing.news](https://www.ealing.news/health-wellbeing/the-robots-are-coming-to-ealing-hospital/), [lnwh.nhs.uk](https://www.lnwh.nhs.uk/) | **usable as attributed background context only** |
| Robotic surgery — Prof. Sheth's personal role/caseload/platform | Old bio gestures at "Robotic Surgeon" | Old site's own "In the News" page links an [Ealing Times article](https://www.ealingtimes.co.uk/news/26175437.dr-hemant-sheth-surgical-robot-winning-hearts-minds/) naming him as one of four surgeons trained on the da Vinci system at Ealing Hospital (milestone: 50 procedures). This is tier 8 (reputable secondary — local newspaper), stronger than the earlier tier-9 Trust-level-only corroboration, but still below the tier 1–7 threshold needed to publish it as an established personal fact. Which procedures, how often, and his current status need his direct confirmation. | **pending — usable as attributed background/context, still not publishable as an asserted personal fact** |
| Private locations — currently active | 3 locations listed | Old-site listing only (tier 7) | **pending per location** |
| Private locations — consulting hours | Published per-location | Old-site listing only, likely to drift | **pending per location** |
| Private locations — parking/transport/accessibility | Not published anywhere | None | **pending — new content, not a migration** |
| Testimonials (3 shown + 13 survey permalinks) | Published on old site | Consent/attribution unconfirmed; source platform (possibly I Want Great Care) unconfirmed | **pending — do not republish until resolved** |
| Fees/insurers accepted | Not detailed on old site | None | **pending** |
| Social media handles still active/owned | Facebook, X/Twitter, LinkedIn, YouTube links published | Not re-verified | **pending** |
| Primary "call the practice" telephone number | `020 3371 1785` (used on the old site's general-appointment page, distinct from the 2 hospital-specific secretary lines) | Sourced from live crawl (real, currently published), not re-confirmed with the practice | **pending — in use as the site's persistent Call action, flag for confirmation before Phase F launch** |
| Publications list currency | Published on research page | Not cross-checked against peer-reviewed sources (tier 6) | **pending** |

## Canonical positioning — production gate

The client's instruction is explicit: do not change the doctor's formal
title to "Robotic Surgeon" (or finalise any canonical positioning
statement) without client confirmation. Until confirmed:

- **Staging/interim only:** any full-wording draft (e.g. "Prof. Hemant
  Sheth — Consultant Upper GI, Hepatobiliary, Laparoscopic and Robotic
  Surgeon") may exist in protected, non-public content for client review.
- **Production fallback:** any publicly reachable environment uses the
  conservative, independently-corroborated fallback: *"Consultant Upper GI,
  Laparoscopic & Hepatobiliary Surgeon."*
- **Approval required before production publication of the final wording:**
  exact title, qualifications, GMC number, academic title, current NHS
  role, current private locations, robotic-surgery wording, and which
  procedures are personally performed robotically — all at once, not
  piecemeal, so the entity is consistent everywhere it appears (homepage,
  About, header/footer, appointment pages, treatment pages, locations,
  metadata, OG tags, JSON-LD, external directory profiles).

## Pages awaiting clinical sign-off (Phase E)

| Page | Status | What's needed |
|---|---|---|
| `/treatments/hernia-surgery` | `requires-clinical-review`, `noindex` | Freshly written (not copied from the old site), sourced from nhs.uk/conditions/hernia/ and nhs.uk/conditions/inguinal-hernia-repair/, screened by the medical-content-reviewer agent with no findings. Makes no claim about Prof. Sheth's personal technique/caseload — needs his review and, if accurate, his sign-off before `reviewMeta.status` can move past `requires-clinical-review` (a status only he or an authorised clinical reviewer can set, outside this codebase) and the page can be indexed. |
| `/treatments/gallbladder-surgery` | `requires-clinical-review`, `noindex` | Freshly written, sourced from nhs.uk/conditions/gallstones/, nhs.uk/conditions/gallbladder-removal/, and Guy's and St Thomas' NHS Foundation Trust's patient-information pages (tier: nhs-trust). Screened by the medical-content-reviewer agent — one wording fix applied (a self-contradictory phrase), otherwise clean. Same sign-off requirement as above. |
| `/treatments/bile-duct-exploration` | `requires-clinical-review`, `noindex` | Freshly written, sourced from Guy's and St Thomas' NHS Foundation Trust's ERCP page and North Bristol NHS Trust's laparoscopic bile duct exploration page (both tier: nhs-trust). States specific ERCP risk rates (pancreatitis ~5 in 100; severe/fatal <1 in 500; perforation <1 in 750) precisely rather than vaguely, verified against the directly-fetched source page (an earlier auto-summarised web search had suggested different, lower figures from an unclear source and was deliberately discarded in favour of the primary source). A medical-content-reviewer pass flagged that these numbers, without attribution, could be misread as Prof. Sheth's personal outcomes — fixed by adding an inline `riskStatisticsNote` (new optional field on `treatmentContentSchema`) directly above the risk list. Clinical reviewer must still independently re-confirm all four figures against the current source page before sign-off, given the earlier source discrepancy. |

## Confirmed defects (not open questions — already verified true)

- `/post-op-instructions-.../` contains orthopaedic-surgery content
  inapplicable to abdominal/laparoscopic recovery (quoted in
  `01-current-site-audit.md`). Will be rewritten from scratch, not edited.
- `/ypo-showcase/` is a third-party platform vendor page, not practice
  content. Will be retired (410).
- Site-wide: no canonical tags, broken/unparseable JSON-LD on all but 2
  pages, no cookie-consent mechanism. All fixed in the rebuild by design.
