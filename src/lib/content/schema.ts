import { z } from "zod";

const verificationStatus = z.enum(["verified", "pending", "blocked", "retired"]);
const evidenceTier = z.enum([
  "gmc",
  "nhs-trust",
  "hospital-profile",
  "academic-institution",
  "professional-body",
  "peer-reviewed",
  "client-approved-material",
  "reputable-secondary",
  "local-news-context-only",
  "unverified",
]);

export function verifiedFact<T extends z.ZodTypeAny>(valueSchema: T) {
  return z.object({
    value: valueSchema,
    status: verificationStatus,
    tier: evidenceTier,
    note: z.string().optional(),
  });
}

export const navItemSchema: z.ZodType<{
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}> = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  children: z
    .array(z.object({ label: z.string().min(1), href: z.string().min(1) }))
    .optional(),
});

export const siteConfigSchema = z.object({
  name: z.string().min(1),
  legalName: z.string().min(1),
  url: z.string().url(),
  shortDescription: z.string().min(1),
  emergencyNotice: z.string().min(1),
  requestNotConfirmedNotice: z.string().min(1),
  primaryTelephone: verifiedFact(z.string().min(1)),
});

export const contactChannelSchema = z.object({
  label: z.string().min(1),
  telephone: verifiedFact(z.string().min(1)).optional(),
  email: verifiedFact(z.string().email()).optional(),
});

export const surgeonProfileSchema = z.object({
  fullName: z.string().min(1),
  displayTitle: verifiedFact(z.string().min(1)),
  qualifications: verifiedFact(z.array(z.string().min(1))),
  gmcNumber: verifiedFact(z.string().min(1).nullable()),
  currentNhsRole: verifiedFact(z.string().min(1)),
  positioningStatement: z.string().min(1),
  professionalMemberships: verifiedFact(z.array(z.string().min(1))),
  languagesSpoken: verifiedFact(z.array(z.string().min(1))),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type SurgeonProfile = z.infer<typeof surgeonProfileSchema>;
export type NavItem = z.infer<typeof navItemSchema>;

export const locationSchema = z.object({
  name: z.string().min(1),
  area: z.string().min(1),
  addressLines: z.array(z.string().min(1)).min(1),
  hours: z.array(z.string().min(1)),
  phone: z.string().min(1),
  directionsHref: z.string().url(),
  secretary: z.string().min(1),
  secretaryEmail: z.string().email(),
  status: verificationStatus,
  imageSrc: z.string().min(1).optional(),
  imageAlt: z.string().min(1).optional(),
  imageFit: z.enum(["contain", "cover"]).optional(),
});

export const consultationFeeSchema = z.object({
  type: z.string().min(1),
  telephonic: z.string().min(1),
  faceToFace: z.string().min(1),
});

export type Location = z.infer<typeof locationSchema>;
export type ConsultationFee = z.infer<typeof consultationFeeSchema>;

/**
 * Qualifications & Professional Memberships page — split out of the
 * (still-blocked) `/about` route per docs/02-information-architecture.md,
 * because none of this content depends on the unresolved canonical-title
 * decision. Every fact is old-site-sourced and unverified — see
 * docs/04-content-verification.md.
 */
export const qualificationEntrySchema = z.object({
  credential: z.string().min(1),
  awardingBody: z.string().min(1),
  year: z.string().min(1),
});

export const professionalPositionSchema = z.object({
  role: z.string().min(1),
  body: z.string().min(1).optional(),
  year: z.string().min(1).optional(),
});

export const researchProjectSchema = z.object({
  title: z.string().min(1),
  submittedFor: z.string().min(1),
  summary: z.string().min(1),
});

export const publicationSchema = z.object({
  citation: z.string().min(1),
  url: z.string().url().optional(),
});

/**
 * Shared review-status block for every page carrying clinical/professional
 * facts (not just the 13-part treatment shape). `status` mirrors
 * MedicalContentStatus (src/types/medical.ts): Claude may only ever write
 * "draft" or "requires-clinical-review" here — enforced by the enum below,
 * which deliberately has no "approved" member. See
 * .claude/rules/medical-content.md and docs/content-briefs/treatments.md.
 */
export const medicalReviewMetaSchema = z.object({
  status: z.enum(["draft", "requires-clinical-review", "retired"]),
  author: z.string().min(1),
  clinicalReviewer: z.string().min(1).nullable(),
  publishedDate: z.string().min(1),
  lastReviewed: z.string().min(1).nullable(),
});

export const qualificationsPageContentSchema = z.object({
  qualifications: verifiedFact(z.array(qualificationEntrySchema).min(1)),
  // "Clinical Professor" and any other listed-but-disputed title stays out
  // of `qualifications` (which is presented as a grid of verifiable
  // postgraduate degrees) and gets its own, separately-captioned field so
  // it can't be visually mistaken for one of them — see
  // docs/04-content-verification.md's canonical-title production gate.
  disputedListedTitle: verifiedFact(z.object({ label: z.string().min(1), year: z.string().min(1) })).nullable(),
  professionalPositions: verifiedFact(z.array(professionalPositionSchema).min(1)),
  researchProjects: verifiedFact(z.array(researchProjectSchema).min(1)),
  publications: verifiedFact(z.array(publicationSchema).min(1)),
  gpCourses: verifiedFact(z.array(z.string().min(1)).min(1)),
  reviewMeta: medicalReviewMetaSchema,
});

export type QualificationEntry = z.infer<typeof qualificationEntrySchema>;
export type ProfessionalPosition = z.infer<typeof professionalPositionSchema>;
export type ResearchProject = z.infer<typeof researchProjectSchema>;
export type Publication = z.infer<typeof publicationSchema>;
export type QualificationsPageContent = z.infer<typeof qualificationsPageContentSchema>;

export const treatmentContentSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  metaDescription: z.string().min(1).max(160),
  mergedFromUrls: z.array(z.string().min(1)).min(1),
  summary: z.string().min(1),
  symptomsOrReferralReasons: z.array(z.string().min(1)).min(1),
  assessment: z.string().min(1),
  treatmentOptions: z.array(z.object({ title: z.string().min(1), description: z.string().min(1) })).min(1),
  benefits: z.array(z.string().min(1)).min(1),
  limitations: z.array(z.string().min(1)).min(1),
  risks: z.array(z.string().min(1)).min(1),
  // Only needed when `risks` cites specific numeric rates — makes clear
  // to the reader that they're general published figures, not this
  // surgeon's personal outcomes. See src/content/treatments/bile-duct-exploration.ts
  // for why: a medical-content-reviewer pass flagged this ambiguity.
  riskStatisticsNote: z.string().min(1).optional(),
  recovery: z.string().min(1),
  alternatives: z.array(z.string().min(1)).min(1),
  urgentWarningSigns: z.array(z.string().min(1)).min(1),
  faqs: z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) })).min(1),
  references: z.array(z.object({ label: z.string().min(1), url: z.string().url() })).min(1),
  reviewMeta: medicalReviewMetaSchema,
});

export type TreatmentContent = z.infer<typeof treatmentContentSchema>;
