// JSON-LD must be inline; content is generated server-side from typed
// builders (src/lib/structured-data/), never from raw user input.
export function StructuredData({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
