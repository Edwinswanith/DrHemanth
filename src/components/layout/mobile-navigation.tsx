"use client";

import Link from "next/link";
import type { NavItem } from "@/lib/content/schema";
import { mobilePersistentActions } from "@/content/navigation";

export function MobileNavigation({
  items,
  open,
  onClose,
}: {
  items: NavItem[];
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      id="mobile-nav-panel"
      hidden={!open}
      className="on-dark fixed inset-0 top-16 z-40 overflow-y-auto bg-ink-900 lg:hidden"
    >
      <nav aria-label="Mobile" className="flex flex-col gap-1 px-5 py-6">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="rounded-(--radius-md) px-3 py-3 text-lg font-medium text-stone-50 hover:bg-ink-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-500"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/appointments"
          onClick={onClose}
          className="mt-4 rounded-(--radius-md) bg-bronze-700 px-4 py-3 text-center text-lg font-semibold text-stone-50 hover:bg-bronze-800"
        >
          Book an Appointment
        </Link>
      </nav>
    </div>
  );
}

/**
 * Persistent, unobtrusive mobile actions — always visible, never covering
 * content (page-shell.tsx reserves matching bottom padding for it), and
 * never a full-width takeover.
 */
export function MobilePersistentActions() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-stone-200 bg-white/95 px-3 py-2 backdrop-blur lg:hidden"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <a
        href={mobilePersistentActions.call.href}
        className="flex flex-1 items-center justify-center gap-2 rounded-(--radius-md) border border-ink-700 px-3 py-2.5 text-sm font-medium text-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-600"
      >
        Call {mobilePersistentActions.call.displayValue}
      </a>
      <Link
        href={mobilePersistentActions.appointment.href}
        className="flex flex-1 items-center justify-center gap-2 rounded-(--radius-md) bg-bronze-700 px-3 py-2.5 text-sm font-semibold text-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-600"
      >
        {mobilePersistentActions.appointment.label}
      </Link>
    </div>
  );
}
