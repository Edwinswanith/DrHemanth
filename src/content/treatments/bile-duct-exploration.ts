import { treatmentContentSchema, type TreatmentContent } from "@/lib/content/schema";

/**
 * Consolidates 4 near-duplicate old-site URLs into one authoritative page
 * — see docs/06-seo-migration-map.csv (rows matching the bile duct
 * exploration / choledocholithiasis / ERCP cluster) and
 * docs/content-briefs/treatments.md.
 *
 * Sourced from Guy's and St Thomas' NHS Foundation Trust's ERCP
 * patient-information page and North Bristol NHS Trust's laparoscopic
 * bile duct exploration page (both evidence tier: nhs-trust — see
 * docs/04-content-verification.md's hierarchy). This procedure carries a
 * more significant risk profile than hernia or gallbladder surgery
 * (ERCP has a small but real mortality risk from severe pancreatitis),
 * so the risk figures below are stated precisely rather than vaguely —
 * omitting them or softening them would be less safe for informed
 * decision-making, not more. Makes no claim about Prof. Sheth's personal
 * caseload, outcomes, or which approach he uses for a given patient.
 * Status is requires-clinical-review; never edit this to say "approved"
 * — only Prof. Sheth or an authorised clinical reviewer can do that,
 * outside this codebase.
 */
const raw: TreatmentContent = {
  slug: "bile-duct-exploration",
  name: "Bile Duct Exploration",
  metaDescription:
    "Bile duct stones explained: symptoms, ERCP vs laparoscopic bile duct exploration, risks, recovery, and urgent warning signs.",
  mergedFromUrls: [
    "/laparoscopic-common-bile-duct-exploration-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/choledocholithiasis-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/laparoscopic-cbd-exploration-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/endoscopic-retrograde-cholangiopancreatography-ercp-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
  ],
  summary:
    "Gallstones that slip out of the gallbladder into the common bile duct (a condition called choledocholithiasis) can block the flow of bile, causing jaundice, infection, or inflammation of the pancreas. Stones in the bile duct are treated either endoscopically, with a procedure called ERCP, or surgically, with laparoscopic bile duct exploration — often done at the same time as gallbladder removal.",
  symptomsOrReferralReasons: [
    "Jaundice — yellowing of the skin or the whites of the eyes",
    "Itching, dark urine, or pale stools",
    "Abdominal pain, particularly under the right ribs",
    "Abnormal liver blood tests, with or without pain",
    "Imaging (such as an ultrasound) showing a stone or blockage in the bile duct",
  ],
  assessment:
    "Diagnosis is usually based on blood tests (liver function tests) and imaging such as ultrasound, MRI (MRCP), or CT. These help confirm whether a stone or blockage is present in the bile duct and guide which treatment approach is most appropriate.",
  treatmentOptions: [
    {
      title: "ERCP (endoscopic retrograde cholangiopancreatography)",
      description:
        "A flexible camera (endoscope) is passed through the mouth to the small intestine, using X-ray imaging to locate and treat blockages in the bile duct — for example, removing a stone or placing a stent. This is a non-surgical procedure, usually done under sedation, and most patients go home the same day.",
    },
    {
      title: "Laparoscopic bile duct exploration",
      description:
        "A surgical approach in which the bile duct is explored with a camera and instruments, usually through small incisions, to remove stones directly. This is often performed at the same time as a laparoscopic gallbladder removal, avoiding the need for a separate procedure.",
    },
  ],
  benefits: [
    "Clears the blockage causing jaundice, pain, or the risk of infection and pancreatitis",
    "ERCP can often treat the bile duct without an operation, with same-day discharge for most patients",
    "Combining bile duct exploration with gallbladder removal, where appropriate, can avoid the need for two separate procedures",
  ],
  limitations: [
    "Not every stone or blockage is suitable for every technique — the right approach depends on the individual situation",
    "ERCP is not always successful in clearing a stone in a single procedure and can occasionally need to be repeated",
    "As with any laparoscopic procedure, bile duct exploration can occasionally need to be converted to an open operation if scar tissue or technical difficulty makes it unsafe to continue",
  ],
  riskStatisticsNote:
    "The figures below are general rates reported in UK NHS patient-information materials for these procedures nationally — they are not Prof. Sheth's personal or practice-specific results. Your own individual risk will be discussed with you before any procedure.",
  risks: [
    "ERCP: inflammation of the pancreas (pancreatitis), which is the most common significant complication, affecting around 5 in 100 procedures — the great majority are mild, though rarely (fewer than 1 in 500) pancreatitis can be severe and, in rare cases, life-threatening",
    "ERCP: bleeding after the procedure, usually minor and often managed at the time",
    "ERCP: infection of the bile duct (cholangitis), and rarely, perforation of the bowel wall (fewer than 1 in 750) or breathing problems related to sedation",
    "Laparoscopic bile duct exploration: bile leakage from the area operated on, which usually settles on its own within a few days",
    "Laparoscopic bile duct exploration: possible conversion to open surgery if the operation proves difficult",
    "Both approaches: general risks of anaesthesia or sedation",
  ],
  recovery:
    "After ERCP, you'll usually stay in the endoscopy unit for 4 to 6 hours to be monitored, and will need someone to take you home and stay with you overnight if you had sedation. Some abdominal discomfort or bloating for a few days afterwards is common. After laparoscopic bile duct exploration, an overnight hospital stay is usual, with most people going home the next day. Your surgical or endoscopy team will give you guidance specific to your procedure.",
  alternatives: [
    "Watchful monitoring may be appropriate for a stone causing no symptoms, discussed on a case-by-case basis",
    "Where gallbladder removal is also needed, the timing and order of ERCP and gallbladder surgery can vary, and your team will discuss which sequence suits your situation",
  ],
  urgentWarningSigns: [
    "Yellowing of the skin or eyes that is new or worsening",
    "High fever, or feeling hot, cold, or shivery",
    "Severe abdominal pain, particularly spreading to the back, with nausea or vomiting",
    "After a procedure: severe or worsening pain, vomiting, black or tarry stools, or heavy bleeding",
    "These can be signs of infection, pancreatitis, or bleeding, and need urgent assessment — call 999 or go to your nearest A&E immediately. Do not wait for a routine appointment.",
  ],
  faqs: [
    {
      question: "What is the difference between ERCP and laparoscopic bile duct exploration?",
      answer:
        "ERCP is a non-surgical, endoscopic procedure done by passing a camera through the mouth. Laparoscopic bile duct exploration is a surgical, keyhole procedure, often combined with gallbladder removal. Which is more suitable depends on your individual situation, and your team will discuss this with you.",
    },
    {
      question: "Is ERCP a common procedure?",
      answer:
        "Yes, ERCP is a widely performed procedure across the NHS for bile duct problems. Like any procedure, it carries risks — most people have no significant problems, though the risks, including a small chance of pancreatitis, should be discussed with you beforehand as part of informed consent.",
    },
    {
      question: "Will I need to have my gallbladder removed too?",
      answer:
        "Not always, but bile duct stones and gallstones often occur together, and your team may recommend gallbladder removal at the same time as, or shortly after, bile duct treatment to reduce the risk of further stones forming. See gallbladder surgery for more detail.",
    },
  ],
  references: [
    {
      label: "Guy's and St Thomas' NHS Foundation Trust — ERCP (endoscopic retrograde cholangio pancreatography)",
      url: "https://www.guysandstthomas.nhs.uk/health-information/ercp-endoscopic-retrograde-cholangio-pancreatography",
    },
    {
      label: "North Bristol NHS Trust — Laparoscopic bile duct exploration",
      url: "https://www.nbt.nhs.uk/our-services/a-z-services/upper-gastro-intestinal-surgery/laparoscopic-bile-duct-exploration",
    },
  ],
  reviewMeta: {
    status: "requires-clinical-review",
    author: "Practice content team",
    clinicalReviewer: null,
    publishedDate: "2026-09-01",
    lastReviewed: null,
  },
};

export const bileDuctExplorationContent: TreatmentContent = treatmentContentSchema.parse(raw);
