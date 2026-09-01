import { Section } from "@/components/ui/section";

export function RoboticSurgeryIntroduction() {
  return (
    <Section id="robotic-surgery" tone="accent" ariaLabel="Introduction to robotic surgery">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="mb-4">Robotic surgery</h2>
          <p className="text-ink-800">
            Robotic-assisted surgery is a form of minimally invasive surgery
            in which the surgeon operates from a console, controlling
            specialised instruments and a magnified 3D camera through small
            incisions. <strong>The surgeon controls every movement throughout
            the procedure</strong> — the system has no autonomous function and
            cannot act on its own.
          </p>
          <p className="mt-4 text-ink-800">
            Robotic-assisted programmes are increasingly available across NHS
            and private hospitals in the UK, including a da Vinci
            robotic-surgery programme at London North West University
            Healthcare NHS Trust (Ealing Hospital and Northwick Park
            Hospital), which has focused on procedures including hernia
            repair and gallbladder surgery.{" "}
            <a
              href="https://www.lnwh.nhs.uk/"
              className="underline hover:text-ink-900"
              rel="noreferrer"
              target="_blank"
            >
              Source: London North West University Healthcare NHS Trust
            </a>
            .
          </p>
          <p className="mt-4 text-(length:--text-small) text-ink-600">
            Details of which procedures {"Prof. Hemant Sheth"} personally
            performs robotically, and in which setting, are being confirmed
            directly with him before publication — see this site&rsquo;s
            content-verification tracker. Robotic surgery is not automatically
            better than laparoscopic or open surgery: the right approach
            depends on the patient, the condition, and clinical judgement.
          </p>
        </div>
        <div className="lg:col-span-5">
          <h3 className="mb-2 text-(length:--text-body-lg)">Robotic vs laparoscopic</h3>
          <p className="text-ink-700">
            Both are minimally invasive approaches using small incisions.
            The difference is how the surgeon controls the instruments and
            camera. See the full comparison below.
          </p>
        </div>
      </div>
    </Section>
  );
}
