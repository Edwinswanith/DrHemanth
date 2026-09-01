import { Section } from "@/components/ui/section";

const steps = [
  { title: "Request an appointment", body: "Send a request through this website or call the practice. This is a request, not a confirmed booking." },
  { title: "Confirmation", body: "The practice contacts you to confirm a suitable date, time, and location." },
  { title: "Consultation", body: "You meet Prof. Hemant Sheth to discuss your symptoms, history, and the options available to you." },
  { title: "Assessment & planning", body: "Further investigations are arranged if needed, and a treatment plan is agreed with you." },
  { title: "Treatment", body: "If surgery is recommended, you will be given clear information on preparation, the procedure, and what to expect." },
  { title: "Recovery & follow-up", body: "You receive guidance for recovery and a follow-up appointment to review your progress." },
];

export function PatientJourney() {
  return (
    <Section id="patient-journey" ariaLabel="Patient journey and why patients choose this practice">
      <h2 className="mb-2">Why patients choose this practice</h2>
      <p className="mb-8 max-w-2xl text-ink-700">
        A patient-centred approach, clear communication at every stage, and a
        clinical focus on upper GI, hepatobiliary, and hernia surgery —
        offered through both laparoscopic and robotic-assisted techniques
        where appropriate.
      </p>

      <h3 className="mb-4 text-(length:--text-body-lg)">From enquiry to follow-up</h3>
      <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="rounded-(--radius-lg) border border-stone-200 bg-white p-5">
            <span className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-(length:--text-small) font-semibold text-stone-50">
              {index + 1}
            </span>
            <p className="font-semibold text-ink-900">{step.title}</p>
            <p className="mt-1 text-(length:--text-small) text-ink-700">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
