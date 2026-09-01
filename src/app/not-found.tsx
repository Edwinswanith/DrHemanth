import { LinkButton } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Section ariaLabel="Page not found">
      <h1 className="mb-3">Page not found</h1>
      <p className="mb-6 max-w-xl text-ink-700">
        The page you were looking for doesn&rsquo;t exist, or may have moved as
        part of this site&rsquo;s rebuild. Try the homepage, or request an
        appointment directly.
      </p>
      <div className="flex gap-3">
        <LinkButton href="/">Go to homepage</LinkButton>
        <LinkButton href="/appointments" variant="secondary">
          Request an Appointment
        </LinkButton>
      </div>
    </Section>
  );
}
