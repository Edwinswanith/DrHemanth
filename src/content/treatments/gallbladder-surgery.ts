import { treatmentContentSchema, type TreatmentContent } from "@/lib/content/schema";

/**
 * Consolidates 5 near-duplicate old-site URLs into one authoritative page
 * — see docs/06-seo-migration-map.csv (rows matching the gallbladder/
 * cholecystectomy/gallstones cluster) and docs/content-briefs/treatments.md.
 *
 * Sourced from nhs.uk/conditions/gallstones/ (evidence tier:
 * reputable-secondary) and Guy's and St Thomas' NHS Foundation Trust's
 * patient-information pages (evidence tier: nhs-trust — see
 * docs/04-content-verification.md's hierarchy). Makes no claim about
 * Prof. Sheth's personal caseload, outcomes, or technique — see
 * src/content/treatments/hernia-surgery.ts for the fuller rationale this
 * file follows. Status is requires-clinical-review; never edit this to
 * say "approved" — only Prof. Sheth or an authorised clinical reviewer
 * can do that, outside this codebase.
 */
const raw: TreatmentContent = {
  slug: "gallbladder-surgery",
  name: "Gallbladder Surgery",
  metaDescription:
    "Gallbladder removal (cholecystectomy) explained: gallstone symptoms, keyhole vs open surgery, risks, recovery, and urgent warning signs.",
  mergedFromUrls: [
    "/laparoscopic-cholecystectomy-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/gallbladder-disease-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/gallstones-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/gallbladder-surgery-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/open-cholecystectomy-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
  ],
  summary:
    "Gallbladder removal surgery — a cholecystectomy — is the standard treatment for gallstones that are causing pain, blockages, or inflammation. The gallbladder is a small organ beneath the liver that stores bile; gallstones are small stones that can form inside it. Removing the gallbladder does not affect digestion in most people, and the operation is one of the most common planned general surgical procedures carried out in the UK.",
  symptomsOrReferralReasons: [
    "Biliary colic: sudden tummy pain, often under the right ribs or in the middle of the abdomen, that can feel severe and last from 30 minutes up to several hours",
    "Pain that comes on after eating, particularly fatty food",
    "Nausea or vomiting alongside the pain",
    "Gallstones found incidentally on a scan done for another reason",
  ],
  assessment:
    "Gallstones are usually diagnosed with an ultrasound scan and a blood test. Further imaging or tests may be used if a stone is suspected in the bile duct itself, or to assess the gallbladder before surgery.",
  treatmentOptions: [
    {
      title: "Watchful waiting",
      description:
        "Gallstones that cause no symptoms are often left alone and simply monitored, since not everyone with gallstones needs surgery.",
    },
    {
      title: "Laparoscopic (keyhole) cholecystectomy",
      description:
        "The standard approach for most patients: several small incisions (typically around 4, each roughly 0.5–1.5cm) are used to remove the gallbladder using a camera and specialised instruments, usually under a general anaesthetic and often taking under an hour.",
    },
    {
      title: "Open cholecystectomy",
      description:
        "A single larger incision is used to remove the gallbladder directly. This may be planned in advance for specific circumstances, or the surgical team may need to convert from keyhole to open surgery during the operation if unexpected inflammation or scar tissue makes the keyhole approach unsafe to continue — this happens in a minority of keyhole procedures.",
    },
  ],
  benefits: [
    "Removes the source of gallstone pain and reduces the risk of complications such as infection of the gallbladder, blocked bile ducts, or pancreatitis",
    "Keyhole surgery typically involves a same-day or next-day discharge for most patients and smaller scars than open surgery",
    "Most people do not need to make significant long-term changes to their diet afterwards",
  ],
  limitations: [
    "Not every patient or every gallbladder is suitable for keyhole surgery — significant inflammation or scar tissue can mean converting to open surgery during the operation",
    "As with any operation, there are anaesthetic and surgical risks to weigh against the benefits",
    "Some people notice looser stools or difficulty with fatty foods afterwards, though this is not universal",
  ],
  risks: [
    "Bleeding or infection at the incision sites",
    "Injury to the bile duct, or bile leakage, which may need further treatment",
    "Injury to nearby structures such as the bowel (uncommon)",
    "Needing to convert from keyhole to open surgery during the operation",
    "Blood clots (deep vein thrombosis) or, rarely, complications from the general anaesthetic such as a chest infection",
    "Temporary shoulder-tip pain from the gas used during keyhole surgery, and temporary numbness around the incisions",
  ],
  recovery:
    "Most people go home the same day as surgery, though some stay overnight. General anaesthetic effects usually wear off within 24–48 hours. Shoulder-tip pain from the gas used during surgery is common and usually settles within a few days — lying on your left side, gentle walking, and heat can help. Many people return to work within 1 to 4 weeks depending on their job and how they recover, and are usually advised to avoid heavy exercise for around 10–15 days. Your surgical team will give you guidance specific to your operation and recovery.",
  alternatives: [
    "Watchful waiting for gallstones causing no symptoms",
    "Medication to manage symptoms in specific circumstances, though this does not remove the gallstones",
    "In select cases, a procedure to remove a stone from the bile duct (ERCP) may be needed either instead of, or alongside, gallbladder removal — see bile duct exploration",
  ],
  urgentWarningSigns: [
    "Sudden, severe abdominal pain, especially if it spreads to your back and is accompanied by vomiting",
    "A high fever, or feeling hot, cold, or shivery",
    "Yellowing of the skin or the whites of the eyes (jaundice)",
    "After surgery: severe pain with nausea or vomiting, uncontrolled bleeding, fever, or increasing redness, swelling, or discharge from a wound",
    "These can be signs of infection, a blocked bile duct, or pancreatitis, and need urgent assessment — call 999 or go to your nearest A&E immediately. Do not wait for a routine appointment.",
  ],
  faqs: [
    {
      question: "Do all gallstones need to be removed?",
      answer:
        "No. Gallstones that aren't causing symptoms are often simply monitored. Surgery is usually recommended once gallstones start causing pain or complications, since the gallbladder itself will not heal around the stones and symptoms often recur.",
    },
    {
      question: "Will I need to change my diet after gallbladder removal?",
      answer:
        "Most people do not need to make significant long-term dietary changes. Some notice looser stools or discomfort with fatty foods, particularly in the weeks after surgery, but this is not universal and your surgical team can advise you if it happens.",
    },
    {
      question: "Why might keyhole surgery be changed to open surgery during the operation?",
      answer:
        "If the surgical team finds unexpected inflammation, scarring, or unclear anatomy that makes it unsafe to continue with keyhole instruments, they may convert to open surgery during the same operation. This happens in a minority of cases and is a safety decision made in your interest, not a sign that something has gone wrong.",
    },
  ],
  references: [
    { label: "NHS — Gallstones", url: "https://www.nhs.uk/conditions/gallstones/" },
    { label: "NHS — Gallbladder removal", url: "https://www.nhs.uk/conditions/gallbladder-removal/" },
    {
      label: "Guy's and St Thomas' NHS Foundation Trust — Gallbladder removal surgery (cholecystectomy)",
      url: "https://www.guysandstthomas.nhs.uk/health-information/gallbladder-removal-surgery-cholecystectomy",
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

export const gallbladderSurgeryContent: TreatmentContent = treatmentContentSchema.parse(raw);
