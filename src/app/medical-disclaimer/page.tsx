import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Medical Disclaimer",
  description: "Important information about how to use the medical information on this website.",
  alternates: { canonical: "/medical-disclaimer" },
};

export default function MedicalDisclaimerPage() {
  return (
    <Section ariaLabel="Medical disclaimer">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Medical Disclaimer", href: "/medical-disclaimer" }]} />
      <h1 className="mt-4 mb-6">Medical disclaimer</h1>

      <div className="flex max-w-2xl flex-col gap-4 text-ink-800">
        <p>{siteConfig.emergencyNotice}</p>
        <p>
          The information on this website is provided for general
          educational purposes and to help you understand conditions and
          treatments. It is not a substitute for professional medical advice,
          diagnosis, or treatment specific to you. Always seek the advice of
          a qualified healthcare professional with any questions you have
          about a medical condition.
        </p>
        <p>
          No doctor-patient relationship is created by browsing this website
          or by submitting an appointment request. A doctor-patient
          relationship begins only once a consultation has taken place.
        </p>
        <p>
          We aim to keep clinical content accurate, balanced, and current,
          with a named author, clinical reviewer, and last-reviewed date on
          each treatment page once published (see this site&rsquo;s
          content-verification tracker for pages still in progress). If you
          believe any information on this site is inaccurate or out of date,
          please contact the practice.
        </p>
        <p>
          This disclaimer is being reviewed by Prof. Hemant Sheth and/or an
          authorised clinical reviewer as part of the wider content-approval
          process for this website.
        </p>
      </div>
    </Section>
  );
}
