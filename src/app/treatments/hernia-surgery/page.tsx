import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { LinkButton } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { TreatmentSummary } from "@/components/medical/treatment-summary";
import { TreatmentOptions } from "@/components/medical/treatment-options";
import { RiskInformation } from "@/components/medical/risk-information";
import { UrgentCareNotice } from "@/components/medical/urgent-care-notice";
import { EvidenceReferences } from "@/components/medical/evidence-references";
import { MedicalReviewDetails } from "@/components/medical/medical-review-details";
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
  const c = herniaSurgeryContent;

  return (
    <Section ariaLabel={c.name}>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Treatments", href: "/#treatments" },
          { label: c.name, href: "/treatments/hernia-surgery" },
        ]}
      />

      <h1 className="mt-4 mb-6">{c.name}</h1>

      <div className="mb-8 max-w-3xl">
        <MedicalReviewDetails reviewMeta={c.reviewMeta} />
      </div>

      <div className="flex max-w-3xl flex-col gap-10">
        <TreatmentSummary
          summary={c.summary}
          symptomsOrReferralReasons={c.symptomsOrReferralReasons}
          assessment={c.assessment}
        />

        <TreatmentOptions
          treatmentOptions={c.treatmentOptions}
          benefits={c.benefits}
          limitations={c.limitations}
          alternatives={c.alternatives}
        />

        <RiskInformation risks={c.risks} recovery={c.recovery} />

        <UrgentCareNotice warningSigns={c.urgentWarningSigns} />

        <div>
          <h2 className="mb-4 text-(length:--text-heading)">Frequently asked questions</h2>
          <Accordion items={c.faqs.map((f) => ({ question: f.question, answer: <p>{f.answer}</p> }))} />
        </div>

        <EvidenceReferences references={c.references} />

        <div className="rounded-(--radius-lg) border border-stone-200 bg-stone-100 p-6">
          <p className="mb-3 font-semibold text-ink-900">Considering hernia surgery?</p>
          <LinkButton href="/appointments">Request an Appointment</LinkButton>
        </div>
      </div>
    </Section>
  );
}
