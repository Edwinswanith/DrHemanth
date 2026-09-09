import { treatmentContentSchema, type TreatmentContent } from "@/lib/content/schema";

/**
 * Consolidates the old appendectomy / appendicectomy URLs. Uses British
 * naming for the canonical route, while preserving the old US-spelled URL
 * in mergedFromUrls for redirects.
 */
const raw: TreatmentContent = {
  slug: "appendicectomy",
  name: "Appendicectomy",
  metaDescription:
    "Appendicectomy explained: appendicitis symptoms, keyhole vs open appendix surgery, risks, recovery, alternatives, and urgent warning signs.",
  mergedFromUrls: [
    "/appendectomy-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/appendicectomy-procedure-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
  ],
  summary:
    "Appendicectomy is an operation to remove the appendix, usually because appendicitis is suspected. Appendicitis happens when the appendix becomes inflamed or infected and can be difficult to diagnose. The operation is commonly performed using keyhole surgery, but open surgery may be needed in some situations.",
  symptomsOrReferralReasons: [
    "Pain that often starts around the middle of the tummy and moves to the lower right side",
    "Pain that worsens over hours, especially with movement, coughing, or pressure",
    "Feeling sick, vomiting, loss of appetite, fever, or generally feeling unwell",
    "Blood tests or imaging suggesting appendicitis",
    "A suspected appendix mass, abscess, or burst appendix needing specialist management",
  ],
  assessment:
    "Assessment usually includes examination, temperature and pulse checks, blood tests, urine testing, and sometimes ultrasound or CT scanning. If the diagnosis is uncertain, the team may repeat observations or arrange further imaging before deciding on surgery.",
  treatmentOptions: [
    {
      title: "Laparoscopic appendicectomy",
      description:
        "Keyhole appendix removal uses small cuts and a camera. It is common when appendicitis is suspected and the patient is fit for general anaesthetic.",
    },
    {
      title: "Open appendicectomy",
      description:
        "A larger incision is used where keyhole surgery is not suitable, if the appendix has burst, or if safety requires direct access.",
    },
    {
      title: "Antibiotics, drainage, or delayed surgery",
      description:
        "In selected cases, especially if an appendix mass or abscess has formed, antibiotics or drainage may be used first, with surgery delayed or reconsidered later.",
    },
  ],
  benefits: [
    "Removes the inflamed appendix and treats the source of appendicitis in most cases",
    "Can reduce the risk of a burst appendix or ongoing infection when surgery is indicated",
    "Keyhole surgery usually leaves smaller wounds and may support quicker mobilisation than open surgery",
  ],
  limitations: [
    "Appendicitis can be difficult to diagnose, and sometimes the appendix is found to be normal",
    "Antibiotics may be suitable for selected patients but appendicitis can recur",
    "Recovery is longer if the appendix has burst, an abscess has formed, or open surgery is needed",
  ],
  risks: [
    "Bleeding, bruising, wound infection, or infection inside the abdomen or chest",
    "Abscess where the appendix was removed",
    "Scar tissue causing bowel blockage in rare cases",
    "Injury to nearby organs or structures",
    "Urinary retention, ileus, or blood clots in the legs or lungs",
    "Appendicitis recurring in a small remaining stump of appendix tissue",
  ],
  recovery:
    "Many people recover from appendicitis and appendix surgery within 1 to 2 weeks, but recovery can take longer after complications such as a burst appendix. After keyhole surgery, some patients can go home the next day; open surgery or complications may mean a longer stay. Follow your local discharge instructions for wound care, activity, work, driving, and pain relief.",
  alternatives: [
    "Observation and repeat assessment if the diagnosis is uncertain",
    "Antibiotics instead of immediate surgery in selected cases",
    "Drainage of an abscess followed by delayed review if an appendix mass has formed",
  ],
  urgentWarningSigns: [
    "Worsening abdominal pain, persistent vomiting, or inability to keep fluids down",
    "High temperature, shivering, confusion, or feeling seriously unwell",
    "Increasing redness, swelling, leakage, pus, or bleeding from a wound",
    "Pain in the calves, shortness of breath, chest pain, or fainting",
    "Symptoms of appendicitis that are rapidly worsening before treatment",
  ],
  faqs: [
    {
      question: "Is appendicectomy usually an emergency operation?",
      answer:
        "It is often urgent because untreated appendicitis can worsen or burst. Some cases are managed first with antibiotics, observation, or drainage, depending on the diagnosis and risk.",
    },
    {
      question: "What is the difference between appendectomy and appendicectomy?",
      answer:
        "They mean the same operation: removal of the appendix. Appendicectomy is the usual British spelling and is used for this website's canonical page.",
    },
    {
      question: "How long does recovery take?",
      answer:
        "Many people need around 1 to 2 weeks before returning to usual activities, but this varies. Recovery may take longer after open surgery, a burst appendix, or infection.",
    },
  ],
  references: [
    { label: "NHS - Appendicitis", url: "https://www.nhs.uk/conditions/appendicitis/" },
    {
      label: "Guy's and St Thomas' NHS Foundation Trust - Appendicectomy",
      url: "https://www.guysandstthomas.nhs.uk/health-information/appendicectomy",
    },
    {
      label: "Guy's and St Thomas' NHS Foundation Trust - Recovery after an appendicectomy",
      url: "https://www.guysandstthomas.nhs.uk/health-information/appendicectomy/recovery-after-appendicectomy",
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

export const appendicectomyContent: TreatmentContent = treatmentContentSchema.parse(raw);
