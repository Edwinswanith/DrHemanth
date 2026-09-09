import type { Metadata } from "next";
import { TreatmentPage } from "@/components/medical/treatment-page";
import { upperGiEndoscopyContent } from "@/content/treatments/upper-gi-endoscopy";

export const metadata: Metadata = {
  title: upperGiEndoscopyContent.name,
  description: upperGiEndoscopyContent.metaDescription,
  alternates: { canonical: "/treatments/upper-gi-endoscopy" },
  robots: { index: false, follow: true },
};

export default function UpperGiEndoscopyPage() {
  return <TreatmentPage content={upperGiEndoscopyContent} />;
}
