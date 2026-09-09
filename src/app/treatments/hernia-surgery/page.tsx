import type { Metadata } from "next";
import { TreatmentPage } from "@/components/medical/treatment-page";
import { herniaSurgeryContent } from "@/content/treatments/hernia-surgery";

// This page's content is freshly written and sourced (see the content
// file's header comment) but has not yet been reviewed and approved by
// Prof. Sheth or an authorised clinical reviewer — reviewMeta.status is
// "requires-clinical-review". Per .claude/rules/medical-content.md and
// .claude/rules/seo-geo.md, content in that state is not indexed, even
// though the route itself is real and reachable (from
// TreatmentExplorer on the homepage) so the review/approval workflow has
// a real page to review against.
export const metadata: Metadata = {
  title: herniaSurgeryContent.name,
  description: herniaSurgeryContent.metaDescription,
  alternates: { canonical: "/treatments/hernia-surgery" },
  robots: { index: false, follow: true },
};

export default function HerniaSurgeryPage() {
  return <TreatmentPage content={herniaSurgeryContent} />;
}
