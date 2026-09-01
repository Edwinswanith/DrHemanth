import type { AppointmentRequestInput } from "@/features/appointments/appointment.schema";

export type AppointmentStatus = "new" | "contacted" | "booked" | "declined";

export interface AppointmentRecord {
  id: string;
  reference: string;
  submissionToken: string;
  status: AppointmentStatus;
  createdAt: string;
  fullName: string;
  telephone: string;
  email: string;
  preferredLocation: AppointmentRequestInput["preferredLocation"];
  preferredContactMethod: AppointmentRequestInput["preferredContactMethod"];
  broadAvailability: AppointmentRequestInput["broadAvailability"];
  notificationStatus: "pending" | "sent" | "failed";
  notificationAttempts: number;
}

export type CreateAppointmentInput = Omit<
  AppointmentRequestInput,
  "companyWebsite" | "privacyAcknowledged"
>;

export type SubmitAppointmentResult =
  | { outcome: "created"; reference: string }
  | { outcome: "duplicate"; reference: string }
  | { outcome: "rate-limited" }
  | { outcome: "spam-rejected" }
  | { outcome: "validation-error"; fieldErrors: Record<string, string> };
