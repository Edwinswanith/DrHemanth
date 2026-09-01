import { Section } from "@/components/ui/section";

/**
 * The old site published 3 named testimonials plus 13 individual survey
 * permalinks; none can be republished until consent/attribution is
 * confirmed (docs/04-content-verification.md). This section is honest
 * about that rather than fabricating quotes or omitting the section
 * entirely and pretending it doesn't exist.
 */
export function PatientStories() {
  return (
    <Section ariaLabel="Patient experiences">
      <h2 className="mb-2">Patient experiences</h2>
      <p className="max-w-2xl text-ink-700">
        Patient testimonials from the practice&rsquo;s previous website are being
        reviewed for consent and accurate attribution before they are
        republished here. Verified experiences will appear on this page once
        that review is complete.
      </p>
    </Section>
  );
}
