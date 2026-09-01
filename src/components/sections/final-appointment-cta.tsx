import { Section } from "@/components/ui/section";
import { LinkButton } from "@/components/ui/button";
import { siteConfig } from "@/content/site";

export function FinalAppointmentCta() {
  return (
    <Section tone="dark" ariaLabel="Request an appointment">
      <div className="flex flex-col items-start gap-4">
        <h2>Ready to request an appointment?</h2>
        <p className="max-w-xl text-stone-200">{siteConfig.requestNotConfirmedNotice}</p>
        <LinkButton href="/appointments" size="lg">
          Request an Appointment
        </LinkButton>
        <p className="text-(length:--text-small) text-stone-300">{siteConfig.emergencyNotice}</p>
      </div>
    </Section>
  );
}
