import { Section } from "@/components/ui/section";

const steps = [
  {
    title: "Appointment request",
    body: "Send an online request or contact the practice.",
  },
  {
    title: "Practice contact",
    body: "The practice confirms a suitable time and location.",
  },
  {
    title: "Consultant assessment",
    body: "Prof. Sheth reviews your symptoms, history and priorities in consultation.",
  },
  {
    title: "Investigations",
    body: "Further tests are arranged only when needed.",
  },
  {
    title: "Treatment decision",
    body: "Options, risks and alternatives are discussed with you.",
  },
  {
    title: "Treatment or surgery",
    body: "Preparation, treatment and recovery are explained clearly.",
  },
  {
    title: "Follow-up",
    body: "Recovery is reviewed and questions are answered.",
  },
];

export function PatientJourney() {
  return (
    <Section id="patient-journey" tone="sunken" spacing="compact" ariaLabel="Patient journey">
      <div className="grid gap-8">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="mb-3 text-label font-semibold uppercase tracking-wide text-steel-700">
              Your care journey
            </p>
            <h2 className="text-balance">From enquiry to follow-up</h2>
          </div>
          <p className="max-w-3xl text-ink-700 lg:col-span-6 lg:col-start-7">
            Assessment comes first. Surgery is recommended only when appropriate.
          </p>
        </div>

        <ol className="relative grid gap-0 md:grid-cols-2 md:gap-x-6 md:border-y md:border-stone-200 lg:grid-cols-12 lg:gap-x-7">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className={`relative grid grid-cols-[2.5rem_1fr] gap-3.5 border-t border-stone-200 py-4 first:border-t-0 md:block md:border-t md:py-5 md:first:border-t ${
                index < 4 ? "lg:col-span-3" : "lg:col-span-4"
              } ${index === 4 ? "lg:col-start-1" : ""}`}
            >
              <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-steel-700 bg-stone-50 font-display text-small leading-none text-steel-700 md:h-auto md:w-auto md:items-start md:justify-start md:border-0 md:bg-transparent md:text-heading">
                {String(index + 1).padStart(2, "0")}
              </span>
              {index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-[1.05rem] top-12 h-[calc(100%-2rem)] w-px bg-primary/30 md:hidden"
                />
              ) : null}
              <div className="md:mt-3">
                <h3 className="text-body-lg leading-snug text-ink-950">{step.title}</h3>
                <p className="mt-1.5 text-small leading-relaxed text-ink-700">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
