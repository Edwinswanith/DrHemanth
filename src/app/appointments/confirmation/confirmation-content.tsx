"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LinkButton } from "@/components/ui/button";
import { AppointmentSuccess } from "@/components/appointment/appointment-success";

function ConfirmationInner() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref");

  if (!reference) {
    return (
      <div>
        <h1 className="mb-3">No active confirmation</h1>
        <p className="mb-6 max-w-xl text-ink-700">
          We couldn&rsquo;t find a recent appointment request reference. If you need to contact the practice
          again, please submit a new request below.
        </p>
        <LinkButton href="/appointments">Request an Appointment</LinkButton>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4">Request received</h1>
      <div className="max-w-xl">
        <AppointmentSuccess reference={reference} />
      </div>
    </div>
  );
}

export function ConfirmationContent() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ConfirmationInner />
    </Suspense>
  );
}
