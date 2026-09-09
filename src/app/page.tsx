import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { surgeonProfile } from "@/content/surgeon";
import { StructuredData } from "@/components/seo/structured-data";
import { buildWebSiteJsonLd } from "@/lib/structured-data/website";
import { HomepageHero } from "@/components/sections/homepage-hero";
import { TrustEvidenceStrip } from "@/components/sections/trust-evidence-strip";
import { SurgeonIntroduction } from "@/components/sections/surgeon-introduction";
import { RoboticSurgeryIntroduction } from "@/components/sections/robotic-surgery-introduction";
import { SurgeryComparison } from "@/components/sections/surgery-comparison";
import { TreatmentExplorer } from "@/components/sections/treatment-explorer";
import { WhyPatientsChoose } from "@/components/sections/why-patients-choose";
import { PatientJourney } from "@/components/sections/patient-journey";
import { LocationOverview } from "@/components/sections/location-overview";
import { PatientStories } from "@/components/sections/patient-stories";
import { ResearchHighlights } from "@/components/sections/research-highlights";
import { FrequentlyAskedQuestions } from "@/components/sections/frequently-asked-questions";
import { FinalAppointmentCta } from "@/components/sections/final-appointment-cta";

export const metadata: Metadata = {
  title: `${surgeonProfile.fullName} — Upper GI, Hepatobiliary & Hernia Surgery`,
  description: siteConfig.shortDescription,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <StructuredData data={buildWebSiteJsonLd()} />
      <HomepageHero />
      <TrustEvidenceStrip />
      <SurgeonIntroduction />
      <RoboticSurgeryIntroduction />
      <SurgeryComparison />
      <TreatmentExplorer />
      <WhyPatientsChoose />
      <PatientJourney />
      <LocationOverview />
      <PatientStories />
      <ResearchHighlights />
      <FrequentlyAskedQuestions />
      <FinalAppointmentCta />
    </>
  );
}
