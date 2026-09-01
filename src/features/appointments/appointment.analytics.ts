"use client";

import { trackEvent } from "@/lib/analytics/track-event";

/**
 * Named, PII-free events for the appointment funnel — see
 * .claude/rules/privacy-compliance.md. Never pass name/phone/email/free
 * text into these; the event payload is a fixed, reviewed shape.
 */
export function trackAppointmentFormOpened(source: "hero" | "full-page" | "mobile-drawer") {
  trackEvent("appointment_form_opened", { source });
}

export function trackAppointmentFormStarted(source: "hero" | "full-page" | "mobile-drawer") {
  trackEvent("appointment_form_started", { source });
}

export function trackAppointmentSubmitted(outcome: "created" | "duplicate") {
  trackEvent("appointment_request_submitted", { outcome });
}

export function trackAppointmentSubmissionFailed(reason: string) {
  trackEvent("appointment_submission_failed", { reason });
}
