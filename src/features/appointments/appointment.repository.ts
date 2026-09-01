import type { AppointmentRecord } from "@/features/appointments/appointment.types";

/**
 * Storage abstraction for appointment enquiries. Route handlers and UI
 * never touch a database client directly — see .claude/rules/architecture.md.
 */
export interface AppointmentRepository {
  /** Returns the existing record if a submission with this token already
   * exists (idempotency), otherwise creates and returns a new one. */
  createIfNotExists(input: Omit<AppointmentRecord, "id" | "createdAt" | "notificationStatus" | "notificationAttempts">): Promise<{
    record: AppointmentRecord;
    wasCreated: boolean;
  }>;
  countRecentByIp(ip: string, windowMs: number): Promise<number>;
  recordAttemptForRateLimit(ip: string): Promise<void>;
  markNotificationStatus(id: string, status: AppointmentRecord["notificationStatus"]): Promise<void>;
}

let repositorySingleton: AppointmentRepository | null = null;

export async function getAppointmentRepository(): Promise<AppointmentRepository> {
  if (repositorySingleton) return repositorySingleton;

  if (process.env.DATABASE_URL) {
    const { PostgresAppointmentRepository } = await import(
      "@/features/appointments/postgres-appointment-repository"
    );
    repositorySingleton = new PostgresAppointmentRepository(process.env.DATABASE_URL);
  } else {
    const { InMemoryAppointmentRepository } = await import(
      "@/features/appointments/in-memory-appointment-repository"
    );
    repositorySingleton = new InMemoryAppointmentRepository();
  }

  return repositorySingleton;
}
