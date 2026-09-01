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
          <p className="mb-2 text-(length:--text-small) font-medium uppercase tracking-wide text-teal-700">
            {siteConfig.name}
          </p>
          <h1 className="mb-3">{surgeonProfile.fullName}</h1>
          <p className="mb-1 flex flex-wrap items-center gap-2 text-(length:--text-body-lg) text-ink-700">
            {surgeonProfile.displayTitle.value}
            {surgeonProfile.displayTitle.status !== "verified" && <PendingBadge />}
          </p>
          <p className="mt-5 max-w-xl text-(length:--text-body-lg) text-ink-800">
            {surgeonProfile.positioningStatement}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

          <p className="mt-6 max-w-xl text-(length:--text-small) text-ink-600">{siteConfig.emergencyNotice}</p>
        </div>

        <div className="hidden lg:col-span-5 lg:block">
          <AppointmentCard />
        </div>
      </div>
    </section>
  );
}
