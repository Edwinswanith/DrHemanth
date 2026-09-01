/**
 * The single choke point for all analytics events. Enforces two rules from
 * .claude/rules/privacy-compliance.md: (1) nothing fires before consent —
 * currently always a no-op because no analytics provider is wired up yet
 * (see docs/12-data-processing-register.csv) — and (2) payloads are a
 * fixed, reviewed shape, never arbitrary user input.
 */
type EventPayload = Record<string, string | number | boolean>;

const ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";

export function trackEvent(name: string, payload: EventPayload = {}): void {
  if (!ANALYTICS_ENABLED) return;
  // No analytics provider is approved/configured yet — see
  // docs/12-data-processing-register.csv. When one is added, it is wired
  // in here, still behind the consent check that will live in
  // src/lib/consent/.
  void name;
  void payload;
}
