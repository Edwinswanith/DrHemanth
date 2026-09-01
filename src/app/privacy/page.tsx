import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How this website collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Section ariaLabel="Privacy notice">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Notice", href: "/privacy" }]} />
      <h1 className="mt-4 mb-2">Privacy notice</h1>
      <p className="mb-8 max-w-2xl rounded-(--radius-md) border border-warning-700/30 bg-warning-100 p-4 text-(length:--text-small) text-ink-800">
        This notice describes how the appointment request form on this
        website is designed to handle your information. The specific legal
        basis for processing, full retention schedule, and data controller
        registration details are being finalised with the practice and its
        legal advisers before this website accepts real patient enquiries —
        see docs/15-launch-checklist.md in this project&rsquo;s build
        records. Nothing on this page should be relied on as final legal
        advice until that review is complete.
      </p>

      <div className="flex max-w-2xl flex-col gap-6 text-ink-800">
        <div>
          <h2 className="mb-2 text-(length:--text-heading)">What we collect</h2>
          <p>
            When you submit an appointment request, we collect only: your
            full name, telephone number, email address, preferred practice
            location, preferred contact method, and your broad availability.
            We do not ask for or collect diagnosis, symptoms, medical
            history, NHS number, insurance number, or file uploads through
            this form.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-(length:--text-heading)">How we use it</h2>
          <p>
            We use this information solely to contact you and arrange your
            requested appointment. We do not use it for marketing, and we do
            not sell or share it with third parties except the minimum
            necessary to operate the appointment request system itself (for
            example, secure hosting and email delivery — see this
            site&rsquo;s data-processing register for the current list of
            providers and their approval status).
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-(length:--text-heading)">Where it is stored</h2>
          <p>
            Primary application compute and appointment storage are
            configured in the UK (London). Every processor, log, backup, and
            support path involved is documented and reviewed before this
            form is used to process real patient data in production.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-(length:--text-heading)">Your rights</h2>
          <p>
            Under UK data protection law you have rights including access to,
            correction of, and deletion of your personal data. The process
            for exercising these rights, and our data retention period, will
            be confirmed here once agreed with the practice.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-(length:--text-heading)">Contact</h2>
          <p>
            Questions about this notice, or about your data, can be directed
            to the practice using the details on the{" "}
            <a href="/appointments" className="underline hover:text-ink-900">
              appointment request page
            </a>
            .
          </p>
        </div>
      </div>
    </Section>
  );
}
