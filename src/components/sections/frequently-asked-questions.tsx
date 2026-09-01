import { Section } from "@/components/ui/section";
import { Accordion } from "@/components/ui/accordion";
import { siteConfig } from "@/content/site";

export function FrequentlyAskedQuestions() {
  const items = [
    {
      question: "Is submitting a request the same as booking an appointment?",
      answer: <p>{siteConfig.requestNotConfirmedNotice}</p>,
    },
    {
      question: "Can I use this website in an emergency?",
      answer: <p>{siteConfig.emergencyNotice}</p>,
    },
    {
      question: "Do I need a GP referral?",
      answer: (
        <p>
          Referral requirements can vary by hospital, insurer, and
          appointment type. The practice will confirm what is needed for
          your specific situation when they contact you.
        </p>
      ),
    },
    {
      question: "What happens to the information I submit?",
      answer: (
        <p>
          Your information is used to arrange your appointment request and is
          handled in line with our{" "}
          <a href="/privacy" className="underline hover:text-ink-900">
            privacy notice
          </a>
          .
        </p>
      ),
    },
    {
      question: "How is robotic surgery different from laparoscopic surgery?",
      answer: (
        <p>
          Both use small incisions. In robotic-assisted surgery, the surgeon
          controls specialised wristed instruments from a console; the
          surgeon is in control throughout. See the full comparison above for
          details.
        </p>
      ),
    },
  ];

  return (
    <Section id="faqs" ariaLabel="Frequently asked questions">
      <h2 className="mb-6">Frequently asked questions</h2>
      <Accordion items={items} />
    </Section>
  );
}
