export function EvidenceReferences({ references }: { references: { label: string; url: string }[] }) {
  return (
    <div>
      <h2 className="mb-2 text-(length:--text-heading)">Sources and further reading</h2>
      <ul className="list-inside list-disc space-y-1 text-ink-800">
        {references.map((ref) => (
          <li key={ref.url}>
            <a href={ref.url} target="_blank" rel="noreferrer" className="underline hover:text-ink-900">
              {ref.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
