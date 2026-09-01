"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log only that an error occurred, never any user-entered data —
    // see .claude/rules/appointment-security.md.
    console.error("[app-error]", error.digest ?? error.message);
  }, [error]);

  return (
    <Section ariaLabel="Something went wrong">
      <h1 className="mb-3">Something went wrong</h1>
      <p className="mb-6 max-w-xl text-ink-700">
        Please try again. If the problem continues, please call the practice
        directly rather than resubmitting repeatedly.
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </Section>
  );
}
