import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Accordion } from "@/components/ui/accordion";
import { LinkButton } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import type { TreatmentContent } from "@/lib/content/schema";
import { EvidenceReferences } from "@/components/medical/evidence-references";
import { MedicalReviewDetails } from "@/components/medical/medical-review-details";
import { RiskInformation } from "@/components/medical/risk-information";
import { TreatmentOptions } from "@/components/medical/treatment-options";
import { TreatmentSummary } from "@/components/medical/treatment-summary";
import { UrgentCareNotice } from "@/components/medical/urgent-care-notice";

export function TreatmentPage({ content }: { content: TreatmentContent }) {
  const path = `/treatments/${content.slug}`;

  return (
    <Section ariaLabel={content.name}>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Treatments", href: "/treatments" },
          { label: content.name, href: path },
        ]}
      />

      <h1 className="mt-4 mb-6">{content.name}</h1>

      <div className="mb-8 max-w-3xl">
        <MedicalReviewDetails reviewMeta={content.reviewMeta} />
      </div>

      <div className="flex max-w-3xl flex-col gap-10">
        <TreatmentSummary
          summary={content.summary}
          symptomsOrReferralReasons={content.symptomsOrReferralReasons}
          assessment={content.assessment}
        />

        <TreatmentOptions
          treatmentOptions={content.treatmentOptions}
          benefits={content.benefits}
          limitations={content.limitations}
          alternatives={content.alternatives}
        />

        <RiskInformation
          risks={content.risks}
          recovery={content.recovery}
          riskStatisticsNote={content.riskStatisticsNote}
        />

        <UrgentCareNotice warningSigns={content.urgentWarningSigns} />

        <div>
          <h2 className="mb-4 text-heading">Frequently asked questions</h2>
          <Accordion items={content.faqs.map((f) => ({ question: f.question, answer: <p>{f.answer}</p> }))} />
        </div>

        <EvidenceReferences references={content.references} />

        <div className="rounded-lg border border-stone-200 bg-stone-100 p-6">
          <p className="mb-3 font-semibold text-ink-900">Considering {content.name.toLowerCase()}?</p>
          <LinkButton href="/appointments">Request an Appointment</LinkButton>
        </div>
      </div>
    </Section>
  );
}
