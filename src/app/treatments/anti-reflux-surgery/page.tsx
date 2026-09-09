import type { Metadata } from "next";
import { TreatmentPage } from "@/components/medical/treatment-page";
import { antiRefluxSurgeryContent } from "@/content/treatments/anti-reflux-surgery";

export const metadata: Metadata = {
  title: antiRefluxSurgeryContent.name,
  description: antiRefluxSurgeryContent.metaDescription,
  alternates: { canonical: "/treatments/anti-reflux-surgery" },
  robots: { index: false, follow: true },
};

export default function AntiRefluxSurgeryPage() {
  return <TreatmentPage content={antiRefluxSurgeryContent} />;
}
