import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui/container";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

/**
 * The shared section shell. Each homepage module gets one of these — the
 * `tone` prop is what lets adjacent modules compose into one visual block
 * (matching tone + no divider) while still being distinct <section>
 * landmarks with their own heading, per docs/08-design-system.md. Content
 * fades/translates in once as it scrolls into view (see RevealOnScroll);
 * set `reveal={false}` to opt out (e.g. a section that's typically already
 * in the initial viewport, where the effect would be imperceptible).
 */
export function Section({
  id,
  tone = "default",
  ariaLabel,
  className,
  reveal = true,
  children,
}: {
  id?: string;
  tone?: "default" | "sunken" | "dark" | "accent";
  ariaLabel?: string;
  className?: string;
  reveal?: boolean;
  children: ReactNode;
}) {
  const toneClasses: Record<typeof tone, string> = {
    default: "bg-stone-50",
    sunken: "bg-stone-100",
    dark: "on-dark bg-ink-900",
    accent: "bg-teal-100",
  };

  const content = reveal ? <RevealOnScroll>{children}</RevealOnScroll> : children;

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("py-(--spacing-section-y)", toneClasses[tone], className)}
    >
      <Container>{content}</Container>
    </section>
  );
}
