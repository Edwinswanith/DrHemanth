import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { surgeonProfile } from "@/content/surgeon";
import { canRenderFact } from "@/lib/content/publication";

const verifiedRows = [
  canRenderFact(surgeonProfile.displayTitle)
    ? {
        label: "Professional title",
        value: surgeonProfile.displayTitle.value,
      }
    : null,
  canRenderFact(surgeonProfile.gmcNumber)
    ? {
        label: "GMC information",
        value: surgeonProfile.gmcNumber.value ?? "",
      }
    : null,
  canRenderFact(surgeonProfile.currentNhsRole)
    ? {
        label: "NHS relationship",
        value: surgeonProfile.currentNhsRole.value,
      }
    : null,
].filter(Boolean) as { label: string; value: string }[];

export function TrustEvidenceStrip() {
  const rows = verifiedRows;
  const publicQualifications = canRenderFact(surgeonProfile.qualifications)
    ? surgeonProfile.qualifications.value
    : [];

  if (rows.length === 0 && publicQualifications.length === 0) {
    return null;
  }

  return (
    <Section
      tone="default"
      spacing="compact"
      dataSection="trust-evidence"
      ariaLabel="Qualifications and professional standing"
      className="!bg-surface-soft border-b border-stone-200"
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-3">
          <p className="text-label font-semibold uppercase tracking-wide text-steel-700">
            Professional standing
          </p>
          <h2 className="mt-2 text-heading">Trust signals</h2>
        </div>

        <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:col-span-9">
          {rows.map((row) => (
            <div key={row.label} className="border-l border-border-strong pl-4">
              <dt className="text-label font-semibold uppercase tracking-wide text-ink-700">
                {row.label}
              </dt>
              <dd className="mt-1 text-small leading-relaxed text-ink-900">{row.value}</dd>
            </div>
          ))}
        </dl>

        {publicQualifications.length > 0 ? (
          <>
            <div className="lg:col-span-3">
              <p className="text-label font-semibold uppercase tracking-wide text-ink-700">
                Qualifications
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:col-span-9">
              {publicQualifications.map((qualification) => (
                <Badge key={qualification}>{qualification}</Badge>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </Section>
  );
}
