import { Card } from "@/components/ui/card";
import { AppointmentForm } from "@/components/appointment/appointment-form";

/** The hero's inline appointment card — desktop 5-column slot, and reused
 * standalone on the full /appointments page. */
export function AppointmentCard() {
  return (
    <Card tone="raised" className="w-full">
      <h2 className="mb-4 text-(length:--text-heading)">Request an Appointment</h2>
      <AppointmentForm source="hero" compact />
    </Card>
  );
}
