import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { LinkButton } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { surgicalComparisonRows } from "@/content/surgical-comparison";

export const metadata: Metadata = {
  title: "Robotic vs Laparoscopic Surgery",
  description:
    "A balanced comparison of robotic-assisted and laparoscopic surgery, including surgeon control, suitability, risks, recovery and evidence.",
  alternates: { canonical: "/robotic-vs-laparoscopic" },
  robots: { index: false, follow: true },
};

export default function RoboticVsLaparoscopicPage() {
  return (
    <Section ariaLabel="Robotic versus laparoscopic surgery">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Robotic vs laparoscopic surgery", href: "/robotic-vs-laparoscopic" },
        ]}
      />

      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="mb-3 text-label font-semibold uppercase tracking-wide text-steel-700">
            Patient-centred comparison
          </p>
          <h1 className="text-balance">Robotic vs laparoscopic surgery</h1>
        </div>
        <p className="text-body-lg text-ink-800 lg:col-span-5">
          Both are minimally invasive approaches. Neither is automatically better; the safest option depends on the
          condition, anatomy, hospital pathway and clinical judgement.
        </p>
      </div>

      <div className="mt-8 grid gap-4 border-y border-stone-200 divide-y divide-stone-200 md:hidden">
        {surgicalComparisonRows.map((row) => (
          <article key={row.factor} className="py-5">
            <h2 className="text-body-lg text-ink-950">{row.factor}</h2>
            <dl className="mt-4 grid gap-4 text-small sm:grid-cols-2">
              <div className="rounded-md bg-surface-soft p-3">
                <dt className="font-semibold text-ink-900">Robotic-assisted surgery</dt>
                <dd className="mt-1 leading-relaxed text-ink-800">{row.robotic}</dd>
              </div>
              <div className="rounded-md bg-surface-warm p-3">
                <dt className="font-semibold text-ink-900">Laparoscopic surgery</dt>
                <dd className="mt-1 leading-relaxed text-ink-800">{row.laparoscopic}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div
        className="mt-8 hidden overflow-x-auto rounded-lg border border-stone-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700 md:block"
        tabIndex={0}
        role="region"
        aria-label="Full robotic-assisted and laparoscopic surgery comparison table"
      >
        <table className="w-full min-w-[48rem] border-collapse text-left text-small">
          <caption className="sr-only">Full comparison of robotic-assisted and laparoscopic surgery by factor</caption>
          <thead>
            <tr className="bg-surface-soft text-ink">
              <th scope="col" className="p-4 font-semibold">
                Factor
              </th>
              <th scope="col" className="p-4 font-semibold text-ink-900">
                Robotic-assisted surgery
              </th>
              <th scope="col" className="p-4 font-semibold text-ink-900">
                Laparoscopic surgery
              </th>
            </tr>
          </thead>
          <tbody>
            {surgicalComparisonRows.map((row) => (
              <tr key={row.factor} className="border-t border-stone-200 bg-white">
                <th scope="row" className="p-4 font-medium text-ink-900">
                  {row.factor}
                </th>
                <td className="bg-surface-soft p-4 text-ink-800">{row.robotic}</td>
                <td className="bg-surface-warm p-4 text-ink-800">{row.laparoscopic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-5 border-y border-stone-200 py-6 lg:grid-cols-12">
        <p className="text-ink-800 lg:col-span-8">
          A consultation is used to discuss whether minimally invasive surgery is appropriate and whether robotic,
          laparoscopic, open or non-surgical management should be considered.
        </p>
        <div className="lg:col-span-4 lg:justify-self-end">
          <LinkButton href="/appointments">Request an Appointment</LinkButton>
        </div>
      </div>
    </Section>
  );
}
