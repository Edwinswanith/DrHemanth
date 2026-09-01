import type { AppointmentRepository } from "@/features/appointments/appointment.repository";

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS_PER_WINDOW = 5;

/** DB-backed sliding-window rate limit — see .claude/rules/appointment-security.md. */
export async function isRateLimited(repository: AppointmentRepository, ip: string): Promise<boolean> {
  const recentCount = await repository.countRecentByIp(ip, WINDOW_MS);
  return recentCount >= MAX_ATTEMPTS_PER_WINDOW;
}

export async function recordAttempt(repository: AppointmentRepository, ip: string): Promise<void> {
  await repository.recordAttemptForRateLimit(ip);
}
