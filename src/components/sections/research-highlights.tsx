import Image from "next/image";
import { Section } from "@/components/ui/section";
import { showNonPublicContent } from "@/lib/content/publication";

type ResearchRecord = {
  title: string;
  type: string;
  year: string;
  source: string;
  authors: string;
  href: string;
  explanation: string;
};

const verifiedRecords: ResearchRecord[] = [];

export function ResearchHighlights() {
  if (verifiedRecords.length === 0 && !showNonPublicContent) {
    return null;
  }

  return (
    <Section id="research" tone="accent" spacing="compact" ariaLabel="Research, publications, and patient education">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-4">
          <p className="mb-3 text-label font-semibold uppercase tracking-wide text-steel-700">
            Evidence and education
          </p>
          <h2 className="text-balance">Research, publications & education</h2>
        </div>
        <div className="lg:col-span-8">
          {showNonPublicContent ? (
            <div className="mb-7 grid gap-6 md:grid-cols-[14rem_1fr] md:items-center">
              <div className="relative aspect-[4/5] overflow-hidden border border-steel-700/20 bg-white">
                <Image
                  src="/images/keyholesurgeon/research-publications.jpg"
                  alt="Research and publications source image from the existing website"
                  fill
                  sizes="14rem"
                  className="object-cover object-center"
                />
              </div>
              <p className="text-ink-700">
                Verified publication records will show title, type, year and source.
              </p>
            </div>
          ) : null}

          <div className="divide-y divide-steel-700/20 border-y border-steel-700/25">
            {verifiedRecords.map((record) => (
              <article key={record.title} className="grid gap-3 py-5">
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-label font-semibold uppercase tracking-wide text-steel-700">
                  <span>{record.type}</span>
                  <span>{record.year}</span>
                  <span>{record.source}</span>
                </div>
                <h3 className="text-body-lg text-ink-950">
                  <a
                    href={record.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700"
                  >
                    {record.title}
                  </a>
                </h3>
                <p className="text-small text-ink-700">{record.authors}</p>
                <p className="max-w-3xl text-small leading-relaxed text-ink-700">{record.explanation}</p>
              </article>
            ))}
            {verifiedRecords.length === 0 ? (
              <div className="py-6 text-small leading-relaxed text-ink-700">
                Records appear here only after source links and review status are complete.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
}
