import { siteConfig } from "@/content/site";

export function UrgentCareNotice({ warningSigns }: { warningSigns: string[] }) {
  return (
    <aside
      aria-label="Urgent warning signs"
      className="rounded-lg border-2 border-error-600/40 bg-error-100 p-5"
    >
      <p className="mb-2 font-semibold text-ink-900">Seek urgent medical help if you notice:</p>
      <ul className="mb-3 list-inside list-disc space-y-1 text-ink-800">
        {warningSigns.map((sign) => (
          <li key={sign}>{sign}</li>
        ))}
      </ul>
      <p className="text-small font-medium text-ink-900">{siteConfig.emergencyNotice}</p>
    </aside>
  );
}
