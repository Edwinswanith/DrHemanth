import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

const categories = [
  { name: "Upper GI endoscopy", summary: "Diagnostic and therapeutic endoscopy of the upper digestive tract." },
  { name: "Anti-reflux surgery", summary: "Surgical treatment for gastro-oesophageal reflux disease (GERD)." },
  { name: "Gallbladder surgery", summary: "Laparoscopic and open surgery for gallstones and gallbladder disease." },
  { name: "Bile duct exploration", summary: "Diagnosis and treatment of bile duct stones and blockages." },
  { name: "Hernia surgery", summary: "Repair of inguinal, umbilical, incisional, and hiatal hernias." },
  { name: "Liver & spleen surgery", summary: "Surgical management of selected liver and spleen conditions." },
  { name: "Appendicectomy", summary: "Surgical removal of the appendix." },
];

/**
 * These are informational cards, deliberately not links: the dedicated
 * treatment pages behind each of these don't exist yet (Phase E, blocked
 * on clinical content clearing .claude/rules/medical-content.md) — see
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
        {categories.map((category) => (
          <Card key={category.name}>
            <h3 className="mb-1 text-(length:--text-body-lg)">{category.name}</h3>
            <p className="text-(length:--text-small) text-ink-700">{category.summary}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
