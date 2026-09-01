import type { AppointmentRecord } from "@/features/appointments/appointment.types";

export interface PracticeNotificationContent {
  reference: string;
  createdAt: string;
  secureStaffLink: string;
  status: AppointmentRecord["status"];
}

export interface PatientAcknowledgementContent {
  toEmail: string;
  reference: string;
}

export interface NotificationSendResult {
  ok: boolean;
  error?: string;
}

/**
 * Provider-neutral interface — see docs/decisions/ADR-004-appointment-workflow.md.
 * No production implementation is selected by default. Resend is
 * explicitly rejected as a default (US data storage); Amazon SES
 * (eu-west-2) is the leading candidate pending the Phase B/D
 * processor review in docs/12-data-processing-register.csv.
 */
export interface NotificationProvider {
  sendPracticeNotification(content: PracticeNotificationContent): Promise<NotificationSendResult>;
  sendPatientAcknowledgement(content: PatientAcknowledgementContent): Promise<NotificationSendResult>;
}

export function getNotificationProvider(): NotificationProvider {
  const configured = process.env.NOTIFICATION_PROVIDER ?? "dev";

  if (configured !== "dev") {
    // No production adapter is implemented until docs/12-data-processing-register.csv
    // has an `approved` row for the selected provider — fail closed rather
    // than silently falling back to the dev adapter, per
    // .claude/rules/appointment-security.md.
    throw new Error(
      `NOTIFICATION_PROVIDER="${configured}" has no implemented, approved adapter yet. ` +
        "See docs/decisions/ADR-004-appointment-workflow.md and docs/12-data-processing-register.csv."
    );
  }

  return devLoggingNotificationProvider;
}

/**
 * Local/dev-only adapter. Never sends real email. Deliberately logs only
 * non-identifying metadata, even in development, so the codebase never
 * gets into the habit of logging PII — see .claude/rules/appointment-security.md.
 */
const devLoggingNotificationProvider: NotificationProvider = {
  async sendPracticeNotification(content) {
    console.log(
      `[dev-notification-adapter] practice notification — reference=${content.reference} status=${content.status} (no real email sent; NOTIFICATION_PROVIDER=dev)`
    );
    return { ok: true };
  },
  async sendPatientAcknowledgement(content) {
    console.log(
      `[dev-notification-adapter] patient acknowledgement — reference=${content.reference} (no real email sent; NOTIFICATION_PROVIDER=dev)`
    );
    return { ok: true };
  },
};
