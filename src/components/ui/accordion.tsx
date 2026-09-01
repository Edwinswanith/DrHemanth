"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface AccordionItemData {
  question: string;
  answer: ReactNode;
}

/**
 * Real, crawlable HTML: all answers are always present in the DOM (not
 * mounted/unmounted on toggle), only visually collapsed — so this never
 * hides FAQ content from a non-JS fetch or from GEO/SEO crawling.
 * Keyboard and screen-reader accessible via aria-expanded/aria-controls/
 * aria-hidden. The collapse/expand uses the CSS grid-template-rows 0fr/1fr
 * technique (smooth height animation with no JS measurement needed) rather
 * than an instant `hidden` toggle — a `prefers-reduced-motion` respecting,
 * opacity/size-only transition per .claude/rules/design-system.md.
 */
export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-stone-200 border-y border-stone-200">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left font-medium text-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-600"
              >
                <span>{item.question}</span>
                <span aria-hidden="true" className={cn("shrink-0 transition-transform duration-(--duration-base)", isOpen && "rotate-45")}>
                  +
                </span>
              </button>
            </h3>
            <div
              className="grid transition-[grid-template-rows] duration-(--duration-base) ease-(--ease-standard)"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                // `inert`, not `aria-hidden`: some FAQ answers contain real
                // links (e.g. to /privacy). aria-hidden on a container that
                // still holds focusable descendants is itself an
                // accessibility violation (axe: aria-hidden-focus) — the
                // same defect class fixed on the mobile drawer, see
                // src/components/ui/drawer.tsx. inert correctly removes
                // the whole collapsed panel from both focus and the
                // accessibility tree.
                inert={!isOpen}
                className="overflow-hidden"
              >
                <div className="pb-4 text-ink-700">{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
