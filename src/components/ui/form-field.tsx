import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

const inputBase =
  "w-full rounded-(--radius-md) border border-ink-500/40 bg-white px-4 py-2.5 text-ink-900 " +
  "placeholder:text-ink-500 min-h-11 " +
  "transition-colors duration-(--duration-fast) " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-600 " +
  "disabled:opacity-50 disabled:bg-stone-100 " +
  "aria-invalid:border-error-600 aria-invalid:bg-error-100/40";

export function FormField({
  id,
  label,
  error,
  hint,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-(length:--text-small) font-medium text-ink-800">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-error-600">
            {" "}
            *
          </span>
        ) : (
          <span className="text-ink-500"> (optional)</span>
        )}
      </label>
      {children}
      {hint ? (
        <p id={hintId} className="text-xs text-ink-600">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-xs font-medium text-error-600">
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
