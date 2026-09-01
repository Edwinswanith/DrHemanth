import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * A factual chip (qualification, membership) — never a "trust counter" or
 * invented metric. See .claude/rules/design-system.md.
 */
export function Badge({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-(--radius-sm) border border-teal-600/30 bg-teal-100 px-3 py-1 text-(length:--text-small) font-medium text-teal-700",
        className
      )}
    >
      {children}
    </span>
  );
}

export function PendingBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-(--radius-sm) border border-warning-700/30 bg-warning-100 px-2 py-0.5 text-xs font-medium text-warning-700",
        className
      )}
    >
      Pending verification
    </span>
  );
}
