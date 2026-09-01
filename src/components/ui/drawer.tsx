"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * A bottom-sheet drawer with a hand-rolled but real focus trap: focus
 * moves into the drawer on open, Escape closes it, Tab/Shift+Tab wrap
 * within the drawer's focusable elements, and focus returns to the
 * trigger on close. No dependency added for this — see
 * .claude/rules/architecture.md ("keep dependencies minimal").
 */
export function Drawer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerFocusRef = useRef<Element | null>(null);

  useEffect(() => {
    if (open) {
      triggerFocusRef.current = document.activeElement;
      panelRef.current?.focus();
    } else if (triggerFocusRef.current instanceof HTMLElement) {
      triggerFocusRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={cn("fixed inset-0 z-[60]", open ? "pointer-events-auto" : "pointer-events-none")}
      // `inert`, not `aria-hidden`, when closed: the form fields inside
      // stay mounted (so the drawer opens instantly with content already
      // there) but must not be focusable or screen-reader-reachable while
      // closed. aria-hidden on a container that still holds focusable
      // descendants is itself an accessibility violation (axe:
      // aria-hidden-focus) — inert correctly removes the whole subtree
      // from both focus and the accessibility tree.
      inert={!open}
    >
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-ink-950/50 transition-opacity duration-(--duration-base)",
          open ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={cn(
          "absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-(--radius-lg) bg-stone-50 p-6 shadow-(--shadow-raised) transition-transform duration-(--duration-base) ease-(--ease-standard)",
          open ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-(length:--text-heading)">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 min-w-11 rounded-(--radius-md) text-ink-700 hover:bg-stone-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-600"
          >
            <span aria-hidden="true" className="text-xl">
              ✕
            </span>
            <span className="visually-hidden">Close</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
