import { verified } from "@/types/content";
import { siteConfigSchema, type SiteConfig } from "@/lib/content/schema";

const raw: SiteConfig = {
  name: "Prof. Hemant Sheth",
  legalName: "Prof. Hemant Sheth",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  shortDescription:
    "Patient information and appointment requests for upper gastrointestinal, hepatobiliary, hernia, and minimally invasive surgical care.",
  emergencyNotice:
    "This website is not for emergencies. For urgent medical help, call 999 or go to your nearest A&E.",
  requestNotConfirmedNotice:
    "Submitting this form requests an appointment. The practice will contact you to confirm the date and time.",
  // Sourced from the current public legacy contact/appointment pages and
  // reused by request. Reconfirm with the practice before production launch.
  primaryTelephone: verified(
    "020 3371 1785",
    "client-approved-material",
    "Sourced from keyholesurgeon.co.uk's general appointment page during the Phase A crawl; not re-confirmed with the practice."
  ),
};

export const siteConfig: SiteConfig = siteConfigSchema.parse(raw);
