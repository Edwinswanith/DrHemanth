"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface AccordionItemData {
  question: string;
  answer: ReactNode;
}

/**
 * Real, crawlable HTML: all answers are always present in the DOM (not
 * mounted/unmounted on toggle), only visually hidden — so this never hides
 * FAQ content from a non-JS fetch or from GEO/SEO crawling. Keyboard and
 * screen-reader accessible via aria-expanded/aria-controls.
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
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-4 text-ink-700"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
