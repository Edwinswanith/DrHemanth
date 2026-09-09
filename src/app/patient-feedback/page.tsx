import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { feedbackExcerpts } from "@/content/patient-feedback";
import { canRenderStatus } from "@/lib/content/publication";

export const metadata: Metadata = {
  title: "Patient Feedback - Prof. Hemant Sheth",
  description:
    "Anonymised patient cards, notes and feedback supplied to Prof. Hemant Sheth's practice.",
  alternates: { canonical: "/patient-feedback" },
  robots: { index: false, follow: true },
};

export default function PatientFeedbackPage() {
  const excerpts = feedbackExcerpts.filter((item) => canRenderStatus(item.status));
  const [leadExcerpt, ...supportingExcerpts] = excerpts;

  return (
    <>
      <section className="border-b border-stone-200 bg-white py-section-feature" aria-labelledby="patient-feedback-title">
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mb-3 text-label font-semibold uppercase tracking-wide text-steel-700">Patient experience</p>
            <h1 id="patient-feedback-title" className="max-w-4xl text-page-h1 text-balance">
              Patient feedback archive
            </h1>
            <p className="mt-5 max-w-2xl text-body-lg text-text-secondary">
              Selected anonymised excerpts from cards and feedback supplied to the practice. Names, signatures and private details are withheld.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <LinkButton href="/appointments" size="lg">
                Request an Appointment
              </LinkButton>
              <LinkButton href="/#patient-stories" variant="secondary" size="lg">
                Back to homepage
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>

      {leadExcerpt ? (
        <Section spacing="standard" dataSection="feedback-excerpts" ariaLabel="Selected feedback excerpts">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="mb-3 text-label font-semibold uppercase tracking-wide text-steel-700">Read the feedback</p>
              <h2 className="text-balance">Short excerpts, kept anonymous.</h2>
            </div>

            <div className="lg:col-span-8">
              <figure className="border-y border-stone-200 py-8">
                <blockquote className="font-display text-[clamp(2rem,4vw,3.75rem)] leading-tight text-ink-950">
                  &ldquo;{leadExcerpt.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-small font-semibold text-ink-800">{leadExcerpt.context}</figcaption>
              </figure>

              <div className="grid gap-5 border-b border-stone-200 py-7 md:grid-cols-2">
                {supportingExcerpts.map((excerpt) => (
                  <figure key={excerpt.quote} className="border-l border-bronze-200 pl-5">
                    <blockquote className="font-display text-[1.35rem] leading-snug text-ink-950">
                      &ldquo;{excerpt.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-4 text-small font-semibold text-ink-800">{excerpt.context}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </Section>
      ) : null}
    </>
  );
}
