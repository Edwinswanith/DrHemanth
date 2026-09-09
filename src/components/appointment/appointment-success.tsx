import { siteConfig } from "@/content/site";

// Success is communicated through the explicit heading copy and this check
// icon together, never colour alone — the whole panel uses the same primary
// steel-blue system as the rest of the site rather than a separate green
// "success" colour. See .claude/rules/design-system.md.
function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-6 w-6 shrink-0 text-primary"
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 10.5l2.5 2.5 5.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AppointmentSuccess({ reference }: { reference: string }) {
  return (
    <div role="status" className="grid gap-5 rounded-md border border-primary/30 bg-primary-soft p-5">
      <div className="flex items-start gap-3">
        <CheckIcon />
        <div>
          <p className="font-semibold text-ink-900">Your appointment request has been received</p>
          <p className="mt-2 text-small leading-relaxed text-ink-800">
            Keep this reference in case you need to contact the practice about the request.
          </p>
        </div>
      </div>

      <div className="rounded-md border border-primary/25 bg-white px-4 py-3">
        <p className="text-label font-semibold uppercase tracking-wide text-ink-600">Reference number</p>
        <p className="mt-1 text-body-lg text-ink-950">
          Reference: <span className="font-mono font-semibold">{reference}</span>
        </p>
      </div>

      <div className="grid gap-3 text-small leading-relaxed text-ink-800">
        <p>{siteConfig.requestNotConfirmedNotice}</p>
        <p>
          If you entered the wrong contact details, submit a new request and keep the latest reference.
        </p>
        <p>{siteConfig.emergencyNotice}</p>
      </div>
    </div>
  );
}
