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

      <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <h1 className="mb-2">Request an Appointment</h1>
          <p className="mb-8 max-w-xl text-ink-700">{siteConfig.emergencyNotice}</p>

          <div className="max-w-xl">
            <AppointmentForm source="full-page" />
          </div>
        </div>

        <aside className="border-y border-stone-200 py-6 lg:col-span-5 lg:sticky lg:top-24">
          <p className="mb-3 text-label font-semibold uppercase tracking-wide text-steel-700">
            What happens next
          </p>
          <h2 className="text-heading text-ink-950">A request, then practice contact.</h2>
          <ol className="mt-6 grid gap-4">
            {[
              "Submit your appointment request.",
              "The practice reviews your contact preference and availability.",
              "The practice contacts you to discuss a suitable appointment.",
              "The appointment is confirmed separately.",
            ].map((step, index) => (
              <li key={step} className="grid grid-cols-[2.25rem_1fr] gap-3">
                <span className="font-display text-heading leading-none text-steel-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-small leading-relaxed text-ink-800">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-6 grid gap-3 border-t border-stone-200 pt-5 text-small text-ink-700">
            <p>Only first-contact details are requested.</p>
            <p>A reference is shown after a successful submission.</p>
          </div>
        </aside>
      </div>
    </Section>
  );
}
