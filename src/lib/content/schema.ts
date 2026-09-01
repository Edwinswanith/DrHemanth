import { z } from "zod";

const verificationStatus = z.enum(["verified", "pending-verification", "do-not-publish"]);
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

/**
 * The mandatory 13-part treatment-page shape — see
 * .claude/rules/medical-content.md and docs/content-briefs/treatments.md.
 * `reviewMeta.status` mirrors MedicalContentStatus (src/types/medical.ts):
 * Claude may only ever write "draft" or "requires-clinical-review" here —
 * enforced by the enum below, which deliberately has no "approved" member.
 */
const medicalReviewMetaSchema = z.object({
  status: z.enum(["draft", "requires-clinical-review", "retired"]),
  author: z.string().min(1),
  clinicalReviewer: z.string().min(1).nullable(),
  publishedDate: z.string().min(1),
  lastReviewed: z.string().min(1).nullable(),
});

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
  recovery: z.string().min(1),
  alternatives: z.array(z.string().min(1)).min(1),
  urgentWarningSigns: z.array(z.string().min(1)).min(1),
  faqs: z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) })).min(1),
  references: z.array(z.object({ label: z.string().min(1), url: z.string().url() })).min(1),
  reviewMeta: medicalReviewMetaSchema,
});

export type TreatmentContent = z.infer<typeof treatmentContentSchema>;
