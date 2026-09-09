import type { Metadata } from "next";
import { TreatmentPage } from "@/components/medical/treatment-page";
import { gallbladderSurgeryContent } from "@/content/treatments/gallbladder-surgery";

// See src/app/treatments/hernia-surgery/page.tsx for the fuller rationale:
// this route is real and reachable but noindexed while its content is
// requires-clinical-review, not yet approved.
export const metadata: Metadata = {
  title: gallbladderSurgeryContent.name,
  description: gallbladderSurgeryContent.metaDescription,
  alternates: { canonical: "/treatments/gallbladder-surgery" },
  robots: { index: false, follow: true },
};

export default function GallbladderSurgeryPage() {
  return <TreatmentPage content={gallbladderSurgeryContent} />;
}
