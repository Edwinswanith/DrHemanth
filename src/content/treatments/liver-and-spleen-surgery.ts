import { treatmentContentSchema, type TreatmentContent } from "@/lib/content/schema";

/**
 * Consolidates the old HPB, liver, bile-tract cancer, liver resection,
 * abnormal liver tests, liver masses, and splenectomy URLs into one
 * cautious overview. Cancer and current service-line claims need direct
 * practice confirmation; this page is therefore noindexed and marked for
 * clinical review.
 */
const raw: TreatmentContent = {
  slug: "liver-and-spleen-surgery",
  name: "Liver and Spleen Surgery",
  metaDescription:
    "Liver and spleen surgery overview: liver tests, liver masses, liver resection, splenectomy, risks, recovery, and urgent warning signs.",
  mergedFromUrls: [
    "/hepatobiliary-disease-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/treatments-for-hpb-disorders-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/biliary-tract-cancer-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/investigation-of-abnormal-liver-enzymes-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/liver-disease-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/liver-masses-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/liver-cancer-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/laparoscopic-liver-resection-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
    "/splenectomy-general-laparoscopic-surgeon-hertfordshire-harrow-london/",
  ],
  summary:
    "This page covers selected hepatobiliary and spleen-related conditions, including abnormal liver blood tests, liver masses, liver resection, biliary tract cancer pathways, and splenectomy. These are higher-complexity areas that often need imaging, blood tests, multidisciplinary review, and careful discussion of whether surgery, surveillance, or non-surgical treatment is most appropriate.",
  symptomsOrReferralReasons: [
    "Abnormal liver blood tests or imaging that needs specialist interpretation",
    "A liver cyst, lesion, mass, or suspected tumour found on ultrasound, CT, or MRI",
    "Gallbladder or bile-duct disease where liver or bile-flow problems are suspected",
    "A damaged, enlarged, overactive, or diseased spleen where splenectomy has been discussed",
    "Jaundice, unexplained weight loss, persistent right upper abdominal pain, or recurrent infections needing urgent review",
  ],
  assessment:
    "Assessment may include liver function blood tests, clotting tests, full blood count, tumour markers where appropriate, ultrasound, CT, MRI, MRCP, endoscopy, or specialist MDT review. For spleen surgery, assessment also includes infection-risk planning, vaccination status, and whether antibiotics or emergency precautions are needed before and after surgery.",
  treatmentOptions: [
    {
      title: "Further investigation or surveillance",
      description:
        "Some abnormal blood tests, cysts, or liver lesions are monitored or investigated further rather than treated immediately.",
    },
    {
      title: "Laparoscopic or open liver resection",
      description:
        "Selected benign or malignant liver lesions may be removed by keyhole or open surgery, depending on location, size, liver reserve, and the overall treatment plan.",
    },
    {
      title: "Splenectomy",
      description:
        "Removal of all or part of the spleen may be needed if the spleen is damaged, diseased, enlarged, overactive, or contains a growth. Keyhole surgery is common where suitable, but open surgery may be needed.",
    },
    {
      title: "Non-surgical specialist treatment",
      description:
        "Cancer, bile-duct disease, and complex liver disease may need oncology, interventional radiology, hepatology, endoscopy, or transplant-service input rather than surgery alone.",
    },
  ],
  benefits: [
    "Can remove selected diseased liver or spleen tissue when surgery is the right treatment",
    "May provide diagnosis and treatment planning when imaging or biopsy suggests a significant lesion",
    "Keyhole approaches, where suitable, can reduce incision size and may support a shorter hospital stay than open surgery",
  ],
  limitations: [
    "Not every liver or spleen problem is best treated surgically",
    "Liver surgery depends heavily on what healthy liver will remain, not only on what is removed",
    "After spleen removal, infection precautions are lifelong and must be taken seriously",
    "Cancer-related treatment usually needs multidisciplinary planning rather than a single-procedure decision",
  ],
  risks: [
    "Bleeding, infection, pain, blood clots, or chest infection after major abdominal surgery",
    "Bile leak, fluid collection, jaundice, or reduced liver function after liver surgery",
    "Need for intensive monitoring, longer hospital stay, or further procedures if complications occur",
    "Conversion from keyhole to open surgery if anatomy, bleeding, scar tissue, or safety requires it",
    "After splenectomy, a lifelong increased risk of serious infection, including sepsis",
    "Anaesthetic complications and, rarely, life-threatening complications from major surgery",
  ],
  recovery:
    "Recovery varies widely by procedure and by whether surgery is keyhole or open. Liver surgery often requires several days in hospital and a longer recovery at home. Keyhole spleen removal may allow same-day or overnight discharge for some patients, while open surgery or emergency surgery usually needs longer. Your team will give specific advice on wound care, activity, blood-clot prevention, vaccines, antibiotics, and follow-up.",
  alternatives: [
    "Observation, repeat blood tests, or repeat imaging for low-risk findings",
    "Hepatology review for liver disease managed medically",
    "Endoscopy or interventional radiology for selected bile-duct or liver problems",
    "Oncology, ablation, chemotherapy, or other specialist treatments where cancer is suspected or confirmed",
    "Treating the underlying cause of spleen enlargement rather than removing the spleen, where appropriate",
  ],
  urgentWarningSigns: [
    "New or worsening jaundice, dark urine, pale stools, or severe itching",
    "High temperature, shivering, confusion, or feeling suddenly very unwell, especially after spleen removal",
    "Severe or worsening abdominal pain, persistent vomiting, or a swollen abdomen",
    "Heavy wound bleeding, pus, spreading redness, or wound breakdown",
    "Shortness of breath, chest pain, calf swelling, or fainting",
  ],
  faqs: [
    {
      question: "Does every liver mass need surgery?",
      answer:
        "No. Many liver findings need careful imaging and specialist review first. Some are monitored, some need further tests, and only selected cases are treated with surgery.",
    },
    {
      question: "Can you live without a spleen?",
      answer:
        "Yes, other organs can take over many spleen functions, but infection risk is higher for life. Vaccinations, antibiotics, alert cards, and urgent treatment for fever may be needed.",
    },
    {
      question: "Is liver surgery always keyhole surgery?",
      answer:
        "No. Keyhole surgery may be suitable for selected cases, but open surgery may be safer or necessary depending on the liver segment involved, the size and position of the lesion, and the patient's overall condition.",
    },
  ],
  references: [
    {
      label: "University Hospitals Plymouth NHS Trust - Liver surgery",
      url: "https://www.plymouthhospitals.nhs.uk/display-pil/pil-liver-surgery-7660/",
    },
    {
      label: "NHS - Spleen problems and spleen removal",
      url: "https://www.nhs.uk/tests-and-treatments/spleen-problems-and-spleen-removal/",
    },
    {
      label: "GOV.UK - Information for patients with an absent or dysfunctional spleen",
      url: "https://www.gov.uk/government/publications/splenectomy-leaflet-and-card/information-for-patients-with-an-absent-or-dysfunctional-spleen",
    },
    { label: "NICE - Laparoscopic liver resection", url: "https://www.nice.org.uk/guidance/htg83" },
  ],
  reviewMeta: {
    status: "requires-clinical-review",
    author: "Practice content team",
    clinicalReviewer: null,
    publishedDate: "2026-09-01",
    lastReviewed: null,
  },
};

export const liverAndSpleenSurgeryContent: TreatmentContent = treatmentContentSchema.parse(raw);
