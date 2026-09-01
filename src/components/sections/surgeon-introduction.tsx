import { Section } from "@/components/ui/section";
import { surgeonProfile } from "@/content/surgeon";

export function SurgeonIntroduction() {
  return (
    <Section id="about" ariaLabel="About the surgeon">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="mb-4">About {surgeonProfile.fullName}</h2>
          <p className="text-ink-800">
            {surgeonProfile.fullName} treats conditions of the upper digestive
            system, gallbladder, bile duct, liver, spleen, and hernia,
            offering both laparoscopic (keyhole) and robotic-assisted surgical
            approaches where clinically appropriate. A full biography —
            including training history, qualifications, and current
            appointments — is being finalised and independently verified; a
            dedicated About page will follow.
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="rounded-(--radius-lg) border border-dashed border-ink-500/30 bg-stone-100 p-6 text-(length:--text-small) text-ink-600">
            A verified professional photograph of {surgeonProfile.fullName} will
            appear here once supplied and approved. This space intentionally
            shows no placeholder photograph — see docs/08-design-system.md.
          </div>
        </div>
      </div>
    </Section>
  );
}
