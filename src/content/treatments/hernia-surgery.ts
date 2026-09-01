import { treatmentContentSchema, type TreatmentContent } from "@/lib/content/schema";

/**
 * Consolidates 10 near-duplicate old-site URLs into one authoritative page
 * — see docs/06-seo-migration-map.csv (rows matching the hernia-repair /
 * hernia-general clusters) and docs/content-briefs/treatments.md.
 *
 * Every clinical fact below is sourced from NHS patient-information pages
 * (tier: reputable-secondary in docs/04-content-verification.md's evidence
 * hierarchy — not yet client-approved practice material) and general,
 * well-established surgical knowledge. Nothing here describes Prof.
 * Sheth's personal caseload, outcomes, or which technique he uses for a
 * given patient — that requires his direct input and stays out of this
 * page until confirmed. Status is deliberately requires-clinical-review:
 * this file must never be edited to say "draft" is "approved" — only
 * Prof. Sheth or an authorised clinical reviewer can do that, outside this
 * codebase (see .claude/rules/medical-content.md).
 */
const raw: TreatmentContent = {
  slug: "hernia-surgery",
  name: "Hernia Surgery",
  metaDescription:
    "Hernia surgery explained: symptoms, when repair is needed, open vs keyhole techniques, risks, recovery, and urgent warning signs.",
  mergedFromUrls: [
    "/hernia-repair-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/laparoscopic-hernia-repair-tep-and-tapp-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/hernia-surgery-procedures-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/hernia-treatments-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/open-inguinal-hernia-repair-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/laparoscopic-inguinal-hernia-repair-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/femoral-hernia-repair-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/umbilical-hernia-repair-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/incisional-hernia-repair-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/surgery-for-diaphragmatic-hernias-general-laparoscopic-surgeon-Hertfordshire-harrow-london/",
  ],
  summary:
    "A hernia occurs when part of an internal organ or tissue, often the bowel, pushes through a weak spot in the surrounding muscle wall — most commonly in the groin (inguinal or femoral hernia), at the belly button (umbilical hernia), through a previous surgical scar (incisional hernia), or through the diaphragm (hiatus hernia). Surgery is the only way to repair a hernia, though not every hernia needs immediate surgery.",
  symptomsOrReferralReasons: [
    "A visible or palpable bulge or swelling, which may become more noticeable when coughing, straining, or standing",
    "Discomfort, aching, or heaviness around the affected area, particularly with activity",
    "A bulge that can be pushed back in (reducible) or one that cannot (irreducible) — the latter needs prompt assessment",
    "For a hiatus hernia specifically: symptoms similar to acid reflux or indigestion",
  ],
  assessment: "Diagnosis is usually made from a clinical examination. Imaging such as ultrasound or CT may be used where the diagnosis is uncertain, the hernia is difficult to feel, or to help plan surgery.",
  treatmentOptions: [
    {
      title: "Watchful waiting",
      description:
        "For some small, symptom-free hernias, monitoring rather than immediate surgery may be appropriate, with a plan to review if symptoms develop or change.",
    },
    {
      title: "Open surgical repair",
      description:
        "A single, larger incision is made over the hernia, the tissue is repositioned, and the weakness in the muscle wall is closed, typically reinforced with a synthetic mesh.",
    },
    {
      title: "Laparoscopic (keyhole) repair",
      description:
        "Several small incisions are used with a camera and specialised instruments to repair the hernia from inside the abdomen, usually also using mesh.",
    },
    {
      title: "Robotic-assisted repair",
      description:
        "A minimally invasive approach in which the surgeon controls wristed instruments from a console. Availability depends on the hospital and is not appropriate or available for every patient or every type of hernia — see the robotic vs laparoscopic comparison for how the approaches differ.",
    },
  ],
  benefits: [
    "Surgical repair treats the underlying defect, rather than just managing symptoms",
    "Keyhole and robotic-assisted approaches typically involve smaller incisions than open surgery, which for many patients is associated with a quicker return to normal activity",
    "Most people make a full recovery",
  ],
  limitations: [
    "Not every technique is suitable for every hernia — the right approach depends on the hernia's size, location, and the patient's individual circumstances",
    "Robotic-assisted and laparoscopic approaches require specific equipment and surgical training, and are not universally available",
    "As with any surgery, there is no guarantee against the hernia recurring",
  ],
  risks: [
    "Wound infection",
    "Bruising, which can last several weeks",
    "Temporary numbness or a pulling sensation near the wound",
    "The hernia returning (recurrence)",
    "Rarely, damage to nearby structures, or blood clots (DVT or pulmonary embolism)",
  ],
  recovery:
    "Most people go home the same day. A responsible adult should accompany you home and stay with you for the first 24 hours. Recovery timelines vary by technique and individual circumstances: after keyhole surgery it is often 1–2 weeks before returning to normal, non-strenuous activity, while open surgery typically needs around 4 weeks before heavy lifting or strenuous exercise. Full recovery for many patients takes up to 4–6 weeks, though this can take longer. Your surgical team will give you guidance specific to your operation.",
  alternatives: [
    "Watchful waiting for select, symptom-free hernias (see Treatment options above)",
    "Supportive measures such as weight management, which may reduce strain on the area",
    "A truss or supportive garment may be considered in specific circumstances, though this does not repair the hernia itself and is not a substitute for surgery when repair is needed",
  ],
  urgentWarningSigns: [
    "Sudden, severe pain at the hernia site",
    "The hernia becomes hard, tender, or changes colour",
    "The bulge cannot be pushed back in and is increasingly painful",
    "Nausea, vomiting, fever, or inability to pass stool or wind alongside hernia pain",
    "These can be signs of a strangulated hernia, a medical emergency — call 999 or go to your nearest A&E immediately. Do not wait for a routine appointment.",
  ],
  faqs: [
    {
      question: "Do all hernias need surgery?",
      answer:
        "Not immediately. Some small, symptom-free hernias can be monitored, but a hernia will not repair itself and surgery is the only way to fix it permanently. Your surgeon can discuss whether watchful waiting or repair is more appropriate for your situation.",
    },
    {
      question: "What is the difference between open, keyhole, and robotic-assisted repair?",
      answer:
        "All three repair the same underlying defect. Open surgery uses one larger incision; keyhole (laparoscopic) surgery uses several small incisions with a camera; robotic-assisted surgery is a form of keyhole surgery where the surgeon controls the instruments from a console. See the robotic vs laparoscopic comparison page for a fuller explanation.",
    },
    {
      question: "How soon can I return to work?",
      answer:
        "This depends on the technique used and the nature of your work. Many people return to light activities within 1–2 weeks, though manual or physically demanding jobs may need longer. Your surgical team will advise based on your specific operation.",
    },
  ],
  references: [
    { label: "NHS — Hernia", url: "https://www.nhs.uk/conditions/hernia/" },
    { label: "NHS — Inguinal hernia repair", url: "https://www.nhs.uk/conditions/inguinal-hernia-repair/" },
  ],
  reviewMeta: {
    status: "requires-clinical-review",
    author: "Practice content team",
    clinicalReviewer: null,
    publishedDate: "2026-09-01",
    lastReviewed: null,
  },
};

export const herniaSurgeryContent: TreatmentContent = treatmentContentSchema.parse(raw);
