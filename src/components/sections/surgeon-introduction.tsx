import Link from "next/link";
import { LinkButton } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { surgeonProfile } from "@/content/surgeon";
import { canRenderFact } from "@/lib/content/publication";

const credentialCategories = ["Surgical qualifications", "NHS consultant role", "Professional memberships"];

export function SurgeonIntroduction() {
  const publicTitle = canRenderFact(surgeonProfile.displayTitle)
    ? surgeonProfile.displayTitle.value
    : "Upper GI, hepatobiliary, hernia and minimally invasive surgical care.";

  return (
    <Section id="about" dataSection="surgeon-introduction" spacing="compact" ariaLabel="About the surgeon" className="!bg-white">
      <p className="mb-3 text-label font-semibold uppercase tracking-wide text-steel-700">
        About Prof. Hemant Sheth
      </p>
      <h2 className="max-w-2xl text-balance">Clear judgement before treatment.</h2>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        <div className="lg:order-2 lg:col-span-5">
          <div className="border border-stone-200 bg-stone-50 p-8">
            <p className="font-display text-display text-steel-700">HS</p>
            <p className="mt-4 text-small leading-relaxed text-ink-700">
              Consultant-led assessment for upper digestive, gallbladder, bile duct, liver, spleen and hernia
              conditions.
            </p>
          </div>
        </div>

        <div className="lg:order-1 lg:col-span-7">
          <div className="grid gap-4 text-ink-800">
            <p className="font-semibold text-ink-950">{publicTitle}</p>
            <p>{surgeonProfile.positioningStatement}</p>
          </div>

          <div className="mt-6 border-y border-stone-200 py-2">
            <ul className="divide-y divide-stone-200 text-small leading-relaxed text-ink-700">
              {credentialCategories.map((category) => (
                <li key={category} className="py-3">
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <LinkButton href="#treatments" variant="secondary">
              View Conditions Treated
            </LinkButton>
            <Link
              href="/qualifications-and-memberships"
              className="text-small font-semibold text-steel-700 underline underline-offset-4 hover:text-ink-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-700"
            >
              Qualifications &amp; Memberships
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
