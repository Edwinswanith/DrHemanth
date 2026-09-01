import { Section } from "@/components/ui/section";

export function ResearchHighlights() {
  return (
    <Section id="research" tone="accent" ariaLabel="Research, publications, and patient education">
      <h2 className="mb-2">Research, publications & education</h2>
      <p className="max-w-2xl text-ink-700">
        A current list of peer-reviewed publications and patient education
        material is being compiled and independently verified for accuracy
        and currency before publication — see this site&rsquo;s
        content-verification tracker for progress.
      </p>
    </Section>
  );
}
