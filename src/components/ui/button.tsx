import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-(--radius-md) font-medium " +
  "transition-colors duration-(--duration-fast) ease-(--ease-standard) " +
  "disabled:opacity-50 disabled:pointer-events-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-600";

const variants: Record<Variant, string> = {
  // bronze-700, not bronze-600, against white text: bronze-600 measures
  // 3.99:1 (fails WCAG AA 4.5:1 for normal text) — found by the axe scan
  // in tests/accessibility/wcag.spec.ts. bronze-700 measures 5.53:1.
  primary: "bg-bronze-700 text-stone-50 hover:bg-bronze-800 active:bg-bronze-800",
  secondary:
    "bg-transparent text-ink-900 border border-ink-700 hover:bg-ink-900 hover:text-stone-50 active:bg-ink-800",
  ghost: "bg-transparent text-ink-700 hover:bg-stone-200 active:bg-stone-300",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-(length:--text-body) min-h-11",
  lg: "px-7 py-3.5 text-(length:--text-body-lg) min-h-12",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkButtonProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({ variant = "primary", size = "md", className, children, href, ...props }: LinkButtonProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const content = (
    <span className={cn(base, variants[variant], sizes[size], className)}>{children}</span>
  );

  if (isInternal) {
    return (
      <Link href={href} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} {...props}>
      {content}
    </a>
  );
}
