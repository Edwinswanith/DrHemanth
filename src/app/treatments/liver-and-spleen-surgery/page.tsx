import type { Metadata } from "next";
import { TreatmentPage } from "@/components/medical/treatment-page";
import { liverAndSpleenSurgeryContent } from "@/content/treatments/liver-and-spleen-surgery";

export const metadata: Metadata = {
  title: liverAndSpleenSurgeryContent.name,
  description: liverAndSpleenSurgeryContent.metaDescription,
  alternates: { canonical: "/treatments/liver-and-spleen-surgery" },
  robots: { index: false, follow: true },
};

export default function LiverAndSpleenSurgeryPage() {
  return <TreatmentPage content={liverAndSpleenSurgeryContent} />;
}
