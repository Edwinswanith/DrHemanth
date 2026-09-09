import type { Metadata } from "next";
import { TreatmentPage } from "@/components/medical/treatment-page";
import { bileDuctExplorationContent } from "@/content/treatments/bile-duct-exploration";

// See src/app/treatments/hernia-surgery/page.tsx for the fuller rationale:
// this route is real and reachable but noindexed while its content is
// requires-clinical-review, not yet approved.
export const metadata: Metadata = {
  title: bileDuctExplorationContent.name,
  description: bileDuctExplorationContent.metaDescription,
  alternates: { canonical: "/treatments/bile-duct-exploration" },
  robots: { index: false, follow: true },
};

export default function BileDuctExplorationPage() {
  return <TreatmentPage content={bileDuctExplorationContent} />;
}
