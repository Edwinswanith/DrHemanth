import { treatmentContentSchema, type TreatmentContent } from "@/lib/content/schema";

/**
 * Consolidates the old GERD and anti-reflux surgery URLs. Hiatus hernia is
 * discussed because it is clinically related, while its old standalone URL
 * remains mapped to the broader hernia page in the migration map.
 */
const raw: TreatmentContent = {
  slug: "anti-reflux-surgery",
  name: "Anti-Reflux Surgery",
  metaDescription:
    "Anti-reflux surgery explained: GORD symptoms, tests before fundoplication, surgical options, risks, recovery, and alternatives.",
  mergedFromUrls: [
    "/gastroesophageal-reflux-disease-gerd-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/anti-reflux-surgery-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
  ],
  summary:
    "Anti-reflux surgery is considered for selected people with gastro-oesophageal reflux disease (GORD) whose symptoms remain severe despite medicines and lifestyle changes, or where long-term treatment needs careful review. Fundoplication is the main operation: the upper part of the stomach is wrapped around the lower oesophagus to strengthen the valve mechanism that helps stop acid reflux.",
  symptomsOrReferralReasons: [
    "Frequent heartburn or acid regurgitation despite appropriate medical treatment",
    "Reflux symptoms affecting sleep, eating, voice, cough, or quality of life",
    "Symptoms returning when acid-suppression medicine is stopped",
    "A hiatus hernia contributing to reflux symptoms",
    "Need for specialist tests before deciding whether surgery is appropriate",
  ],
  assessment:
    "Before surgery, patients usually need tests to confirm reflux and check whether symptoms are likely to improve with an operation. This can include gastroscopy, oesophageal manometry, pH or impedance monitoring, and imaging such as a barium swallow. Pre-assessment also checks fitness for general anaesthetic and medicines that may need adjustment.",
  treatmentOptions: [
    {
      title: "Lifestyle and medicine review",
      description:
        "Diet timing, weight, smoking, alcohol, trigger foods, antacids, alginates, H2 blockers, or proton pump inhibitors may be reviewed before surgery is considered.",
    },
    {
      title: "Laparoscopic fundoplication",
      description:
        "Keyhole surgery uses small incisions to wrap the upper stomach around the lower oesophagus. A hiatus hernia, if present and suitable, is usually repaired during the same operation.",
    },
    {
      title: "Partial or complete wrap",
      description:
        "Different wraps, such as Nissen, Toupet, Dor, or Watson-style approaches, may be considered depending on anatomy and oesophageal function.",
    },
  ],
  benefits: [
    "Can reduce reflux in appropriately selected patients when symptoms are not controlled by non-surgical treatment",
    "May reduce reliance on long-term acid-suppression medicine for some patients",
    "Keyhole surgery usually avoids one large abdominal incision and supports earlier mobilisation than open surgery",
  ],
  limitations: [
    "Surgery is not suitable for every reflux symptom pattern, especially if tests do not show reflux as the main cause",
    "Some patients develop swallowing difficulty, gas-bloat, or reduced ability to burp or vomit",
    "Symptoms can recur and some patients may need further investigation or repeat surgery",
  ],
  risks: [
    "Bleeding, infection, or general anaesthetic complications",
    "Injury to the oesophagus, stomach, blood vessels, or nearby organs",
    "Difficulty swallowing, especially in the early recovery period",
    "Bloating, trapped wind, increased flatulence, or reduced ability to burp or vomit",
    "Wrap migration, slippage, recurrent reflux, or need for further surgery",
    "Conversion from keyhole to open surgery if it is not safe to continue laparoscopically",
  ],
  recovery:
    "Hospital stay is often 1 to 3 days after fundoplication, and longer if open surgery is needed. Recovery commonly includes a staged diet of liquids, blended food, then soft food for several weeks. Heavy activity is usually avoided for around 6 weeks, and return to work depends on the operation and job demands.",
  alternatives: [
    "Continuing proton pump inhibitor or other reflux medicines under medical review",
    "Lifestyle measures such as smaller meals, avoiding late meals, reducing triggers, stopping smoking, and weight management where relevant",
    "Further diagnostic testing if symptoms may come from another condition",
  ],
  urgentWarningSigns: [
    "Severe chest or abdominal pain after surgery",
    "Persistent vomiting or inability to keep fluids down",
    "Vomiting blood",
    "Food getting stuck with significant difficulty swallowing",
    "High temperature, unusually severe pain, or feeling very unwell",
  ],
  faqs: [
    {
      question: "Is anti-reflux surgery the same as hiatus hernia surgery?",
      answer:
        "They are related but not identical. If a hiatus hernia is contributing to reflux, it may be repaired during fundoplication, but the operation and suitability depend on your tests and anatomy.",
    },
    {
      question: "Will I be able to stop reflux medicine after surgery?",
      answer:
        "Some people reduce or stop acid-suppression medicine after successful surgery, but this is not guaranteed. Your surgeon will discuss realistic aims before you decide.",
    },
    {
      question: "Why are swallowing tests needed before surgery?",
      answer:
        "Oesophageal function tests help show whether the food pipe moves normally. This helps guide whether surgery is suitable and what type of wrap may be safer.",
    },
  ],
  references: [
    { label: "NHS - Heartburn and acid reflux", url: "https://www.nhs.uk/conditions/heartburn-and-acid-reflux/" },
    {
      label: "Guy's and St Thomas' NHS Foundation Trust - Fundoplication surgery for severe acid reflux",
      url: "https://www.guysandstthomas.nhs.uk/health-information/fundoplication-surgery-severe-acid-reflux",
    },
    {
      label: "Guy's and St Thomas' NHS Foundation Trust - Recovery and diet after fundoplication surgery",
      url: "https://www.guysandstthomas.nhs.uk/health-information/fundoplication-surgery-severe-acid-reflux/recovery-and-diet-after-surgery",
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

export const antiRefluxSurgeryContent: TreatmentContent = treatmentContentSchema.parse(raw);
