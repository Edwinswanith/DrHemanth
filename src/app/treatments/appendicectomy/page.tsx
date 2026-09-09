import type { Metadata } from "next";
import { TreatmentPage } from "@/components/medical/treatment-page";
import { appendicectomyContent } from "@/content/treatments/appendicectomy";

export const metadata: Metadata = {
  title: appendicectomyContent.name,
  description: appendicectomyContent.metaDescription,
  alternates: { canonical: "/treatments/appendicectomy" },
  robots: { index: false, follow: true },
};

export default function AppendicectomyPage() {
  return <TreatmentPage content={appendicectomyContent} />;
}
