import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

const inputBase =
  "w-full rounded-md border border-ink-500/40 bg-white px-4 py-2.5 text-body text-ink-900 " +
  "placeholder:text-ink-500 min-h-12 leading-normal " +
  "transition-colors duration-fast " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700 " +
  "disabled:cursor-not-allowed disabled:border-ink-500/20 disabled:bg-stone-100 disabled:opacity-60 " +
  "aria-invalid:border-error-600 aria-invalid:bg-error-100/40";

export function FormField({
  id,
  label,
  error,
  hint,
  required,
  tone = "light",
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className={cn(
          "text-label font-semibold leading-snug",
          tone === "dark" ? "text-stone-100" : "text-ink-800"
        )}
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 align-baseline text-error-600">
            *
          </span>
        ) : (
          <span className={tone === "dark" ? "text-stone-300" : "text-ink-500"}> (optional)</span>
        )}
      </label>
      {children}
      {hint ? (
        <p id={hintId} className={cn("text-small leading-snug", tone === "dark" ? "text-stone-300" : "text-ink-700")}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-small font-medium leading-snug text-error-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function textFieldClassName(hasError: boolean) {
  return cn(inputBase, hasError && "border-error-600");
}

export { inputBase };
