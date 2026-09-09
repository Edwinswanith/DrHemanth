import { LinkButton } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { HeroVideo } from "@/components/sections/hero-video";

const decisionPoints = [
  {
    label: "Benefit",
    value: "3D vision and wristed instruments may help selected operations.",
  },
  {
    label: "Limits",
    value: "It is not autonomous or automatically superior.",
  },
  {
    label: "Suitability",
    value: "Diagnosis, anatomy and hospital pathway guide the choice.",
  },
];

const controlSequence = [
  "The surgeon sits at the console",
  "Hand movements are translated by the system",
  "Instruments move only under surgeon control",
];

export function RoboticSurgeryIntroduction() {
  return (
    <Section id="robotic-surgery" tone="dark" spacing="compact" ariaLabel="Introduction to robotic surgery">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <p className="mb-3 text-label font-semibold uppercase tracking-wide text-steel-100">
            Minimally invasive surgery
          </p>
          <h2 className="text-balance text-stone-50">Robotic surgery, clearly explained.</h2>
          <p className="mt-5 text-body-lg text-stone-200">
            Robotic-assisted surgery uses small incisions, a console, specialist instruments and a magnified 3D view.
          </p>
          <p className="mt-5 border-l border-steel-100/50 pl-5 font-semibold text-stone-50">
            The surgeon controls every movement. The system cannot act on its own.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/robotic-vs-laparoscopic" variant="inverse">
              Compare approaches
            </LinkButton>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="border border-stone-50/20 bg-ink-950/35 p-2">
            <div className="aspect-video overflow-hidden bg-ink-950" data-testid="hero-video-frame">
              <HeroVideo />
            </div>
          </div>
          <p className="mt-3 text-small leading-relaxed text-stone-300">Video loads only after activation.</p>

          <ol
            className="mt-6 grid grid-cols-1 gap-4 border-y border-stone-50/20 py-5 sm:grid-cols-3"
            aria-label="How surgeon-controlled robotic surgery works"
          >
            {controlSequence.map((item, index) => (
              <li key={item} className="border-l border-stone-50/15 pl-4 first:border-l-0">
                <span className="font-display text-heading leading-none text-steel-100">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-1.5 block text-small leading-relaxed text-stone-100">{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-12">
          <dl className="grid gap-4 border-y border-stone-50/20 py-5 sm:grid-cols-3">
            {decisionPoints.map((point) => (
              <div key={point.label} className="border-l border-bronze-300/60 pl-4">
                <dt className="text-label font-semibold uppercase tracking-wide text-steel-100">
                  {point.label}
                </dt>
                <dd className="mt-1 text-small leading-relaxed text-stone-200">{point.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
