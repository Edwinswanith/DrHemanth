import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Our commitment to web accessibility and how to report an accessibility issue.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <Section ariaLabel="Accessibility statement">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Accessibility Statement", href: "/accessibility" }]} />
      <h1 className="mt-4 mb-6">Accessibility statement</h1>

      <div className="flex max-w-2xl flex-col gap-4 text-ink-800">
        <p>
          This website is being built to meet WCAG 2.2 Level AA as a
          minimum, including keyboard navigation, visible focus states,
          screen-reader-compatible structure, labelled and accessible forms,
          sufficient colour contrast, and support for reduced-motion
          preferences.
        </p>
        <p>
          <strong>Status:</strong> this is a newly built website and is
          being actively tested against WCAG 2.2 AA as new pages are added.
          It should be considered partially conformant while that testing
          and any resulting fixes are completed — see this site&rsquo;s
          build tracker for current status.
        </p>
        <h2 className="mt-2 text-(length:--text-heading)">Reporting an accessibility issue</h2>
        <p>
          If you experience any difficulty using this website, please
          contact the practice so the issue can be investigated and fixed.
          Contact details are available on the{" "}
          <a href="/appointments" className="underline hover:text-ink-900">
            appointment request page
          </a>
          .
        </p>
      </div>
    </Section>
  );
}
