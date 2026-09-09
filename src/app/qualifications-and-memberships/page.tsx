import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { LinkButton } from "@/components/ui/button";
import { PendingBadge } from "@/components/ui/badge";
import { MedicalReviewDetails } from "@/components/medical/medical-review-details";
import { surgeonProfile } from "@/content/surgeon";
import { qualificationsPageContent } from "@/content/qualifications";

// Split out of the (still-blocked) /about route per
// docs/02-information-architecture.md — nothing on this page depends on the
// unresolved canonical-title decision. Every fact here is old-site-sourced
// and unverified (see docs/04-content-verification.md and
// src/content/qualifications.ts), so — matching the same pattern already
// used for the treatment pages — the route is real and reachable but not
// indexed until it clears verification.
export const metadata: Metadata = {
  title: "Qualifications & Professional Memberships - Prof. Hemant Sheth",
  description:
    "Prof. Hemant Sheth's surgical qualifications, professional memberships, research and publications — pending independent verification.",
  alternates: { canonical: "/qualifications-and-memberships" },
  robots: { index: false, follow: true },
};

export default function QualificationsAndMembershipsPage() {
  const { qualifications, disputedListedTitle, professionalPositions, researchProjects, publications, gpCourses, reviewMeta } =
    qualificationsPageContent;
  const { professionalMemberships, gmcNumber } = surgeonProfile;

  return (
    <>
      <Section ariaLabel="Qualifications and professional memberships">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Qualifications & Professional Memberships", href: "/qualifications-and-memberships" },
          ]}
        />
        <h1 className="mt-4 mb-4 max-w-3xl text-balance">Qualifications &amp; professional memberships</h1>
        <p className="max-w-2xl text-body-lg text-ink-700">
          Prof. Hemant Sheth&apos;s surgical training, professional memberships, research and publications, sourced
          from the practice&apos;s own prior published material.
        </p>
        <div className="mt-5 max-w-2xl">
          <MedicalReviewDetails reviewMeta={reviewMeta} />
        </div>
      </Section>

      <Section tone="sunken" ariaLabel="Qualifications">
        <div className="flex items-center gap-3">
          <h2>Qualifications</h2>
          <PendingBadge />
        </div>
        <dl className="mt-6 grid max-w-3xl gap-4 sm:grid-cols-2">
          {qualifications.value.map((item) => (
            <div key={item.credential} className="border-l border-bronze-200 pl-4">
              <dt className="font-semibold text-ink-950">{item.credential}</dt>
              <dd className="mt-1 text-small text-ink-700">
                {item.awardingBody} &middot; {item.year}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 max-w-2xl text-small text-ink-700">{qualifications.note}</p>

        {disputedListedTitle?.value ? (
          <div className="mt-8 max-w-3xl rounded-md border border-warning-700/30 bg-warning-100 p-4">
            <p className="flex items-center gap-2 font-semibold text-ink-950">
              Also listed on the prior site: &ldquo;{disputedListedTitle.value.label}&rdquo; ({disputedListedTitle.value.year})
              <PendingBadge />
            </p>
            <p className="mt-2 text-small text-ink-800">{disputedListedTitle.note}</p>
          </div>
        ) : null}
      </Section>

      <Section ariaLabel="GMC registration">
        <div className="flex items-center gap-3">
          <h2>GMC registration</h2>
          <PendingBadge />
        </div>
        <p className="mt-4 max-w-2xl text-ink-800">
          A GMC registration is published on the practice&apos;s previous website. The registration number is
          withheld here until it has been independently verified against the GMC register.
        </p>
        {gmcNumber.note ? <p className="mt-2 max-w-2xl text-small text-ink-700">{gmcNumber.note}</p> : null}
      </Section>

      <Section tone="sunken" ariaLabel="Professional memberships and positions held">
        <div className="flex items-center gap-3">
          <h2>Professional memberships &amp; positions held</h2>
          <PendingBadge />
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-heading">Memberships &amp; affiliations</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {professionalMemberships.value.map((membership) => (
                <li
                  key={membership}
                  className="inline-flex items-center rounded-sm border border-stone-300 bg-white px-3 py-1.5 text-small text-ink-800"
                >
                  {membership}
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-md text-small text-ink-700">{professionalMemberships.note}</p>
          </div>

          <div>
            <h3 className="text-heading">Positions held</h3>
            <ul className="mt-4 grid gap-3">
              {professionalPositions.value.map((position) => (
                <li key={position.role} className="border-l border-bronze-200 pl-4 text-ink-800">
                  <span className="font-semibold text-ink-950">{position.role}</span>
                  {position.body ? <span className="block text-small text-ink-700">{position.body}</span> : null}
                  {position.year ? <span className="block text-small text-ink-700">{position.year}</span> : null}
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-md text-small text-ink-700">{professionalPositions.note}</p>
          </div>
        </div>
      </Section>

      <Section ariaLabel="Research projects">
        <div className="flex items-center gap-3">
          <h2>Research</h2>
          <PendingBadge />
        </div>
        <div className="mt-6 grid gap-8">
          {researchProjects.value.map((project) => (
            <article key={project.title} className="border-y border-stone-200 py-6">
              <h3 className="text-heading text-balance">{project.title}</h3>
              <p className="mt-1 text-small font-semibold text-ink-700">{project.submittedFor}</p>
              <p className="mt-3 max-w-3xl text-ink-800">{project.summary}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-small text-ink-700">{researchProjects.note}</p>
      </Section>

      <Section tone="sunken" ariaLabel="Peer-reviewed publications">
        <div className="flex items-center gap-3">
          <h2>Peer-reviewed publications</h2>
          <PendingBadge />
        </div>
        <ol className="mt-6 grid max-w-3xl gap-4 text-ink-800">
          {publications.value.map((publication, index) => (
            <li key={publication.citation} className="border-l border-bronze-200 pl-4 text-small leading-relaxed">
              <span className="mr-2 font-semibold text-ink-950">{index + 1}.</span>
              {publication.citation}
              {publication.url ? (
                <>
                  {" "}
                  <a
                    href={publication.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-steel-700 underline underline-offset-4 hover:text-ink-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700"
                  >
                    View source
                    <span className="sr-only"> for &ldquo;{publication.citation}&rdquo; (opens in a new tab)</span>
                  </a>
                </>
              ) : null}
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-2xl text-small text-ink-700">{publications.note}</p>
      </Section>

      <Section ariaLabel="Courses offered to GPs">
        <div className="flex items-center gap-3">
          <h2>Courses offered to GPs</h2>
          <PendingBadge />
        </div>
        <ul className="mt-4 grid max-w-md gap-2 text-ink-800">
          {gpCourses.value.map((course) => (
            <li key={course} className="border-l border-bronze-200 pl-4">
              {course}
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-2xl text-small text-ink-700">{gpCourses.note}</p>
      </Section>

      <Section tone="accent" ariaLabel="Request an appointment">
        <div className="flex flex-col items-start gap-5">
          <h2>Have a question about a referral or consultation?</h2>
          <LinkButton href="/appointments" size="lg">
            Request an Appointment
          </LinkButton>
        </div>
      </Section>
    </>
  );
}
