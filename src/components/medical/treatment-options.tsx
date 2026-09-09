import { Card } from "@/components/ui/card";

export function TreatmentOptions({
  treatmentOptions,
  benefits,
  limitations,
  alternatives,
}: {
  treatmentOptions: { title: string; description: string }[];
  benefits: string[];
  limitations: string[];
  alternatives: string[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="mb-4 text-heading">Treatment options</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {treatmentOptions.map((option) => (
            <Card key={option.title}>
              <p className="mb-1 font-semibold text-ink-900">{option.title}</p>
              <p className="text-small text-ink-700">{option.description}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <h3 className="mb-2 text-body-lg">Potential benefits</h3>
          <ul className="list-inside list-disc space-y-1 text-ink-800">
            {benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-2 text-body-lg">Limitations</h3>
          <ul className="list-inside list-disc space-y-1 text-ink-800">
            {limitations.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-body-lg">Alternatives</h3>
        <ul className="list-inside list-disc space-y-1 text-ink-800">
          {alternatives.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
