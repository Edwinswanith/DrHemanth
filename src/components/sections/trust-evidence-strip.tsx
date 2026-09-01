import { Section } from "@/components/ui/section";
import { Badge, PendingBadge } from "@/components/ui/badge";
import { surgeonProfile } from "@/content/surgeon";

/**
 * Evidence, not decoration: only what's on record is shown, and anything
 * still pending verification is visibly marked as such rather than
 * presented with false confidence. No counters, no invented statistics —
 * see .claude/rules/design-system.md and .claude/rules/medical-content.md.
 */
export function TrustEvidenceStrip() {
  return (
    <Section tone="sunken" ariaLabel="Qualifications and professional standing">
      <h2 className="mb-1">Qualifications & professional standing</h2>
      <p className="mb-6 max-w-2xl text-ink-700">
        Every item below is shown with its verification status. Items marked
        &ldquo;pending verification&rdquo; are sourced from the practice&rsquo;s previous
        website and are being independently confirmed before they are stated
        as fact.
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {surgeonProfile.qualifications.value.map((q) => (
          <Badge key={q}>{q}</Badge>
        ))}
        {surgeonProfile.qualifications.status !== "verified" && <PendingBadge />}
      </div>

      <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <dt className="text-(length:--text-small) font-semibold text-ink-600">Current NHS role</dt>
          <dd className="mt-1 flex items-start gap-2 text-ink-900">
            {surgeonProfile.currentNhsRole.value}
            {surgeonProfile.currentNhsRole.status !== "verified" && <PendingBadge />}
          </dd>
        </div>
        <div>
          <dt className="text-(length:--text-small) font-semibold text-ink-600">Languages spoken</dt>
          <dd className="mt-1 flex flex-wrap items-start gap-2 text-ink-900">
            {surgeonProfile.languagesSpoken.value.join(", ")}
            {surgeonProfile.languagesSpoken.status !== "verified" && <PendingBadge />}
          </dd>
        </div>
      </dl>

      <div className="mt-8">
        <p className="mb-2 flex items-center gap-2 text-(length:--text-small) font-semibold text-ink-600">
          Professional memberships
          {surgeonProfile.professionalMemberships.status !== "verified" && <PendingBadge />}
        </p>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-1 text-ink-800 sm:grid-cols-2">
          {surgeonProfile.professionalMemberships.value.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
