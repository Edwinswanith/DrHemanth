import { describe, expect, it } from "vitest";
import { appointmentRequestSchema } from "@/features/appointments/appointment.schema";

function validPayload(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    fullName: "Jane Patient",
    telephone: "07123456789",
    email: "jane@example.com",
    preferredLocation: "no-preference",
    preferredContactMethod: "email",
    broadAvailability: "flexible",
    privacyAcknowledged: true,
    companyWebsite: "",
    submissionToken: crypto.randomUUID(),
    ...overrides,
  };
}

describe("appointmentRequestSchema", () => {
  it("accepts a fully valid submission", () => {
    const result = appointmentRequestSchema.safeParse(validPayload());
    expect(result.success).toBe(true);
  });

  it("rejects a missing full name", () => {
    const result = appointmentRequestSchema.safeParse(validPayload({ fullName: "" }));
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email address", () => {
    const result = appointmentRequestSchema.safeParse(validPayload({ email: "not-an-email" }));
    expect(result.success).toBe(false);
  });

  it("rejects an invalid telephone number", () => {
    const result = appointmentRequestSchema.safeParse(validPayload({ telephone: "abc" }));
    expect(result.success).toBe(false);
  });

  it("rejects an unrecognised preferred location", () => {
    const result = appointmentRequestSchema.safeParse(validPayload({ preferredLocation: "somewhere-else" }));
    expect(result.success).toBe(false);
  });

  it("rejects when the privacy acknowledgement is not true", () => {
    const result = appointmentRequestSchema.safeParse(validPayload({ privacyAcknowledged: false }));
    expect(result.success).toBe(false);
  });

  it("rejects when the honeypot field is filled in (spam signal)", () => {
    const result = appointmentRequestSchema.safeParse(validPayload({ companyWebsite: "http://spam.example" }));
    expect(result.success).toBe(false);
  });

  it("rejects a non-UUID submission token", () => {
    const result = appointmentRequestSchema.safeParse(validPayload({ submissionToken: "not-a-uuid" }));
    expect(result.success).toBe(false);
  });

  it("never allows extra medical/sensitive fields to silently pass through", () => {
    const withExtra = validPayload({ diagnosis: "should not exist", nhsNumber: "123" });
    const result = appointmentRequestSchema.safeParse(withExtra);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).not.toHaveProperty("diagnosis");
      expect(result.data).not.toHaveProperty("nhsNumber");
    }
  });
});
