import { LinkButton } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { feedbackExcerpts } from "@/content/patient-feedback";
import { canRenderStatus } from "@/lib/content/publication";

const homepageExcludedFeedbackQuotes = new Set(["Heartfelt thanks and sincere gratitude."]);

export function PatientStories() {
  const renderableExcerpts = feedbackExcerpts.filter(
    (story) => canRenderStatus(story.status) && !homepageExcludedFeedbackQuotes.has(story.quote)
  );
  const primaryStory = renderableExcerpts[0];
  const secondaryStories = renderableExcerpts.slice(1, 3);

  if (renderableExcerpts.length === 0) {
    return null;
  }

  if (!primaryStory) {
    return null;
  }

  return (
    <Section dataSection="patient-stories" spacing="standard" ariaLabel="Patient experiences" className="!bg-white">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <p className="mb-3 text-label font-semibold uppercase tracking-wide text-steel-700">Patient experience</p>
          <h2 className="max-w-xl text-balance">Patient cards and notes</h2>
          <p className="mt-4 max-w-xl text-body text-text-secondary">
            Selected anonymised excerpts from patient cards supplied to the practice. Names and signatures are withheld.
          </p>
          <div className="mt-6">
            <LinkButton href="/patient-feedback" variant="secondary">
              View more feedback
            </LinkButton>
          </div>
        </div>

        <div className="lg:col-span-7">
          <figure className="relative border-y border-stone-200 py-7">
            <span
              aria-hidden="true"
              className="absolute -left-1 top-5 font-display text-[4.75rem] leading-[0.7] text-bronze-300"
            >
              &ldquo;
            </span>
            <blockquote className="pl-8 font-display text-[clamp(1.65rem,2.8vw,2.55rem)] leading-tight text-ink-950 md:pl-10">
              &ldquo;{primaryStory.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 pl-8 text-small text-ink-700 md:pl-10">
              <span aria-hidden="true" className="h-px w-8 bg-bronze-300" />
              <span className="font-semibold text-ink-900">{primaryStory.context}</span>
            </figcaption>
          </figure>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {secondaryStories.map((story) => (
              <figure key={story.quote} className="border-l border-bronze-200 pl-5">
                <blockquote className="font-display text-[1.25rem] leading-snug text-ink-950">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-small font-semibold text-ink-800">{story.context}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
