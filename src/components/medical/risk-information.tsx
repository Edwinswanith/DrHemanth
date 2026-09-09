export function RiskInformation({
  risks,
  recovery,
  riskStatisticsNote,
}: {
  risks: string[];
  recovery: string;
  riskStatisticsNote?: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="mb-2 text-heading">Risks and possible complications</h2>
        {riskStatisticsNote ? (
          <p className="mb-3 text-small italic text-ink-700">{riskStatisticsNote}</p>
        ) : null}
        <ul className="list-inside list-disc space-y-1 text-ink-800">
          {risks.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="mb-2 text-heading">Recovery</h2>
        <p className="text-ink-800">{recovery}</p>
      </div>
    </div>
  );
}
