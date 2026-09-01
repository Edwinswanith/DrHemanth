import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Section } from "@/components/ui/section";
import { AppointmentForm } from "@/components/appointment/appointment-form";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Request an Appointment",
  description: `Request an appointment with ${siteConfig.name}. This sends a request; the practice will contact you to confirm.`,
  alternates: { canonical: "/appointments" },
};

export default function AppointmentsPage() {
  return (
    <Section ariaLabel="Request an appointment">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Request an Appointment", href: "/appointments" }]} />
      <h1 className="mt-4 mb-2">Request an Appointment</h1>
      <p className="mb-8 max-w-xl text-ink-700">{siteConfig.emergencyNotice}</p>

      <div className="max-w-xl">
        <AppointmentForm source="full-page" />
      </div>
    </Section>
  );
}
