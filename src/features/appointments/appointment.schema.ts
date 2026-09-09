import { z } from "zod";

/**
 * The ONLY fields the public appointment request may ever collect — see
 * .claude/rules/appointment-security.md. Adding a field here (diagnosis,
 * symptoms, medical history, NHS/insurance number, file upload, free text)
 * requires a documented, reviewed reason and is very unlikely to be
 * appropriate for this public-facing form.
 */
export const appointmentRequestSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  telephone: z
    .string()
    .trim()
    .min(7, "Enter a valid telephone number")
    .max(20)
    .regex(/^[0-9+()\s-]+$/, "Enter a valid telephone number"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(200),
  preferredLocation: z.enum(["spire-bushey", "clementine-churchill-harrow", "wellington-elstree", "no-preference"], {
    message: "Choose a preferred location",
  }),
  preferredContactMethod: z.enum(["telephone", "email"], {
    message: "Choose a preferred contact method",
  }),
  broadAvailability: z.enum(["weekday-mornings", "weekday-afternoons", "weekday-evenings", "flexible"], {
    message: "Choose your broad availability",
  }),
  privacyAcknowledged: z.literal(true, {
    message: "You must acknowledge the privacy notice to continue",
  }),
  // Anti-spam: a real visitor never fills this in (hidden via CSS, not
  // `display:none`/`type=hidden`, so unsophisticated bots that only skip
  // hidden inputs still get caught).
  companyWebsite: z.string().max(0, "Spam check failed").optional().default(""),
  // Client-generated idempotency token — see appointment.service.ts.
  submissionToken: z.string().uuid("Invalid submission token"),
});

export type AppointmentRequestInput = z.infer<typeof appointmentRequestSchema>;

export const locationLabels: Record<AppointmentRequestInput["preferredLocation"], string> = {
  "spire-bushey": "Spire Bushey Hospital",
  "clementine-churchill-harrow": "The Clementine Churchill Hospital & Clinics",
  "wellington-elstree": "The Wellington Hospital, Elstree Waterfront",
  "no-preference": "No preference / not sure",
};

export const availabilityLabels: Record<AppointmentRequestInput["broadAvailability"], string> = {
  "weekday-mornings": "Weekday mornings",
  "weekday-afternoons": "Weekday afternoons",
  "weekday-evenings": "Weekday evenings",
  flexible: "Flexible",
};
