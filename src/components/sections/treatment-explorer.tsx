import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

const categories = [
  { name: "Upper GI endoscopy", summary: "Diagnostic and therapeutic endoscopy of the upper digestive tract." },
  { name: "Anti-reflux surgery", summary: "Surgical treatment for gastro-oesophageal reflux disease (GERD)." },
  {
    name: "Gallbladder surgery",
    summary: "Laparoscopic and open surgery for gallstones and gallbladder disease.",
    // See src/content/treatments/gallbladder-surgery.ts — same
    // requires-clinical-review / noindex-until-approved pattern as hernia
    // surgery below.
    href: "/treatments/gallbladder-surgery",
  },
  { name: "Bile duct exploration", summary: "Diagnosis and treatment of bile duct stones and blockages." },
  {
    name: "Hernia surgery",
    summary: "Repair of inguinal, umbilical, incisional, and hiatal hernias.",
    // Content is written and sourced but still "requires-clinical-review"
    // (noindex until approved), see src/content/treatments/hernia-surgery.ts.
    // The remaining categories stay as non-linked cards until each has
    // the same treatment.
    href: "/treatments/hernia-surgery",
  },
  { name: "Liver & spleen surgery", summary: "Surgical management of selected liver and spleen conditions." },
  { name: "Appendicectomy", summary: "Surgical removal of the appendix." },
];

/**
 * Cards without an href are deliberately not links: the dedicated
 * treatment pages behind them don't exist yet (Phase E, blocked on
 * clinical content clearing .claude/rules/medical-content.md) — see
 * docs/02-information-architecture.md. Linking now would be a dead link.
 */
export function TreatmentExplorer() {
  return (
    <Section id="treatments" tone="sunken" ariaLabel="Treatments and conditions">
      <h2 className="mb-2">Treatments & conditions</h2>
      <p className="mb-6 max-w-2xl text-ink-700">
        An overview of the areas of surgical practice. Detailed treatment
        pages — covering symptoms, assessment, options, risks, and recovery
        — are being written and clinically reviewed; each will link from
        here once published.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) =>
          category.href ? (
            <Link key={category.name} href={category.href} className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-600 rounded-(--radius-lg)">
              <Card className="h-full transition-shadow duration-(--duration-fast) hover:shadow-(--shadow-raised)">
                <h3 className="mb-1 text-(length:--text-body-lg) text-teal-700">{category.name}</h3>
                <p className="text-(length:--text-small) text-ink-700">{category.summary}</p>
              </Card>
            </Link>
          ) : (
            <Card key={category.name}>
              <h3 className="mb-1 text-(length:--text-body-lg)">{category.name}</h3>
              <p className="text-(length:--text-small) text-ink-700">{category.summary}</p>
            </Card>
          )
        )}
      </div>
    </Section>
  );
}
