import Link from "next/link";
import { primaryNav } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { allTreatmentContent } from "@/content/treatments";
import { canRenderFact } from "@/lib/content/publication";

const legalLinks = [
  { label: "Privacy Notice", href: "/privacy" },
  { label: "Medical Disclaimer", href: "/medical-disclaimer" },
  { label: "Accessibility Statement", href: "/accessibility" },
];

export function SiteFooter() {
  const hasPublicTelephone = canRenderFact(siteConfig.primaryTelephone);

  return (
    <footer data-section="footer" className="on-dark bg-ink-950 pt-8 pb-20 text-steel-100/80 lg:py-12">
      <div className="site-container grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-display text-xl font-semibold text-stone-50">
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-md border-l border-bronze-500 pl-4 text-small leading-relaxed">
            {siteConfig.emergencyNotice}
          </p>
        </div>

        <nav aria-label="Footer main navigation" className="lg:col-span-2">
          <h2 className="text-label font-semibold uppercase tracking-wide text-steel-100">Site</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-5 gap-y-1.5 lg:grid-cols-1">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-small hover:text-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/qualifications-and-memberships"
                className="text-small hover:text-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-100"
              >
                Qualifications
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Footer treatments navigation" className="lg:col-span-3">
          <h2 className="text-label font-semibold uppercase tracking-wide text-steel-100">Treatments</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-5 gap-y-1.5 lg:grid-cols-1">
            {allTreatmentContent.map((treatment) => (
              <li key={treatment.slug}>
                <Link
                  href={`/treatments/${treatment.slug}`}
                  className="text-small hover:text-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-100"
                >
                  {treatment.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-label font-semibold uppercase tracking-wide text-steel-100">
            Appointment
          </h2>
          <div className="mt-3 grid gap-2.5 text-small">
            <Link
              href="/appointments"
              className="font-semibold text-stone-50 hover:text-steel-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-100"
            >
              Request an Appointment
            </Link>
            {hasPublicTelephone ? (
              <a
                href={`tel:${siteConfig.primaryTelephone.value.replace(/\s+/g, "")}`}
                className="hover:text-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-100"
              >
                Call {siteConfig.primaryTelephone.value}
              </a>
            ) : null}
          </div>
          <nav aria-label="Legal" className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 lg:flex-col">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-small hover:text-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="border-t border-stone-200/20 pt-5 text-xs text-stone-300 lg:col-span-12">
          Copyright {new Date().getFullYear()} {siteConfig.legalName}.
        </p>
      </div>
    </footer>
  );
}
