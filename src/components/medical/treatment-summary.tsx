export function TreatmentSummary({
  summary,
  symptomsOrReferralReasons,
  assessment,
}: {
  summary: string;
  symptomsOrReferralReasons: string[];
  assessment: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-body-lg text-ink-800">{summary}</p>

      <div>
        <h2 className="mb-2 text-heading">Symptoms and reasons for referral</h2>
        <ul className="list-inside list-disc space-y-1 text-ink-800">
          {symptomsOrReferralReasons.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-heading">How it&rsquo;s assessed</h2>
        <p className="text-ink-800">{assessment}</p>
      </div>
    </div>
  );
}
