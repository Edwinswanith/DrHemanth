"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { FeedbackCardImage } from "@/content/patient-feedback";
import { cn } from "@/lib/utils/cn";

export function PatientFeedbackPreview({ cards }: { cards: FeedbackCardImage[] }) {
  const railId = useId();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(cards.length > 1);

  const updateState = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    const scrollLeft = scroller.scrollLeft;
    const items = Array.from(scroller.children) as HTMLElement[];
    const nearest = items.reduce(
      (closest, item, index) => {
        const distance = Math.abs(item.offsetLeft - scrollLeft);
        return distance < closest.distance ? { index, distance } : closest;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY }
    );

    setActiveIndex(nearest.index);
    setProgress(maxScroll > 0 ? scrollLeft / maxScroll : 1);
    setCanGoBack(scrollLeft > 4);
    setCanGoForward(scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    updateState();
    const observer = new ResizeObserver(updateState);
    observer.observe(scroller);
    scroller.addEventListener("scroll", updateState, { passive: true });

    return () => {
      observer.disconnect();
      scroller.removeEventListener("scroll", updateState);
    };
  }, [updateState]);

  function goTo(index: number) {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const safeIndex = Math.max(0, Math.min(cards.length - 1, index));
    const card = scroller.children.item(safeIndex) as HTMLElement | null;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    card?.scrollIntoView({
      block: "nearest",
      inline: "start",
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  function move(direction: -1 | 1) {
    goTo(activeIndex + direction);
  }

  function onScrollerKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
  }

  if (cards.length === 0) {
    return null;
  }

  return (
    <div className="relative min-w-0 overflow-hidden border border-steel-700/15 bg-steel-050 p-3 shadow-card sm:p-4 md:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-label font-semibold uppercase tracking-wide text-steel-700">Feedback scans</p>
          <p className="mt-1 text-small text-ink-700">Selected anonymised cards and notes.</p>
        </div>

        <div className="flex items-center gap-3">
          <p className="min-w-16 text-right text-small font-semibold text-ink-800" aria-live="polite">
            {String(activeIndex + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              disabled={!canGoBack}
              aria-controls={railId}
              aria-label="Show previous feedback scan"
              className="inline-flex size-11 items-center justify-center rounded-md border border-ink-700 bg-white text-body-lg font-semibold leading-none text-ink-900 shadow-card transition-colors duration-fast ease-standard hover:bg-ink-900 hover:text-stone-50 disabled:cursor-not-allowed disabled:border-stone-300 disabled:text-stone-400 disabled:shadow-none"
            >
              <span aria-hidden="true">&lt;</span>
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              disabled={!canGoForward}
              aria-controls={railId}
              aria-label="Show next feedback scan"
              className="inline-flex size-11 items-center justify-center rounded-md border border-ink-700 bg-white text-body-lg font-semibold leading-none text-ink-900 shadow-card transition-colors duration-fast ease-standard hover:bg-ink-900 hover:text-stone-50 disabled:cursor-not-allowed disabled:border-stone-300 disabled:text-stone-400 disabled:shadow-none"
            >
              <span aria-hidden="true">&gt;</span>
            </button>
          </div>
        </div>
      </div>

      <div className="h-1 overflow-hidden rounded-sm bg-white" aria-hidden="true">
        <div
          className="h-full bg-steel-700 transition-[width] duration-base ease-standard"
          style={{ width: `${Math.max(8, progress * 100)}%` }}
        />
      </div>

      <p className="sr-only">Scroll horizontally, use arrow keys, or use the previous and next buttons to browse feedback scans.</p>

      <div className="relative mt-5">
        <div className="pointer-events-none absolute inset-y-4 left-0 z-10 w-7 bg-gradient-to-r from-steel-050 to-transparent" />
        <div className="pointer-events-none absolute inset-y-4 right-0 z-10 w-10 bg-gradient-to-l from-steel-050 to-transparent" />

        <div
          id={railId}
          ref={scrollerRef}
          className="feedback-carousel-scroll flex min-w-0 w-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4 pr-[18vw] sm:pr-[22vw] lg:pr-[14vw]"
          aria-label="Selected patient feedback scans"
          tabIndex={0}
          onKeyDown={onScrollerKeyDown}
        >
          {cards.map((card, index) => {
            const isActive = index === activeIndex;
            return (
              <figure
                key={card.src}
                className={cn(
                  "w-[min(78vw,18rem)] shrink-0 snap-start overflow-hidden border bg-white transition duration-base ease-standard sm:w-[18.5rem] lg:w-[19.5rem]",
                  isActive ? "scale-100 border-steel-700/35 shadow-raised" : "scale-[0.965] border-stone-200 shadow-card"
                )}
              >
                <a
                  href={card.src}
                  target="_blank"
                  rel="noreferrer"
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-steel-700"
                  aria-label={`Open larger feedback scan ${index + 1}`}
                >
                  <span className="flex h-[20rem] items-center justify-center bg-stone-50 p-4 sm:h-[23rem] lg:h-[26rem]">
                    <Image
                      src={card.src}
                      alt={card.alt}
                      width={card.width}
                      height={card.height}
                      sizes="(min-width: 1024px) 19.5rem, (min-width: 640px) 18.5rem, 78vw"
                      loading={index < 2 ? "eager" : "lazy"}
                      className={cn(
                        "max-h-full w-auto max-w-full object-contain transition-transform duration-base ease-standard group-hover:scale-[1.015]",
                        card.imageClassName
                      )}
                    />
                  </span>
                  <span className="flex min-h-12 items-center justify-end border-t border-stone-200 px-4 py-3 text-small font-semibold text-steel-700">
                    Open card
                  </span>
                </a>
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}
