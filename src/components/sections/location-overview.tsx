import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { PendingBadge } from "@/components/ui/badge";

const locations = [
  { name: "Spire Bushey Hospital & Diagnostic Centre", area: "Bushey, Hertfordshire" },
  { name: "The Clementine Churchill Hospital", area: "Harrow" },
  { name: "The Wellington Hospital, Elstree Waterfront", area: "Elstree" },
];

export function LocationOverview() {
  return (
    <Section id="locations" tone="sunken" ariaLabel="Practice locations">
      <h2 className="mb-2">Practice locations</h2>
      <p className="mb-6 max-w-2xl text-ink-700">
        Current consulting hours, full address and directions, parking,
        public transport, and accessibility information for each location
        are being confirmed directly with the practice before publication.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {locations.map((location) => (
          <Card key={location.name}>
            <p className="font-semibold text-ink-900">{location.name}</p>
            <p className="mt-1 text-(length:--text-small) text-ink-700">{location.area}</p>
            <div className="mt-3">
              <PendingBadge />
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
