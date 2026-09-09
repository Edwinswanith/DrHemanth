import Image from "next/image";
import { AppointmentCard } from "@/components/appointment/appointment-card";
import { AppointmentMobileDrawer } from "@/components/appointment/appointment-mobile-drawer";
import { LinkButton } from "@/components/ui/button";
import { surgeonProfile } from "@/content/surgeon";
import { canRenderFact } from "@/lib/content/publication";

const evidenceItems = [
  {
    label: "Request first",
    value: "The practice confirms the appointment.",
  },
  {
    label: "Assessment led",
    value: "Surgery is considered only when appropriate.",
  },
  {
    label: "Balanced options",
    value: "Robotic, laparoscopic and open routes are discussed when relevant.",
  },
];

const publicPositioning = canRenderFact(surgeonProfile.displayTitle)
  ? surgeonProfile.displayTitle.value
  : "Upper GI, hepatobiliary, hernia and minimally invasive surgical care.";

export function HomepageHero() {
  return (
    <section data-section="hero" aria-label="Introduction" className="border-b border-stone-200 bg-ivory">
      <div className="site-container py-8 sm:py-10 lg:py-10 xl:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,44%)] sm:items-start">
              <div>
                <p
                  className="hero-fade-up mb-3 text-label font-semibold uppercase tracking-wide text-steel-700"
                  style={{ animationDelay: "0ms" }}
                >
                  Private upper GI surgical care
                </p>
                <h1
                  className="hero-fade-up max-w-3xl text-balance text-hero text-ink-950"
                  style={{ animationDelay: "60ms" }}
                >
                  {surgeonProfile.fullName}
                </h1>
                <p
                  className="hero-fade-up mt-4 max-w-2xl text-body-lg font-semibold text-ink-900"
                  style={{ animationDelay: "120ms" }}
                >
                  {publicPositioning}
                </p>
                <p
                  className="hero-fade-up mt-5 max-w-2xl text-body-lg text-ink-700"
                  style={{ animationDelay: "170ms" }}
                >
                  Patient-focused care for upper digestive, gallbladder, bile duct and hernia conditions.
                </p>

                <div className="hero-fade-up mt-6" style={{ animationDelay: "220ms" }}>
                  <span className="lg:hidden">
                    <AppointmentMobileDrawer />
                  </span>
                </div>
              </div>

              <figure
                className="hero-fade-up border border-stone-200"
                style={{ animationDelay: "150ms" }}
                data-testid="hero-portrait"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/images/keyholesurgeon/prof-hemant-sheth-portrait.png"
                    alt="Prof. Hemant Sheth"
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(min-width: 1280px) 26vw, (min-width: 1024px) 32vw, (min-width: 640px) 42vw, 92vw"
                    className="object-cover object-center"
                  />
                </div>
              </figure>
            </div>

            <dl
              className="hero-fade-up mt-8 grid gap-3 border-y border-stone-200 py-3 sm:grid-cols-3"
              style={{ animationDelay: "260ms" }}
            >
              {evidenceItems.map((item) => (
                <div key={item.label} className="border-l border-border-strong pl-3">
                  <dt className="text-label font-semibold uppercase tracking-wide text-steel-700">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-small leading-relaxed text-ink-800">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="hero-fade-up mt-6" style={{ animationDelay: "290ms" }}>
              <LinkButton href="#treatments" variant="secondary">
                View Treatments
              </LinkButton>
            </div>
          </div>

          <aside
            className="hero-fade-up hidden lg:col-span-5 lg:block"
            style={{ animationDelay: "210ms" }}
            aria-label="Appointment request form"
            data-testid="hero-appointment"
          >
            <AppointmentCard />
          </aside>
        </div>
      </div>
    </section>
  );
}
