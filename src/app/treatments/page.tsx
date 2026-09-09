import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Section } from "@/components/ui/section";
import type { TreatmentContent } from "@/lib/content/schema";
import {
  antiRefluxSurgeryContent,
  appendicectomyContent,
  bileDuctExplorationContent,
  gallbladderSurgeryContent,
  herniaSurgeryContent,
  liverAndSpleenSurgeryContent,
  upperGiEndoscopyContent,
} from "@/content/treatments";

export const metadata: Metadata = {
  title: "Treatments",
  description:
    "Treatment information for upper GI, hepatobiliary, hernia, gallbladder, bile duct, anti-reflux, and appendicectomy care.",
  alternates: { canonical: "/treatments" },
  robots: { index: false, follow: true },
};

const groups: { label: string; treatments: TreatmentContent[] }[] = [
  { label: "Diagnostic and upper digestive care", treatments: [upperGiEndoscopyContent] },
  { label: "Reflux and upper GI surgery", treatments: [antiRefluxSurgeryContent] },
  { label: "Gallbladder and bile duct", treatments: [gallbladderSurgeryContent, bileDuctExplorationContent] },
  { label: "Hernia and general surgery", treatments: [herniaSurgeryContent, appendicectomyContent] },
  { label: "Liver and spleen", treatments: [liverAndSpleenSurgeryContent] },
];

export default function TreatmentsPage() {
  return (
    <Section ariaLabel="Treatments">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Treatments", href: "/treatments" }]} />

      <h1 className="mt-4 mb-4">Treatments</h1>
      <p className="mb-12 max-w-3xl text-body-lg text-ink-800">
        Explore information about the conditions and procedures treated, including what assessment, treatment and
        recovery may involve.
      </p>

      <div className="grid gap-10">
        {groups.map((group) => (
          <div key={group.label}>
            <h2 className="mb-1 text-heading text-ink-950">{group.label}</h2>
            <div>
              {group.treatments.map((treatment) => (
                <Link
                  key={treatment.slug}
                  href={`/treatments/${treatment.slug}`}
                  className="group grid grid-cols-1 gap-2 border-b border-stone-200 py-5 transition-colors hover:bg-surface-soft focus-visible:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700 sm:grid-cols-12 sm:items-baseline sm:gap-4"
                >
                  <span className="text-body-lg font-semibold text-ink-950 sm:col-span-4 lg:col-span-3">
                    {treatment.name}
                  </span>
                  <span className="text-small text-ink-700 sm:col-span-7 lg:col-span-8">
                    {treatment.metaDescription}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-small font-semibold text-steel-700 transition-transform group-hover:translate-x-1 sm:col-span-1 sm:text-right"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
