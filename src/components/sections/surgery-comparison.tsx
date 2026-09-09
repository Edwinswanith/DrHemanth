import { Section } from "@/components/ui/section";
import { LinkButton } from "@/components/ui/button";
import { homepageComparisonRows } from "@/content/surgical-comparison";

export function SurgeryComparison() {
  return (
    <Section
      id="comparison"
      spacing="compact"
      ariaLabel="Robotic versus laparoscopic surgery comparison"
      className="!bg-white"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="mb-3 text-label font-semibold uppercase tracking-wide text-steel-700">
            Patient-centred comparison
          </p>
          <h2 className="text-balance">Robotic vs laparoscopic surgery</h2>
        </div>
        <p className="max-w-none text-ink-700 lg:col-span-5">
          Both use small incisions. The right approach depends on diagnosis, anatomy, hospital pathway and clinical
          judgement.
        </p>
      </div>

      <div className="mt-6 grid gap-4 border-y border-stone-200 divide-y divide-stone-200 md:hidden">
        {homepageComparisonRows.map((row) => (
          <section key={row.factor} className="py-5" aria-label={row.factor}>
            <h3 className="text-body-lg">{row.factor}</h3>
            <dl className="mt-3 grid gap-3 text-small sm:grid-cols-2">
              <div className="rounded-md bg-surface-soft p-3">
                <dt className="font-semibold text-ink-900">Robotic-assisted surgery</dt>
                <dd className="mt-1 text-ink-800">{row.robotic}</dd>
              </div>
              <div className="rounded-md bg-surface-warm p-3">
                <dt className="font-semibold text-ink-900">Laparoscopic surgery</dt>
                <dd className="mt-1 text-ink-800">{row.laparoscopic}</dd>
              </div>
            </dl>
          </section>
        ))}
      </div>

      <div
        className="mt-6 hidden overflow-x-auto rounded-lg border border-stone-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700 md:block"
        tabIndex={0}
        role="region"
        aria-label="Robotic versus laparoscopic surgery comparison table"
      >
        <table className="w-full border-collapse text-left text-small">
          <caption className="sr-only">Comparison of robotic-assisted and laparoscopic surgery by factor</caption>
          <thead>
            <tr className="bg-surface-soft text-ink">
              <th scope="col" className="p-3 font-semibold">
                Factor
              </th>
              <th scope="col" className="p-3 font-semibold text-ink-900">
                Robotic-assisted surgery
              </th>
              <th scope="col" className="p-3 font-semibold text-ink-900">
                Laparoscopic surgery
              </th>
            </tr>
          </thead>
          <tbody>
            {homepageComparisonRows.map((row) => (
              <tr key={row.factor} className="border-t border-stone-200 bg-white">
                <th scope="row" className="p-3 font-medium text-ink-900">
                  {row.factor}
                </th>
                <td className="bg-surface-soft p-3 text-ink-800">{row.robotic}</td>
                <td className="bg-surface-warm p-3 text-ink-800">{row.laparoscopic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-l border-border-strong pl-5 sm:flex-row sm:items-center">
        <p className="max-w-2xl text-ink-700">No approach is universally better; selection is individual.</p>
        <LinkButton href="/robotic-vs-laparoscopic" variant="secondary">
          View full comparison
        </LinkButton>
      </div>
    </Section>
  );
}
