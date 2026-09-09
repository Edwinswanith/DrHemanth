import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui/container";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

/**
 * The shared section shell. Each homepage module gets one of these — the
 * `tone` prop is what lets adjacent modules compose into one visual block
 * (matching tone + no divider) while still being distinct <section>
 * landmarks with their own heading, per docs/08-design-system.md. Content
 * Content is visible by default. `reveal` remains available for a deliberately
 * animated module, but normal medical content should not reserve blank
 * screenshot space while waiting for scroll-triggered motion.
 */
export function Section({
  id,
  tone = "default",
  spacing = "standard",
  dataSection,
  ariaLabel,
  className,
  reveal = false,
  children,
}: {
  id?: string;
  tone?: "default" | "sunken" | "dark" | "accent";
  spacing?: "compact" | "standard" | "feature";
  dataSection?: string;
  ariaLabel?: string;
  className?: string;
  reveal?: boolean;
  children: ReactNode;
}) {
  const toneClasses: Record<typeof tone, string> = {
    default: "bg-stone-50",
    sunken: "bg-stone-100",
    dark: "on-dark bg-ink-900",
    accent: "bg-steel-100",
  };
  const spacingClasses: Record<typeof spacing, string> = {
    compact: "py-section-compact",
    standard: "py-section-standard",
    feature: "py-section-feature",
  };

  const content = reveal ? <RevealOnScroll>{children}</RevealOnScroll> : children;

  return (
    <section
      id={id}
      data-section={dataSection ?? id}
      aria-label={ariaLabel}
      className={cn("scroll-mt-20 xl:scroll-mt-24", spacingClasses[spacing], toneClasses[tone], className)}
    >
      <Container>{content}</Container>
    </section>
  );
}
