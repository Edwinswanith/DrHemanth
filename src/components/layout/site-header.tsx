"use client";

import { useState } from "react";
import Link from "next/link";
import { primaryNav } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { MobileNavigation } from "@/components/layout/mobile-navigation";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="site-container flex h-16 items-center justify-between gap-4 xl:h-20">
        <Link
          href="/"
          className="inline-flex min-h-11 shrink-0 items-center font-display text-lg font-semibold leading-tight text-ink-950 xl:text-xl"
        >
          <span className="hidden min-[390px]:inline">{siteConfig.name}</span>
          <span className="min-[390px]:hidden">Prof. Sheth</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-small font-medium leading-snug text-ink-700 hover:text-ink-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/appointments"
          className="hidden min-h-11 items-center justify-center rounded-md bg-steel-700 px-5 py-2.5 text-small font-semibold text-stone-50 hover:bg-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700 xl:inline-flex"
        >
          Request an Appointment
        </Link>

        <div className="flex items-center gap-1.5 xl:hidden">
          <Link
            href="/appointments"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-steel-700 px-2.5 py-2 text-sm font-semibold text-stone-50 hover:bg-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700"
            aria-label="Request an Appointment"
          >
            Appointment
          </Link>
          <button
            type="button"
            className="min-h-11 rounded-md border border-stone-200 px-2.5 text-sm font-semibold text-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <MobileNavigation items={primaryNav} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
