import { appointmentRequestSchema } from "@/features/appointments/appointment.schema";
import { getAppointmentRepository } from "@/features/appointments/appointment.repository";
import { isRateLimited, recordAttempt } from "@/features/appointments/appointment-rate-limit";
import { getNotificationProvider } from "@/lib/email/notification-provider";
import type { SubmitAppointmentResult } from "@/features/appointments/appointment.types";

function generateReference(): string {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = crypto.randomUUID().split("-")[0]!.toUpperCase();
  return `HS-${datePart}-${randomPart}`;
}

/**
 * Orchestrates one appointment request: rate limit -> validate -> idempotent
 * persist -> best-effort minimised notifications. Never throws for expected
 * failure modes (validation/rate-limit/duplicate/spam) — callers get a
 * typed result instead. See .claude/rules/appointment-security.md.
 */
export async function submitAppointmentRequest(rawInput: unknown, ip: string): Promise<SubmitAppointmentResult> {
  const repository = await getAppointmentRepository();

  if (await isRateLimited(repository, ip)) {
    return { outcome: "rate-limited" };
  }
  await recordAttempt(repository, ip);

  const parsed = appointmentRequestSchema.safeParse(rawInput);
  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    if ((flat.companyWebsite?.length ?? 0) > 0) {
      // Honeypot tripped — reject silently as "spam" to the caller, no
      // detail leaked about why, but distinct from a genuine user error.
      return { outcome: "spam-rejected" };
    }
    const fieldErrors: Record<string, string> = {};
    for (const [key, messages] of Object.entries(flat)) {
      if (messages?.[0]) fieldErrors[key] = messages[0];
    }
    return { outcome: "validation-error", fieldErrors };
  }

  const input = parsed.data;
  const { record, wasCreated } = await repository.createIfNotExists({
    submissionToken: input.submissionToken,
    reference: generateReference(),
    status: "new",
    fullName: input.fullName,
    telephone: input.telephone,
    email: input.email,
    preferredLocation: input.preferredLocation,
    preferredContactMethod: input.preferredContactMethod,
    broadAvailability: input.broadAvailability,
  });

  if (!wasCreated) {
    // Idempotent replay (network retry with the same client token) — never
    // send a second acknowledgement, never create a duplicate enquiry.
    return { outcome: "duplicate", reference: record.reference };
  }

  // Notifications are best-effort and never block the enquiry being saved
  // successfully — a failed email must not mean a lost enquiry.
  try {
    const provider = getNotificationProvider();
    const practiceResult = await provider.sendPracticeNotification({
      reference: record.reference,
      createdAt: record.createdAt,
      secureStaffLink: `/internal/appointments/${record.id}`,
      status: record.status,
    });
    await provider.sendPatientAcknowledgement({ toEmail: record.email, reference: record.reference });
    await repository.markNotificationStatus(record.id, practiceResult.ok ? "sent" : "failed");
  } catch {
    await repository.markNotificationStatus(record.id, "failed");
  }

  return { outcome: "created", reference: record.reference };
}
