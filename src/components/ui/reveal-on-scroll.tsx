"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

/**
 * A subtle, once-only fade/translate-up reveal as content scrolls into
 * view. Stays inside the calm-motion contract in
 * .claude/rules/design-system.md: opacity + small translate only, a
 * single short transition, never re-triggers, never touches a large page
 * area on initial load (only content already below the fold at first
 * paint is ever hidden pre-reveal).
 *
 * Safe by construction, not just by convention: the element is visible
 * by default (both in SSR output and if JavaScript never runs). The
 * pre-reveal "hidden" state is applied imperatively via ref in
 * useLayoutEffect — synchronously before the browser paints — so there
 * is no flash of visible-then-hidden, and no-JS / JS-error visitors and
 * crawlers simply see the final, fully visible content with no animation
 * at all. `prefers-reduced-motion` skips the hidden state entirely.
 */
export function RevealOnScroll({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") return;

    el.style.opacity = "0";
    el.style.transform = "translateY(0.75rem)";
    el.style.transition = "opacity 220ms ease-out, transform 220ms ease-out";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
