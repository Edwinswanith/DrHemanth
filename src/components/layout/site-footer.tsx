import Link from "next/link";
import { siteConfig } from "@/content/site";

const legalLinks = [
  { label: "Privacy Notice", href: "/privacy" },
  { label: "Medical Disclaimer", href: "/medical-disclaimer" },
  { label: "Accessibility Statement", href: "/accessibility" },
];

export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink-950 py-12 text-stone-200">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 sm:px-8">
        <div className="flex flex-col gap-2">
          <p className="font-(family-name:--font-display) text-lg font-semibold text-stone-50">
            {siteConfig.name}
          </p>
          <p className="max-w-md text-(length:--text-small)">{siteConfig.shortDescription}</p>
        </div>

        <p className="max-w-2xl rounded-(--radius-md) border border-stone-200/20 bg-ink-900 px-4 py-3 text-(length:--text-small)">
          {siteConfig.emergencyNotice}
        </p>

        <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-(length:--text-small) hover:text-stone-50">
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-stone-300">
          © {new Date().getFullYear()} {siteConfig.legalName}. Practice location details, professional
          registration information, and full contact details are being confirmed and will appear here
          once verified — see the site&rsquo;s public content-verification tracker for progress.
        </p>
      </div>
    </footer>
  );
}
