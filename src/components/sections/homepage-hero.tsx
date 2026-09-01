import { surgeonProfile } from "@/content/surgeon";
import { siteConfig } from "@/content/site";
import { LinkButton } from "@/components/ui/button";
import { AppointmentCard } from "@/components/appointment/appointment-card";
import { AppointmentMobileDrawer } from "@/components/appointment/appointment-mobile-drawer";
import { PendingBadge } from "@/components/ui/badge";

export function HomepageHero() {
  return (
    <section aria-label="Introduction" className="border-b border-stone-200 bg-stone-50 py-10 sm:py-14 lg:py-(--spacing-section-y)">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:items-start lg:gap-8">
        <div className="lg:col-span-7">
          <p
            className="hero-fade-up mb-2 text-(length:--text-small) font-medium uppercase tracking-wide text-teal-700"
            style={{ animationDelay: "0ms" }}
          >
            {siteConfig.name}
          </p>
          <h1 className="hero-fade-up mb-3" style={{ animationDelay: "60ms" }}>
            {surgeonProfile.fullName}
          </h1>
          <p
            className="hero-fade-up mb-1 flex flex-wrap items-center gap-2 text-(length:--text-body-lg) text-ink-700"
            style={{ animationDelay: "120ms" }}
          >
            {surgeonProfile.displayTitle.value}
            {surgeonProfile.displayTitle.status !== "verified" && <PendingBadge />}
          </p>
          <p
            className="hero-fade-up mt-5 max-w-xl text-(length:--text-body-lg) text-ink-800"
            style={{ animationDelay: "180ms" }}
          >
            {surgeonProfile.positioningStatement}
          </p>

          <div className="hero-fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "240ms" }}>
            <span className="hidden lg:inline-flex">
              <LinkButton href="/appointments" size="lg">
                Request an Appointment
              </LinkButton>
            </span>
            <span className="lg:hidden">
              <AppointmentMobileDrawer />
            </span>
            <LinkButton href="#robotic-surgery" variant="secondary" size="lg">
              Explore Robotic Surgery
            </LinkButton>
          </div>

          <p
            className="hero-fade-up mt-6 max-w-xl text-(length:--text-small) text-ink-600"
            style={{ animationDelay: "280ms" }}
          >
            {siteConfig.emergencyNotice}
          </p>
        </div>

        <div className="hero-fade-up hidden lg:col-span-5 lg:block" style={{ animationDelay: "150ms" }}>
          <AppointmentCard />
        </div>
      </div>
    </section>
  );
}
