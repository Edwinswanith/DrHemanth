import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui/container";

/**
 * The shared section shell. Each homepage module gets one of these — the
 * `tone` prop is what lets adjacent modules compose into one visual block
 * (matching tone + no divider) while still being distinct <section>
 * landmarks with their own heading, per docs/08-design-system.md.
 */
export function Section({
  id,
  tone = "default",
  ariaLabel,
  className,
  children,
}: {
  id?: string;
  tone?: "default" | "sunken" | "dark" | "accent";
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
}) {
  const toneClasses: Record<typeof tone, string> = {
    default: "bg-stone-50",
    sunken: "bg-stone-100",
    dark: "on-dark bg-ink-900",
    accent: "bg-teal-100",
  };

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("py-(--spacing-section-y)", toneClasses[tone], className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
