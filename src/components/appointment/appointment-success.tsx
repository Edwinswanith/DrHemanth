import { siteConfig } from "@/content/site";

export function AppointmentSuccess({ reference }: { reference: string }) {
  return (
    <div role="status" className="flex flex-col gap-3 rounded-(--radius-md) border border-success-600/30 bg-success-100 p-5">
      <p className="font-semibold text-ink-900">Your appointment request has been sent</p>
      <p className="text-(length:--text-small) text-ink-800">
        Reference: <span className="font-mono font-semibold">{reference}</span>
      </p>
      <p className="text-(length:--text-small) text-ink-800">{siteConfig.requestNotConfirmedNotice}</p>
      <p className="text-(length:--text-small) text-ink-800">{siteConfig.emergencyNotice}</p>
    </div>
  );
}
