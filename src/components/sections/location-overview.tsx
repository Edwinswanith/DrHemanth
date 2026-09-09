"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { showNonPublicContent } from "@/lib/content/publication";
import { consultationFees, generalEmail, practiceLocations } from "@/content/locations";
import type { Location } from "@/lib/content/schema";

function telephoneHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

function canShowLocation(location: Location) {
  return location.status === "verified" || (location.status === "pending" && showNonPublicContent);
}

function tabId(index: number) {
  return `location-tab-${index}`;
}

export function LocationOverview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const visibleLocations = practiceLocations.filter(canShowLocation);

  if (visibleLocations.length === 0) {
    return null;
  }

  const activeLocation = visibleLocations[Math.min(activeIndex, visibleLocations.length - 1)]!;

  function focusTab(index: number) {
    const nextIndex = (index + visibleLocations.length) % visibleLocations.length;
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusTab(index + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusTab(index - 1);
    }
  }

  return (
    <Section
      id="locations"
      spacing="compact"
      ariaLabel="Practice locations"
      className="!bg-white border-y border-stone-200"
    >
      <div className="min-w-0 pb-20 lg:pb-0">
        <div className="max-w-2xl">
          <p className="mb-3 text-label font-semibold uppercase tracking-wide text-steel-700">Local access</p>
          <h2 className="text-balance">Practice locations</h2>
          <p className="mt-4 text-ink-700">Select a location to view address, clinic hours and contact details.</p>
        </div>

        <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-4">
            <div
              role="tablist"
              aria-label="Practice locations"
              aria-orientation="vertical"
              className="grid gap-1 bg-surface-soft p-2"
            >
              {visibleLocations.map((location, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={location.name}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    type="button"
                    role="tab"
                    id={tabId(index)}
                    aria-selected={isActive}
                    aria-controls="active-location-detail"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                    className={`grid w-full gap-1 border-l-4 py-3 pl-3 pr-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700 ${
                      isActive ? "border-l-primary bg-white shadow-card" : "border-l-transparent hover:bg-white/60"
                    }`}
                  >
                    <span className={isActive ? "font-semibold text-ink-950" : "font-semibold text-ink-800"}>
                      {location.name}
                    </span>
                    <span className="text-small text-ink-700">{location.area}</span>
                    <span className="text-small text-ink-700">{location.hours[0] ?? "Clinic hours unavailable"}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <article
            key={activeLocation.name}
            id="active-location-detail"
            role="tabpanel"
            aria-labelledby={tabId(activeIndex)}
            className="hero-fade-up min-w-0 lg:col-span-8"
          >
            <div className="min-w-0 border-l border-border-strong pl-6">
              <div className={activeLocation.imageSrc ? "lg:grid lg:grid-cols-5 lg:items-start lg:gap-6" : ""}>
                {activeLocation.imageSrc ? (
                  <div className="aspect-[16/10] border border-stone-200 bg-white p-3 lg:col-span-2">
                    <div className="relative h-full overflow-hidden bg-white">
                      <Image
                        src={activeLocation.imageSrc}
                        alt={activeLocation.imageAlt ?? activeLocation.name}
                        fill
                        sizes="(min-width: 1024px) 20vw, 100vw"
                        className={activeLocation.imageFit === "cover" ? "object-cover" : "object-contain p-6"}
                      />
                    </div>
                  </div>
                ) : null}

                <div className={activeLocation.imageSrc ? "mt-6 lg:col-span-3 lg:mt-0" : undefined}>
                  <h3 className="text-ink-950">{activeLocation.name}</h3>
                  <p className="mt-2 text-ink-700">{activeLocation.area}</p>
                  <div className="mt-5 text-small">
                    <p className="font-semibold text-ink-900">Address</p>
                    <address className="mt-1 not-italic text-ink-700">
                      {activeLocation.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>
                </div>
              </div>

              <dl className="mt-8 grid gap-4 text-small">
                <div>
                  <dt className="font-semibold text-ink-900">Consultation details</dt>
                      <dd className="mt-1 text-ink-700">
                        {activeLocation.hours.length > 0 ? (
                          <ul className="grid gap-1">
                            {activeLocation.hours.map((hour) => (
                              <li key={hour}>{hour}</li>
                            ))}
                          </ul>
                        ) : (
                          "Clinic hours unavailable."
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-ink-900">Practice contact</dt>
                      <dd className="mt-1 grid gap-1.5 text-ink-700">
                        <span>Secretary: {activeLocation.secretary}</span>
                        <a
                          href={telephoneHref(activeLocation.phone)}
                          className="font-semibold text-steel-700 underline underline-offset-4 hover:text-ink-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700"
                        >
                          Call {activeLocation.phone}
                        </a>
                        <a
                          href={`mailto:${activeLocation.secretaryEmail}`}
                          className="font-semibold text-steel-700 underline underline-offset-4 hover:text-ink-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700"
                        >
                          Email {activeLocation.secretaryEmail}
                        </a>
                        <a
                          href={`mailto:${generalEmail}`}
                          className="font-semibold text-steel-700 underline underline-offset-4 hover:text-ink-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700"
                        >
                          Email {generalEmail}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-ink-900">Consultation fees</dt>
                      <dd className="mt-2 max-w-full overflow-x-auto">
                        <table className="w-full min-w-0 border-collapse text-left text-small">
                          <thead>
                            <tr className="border-b border-stone-200 text-ink-900">
                              <th scope="col" className="py-2 pr-4 font-semibold">
                                Type
                              </th>
                              <th scope="col" className="px-4 py-2 font-semibold">
                                Telephonic
                              </th>
                              <th scope="col" className="py-2 pl-4 font-semibold">
                                Face-to-face
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {consultationFees.map((fee) => (
                              <tr key={fee.type} className="border-b border-stone-200 last:border-b-0">
                                <th scope="row" className="py-2 pr-4 font-medium text-ink-900">
                                  {fee.type}
                                </th>
                                <td className="px-4 py-2 text-ink-700">{fee.telephonic}</td>
                                <td className="py-2 pl-4 text-ink-700">{fee.faceToFace}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-ink-900">Directions</dt>
                      <dd className="mt-1 text-ink-700">
                        <a
                          href={activeLocation.directionsHref}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-steel-700 underline underline-offset-4 hover:text-ink-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700"
                        >
                          Open directions
                        </a>
                      </dd>
                    </div>
                  </dl>
              <Link
                href="/appointments"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-steel-700 px-5 py-2.5 text-small font-semibold text-stone-50 hover:bg-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700"
              >
                Request this location
              </Link>
            </div>
          </article>
        </div>
      </div>
    </Section>
  );
}
