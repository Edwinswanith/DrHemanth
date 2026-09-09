import { pending } from "@/types/content";
import { qualificationsPageContentSchema, type QualificationsPageContent } from "@/lib/content/schema";

/**
 * Backs /qualifications-and-memberships. Every fact here is sourced verbatim
 * from the old site's biography page accordion (fetched and cross-checked
 * against the raw HTML directly, not just an AI summary of it) — see
 * docs/04-content-verification.md for the full incident/verification note.
 * Nothing here has cleared the evidence hierarchy: it is old-site
 * self-published material only (tier "unverified" per the pending()
 * default), not independently checked against GMC/academic/professional-body
 * records. Do not mark any of it verified without updating that doc first.
 *
 * Deliberately excluded, not silently dropped:
 * - GMC registration number: surgeon.ts already withholds this value
 *   (gmcNumber: pending(null, ...)) per .claude/rules/medical-content.md —
 *   this page reuses that same fact rather than re-introducing the number.
 * - "Awards received: Clinical excellence awards for the trust" — too vague
 *   to publish (no award name, year, or issuing body); would need the
 *   client to supply specifics before it's usable.
 * - Clinical interests, current NHS post detail, research interests,
 *   personal interests — these belong to the (blocked) /about narrative
 *   bio, not this credentials-focused page; see
 *   docs/02-information-architecture.md.
 * - The old site's "Professional Memberships" sub-list under Qualifications
 *   (ASGBI, RCS England, BMA) partially conflicts with its separate
 *   "Affiliations/memberships" accordion (AUGIS, RCS England, EAHPBA,
 *   IHPBA) — two different, overlapping lists on the same old page. Rather
 *   than reproduce that inconsistency, this page reuses the single
 *   deduplicated list already tracked in surgeonProfile.professionalMemberships.
 *
 * A medical-content-reviewer pass on 2026-09-02 flagged four further
 * issues, addressed inline below: (1) "Clinical Professor" sat in the same
 * grid as verifiable degrees with identical styling — moved to its own
 * `disputedListedTitle` field, rendered separately; (2) its awardingBody
 * placeholder text read like a real institution name — removed, the
 * caveat is now prose only; (3) AUGIS appeared twice (as a membership and
 * as a 2018 "position") with no note reconciling whether that's one
 * relationship or two — noted below; (4) MS (General Surgery) is
 * attributed to "TNMC Mumbai" here but "University of Bombay" in the
 * research-project entry — flagged for clinical review rather than
 * silently reconciled, since Claude cannot independently confirm the
 * institutional relationship between the two names.
 */
const raw: QualificationsPageContent = {
  qualifications: pending(
    [
      { credential: "FRCS (RCS Eng)", awardingBody: "Royal College of Surgeons of England", year: "2009" },
      { credential: "MD (Research)", awardingBody: "University College London", year: "2010" },
      { credential: "FRCS (RCS Glasgow)", awardingBody: "Royal College of Surgeons of Glasgow", year: "1996" },
      {
        credential: "MS (General Surgery)",
        awardingBody: "TNMC Mumbai, India",
        year: "1994",
      },
      { credential: "MBBS", awardingBody: "TNMC Mumbai, India", year: "1990" },
    ],
    "Sourced verbatim from the old site's biography page; not yet cross-checked against academic/professional-body records. The MS is separately described elsewhere on the old site as \"accepted by the University of Bombay\" — not yet reconciled with \"TNMC Mumbai\" here; flagged for clinical review rather than assumed equivalent."
  ),

  // Kept separate from `qualifications` on purpose — see the header comment
  // above. Never render this in the same list/grid as the verifiable
  // degrees above.
  disputedListedTitle: pending(
    { label: "Clinical Professor", year: "2023" },
    "The old site's biography page lists this as a qualification. It is shown here only as \"a title the prior site published,\" not as a confirmed current academic title — see the canonical-title production gate in docs/04-content-verification.md. Do not move this into the qualifications list above."
  ),

  professionalPositions: pending(
    [
      { role: "Surgical Tutor", body: "Royal College of Surgeons of England", year: "2012" },
      { role: "Member of AUGIS", body: "Association of Upper Gastrointestinal Surgeons of Great Britain and Ireland", year: "2018" },
      { role: "Faculty, Intermediate Laparoscopic Skills Course", body: "Royal College of Surgeons of England" },
    ],
    "Sourced verbatim from the old site's biography page (\"Professional bodies (positions held - last 3 yrs)\"); not yet cross-checked against each body's own records. \"Member of AUGIS 2018\" here may describe the same relationship as the AUGIS membership listed separately under Memberships & Affiliations, rather than a second, distinct one — the old site did not clarify, and Claude has not assumed either way."
  ),

  researchProjects: pending(
    [
      {
        title: "Splenectomy for haematological disorders",
        submittedFor: "Accepted by the University of Bombay for MS (General Surgery), January 1994",
        summary:
          "Splenectomy plays a major therapeutic role in the composite management of various haematological disorders. Splenectomy was particularly useful for disorders like Hereditary Spherocytosis and ITP, while the responses to disorders like Thalassemia, Portal hypertension, and chronic Leukaemias was intermediate to poor. The overall morbidity and mortality is low.",
      },
      {
        title: "Therapeutic Modulation of Liver Ischaemia Reperfusion Injury",
        submittedFor: "Submitted for MD (Research), University College London",
        summary:
          "Ischaemia reperfusion injury is one of the causes of primary graft dysfunction following liver transplantation. Kupffer cell activation is the key event which initiates liver ischaemia reperfusion injury, leading to activation of the cytokine cascade and generation of free radicals that further aggravate the reperfusion injury. Blockade of Kupffer cells and free-radical-initiated injury with glycine (a non-essential amino acid) and N-acetylcysteine (a free radical scavenger) may ameliorate this injury and improve graft function.",
      },
      {
        title:
          "The weekend effect — how can it be mitigated? Introduction of a consultant-delivered emergency general surgical service",
        submittedFor: "Service-evaluation study",
        summary:
          "Operative data was analysed from a prospectively collected database over 5 years. Primary outcome measures were 30-day all-cause mortality and Clavien-Dindo class ≥ 2 morbidity. Secondary outcomes included time from admission to diagnostic imaging and time to surgery, post-operative length of stay, and requirement for Intensive Care Unit admission.",
      },
    ],
    "Sourced verbatim from the old site's biography page \"Research and Publications\" section; not yet cross-checked against the awarding institutions or, for the third project, a peer-reviewed publication record."
  ),

  publications: pending(
    [
      {
        citation:
          "Karia M, Seager M, Rafique A, Sheth H. The Diagnostic Utility and Clinical Impact of After-Hours CT Scans of the Abdomen and Pelvis Investigating Abdominal Pain. Scientific World Journal. 2017;Article ID 4028352, 6 pages.",
        url: "https://doi.org/10.1155/2017/4028352",
      },
      {
        citation:
          "Batt NM, Malik D, Harvie M, Sheth H. Non-haemorrhagic, bilateral adrenal infarction in a patient with antiphospholipid syndrome along with lupus myocarditis. BMJ Case Reports. Published online 20 July 2016. doi:10.1136/bcr-2016-216364",
      },
      {
        citation:
          "Karia M, Mitsopoulos G, Patel K, Rafique A, Sheth H. Primary Gallbladder Lymphoma in a Male Patient with No Risk Factors Detected Incidentally by CT Colonography. Case Rep Surg. 2015;2015:813708. Published online 2015 Oct 26. doi:10.1155/2015/813708",
      },
      {
        citation:
          "Maruthappu M, Painter A, Watkins J, Williams C, Ali R, Zeltner T, Faiz O, Sheth H. Unemployment, public-sector healthcare spending and stomach cancer mortality in the European Union, 1981-2009. Eur J Gastroenterol Hepatol. 2014 Nov;26(11):1222-7. doi:10.1097/MEG.0000000000000201",
      },
      {
        citation:
          "Rowland S, Rankin I, Sheth H. Vancomycin-induced thrombocytopaenia in a patient with severe pancreatitis. BMJ Case Reports. 2013. doi:10.1136/bcr2013200830",
      },
      {
        citation:
          "Tinsley B, Abbara A, Kadaba R, Sandhu G, Sheth H. Spontaneous Intraperitoneal Rupture of a Hepatic Hydatid Cyst with Subsequent Anaphylaxis: A Case Report. Case Reports in Hepatology. 2013;Article ID 320418, 4 pages.",
        url: "http://dx.doi.org/10.1155/2013/320418",
      },
      {
        citation:
          "Rankin I, Sheth H. Hepatic Portal Venous Gas: Comparison of Two Cases. Case Reports in Surgery. 2013;Article ID 637951, 5 pages.",
        url: "http://dx.doi.org/10.1155/2013/637951",
      },
      {
        citation: "Misro A, Sheth H. Hepatic Portal Venous Gas due to Acute on Chronic Gastric Ischaemia. Eur J Surg Sci. 2012;3(2):69-72.",
      },
      {
        citation:
          "Rowland SP, Sheth H. A case of emphysematous pyelonephritis. ANZ J Surg. 2013 Oct 28. doi:10.1111/ans.12224. [Epub ahead of print] No abstract available.",
      },
      {
        citation: "Rowland SP, Sheth H. An intraoperative cholangiogram: unusual anatomy. BMJ. 2013 Sep 13;347:f5238. doi:10.1136/bmj.f5238",
      },
      {
        citation:
          "Misro AK, Pal A, Sheth H. Endoscopic biopsy on patients taking antiplatelet agents: How much do we follow BSG, ASGE or ESGE guidelines? Indian J Gastroenterol. 2013 Oct 2. [Epub ahead of print] No abstract available. PMID:24085709",
      },
      {
        citation:
          "Sheth H, Hafez T, Glantzounis G, Sales K, Seifalian A, Fuller B, Davidson BR. Glycine reduces liver warm ischaemia reperfusion injury by improving the hepatic microcirculation and enhancing mitochondrial activity. Journal of Hepatology and Gastroenterology. 2010.",
      },
      {
        citation:
          "Gurusamy KS, Sheth H, Kumar Y, Sharma D, Davidson BR. Methods of vascular occlusion for elective liver resections. Cochrane Database Syst Rev. 2009 Jan 21;(1):CD007632.",
      },
      {
        citation:
          "Glantzounis GK, Sheth H, Thompson C, Hafez TS, Kanoria S, Pamecha V, Davies S, Mikhailidis DP, Seifalian AM, Davidson BR. Acute limb ischemia caused by femoral arterial line induces remote liver injury in a rabbit model of liver ischemia/reperfusion injury. Angiology. 2009 Oct-Nov;60(5):554-61.",
      },
      {
        citation:
          "Hafez T, Sheth H, Glantzounis G, Parkes H, Seifalian A, Fuller B, Davidson B. Glycine Protects Bile Physiology and Biliary-Specific Liver Cell Metabolism from Ischemia-Reperfusion Injury; a 1H NMR Study. Cell Preservation Technology. 2008;6:173-180.",
      },
      {
        citation: "Bajwa A, Sheth H, Hughes F. Fishbone perforation mimicking a gastric intramural tumour: a case report. Grand Rounds. 2007;7:42-44.",
      },
      {
        citation:
          "Bajwa A, Sheth H, Hughes F. Midgut malrotation as a rare cause of chronic abdominal pain: a case report and review of literature. Grand Rounds. 2007;7:67-69.",
      },
      {
        citation:
          "Glantzounis G, Rocks SA, Sheth H, Knight I, Salacinski HJ, Davidson BR, Winyard PG, Seifalian AM. Formation and role of plasma S-nitrosothiols in liver ischaemia-reperfusion injury. Free Radic Biol Med. 2007 Mar 15;42(6):882-92.",
      },
      {
        citation:
          "Fusai G, Glantzounis G, Hafez T, Yang W, Quaglia A, Sheth H, Kanoria S, Parkes H, Seifalian A, Davidson BR. N-Acetylcysteine ameliorates the late phase of liver ischaemia/reperfusion injury in the rabbit with hepatic steatosis. Clin Sci (Lond). 2005;109:465-73.",
      },
      {
        citation:
          "Sheth H, Javed SS, Hilson AJW, Buscombe JR, Davidson BR. Radioisotope bone scans in the preoperative staging of hepato-pancreato-biliary cancer. Br J Surg. 2005 Feb;92(2):203-7.",
      },
    ],
    "Sourced verbatim from the old site's biography page \"Research and Publications\" section, cleaned up for consistent citation formatting only (no facts changed, added, or removed). Citations/DOIs have not been independently checked to confirm they resolve or match. Only entries that were rendered as live links on the old site carry a url here — plain-text \"doi:\" mentions were left as text rather than turned into fabricated links."
  ),

  gpCourses: pending(
    ["GI Masterclass"],
    "Sourced verbatim from the old site's biography page (\"Courses offered to GPs\"); no further detail (frequency, format, how to enrol) was published there."
  ),

  reviewMeta: {
    status: "requires-clinical-review",
    author: "Practice content team",
    clinicalReviewer: null,
    publishedDate: "2026-09-02",
    lastReviewed: null,
  },
};

export const qualificationsPageContent: QualificationsPageContent = qualificationsPageContentSchema.parse(raw);
