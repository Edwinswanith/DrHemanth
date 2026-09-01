import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { ConfirmationContent } from "@/app/appointments/confirmation/confirmation-content";

// Confirmation pages are per-visitor system state, not content to be
// indexed — see .claude/rules/seo-geo.md ("noindex... confirmation...
// low-value system pages").
export const metadata: Metadata = {
  title: "Appointment Request Received",
  robots: { index: false, follow: false },
};

export default function AppointmentConfirmationPage() {
  return (
    <Section ariaLabel="Appointment request confirmation">
      <ConfirmationContent />
    </Section>
  );
}
