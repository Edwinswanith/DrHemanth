import { Section } from "@/components/ui/section";
import { Accordion } from "@/components/ui/accordion";

export function FrequentlyAskedQuestions() {
  const items = [
    {
      question: "What happens after I submit an appointment request?",
      answer: <p>The practice reviews the request and contacts you separately to discuss a suitable appointment.</p>,
    },
    {
      question: "Do I need a GP referral?",
      answer: (
        <p>
          The practice will confirm referral requirements for your hospital, insurer and appointment type.
        </p>
      ),
    },
    {
      question: "What happens to the information I submit?",
      answer: (
        <p>
          Your details are used to handle your request. See the{" "}
          <a href="/privacy" className="underline hover:text-ink-900">
            privacy notice
          </a>
          .
        </p>
      ),
    },
    {
      question: "Is surgery always recommended?",
      answer: <p>No. Assessment, investigations, alternatives and shared decisions come before any procedure.</p>,
    },
    {
      question: "Which treatment page should I read first?",
      answer: <p>Start with the condition or procedure closest to your diagnosis, then use the appointment form if you need practice contact.</p>,
    },
    {
      question: "How is robotic surgery different from laparoscopic surgery?",
      answer: (
        <p>
          Both use small incisions. Robotic instruments are console-controlled by the surgeon.
        </p>
      ),
    },
  ];

  return (
    <Section id="faqs" dataSection="faq" spacing="compact" ariaLabel="Frequently asked questions">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="mb-3 text-label font-semibold uppercase tracking-wide text-steel-700">
            Patient questions
          </p>
          <h2 className="text-balance">Frequently asked questions</h2>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={items} />
        </div>
      </div>
    </Section>
  );
}
