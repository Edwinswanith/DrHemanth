import Image from "next/image";
import { LinkButton } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/content/site";
import { canRenderFact } from "@/lib/content/publication";

export function FinalAppointmentCta() {
  const hasPublicTelephone = canRenderFact(siteConfig.primaryTelephone);

  return (
    <Section tone="accent" spacing="compact" dataSection="final-cta" ariaLabel="Request an appointment">
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="mb-3 text-label font-semibold uppercase tracking-wide text-primary">
            Next step
          </p>
          <h2 className="max-w-3xl text-balance">Request a consultation with the practice.</h2>
          <p className="mt-4 max-w-xl text-ink-700">
            Submit the form and the practice will contact you separately about the request.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="grid gap-5 border-t border-stone-200 pt-5 sm:grid-cols-[6rem_1fr] sm:items-start lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <div className="relative hidden aspect-[4/5] overflow-hidden border border-stone-200 sm:block">
              <Image
                src="/images/keyholesurgeon/prof-hemant-sheth-portrait.png"
                alt="Prof. Hemant Sheth"
                fill
                sizes="8rem"
                className="object-cover object-center"
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <LinkButton href="/appointments" size="lg">
                Request an Appointment
              </LinkButton>
              {hasPublicTelephone ? (
                <LinkButton
                  href={`tel:${siteConfig.primaryTelephone.value.replace(/\s+/g, "")}`}
                  variant="secondary"
                  size="lg"
                >
                  Call {siteConfig.primaryTelephone.value}
                </LinkButton>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
