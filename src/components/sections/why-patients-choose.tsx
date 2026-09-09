import { Section } from "@/components/ui/section";

const reasons = [
  {
    label: "Assessment first",
    support: "Requests lead to practice contact and assessment, not automatic treatment recommendations.",
  },
  {
    label: "Balanced options",
    support: "Open, laparoscopic and robotic routes are compared without a universal winner.",
  },
  {
    label: "Surgery is not assumed",
    support: "Investigations, alternatives and shared decisions come before any procedure.",
  },
];

export function WhyPatientsChoose() {
  return (
    <Section dataSection="why-patients-choose" spacing="compact" ariaLabel="Why patients choose the practice" className="!bg-white">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="mb-3 text-label font-semibold uppercase tracking-wide text-steel-700">
            How care is approached
          </p>
          <h2 className="text-balance">Care decisions before surgery decisions.</h2>
        </div>

        <div className="lg:col-span-8">
          <div className="divide-y divide-stone-200 border-y border-stone-200">
            {reasons.map((reason) => (
              <div key={reason.label} className="grid gap-3 py-4 sm:grid-cols-[13rem_1fr] sm:items-start">
                <h3 className="text-body-lg text-ink-950">{reason.label}</h3>
                <p className="text-small leading-relaxed text-ink-700">{reason.support}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
