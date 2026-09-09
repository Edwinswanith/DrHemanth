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
| Private locations — currently active | 3 locations listed | Current public legacy contact page (tier 7) + explicit reuse request on 2026-09-02 | **rendered from legacy public contact page; final current-practice confirmation recommended before launch** |
| Private locations — consulting hours | Published per-location | Current public legacy contact page (tier 7), likely to drift | **rendered from legacy public contact page; final current-practice confirmation recommended before launch** |
| Private locations — parking/transport/accessibility | Not published anywhere | None | **pending — new content, not a migration** |
| Named testimonials (3 shown + 13 survey permalinks) | Published on old site | Old-site attributable testimonials remain unsuitable for public reuse until consent/attribution and source-platform status are confirmed | **pending — do not republish publicly until resolved** |
| Anonymised patient card excerpts | Client-supplied feedback folder | `patient-stories.tsx` and `/patient-feedback` use short anonymised excerpts from `C:\Users\bizzz\Downloads\Patient feedback`; names/signatures and raw PDFs are not exposed. `/patient-feedback` is noindexed until final consent and card-art rights are confirmed. | **client-supplied, anonymised; final consent/rights confirmation needed** |
| Consultation fees | Initial consultation £220; follow-up consultation £180 for both telephonic and face-to-face | Current public legacy contact page (tier 7) + explicit reuse request on 2026-09-02 | **rendered from legacy public contact page; final fee confirmation recommended before launch** |
| Social media handles still active/owned | Facebook, X/Twitter, LinkedIn, YouTube links published | Not re-verified | **pending** |
| Primary "call the practice" telephone number | `020 3371 1785` (used on the old site's general-appointment page, distinct from the 2 hospital-specific secretary lines) | Sourced from live crawl (real, currently published), not re-confirmed with the practice | **pending — in use as the site's persistent Call action, flag for confirmation before Phase F launch** |
| Publications list currency | Published on research page | Not cross-checked against peer-reviewed sources (tier 6) | **pending** |
| Qualifications with years (Clinical Professor 2023, FRCS RCS Eng 2009, MD UCL 2010, FRCS Glasgow 1996, MS Mumbai 1994, MBBS Mumbai 1990) | Old bio page "Qualification and Professional Memberships" accordion | Old-site self-published (unverified) — fetched and cross-checked against raw HTML directly on 2026-09-02 | **pending — rendered on `/qualifications-and-memberships`, noindex, not cross-checked against RCS England/RCS Glasgow/UCL/TNMC Mumbai records** |
| Professional positions held (Surgical Tutor RCS England 2012, AUGIS member 2018, Intermediate Laparoscopic Skills Course faculty) | Old bio page "Professional bodies (positions held - last 3 yrs)" accordion | Old-site self-published (unverified) | **pending — rendered on `/qualifications-and-memberships`, noindex** |
| Research projects (Splenectomy MS thesis 1994; Liver Ischaemia Reperfusion MD thesis UCL; "weekend effect" service evaluation) | Old bio page "Research and Publications" accordion | Old-site self-published (unverified) | **pending — rendered on `/qualifications-and-memberships`, noindex** |
| 20 peer-reviewed publication citations (2005–2017) | Old bio page "Research and Publications" accordion | Old-site self-published; citation text reformatted for consistency only, no facts changed — DOIs/citations not independently confirmed to resolve or match | **pending — rendered on `/qualifications-and-memberships`, noindex; supersedes the "Publications list currency" row above once `/research-publications` is built from the same source** |
| GP course offered ("GI Masterclass") | Old bio page "Courses offered to GPs" accordion | Old-site self-published; no format/frequency/enrolment detail published | **pending — rendered on `/qualifications-and-memberships`, noindex** |
| Award ("Clinical excellence awards for the trust") | Old bio page "Awards received" accordion | Old-site self-published, no award name/year/issuing body given | **held back — too vague to publish as-is; not rendered anywhere. Needs the client to supply specifics.** |

## Image asset provenance

Current placeholder replacements use files copied from the existing public website and saved in `public/images/keyholesurgeon/`. They are acceptable for staging because they come from client-approved practice material (tier 7), but rights, consent, caption wording and current usage scope still need direct client confirmation before launch.

| Asset group | Source | Current use | Status |
|---|---|---|---|
| Prof. Hemant Sheth portrait | `https://assets.yourpractice.online/2533/dr-sheth-h-cc.png` | Homepage hero, surgeon introduction, final CTA | **pending rights/usage confirmation** |
| Treatment illustrations | Existing website treatment/service images | Homepage treatment selector thumbnails | **pending rights/usage confirmation; low-resolution thumbnails only** |
| The Clementine Churchill Hospital image | Existing website location image | Location detail for Clementine only | **pending rights/usage confirmation** |
| Spire Bushey Hospital exterior image | Official Spire Healthcare hospital page structured-data image: `https://www.spirehealthcare.com/media/6504/spire_bushey_exterior.jpg` | Location detail for Spire Bushey only | **pending rights/usage confirmation; staging/client-review asset** |
| Research/publications image | Existing website research image | Research section supporting visual | **pending rights/usage confirmation** |
| Patient feedback card scans | Client-supplied feedback folder | **INCIDENT, 2026-09-02**: the 105-scan full archive on `/patient-feedback` was found to contain unredacted patient names on multiple "note" scans, including one with a full name *and* NHS number, despite each caption claiming "personal details withheld" — the earlier "105 public-safe card/note scans created" claim in this row was wrong. All 105 files have been pulled from `public/` and quarantined at `_unpublished-review/patient-feedback-archive-UNREVIEWED/` (outside the served directory); the gallery no longer renders on `/patient-feedback`, only the pre-existing anonymous text excerpts remain. The 10-image curated set (`feedbackArchiveImages`/`homepageFeedbackImages` in `src/content/patient-feedback.ts`) was separately spot-checked and is clean, but is currently unused/unrendered. | **full archive withdrawn — do not re-import `patient-feedback-archive.generated.json` or move the quarantined folder back into `public/` until every scan is individually redaction-reviewed** |
| Robotic surgery image | No compliant source found on existing website | Not used | **still required** |
| Robotic surgery video | Existing homepage video block: "WATCH: Ealing Hospital breaks national record for robotic surgeries" | Existing site embeds YouTube video `Q__rvX_EEGQ`; reused via `youtube-nocookie.com` embed as patient-facing context, not as an unverified personal outcome claim | **source-site reused** |
| Wellington location image | No matching source image found on existing website | Not used | **still required** |

## Location detail provenance

The homepage location section now reproduces the practice locations, phone numbers, clinic-session windows, secretary contact, general email, consultation fees and direction links from the existing public contact page after an explicit reuse request on 2026-09-02. Spire Bushey and Clementine address wording has also been cross-checked against NHS-listed hospital address pages. These details are visible as legacy public practice material, but current-practice confirmation is still recommended before launch because hours, fees and contact routes can drift.

| Location | Address shown | Practice hours shown | Phone shown | Status |
|---|---|---|---|---|
| Spire Bushey Hospital | Heathbourne Road, Bushey Heath, Bushey, Hertfordshire WD23 1RD | Monday 19:00 to 20:00; Alternate Thursdays 10:30 to 12:00 | `020 8950 9090`; secretary email `admin@medicalsecs.co.uk`; general email `info@keyholesurgeon.co.uk` | **legacy public contact page; confirm current before launch** |
| The Clementine Churchill Hospital & Clinics | Sudbury Hill, Harrow, Middlesex HA1 3RX | Monday 17:30 to 18:30; Thursday 14:00 to 17:00 | `020 8872 3872`; secretary email `admin@medicalsecs.co.uk`; general email `info@keyholesurgeon.co.uk` | **legacy public contact page; confirm current before launch** |
| The Wellington Hospital, Elstree Waterfront | The Waterfront Business Park, Beaufort House, Elstree Road, Elstree, Hertfordshire WD6 3BS | No source-site clinic hours published | `020 3993 9942`; secretary email `admin@medicalsecs.co.uk`; general email `info@keyholesurgeon.co.uk` | **legacy public contact page; confirm current before launch** |

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

| `/treatments/upper-gi-endoscopy` | `requires-clinical-review`, `noindex` | Freshly written from NHS gastroscopy guidance and Royal Free London NHS Foundation Trust upper-GI endoscopy patient information. Merges 4 old URLs. Needs review for local endoscopy pathway, sedation options, medicine-stop instructions, and which therapeutic procedures Prof. Sheth personally offers. |
| `/treatments/anti-reflux-surgery` | `requires-clinical-review`, `noindex` | Freshly written from NHS acid-reflux guidance and Guy's and St Thomas' NHS Foundation Trust fundoplication information. Merges 2 old URLs. Needs review for local pre-operative testing pathway, specific fundoplication techniques offered, and whether current practice wording should include hiatus-hernia repair here or only on the hernia page. |
| `/treatments/liver-and-spleen-surgery` | `requires-clinical-review`, `noindex` | Freshly written from NHS/NHS Trust/GOV.UK sources covering liver surgery, spleen removal, and post-splenectomy infection precautions. Merges 9 old URLs. Highest verification burden among the newly added pages because cancer, liver resection, splenectomy, and current service-line claims may differ by MDT pathway and current practice scope. |
| `/treatments/appendicectomy` | `requires-clinical-review`, `noindex` | Freshly written from NHS appendicitis guidance and Guy's and St Thomas' NHS Foundation Trust appendicectomy information. Merges 2 old URLs. Needs review for local emergency/planned pathway wording and whether the private-practice site should present appendicectomy as an offered service. |
| `/qualifications-and-memberships` | `requires-clinical-review`, `noindex` | Old-site-sourced only (see the qualification/position/research/publication rows above). Needs Prof. Sheth's or an authorised reviewer's confirmation of every credential, position, research summary, and publication citation. A `medical-content-reviewer` pass on 2026-09-02 found and this page's content/markup were fixed for: (1) "Clinical Professor" originally sat in the same visual grid as verified-style postgraduate degrees — moved to its own separately-captioned `disputedListedTitle` field so it can't be mistaken for a confirmed title; (2) its placeholder awarding-body text read like a real institution name in the rendered page — removed; (3) AUGIS appeared twice (membership + a 2018 "position") with no note on whether that's one relationship or two — now flagged in `professionalPositions.note`; (4) MS (General Surgery) is attributed to "TNMC Mumbai" here but "University of Bombay" in the related research-project entry — flagged for clinical review rather than silently reconciled. Also added the missing `reviewMeta`/`MedicalReviewDetails` block this page was missing (every other medical page has one). |

## Confirmed defects (not open questions — already verified true)

- `/post-op-instructions-.../` contains orthopaedic-surgery content
  inapplicable to abdominal/laparoscopic recovery (quoted in
  `01-current-site-audit.md`). Will be rewritten from scratch, not edited.
- `/ypo-showcase/` is a third-party platform vendor page, not practice
  content. Will be retired (410).
- Site-wide: no canonical tags, broken/unparseable JSON-LD on all but 2
  pages, no cookie-consent mechanism. All fixed in the rebuild by design.
