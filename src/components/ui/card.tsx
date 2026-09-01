import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Card({
  className,
  tone = "default",
  children,
}: {
  className?: string;
  tone?: "default" | "raised";
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-(--radius-lg) border border-stone-200 bg-white p-6",
        tone === "raised" ? "shadow-(--shadow-raised)" : "shadow-(--shadow-card)",
        className
      )}
    >
      {children}
    </div>
  );
}
