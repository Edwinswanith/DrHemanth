"use client";

import { useState } from "react";
import Link from "next/link";
import { primaryNav } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { MobileNavigation } from "@/components/layout/mobile-navigation";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-(family-name:--font-display) text-lg font-semibold text-ink-900">
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-(length:--text-small) font-medium text-ink-700 hover:text-ink-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/appointments"
            className="inline-flex min-h-11 items-center justify-center rounded-(--radius-md) bg-bronze-700 px-5 py-2.5 text-(length:--text-small) font-semibold text-stone-50 hover:bg-bronze-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-600"
          >
            Book an Appointment
          </Link>
        </div>

        <button
          type="button"
          className="min-h-11 min-w-11 rounded-(--radius-md) text-ink-900 lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-600"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span aria-hidden="true" className="text-2xl">
            {menuOpen ? "✕" : "☰"}
          </span>
          <span className="visually-hidden">{menuOpen ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      <MobileNavigation items={primaryNav} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
