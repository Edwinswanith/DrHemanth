"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/content/schema";
import { mobilePersistentActions } from "@/content/navigation";
import { siteConfig } from "@/content/site";

export function MobileNavigation({
  items,
  open,
  onClose,
}: {
  items: NavItem[];
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<Element | null>(null);

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement;
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
      return;
    }

    if (previousFocusRef.current instanceof HTMLElement) {
      previousFocusRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const previousBodyStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.position = previousBodyStyles.position;
      document.body.style.top = previousBodyStyles.top;
      document.body.style.width = previousBodyStyles.width;
      document.body.style.overflow = previousBodyStyles.overflow;
      window.scrollTo(0, scrollY);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-nav-panel"
      ref={panelRef}
      hidden={!open}
      className="on-dark absolute inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain bg-ink-900 shadow-raised xl:hidden"
    >
      <nav aria-label="Mobile" className="flex flex-col gap-1 px-5 pt-6">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="rounded-md px-3 py-3 text-lg font-medium text-stone-50 hover:bg-ink-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-100"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/appointments"
          onClick={onClose}
          className="mt-4 rounded-md bg-steel-700 px-4 py-3 text-center text-lg font-semibold text-stone-50 hover:bg-steel-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-100"
        >
          Request an Appointment
        </Link>
      </nav>
      <div className="mx-5 mt-6 border-t border-stone-200/20 py-5">
        <p className="text-small leading-relaxed text-stone-200">{siteConfig.emergencyNotice}</p>
        {mobilePersistentActions.call ? (
          <a
            href={mobilePersistentActions.call.href}
            className="mt-3 inline-flex min-h-11 items-center rounded-md border border-stone-200/40 px-4 py-2 text-small font-semibold text-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-100"
          >
            Call {mobilePersistentActions.call.displayValue}
          </a>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Persistent mobile actions for browsing pages. The appointment flow has its
 * own form and submit control, so this bar is hidden there to avoid competing
 * with fields and validation messages.
 */
export function MobilePersistentActions() {
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return (
    <nav
      aria-label="Mobile contact actions"
      className="fixed inset-x-0 bottom-0 z-30 flex min-w-0 gap-2 border-t border-stone-200 bg-white/95 px-3 py-2 backdrop-blur lg:hidden"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      {mobilePersistentActions.call ? (
        <a
          href={mobilePersistentActions.call.href}
          className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-md border border-ink-700 px-3 py-2.5 text-center text-sm font-medium text-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700"
        >
          Call {mobilePersistentActions.call.displayValue}
        </a>
      ) : null}
      <Link
        href={mobilePersistentActions.appointment.href}
        className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-md bg-steel-700 px-3 py-2.5 text-center text-sm font-semibold text-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700"
      >
        {mobilePersistentActions.appointment.label}
      </Link>
    </nav>
  );
}
