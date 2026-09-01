import { NextResponse, type NextRequest } from "next/server";
import { submitAppointmentRequest } from "@/features/appointments/appointment.service";

export const runtime = "nodejs";

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return "unknown";
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ outcome: "validation-error", fieldErrors: { _form: "Malformed request" } }, { status: 400 });
  }

  const ip = clientIp(request);

  try {
    const result = await submitAppointmentRequest(body, ip);

    switch (result.outcome) {
      case "created":
        return NextResponse.json(result, { status: 201 });
      case "duplicate":
        return NextResponse.json(result, { status: 200 });
      case "rate-limited":
        return NextResponse.json(result, { status: 429 });
      case "spam-rejected":
        // Deliberately vague response so an automated submitter learns
        // nothing about why it failed.
        return NextResponse.json({ outcome: "validation-error", fieldErrors: { _form: "Submission could not be processed" } }, { status: 400 });
      case "validation-error":
        return NextResponse.json(result, { status: 422 });
    }
  } catch (error) {
    // Never log the request body (may contain name/phone/email) — log only
    // that a technical failure occurred, per .claude/rules/appointment-security.md.
    console.error("[appointment-request] unexpected failure", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json(
      { outcome: "validation-error", fieldErrors: { _form: "Something went wrong. Please try again or call the practice directly." } },
      { status: 500 }
    );
  }
}
