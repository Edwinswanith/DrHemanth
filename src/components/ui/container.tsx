import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Container({
  as: As = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <As className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </As>
  );
}
