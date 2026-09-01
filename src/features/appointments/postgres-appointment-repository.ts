import { Pool } from "pg";
import type { AppointmentRepository } from "@/features/appointments/appointment.repository";
import type { AppointmentRecord } from "@/features/appointments/appointment.types";

/**
 * Phase D production repository — Neon Postgres, region eu-west-2 (London),
 * per docs/decisions/ADR-005-uk-hosting.md. Selected automatically by
 * getAppointmentRepository() once DATABASE_URL is set; untested against a
 * real database in this environment (no production credentials exist yet
 * — see docs/12-data-processing-register.csv). Schema: scripts/../sql
 * migration below, run manually or via a migration tool before first use.
 *
 * Required schema (docs/10-appointment-flow.md):
 *
 *   create table appointment_requests (
 *     id uuid primary key,
 *     submission_token uuid not null unique,
 *     reference text not null unique,
 *     status text not null default 'new',
 *     created_at timestamptz not null default now(),
 *     full_name text not null,
 *     telephone text not null,
 *     email text not null,
 *     preferred_location text not null,
 *     preferred_contact_method text not null,
 *     broad_availability text not null,
 *     notification_status text not null default 'pending',
 *     notification_attempts integer not null default 0
 *   );
 *   create table rate_limit_attempts (
 *     ip text not null,
 *     attempted_at timestamptz not null default now()
 *   );
 *   create index on rate_limit_attempts (ip, attempted_at);
 */
export class PostgresAppointmentRepository implements AppointmentRepository {
  private pool: Pool;

  constructor(connectionString: string) {
    this.pool = new Pool({ connectionString, max: 5 });
  }

  async createIfNotExists(
    input: Omit<AppointmentRecord, "id" | "createdAt" | "notificationStatus" | "notificationAttempts">
  ) {
    const existing = await this.pool.query<{
      id: string;
      created_at: string;
    }>("select id, created_at from appointment_requests where submission_token = $1", [input.submissionToken]);

    if (existing.rows.length > 0) {
      const full = await this.pool.query("select * from appointment_requests where submission_token = $1", [
        input.submissionToken,
      ]);
      return { record: mapRow(full.rows[0]), wasCreated: false };
    }

    const id = crypto.randomUUID();
    const inserted = await this.pool.query(
      `insert into appointment_requests
        (id, submission_token, reference, status, full_name, telephone, email,
         preferred_location, preferred_contact_method, broad_availability)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       returning *`,
      [
        id,
        input.submissionToken,
        input.reference,
        input.status,
        input.fullName,
        input.telephone,
        input.email,
        input.preferredLocation,
        input.preferredContactMethod,
        input.broadAvailability,
      ]
    );

    return { record: mapRow(inserted.rows[0]), wasCreated: true };
  }

  async countRecentByIp(ip: string, windowMs: number): Promise<number> {
    const result = await this.pool.query(
      "select count(*)::int as count from rate_limit_attempts where ip = $1 and attempted_at > now() - ($2 || ' milliseconds')::interval",
      [ip, windowMs]
    );
    return result.rows[0]?.count ?? 0;
  }

  async recordAttemptForRateLimit(ip: string): Promise<void> {
    await this.pool.query("insert into rate_limit_attempts (ip) values ($1)", [ip]);
  }

  async markNotificationStatus(id: string, status: AppointmentRecord["notificationStatus"]): Promise<void> {
    await this.pool.query(
      "update appointment_requests set notification_status = $2, notification_attempts = notification_attempts + 1 where id = $1",
      [id, status]
    );
  }
}

function mapRow(row: Record<string, unknown>): AppointmentRecord {
  return {
    id: row.id as string,
    reference: row.reference as string,
    submissionToken: row.submission_token as string,
    status: row.status as AppointmentRecord["status"],
    createdAt: new Date(row.created_at as string).toISOString(),
    fullName: row.full_name as string,
    telephone: row.telephone as string,
    email: row.email as string,
    preferredLocation: row.preferred_location as AppointmentRecord["preferredLocation"],
    preferredContactMethod: row.preferred_contact_method as AppointmentRecord["preferredContactMethod"],
    broadAvailability: row.broad_availability as AppointmentRecord["broadAvailability"],
    notificationStatus: row.notification_status as AppointmentRecord["notificationStatus"],
    notificationAttempts: row.notification_attempts as number,
  };
}
