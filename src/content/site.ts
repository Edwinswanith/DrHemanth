import { pending } from "@/types/content";
import { siteConfigSchema, type SiteConfig } from "@/lib/content/schema";

const raw: SiteConfig = {
  name: "Prof. Hemant Sheth",
  legalName: "Prof. Hemant Sheth",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  shortDescription:
    "UK consultant surgeon specialising in upper gastrointestinal, hepatobiliary, hernia, and minimally invasive (laparoscopic and robotic-assisted) surgery.",
  emergencyNotice:
    "This website and its appointment request form are not for emergencies. If you have a medical emergency, call 999 or go to your nearest A&E department.",
  requestNotConfirmedNotice:
    "Submitting this form sends an appointment request — it is not a confirmed appointment. The practice will contact you to arrange a suitable time.",
  // Sourced from the old site's general-appointment page (a real, currently
  // published number, not invented) — flagged pending because the practice
  // may have since changed it. See docs/04-content-verification.md.
  primaryTelephone: pending("020 3371 1785", "Sourced from keyholesurgeon.co.uk's general appointment page during the Phase A crawl; not re-confirmed with the practice."),
};

export const siteConfig: SiteConfig = siteConfigSchema.parse(raw);
