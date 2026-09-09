import { treatmentContentSchema, type TreatmentContent } from "@/lib/content/schema";

/**
 * Consolidates the old upper-GI endoscopy / upper-GI disease / achalasia
 * cluster into one patient-facing page. Old-site topics are preserved, but
 * the clinical prose is freshly written from NHS and NHS Trust
 * patient-information sources. Status stays requires-clinical-review until
 * Prof. Sheth or an authorised reviewer signs it off.
 */
const raw: TreatmentContent = {
  slug: "upper-gi-endoscopy",
  name: "Upper GI Endoscopy",
  metaDescription:
    "Upper GI endoscopy explained: why gastroscopy is done, preparation, sedation, biopsies, risks, recovery, and urgent warning signs.",
  mergedFromUrls: [
    "/upper-gi-endoscopy-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/upper-gi-procedures-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/upper-gastrointestinal-disease-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/achalasia-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
  ],
  summary:
    "An upper GI endoscopy, often called a gastroscopy, uses a thin flexible camera to examine the oesophagus, stomach, and the first part of the small bowel. It can help investigate symptoms such as reflux, indigestion, swallowing difficulty, black stools, vomiting blood, or possible upper digestive disease, and it can also allow biopsies or simple treatments during the same procedure.",
  symptomsOrReferralReasons: [
    "Persistent or severe indigestion, reflux, or upper abdominal discomfort",
    "Difficulty swallowing, food sticking, or symptoms that could suggest achalasia or narrowing",
    "Vomiting blood, black tar-like stools, unexplained anaemia, or unexplained weight loss",
    "Follow-up of ulcers, inflammation, Barrett's oesophagus, or previous abnormal results",
    "Need for biopsy, treatment of bleeding, removal of some growths, or stretching of a narrowing",
  ],
  assessment:
    "Assessment usually starts with a review of symptoms, medicines, previous tests, and whether sedation or throat spray is most suitable. The hospital will give fasting instructions and may advise changes to blood-thinning, diabetes, or acid-suppression medicines before the procedure. Biopsy results may take longer than the same-day endoscopy report.",
  treatmentOptions: [
    {
      title: "Diagnostic gastroscopy",
      description:
        "A camera test to inspect the oesophagus, stomach, and duodenum, with photographs and biopsies where needed.",
    },
    {
      title: "Therapeutic endoscopy",
      description:
        "Selected problems can be treated during endoscopy, such as stopping bleeding, removing some small growths, or stretching a narrowing.",
    },
    {
      title: "Sedation or throat spray",
      description:
        "Some patients choose local anaesthetic throat spray; others have conscious sedation, which means someone must take them home and stay with them afterwards.",
    },
  ],
  benefits: [
    "Directly examines the upper digestive tract rather than relying only on symptoms",
    "Can take biopsies that scans or X-rays cannot provide",
    "May diagnose and sometimes treat a problem during the same appointment",
  ],
  limitations: [
    "A normal endoscopy does not rule out every cause of symptoms",
    "Biopsy results may take days or weeks, so final diagnosis is not always available immediately",
    "Sedation affects driving, alcohol, machinery, and important decisions for 24 hours",
  ],
  risks: [
    "Temporary sore throat, bloating, burping, or stomach discomfort",
    "Reaction to sedation or breathing difficulty related to sedation",
    "Bleeding, especially if a biopsy or treatment is performed",
    "Infection, or very rarely a tear or hole in the digestive tract that may need further treatment",
    "Damage to loose teeth, crowns, bridges, or dental work",
  ],
  recovery:
    "Most people go home within a few hours. If you had sedation, someone should take you home and stay with you for 24 hours, and you should not drive, drink alcohol, operate machinery, or sign important documents during that time. A sore throat, bloating, or mild stomach discomfort usually settles within a short time.",
  alternatives: [
    "Medication review or acid-suppression treatment where symptoms are typical and low-risk",
    "Barium swallow or meal X-ray in selected swallowing problems",
    "CT or MRI where cross-sectional imaging is more appropriate",
    "Oesophageal physiology tests, such as manometry or pH monitoring, when reflux or motility needs specialist assessment",
  ],
  urgentWarningSigns: [
    "Severe or worsening chest or stomach pain after the procedure",
    "Vomiting blood or repeated vomiting",
    "Black tar-like stools, heavy bleeding, or passing blood",
    "Shortness of breath",
    "High temperature, or feeling hot, cold, or shivery",
  ],
  faqs: [
    {
      question: "Is an upper GI endoscopy painful?",
      answer:
        "It should not be painful, but it can feel uncomfortable and may cause gagging or bloating. Throat spray or conscious sedation can make the procedure easier to tolerate.",
    },
    {
      question: "Can I drive after gastroscopy?",
      answer:
        "If you have sedation, you should not drive for 24 hours. If you only have throat spray, follow the endoscopy unit's local advice before eating, drinking, or driving.",
    },
    {
      question: "Will I get the result on the day?",
      answer:
        "You may be told the initial findings before you leave. If biopsies are taken, the final result usually takes longer and may be discussed at a follow-up appointment or by letter.",
    },
  ],
  references: [
    { label: "NHS - Gastroscopy", url: "https://www.nhs.uk/tests-and-treatments/gastroscopy/" },
    {
      label: "Royal Free London NHS Foundation Trust - Having an upper gastrointestinal (GI) endoscopy",
      url: "https://www.royalfree.nhs.uk/patients-and-visitors/patient-information-leaflets/having-upper-gastrointestinal-gi-endoscopy",
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

export const upperGiEndoscopyContent: TreatmentContent = treatmentContentSchema.parse(raw);
