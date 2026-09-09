import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md text-center font-medium leading-tight " +
  "transition-colors duration-fast ease-standard " +
  "disabled:opacity-50 disabled:pointer-events-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-stone-50 hover:bg-primary-hover active:bg-ink-950",
  secondary:
    "bg-transparent text-primary border border-primary hover:bg-primary hover:text-stone-50 active:bg-primary-hover active:border-primary-hover",
  inverse:
    "bg-transparent text-stone-50 border border-stone-200/80 hover:bg-stone-50 hover:text-ink-950 active:bg-stone-200",
  ghost: "bg-transparent text-ink-700 hover:bg-stone-200 active:bg-stone-300",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-body min-h-11",
  lg: "px-7 py-3.5 text-body-lg min-h-12",
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
  // The visual/focus styling lives on the actual focusable element (the
  // <Link>/<a> itself), not an inner <span> — a span can never receive
  // focus, so focus-visible:* classes there were dead code (the visible
  // focus ring users saw came only from an unrelated global fallback rule
  // in globals.css). See the accessibility-reviewer finding on
  // /qualifications-and-memberships, 2026-09-02.
  const linkClassName = cn(base, variants[variant], sizes[size], className);

  if (isInternal) {
    return (
      <Link href={href} className={linkClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={linkClassName} {...props}>
      {children}
    </a>
  );
}
