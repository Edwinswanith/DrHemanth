import { siteConfig } from "@/content/site";
import { canRenderFact } from "@/lib/content/publication";

export function AppointmentError({
  variant,
  message,
}: {
  variant: "generic" | "rate-limited";
  message?: string | null;
}) {
  const heading = variant === "rate-limited" ? "Too many requests" : "We couldn't send your request";
  const publicTelephone = canRenderFact(siteConfig.primaryTelephone)
    ? ` on ${siteConfig.primaryTelephone.value}`
    : "";
  const body =
    variant === "rate-limited"
      ? `Please wait a few minutes before trying again, or call the practice directly${publicTelephone}.`
      : (message ?? "Please try again, or call the practice directly.");

  return (
    <div role="alert" className="flex flex-col gap-1 rounded-md border border-error-600/30 bg-error-100 p-4">
      <p className="font-semibold text-ink-900">{heading}</p>
      <p className="text-small text-ink-800">{body}</p>
    </div>
  );
}
