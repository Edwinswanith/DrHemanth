import { siteConfig } from "@/content/site";

/**
 * WebSite structured data only — safe to emit unconditionally since it
 * states nothing beyond the site's own name/URL (no verification-gated
 * facts). Person/Physician/MedicalBusiness JSON-LD are deliberately NOT
 * generated yet: every candidate field (title, GMC number, qualifications,
 * location) is still `pending` in src/content/surgeon.ts, and
 * docs/07-structured-data-plan.md requires every JSON-LD property to be
 * true, current, and verified before it's emitted. Add those builders in
 * Phase E once the relevant content clears verification.
 */
export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}
