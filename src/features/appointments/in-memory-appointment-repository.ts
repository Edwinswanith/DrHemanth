import type { AppointmentRepository } from "@/features/appointments/appointment.repository";
import type { AppointmentRecord } from "@/features/appointments/appointment.types";

/**
 * Default repository when DATABASE_URL is unset (local development and
 * tests). Never used in production — getAppointmentRepository() switches
 * to PostgresAppointmentRepository once DATABASE_URL is configured (Phase D,
 * pending the docs/10-appointment-flow.md operations gate).
 */
export class InMemoryAppointmentRepository implements AppointmentRepository {
  private byToken = new Map<string, AppointmentRecord>();
  private attemptsByIp = new Map<string, number[]>();

  async createIfNotExists(
    input: Omit<AppointmentRecord, "id" | "createdAt" | "notificationStatus" | "notificationAttempts">
  ) {
    const existing = this.byToken.get(input.submissionToken);
    if (existing) {
      return { record: existing, wasCreated: false };
    }

    const record: AppointmentRecord = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      notificationStatus: "pending",
      notificationAttempts: 0,
    };
    this.byToken.set(input.submissionToken, record);
    return { record, wasCreated: true };
  }

  async countRecentByIp(ip: string, windowMs: number): Promise<number> {
    const now = Date.now();
    const timestamps = (this.attemptsByIp.get(ip) ?? []).filter((t) => now - t < windowMs);
    this.attemptsByIp.set(ip, timestamps);
    return timestamps.length;
  }

  async recordAttemptForRateLimit(ip: string): Promise<void> {
    const timestamps = this.attemptsByIp.get(ip) ?? [];
    timestamps.push(Date.now());
    this.attemptsByIp.set(ip, timestamps);
  }

  async markNotificationStatus(id: string, status: AppointmentRecord["notificationStatus"]): Promise<void> {
    for (const record of this.byToken.values()) {
      if (record.id === id) {
        record.notificationStatus = status;
        record.notificationAttempts += 1;
      }
    }
  }
}
