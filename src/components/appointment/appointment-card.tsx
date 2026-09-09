import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";

const appointmentSteps = [
  "Send request",
  "Practice replies",
  "Confirm appointment",
];

export function AppointmentCard() {
  return (
    <Card tone="raised" className="w-full p-5 lg:p-6">
      <p className="mb-2 text-label font-semibold uppercase tracking-wide text-steel-700">
        Appointments
      </p>
      <h2 className="mb-4 text-heading leading-tight">Request a consultation</h2>
      <p className="text-small leading-relaxed text-ink-700">The practice will contact you to confirm availability.</p>
      <ol className="mt-5 divide-y divide-stone-200 border-y border-stone-200">
        {appointmentSteps.map((step, index) => (
          <li key={step} className="grid grid-cols-[2.25rem_1fr] gap-3 py-3 text-small">
            <span className="font-display text-heading leading-none text-steel-700">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-semibold text-ink-900">{step}</span>
          </li>
        ))}
      </ol>
      <div className="mt-5">
        <LinkButton href="/appointments" size="lg">
          Start request
        </LinkButton>
      </div>
    </Card>
  );
}
