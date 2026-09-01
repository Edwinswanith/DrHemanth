import { Section } from "@/components/ui/section";

const rows: { factor: string; robotic: string; laparoscopic: string }[] = [
  {
    factor: "Who controls the instruments",
    robotic: "The surgeon, from a console, controlling robotic instruments in real time",
    laparoscopic: "The surgeon, holding and moving instruments directly by hand",
  },
  {
    factor: "Camera view",
    robotic: "Magnified, high-definition 3D view controlled by the surgeon",
    laparoscopic: "High-definition 2D or 3D view, typically held by an assistant or fixed",
  },
  {
    factor: "Instrument movement",
    robotic: "Wristed instruments with a wide range of articulation",
    laparoscopic: "Straight, rigid instruments with a more limited range of motion",
  },
  {
    factor: "Incisions",
    robotic: "Several small incisions, similar in number and size to laparoscopic surgery",
    laparoscopic: "Several small incisions",
  },
  {
    factor: "Procedure suitability",
    robotic: "Suitable for a defined range of procedures where robotic access offers a benefit; not appropriate for every case",
    laparoscopic: "Suitable for a wide range of general and upper GI procedures; a well-established, widely available approach",
  },
  {
    factor: "Availability",
    robotic: "Depends on the hospital having robotic equipment and a trained team; less universally available",
    laparoscopic: "Widely available across NHS and private hospitals",
  },
  {
    factor: "Risks",
    robotic: "Similar general surgical and anaesthetic risks to laparoscopic surgery, plus equipment-specific considerations",
    laparoscopic: "Established general surgical and anaesthetic risks for minimally invasive surgery",
  },
  {
    factor: "Recovery considerations",
    robotic: "Generally comparable to laparoscopic surgery for most procedures; individual recovery varies",
    laparoscopic: "Generally shorter recovery than open surgery; individual recovery varies",
  },
  {
    factor: "Cost considerations",
    robotic: "May carry additional costs depending on hospital, insurer, and procedure",
    laparoscopic: "Typically well-established within standard surgical fees",
  },
  {
    factor: "Evidence & limitations",
    robotic: "A growing evidence base; benefit over laparoscopic surgery varies by procedure and is not universal",
    laparoscopic: "A long-established evidence base across most general and upper GI procedures",
  },
];

export function SurgeryComparison() {
  return (
    <Section id="comparison" ariaLabel="Robotic versus laparoscopic surgery comparison">
      <h2 className="mb-2">Robotic vs laparoscopic surgery</h2>
      <p className="mb-6 max-w-2xl text-ink-700">
        Both are minimally invasive approaches. Neither is automatically
        better — the right approach depends on the patient, the condition,
        the specific procedure, the surgeon&rsquo;s judgement, equipment
        availability, and the evidence for that procedure. Laparoscopic
        surgery is a well-established, effective approach in its own right,
        not an outdated alternative.
      </p>

      <div
        className="overflow-x-auto rounded-(--radius-lg) border border-stone-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-600"
        tabIndex={0}
        role="region"
        aria-label="Robotic versus laparoscopic surgery comparison table, scrollable horizontally on narrow screens"
      >
        <table className="w-full min-w-[640px] border-collapse text-left text-(length:--text-small)">
          <caption className="sr-only">Comparison of robotic-assisted and laparoscopic surgery by factor</caption>
          <thead>
            <tr className="bg-ink-900 text-stone-50">
              <th scope="col" className="p-3 font-semibold">
                Factor
              </th>
              <th scope="col" className="p-3 font-semibold">
                Robotic-assisted surgery
              </th>
              <th scope="col" className="p-3 font-semibold">
                Laparoscopic surgery
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.factor} className={index % 2 === 0 ? "bg-white" : "bg-stone-100"}>
                <th scope="row" className="p-3 font-medium text-ink-900">
                  {row.factor}
                </th>
                <td className="p-3 text-ink-800">{row.robotic}</td>
                <td className="p-3 text-ink-800">{row.laparoscopic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 max-w-2xl text-ink-700">
        The most appropriate approach for you can only be determined through
        a consultation that takes your specific condition, medical history,
        and preferences into account.
      </p>
    </Section>
  );
}
