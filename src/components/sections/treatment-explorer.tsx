"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";

const treatments = [
  {
    name: "Upper GI endoscopy",
    summary: "Upper digestive tract camera assessment.",
    approach: "Endoscopy",
    href: "/treatments/upper-gi-endoscopy",
    imageSrc: "/images/keyholesurgeon/upper-gi-endoscopy.jpg",
    imageAlt: "Illustration of an upper GI endoscopy procedure",
  },
  {
    name: "Anti-reflux surgery",
    summary: "Surgery for reflux when appropriate.",
    approach: "Reflux surgery",
    href: "/treatments/anti-reflux-surgery",
    imageSrc: "/images/keyholesurgeon/anti-reflux-surgery.jpg",
    imageAlt: "Illustration of anti-reflux (fundoplication) surgery",
  },
  {
    name: "Gallbladder surgery",
    summary: "Gallstones and gallbladder disease.",
    approach: "Gallbladder care",
    href: "/treatments/gallbladder-surgery",
    imageSrc: "/images/keyholesurgeon/cholecystectomy.jpg",
    imageAlt: "Illustration of gallbladder removal surgery",
  },
  {
    name: "Bile duct exploration",
    summary: "Bile duct stones and blockages.",
    approach: "Bile duct care",
    href: "/treatments/bile-duct-exploration",
    imageSrc: "/images/keyholesurgeon/hpb-disorders.png",
    imageAlt: "Illustration of hepatobiliary system anatomy and disorders",
  },
  {
    name: "Hernia surgery",
    summary: "Inguinal, umbilical, incisional and hiatal hernias.",
    approach: "Hernia repair",
    href: "/treatments/hernia-surgery",
    imageSrc: "/images/keyholesurgeon/hernia-surgery-service.jpg",
    imageAlt: "Illustration of hernia repair surgery",
  },
  {
    name: "Liver & spleen surgery",
    summary: "Selected liver and spleen conditions.",
    approach: "HPB assessment",
    href: "/treatments/liver-and-spleen-surgery",
    imageSrc: "/images/keyholesurgeon/hpb-disorder-service.png",
    imageAlt: "Illustration of liver and spleen surgical anatomy",
  },
  {
    name: "Appendicectomy",
    summary: "Appendix removal when clinically indicated.",
    approach: "Appendix surgery",
    href: "/treatments/appendicectomy",
    imageSrc: "/images/keyholesurgeon/appendicectomy-service.jpg",
    imageAlt: "Illustration of an appendicectomy procedure",
  },
];

export function TreatmentExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTreatment = treatments[activeIndex]!;

  return (
    <Section id="treatments" tone="sunken" spacing="compact" ariaLabel="Treatments and conditions">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="mb-3 text-label font-semibold uppercase tracking-wide text-steel-700">
            Conditions and procedures
          </p>
          <h2 className="text-balance">Treatments & conditions</h2>
          <p className="mt-4 text-ink-700">
            Choose a guide for symptoms, options, risks and recovery.
          </p>
        </div>

        <div className="hidden gap-7 lg:col-span-8 lg:grid lg:grid-cols-12">
          <ol className="lg:col-span-5" aria-label="Treatment index">
            {treatments.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <li key={item.href} className="border-t border-stone-200 last:border-b">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    aria-controls="active-treatment-detail"
                    onClick={() => setActiveIndex(index)}
                    className="grid w-full grid-cols-[2.25rem_1fr] gap-3 py-3.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700"
                  >
                    <span className={isActive ? "font-semibold text-steel-700" : "font-semibold text-ink-700"}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className={isActive ? "block font-semibold text-ink-950" : "block font-semibold text-ink-800"}>
                        {item.name}
                      </span>
                      <span className="mt-1 block text-small leading-relaxed text-ink-700">
                        {item.summary}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <article id="active-treatment-detail" className="lg:col-span-7">
            <div className="border-l border-bronze-200 pl-6">
              <div className="grid gap-5 xl:grid-cols-[1fr_10rem]">
                <div>
                  <p className="text-label font-semibold uppercase tracking-wide text-steel-700">
                    Selected treatment
                  </p>
                  <h3 className="mt-2 text-ink-950">{activeTreatment.name}</h3>
                  <p className="mt-3 text-ink-800">Detailed information sits on the treatment page.</p>
                  <p className="mt-4 inline-flex rounded-sm border border-steel-600/30 bg-steel-100 px-3 py-1 text-small font-semibold text-steel-700">
                    {activeTreatment.approach}
                  </p>
                  <div className="mt-5">
                    <Link
                      href={activeTreatment.href}
                      className="inline-flex min-h-11 items-center justify-center rounded-md bg-steel-700 px-5 py-2.5 text-small font-semibold text-stone-50 hover:bg-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700"
                    >
                      Read {activeTreatment.name}
                    </Link>
                  </div>
                </div>
                <div className="aspect-[4/5] border border-stone-200 bg-white p-3">
                  <div className="relative h-full overflow-hidden bg-steel-050">
                    <Image
                      src={activeTreatment.imageSrc}
                      alt={activeTreatment.imageAlt}
                      fill
                      sizes="10rem"
                      className="object-contain p-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="lg:hidden">
          <div className="divide-y divide-stone-200 border-y border-stone-200">
            {treatments.map((item, index) => (
              <section key={item.href} aria-label={item.name}>
                <button
                  type="button"
                  aria-expanded={activeIndex === index}
                  aria-controls={`mobile-treatment-${index}`}
                  onClick={() => setActiveIndex(index)}
                  className="grid w-full grid-cols-[2.25rem_1fr] gap-3 py-3.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700"
                >
                  <span className="font-semibold text-steel-700">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-semibold text-ink-950">{item.name}</span>
                    <span className="mt-1 block text-small leading-relaxed text-ink-700">
                      {item.summary}
                    </span>
                  </span>
                </button>
                {activeIndex === index && (
                  <div id={`mobile-treatment-${index}`} className="pb-4 pl-[3rem]">
                    <p className="text-small font-semibold text-steel-700">{item.approach}</p>
                    <Link
                      href={item.href}
                      className="mt-3 inline-flex min-h-11 items-center justify-center rounded-md border border-ink-700 px-4 py-2 text-small font-semibold text-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700"
                    >
                      Read {item.name}
                    </Link>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
