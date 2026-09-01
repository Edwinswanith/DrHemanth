"use client";

import { useId, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FormField, inputBase, textFieldClassName } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { availabilityLabels, locationLabels } from "@/features/appointments/appointment.schema";
import type { AppointmentRequestInput } from "@/features/appointments/appointment.schema";
import { siteConfig } from "@/content/site";
import {
  trackAppointmentFormStarted,
  trackAppointmentSubmissionFailed,
  trackAppointmentSubmitted,
} from "@/features/appointments/appointment.analytics";
import { AppointmentError } from "@/components/appointment/appointment-error";

type FieldState = Partial<Record<keyof AppointmentRequestInput, string>>;

interface Props {
  source: "hero" | "full-page" | "mobile-drawer";
  compact?: boolean;
}

export function AppointmentForm({ source, compact = false }: Props) {
  const formId = useId();
  const router = useRouter();
  const [submissionToken] = useState(() => crypto.randomUUID());
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "rate-limited">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldState>({});
  const [hasStarted, setHasStarted] = useState(false);

  const locationOptions = useMemo(() => Object.entries(locationLabels), []);
  const availabilityOptions = useMemo(() => Object.entries(availabilityLabels), []);

  function onAnyFieldChange() {
    if (!hasStarted) {
      setHasStarted(true);
      trackAppointmentFormStarted(source);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return; // prevent double-submit

    setStatus("submitting");
    setErrorMessage(null);
    setFieldErrors({});

    const formData = new FormData(event.currentTarget);
    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      telephone: String(formData.get("telephone") ?? ""),
      email: String(formData.get("email") ?? ""),
      preferredLocation: String(formData.get("preferredLocation") ?? ""),
      preferredContactMethod: String(formData.get("preferredContactMethod") ?? ""),
      broadAvailability: String(formData.get("broadAvailability") ?? ""),
      privacyAcknowledged: formData.get("privacyAcknowledged") === "on",
      companyWebsite: String(formData.get("companyWebsite") ?? ""),
      submissionToken,
    };

    try {
      const response = await fetch("/api/appointment-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (response.status === 201 || response.status === 200) {
        trackAppointmentSubmitted(result.outcome);
        router.push(`/appointments/confirmation?ref=${encodeURIComponent(result.reference)}`);
        return;
      }
      if (response.status === 429) {
        setStatus("rate-limited");
        trackAppointmentSubmissionFailed("rate-limited");
        return;
      }
      if (response.status === 422 && result.fieldErrors) {
        setFieldErrors(result.fieldErrors);
        setStatus("error");
        setErrorMessage("Please check the highlighted fields and try again.");
        trackAppointmentSubmissionFailed("validation-error");
        return;
      }
      setStatus("error");
      setErrorMessage(result.fieldErrors?._form ?? "Something went wrong. Please try again or call the practice directly.");
      trackAppointmentSubmissionFailed("server-error");
    } catch {
      setStatus("error");
      setErrorMessage(
        "We could not reach the server. Please check your connection and try again, or call the practice directly."
      );
      trackAppointmentSubmissionFailed("network-error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4" aria-describedby={`${formId}-notice`}>
      <p id={`${formId}-notice`} className="text-(length:--text-small) text-ink-700">
        {siteConfig.requestNotConfirmedNotice}
      </p>

      {(status === "error" || status === "rate-limited") && (
        <AppointmentError
          variant={status === "rate-limited" ? "rate-limited" : "generic"}
          message={errorMessage}
        />
      )}

      <FormField id={`${formId}-fullName`} label="Full name" required error={fieldErrors.fullName}>
        <input
          id={`${formId}-fullName`}
          name="fullName"
          type="text"
          autoComplete="name"
          required
          onChange={onAnyFieldChange}
          aria-invalid={Boolean(fieldErrors.fullName)}
          className={textFieldClassName(Boolean(fieldErrors.fullName))}
        />
      </FormField>

      <div className={compact ? "flex flex-col gap-4" : "grid grid-cols-1 gap-4 sm:grid-cols-2"}>
        <FormField id={`${formId}-telephone`} label="Telephone" required error={fieldErrors.telephone}>
          <input
            id={`${formId}-telephone`}
            name="telephone"
            type="tel"
            autoComplete="tel"
            required
            onChange={onAnyFieldChange}
            aria-invalid={Boolean(fieldErrors.telephone)}
            className={textFieldClassName(Boolean(fieldErrors.telephone))}
          />
        </FormField>

        <FormField id={`${formId}-email`} label="Email address" required error={fieldErrors.email}>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            onChange={onAnyFieldChange}
            aria-invalid={Boolean(fieldErrors.email)}
            className={textFieldClassName(Boolean(fieldErrors.email))}
          />
        </FormField>
      </div>

      <FormField id={`${formId}-preferredLocation`} label="Preferred location" required error={fieldErrors.preferredLocation}>
        <select
          id={`${formId}-preferredLocation`}
          name="preferredLocation"
          required
          defaultValue=""
          onChange={onAnyFieldChange}
          aria-invalid={Boolean(fieldErrors.preferredLocation)}
          className={inputBase}
        >
          <option value="" disabled>
            Choose a location
          </option>
          {locationOptions.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </FormField>

      <div className={compact ? "flex flex-col gap-4" : "grid grid-cols-1 gap-4 sm:grid-cols-2"}>
        <FormField
          id={`${formId}-preferredContactMethod`}
          label="Preferred contact method"
          required
          error={fieldErrors.preferredContactMethod}
        >
          <select
            id={`${formId}-preferredContactMethod`}
            name="preferredContactMethod"
            required
            defaultValue=""
            onChange={onAnyFieldChange}
            aria-invalid={Boolean(fieldErrors.preferredContactMethod)}
            className={inputBase}
          >
            <option value="" disabled>
              Choose a method
            </option>
            <option value="telephone">Telephone</option>
            <option value="email">Email</option>
          </select>
        </FormField>

        <FormField id={`${formId}-broadAvailability`} label="Broad availability" required error={fieldErrors.broadAvailability}>
          <select
            id={`${formId}-broadAvailability`}
            name="broadAvailability"
            required
            defaultValue=""
            onChange={onAnyFieldChange}
            aria-invalid={Boolean(fieldErrors.broadAvailability)}
            className={inputBase}
          >
            <option value="" disabled>
              Choose your availability
            </option>
            {availabilityOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      {/* Honeypot — visually hidden, not display:none, catches unsophisticated bots. Never a real field. */}
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-companyWebsite`}>Leave this field blank</label>
        <input id={`${formId}-companyWebsite`} name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-2 text-(length:--text-small) text-ink-800">
        <input
          type="checkbox"
          name="privacyAcknowledged"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-bronze-600"
          aria-invalid={Boolean(fieldErrors.privacyAcknowledged)}
        />
        <span>
          I have read and understood the{" "}
          <a href="/privacy" className="underline hover:text-ink-900">
            privacy notice
          </a>
          . <span aria-hidden="true">*</span>
        </span>
      </label>
      {fieldErrors.privacyAcknowledged && (
        <p role="alert" className="text-xs font-medium text-error-600">
          {fieldErrors.privacyAcknowledged}
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "submitting"} className="mt-2">
        {status === "submitting" ? "Sending request…" : "Request an Appointment"}
      </Button>
    </form>
  );
}
