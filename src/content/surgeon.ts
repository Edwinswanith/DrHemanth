import { pending } from "@/types/content";
import { surgeonProfileSchema, type SurgeonProfile } from "@/lib/content/schema";

/**
 * Every fact below traces to docs/04-content-verification.md. Nothing here
 * has cleared the evidence hierarchy yet — it is either sourced from the
 * old site (unverified) or new, safe, non-factual copy (positioningStatement).
 * Do not add a fact here without also adding/updating its row in
 * docs/04-content-verification.md.
 */
const raw: SurgeonProfile = {
  fullName: "Prof. Hemant Sheth",

  // Interim fallback per the canonical-positioning production gate — see
  // docs/04-content-verification.md. Never "Robotic Surgeon" until approved.
  displayTitle: pending(
    "Consultant Upper GI, Laparoscopic & Hepatobiliary Surgeon",
    "Old site uses inconsistent wording across pages (see docs/01-current-site-audit.md); this is the conservative, independently-defensible fallback pending client approval of one canonical statement."
  ),

  qualifications: pending(
    ["MBBS", "MS (General Surgery)", "FRCS (Glasgow)", "FRCS (England)", "MD (Res)"],
    "Sourced from the old site's biography page; not yet cross-checked against academic/professional-body records."
  ),

  // Deliberately withheld (null) rather than carrying forward an
  // unverified GMC number — see .claude/rules/medical-content.md.
  gmcNumber: pending(null, "Old site publishes a GMC number; withheld until independently verified against the GMC register."),

  currentNhsRole: pending(
    "Consultant Upper GI, Laparoscopic and Hepatobiliary Surgeon, Ealing and London North West University Healthcare NHS Trust",
    "Sourced from the old site's biography page; not yet cross-checked against the Trust's own website."
  ),

  // Safe, non-superlative, factually-scoped to the confirmed service list —
  // not a verification-gated "fact" in the same sense as the above.
  positioningStatement:
    "Patient-focused surgical care for conditions of the upper digestive system, gallbladder, bile duct, and hernia — including minimally invasive laparoscopic and robotic-assisted approaches.",

  professionalMemberships: pending(
    [
      "Royal College of Surgeons of England",
      "Association of Surgeons of Great Britain and Ireland (ASGBI)",
      "British Medical Association (BMA)",
      "Association of Upper Gastrointestinal Surgeons (AUGIS)",
      "European-African Hepato-Pancreato-Biliary Association (E-AHPBA)",
      "International Hepato-Pancreato-Biliary Association (IHPBA)",
    ],
    "Sourced from the old site's biography page; not cross-checked against each body's member directory."
  ),

  languagesSpoken: pending(
    ["Gujarati", "Hindi", "Marathi", "Konkani"],
    "Sourced from the old site's biography page; unverified."
  ),
};

export const surgeonProfile: SurgeonProfile = surgeonProfileSchema.parse(raw);
