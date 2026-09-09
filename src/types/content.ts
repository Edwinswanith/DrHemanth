/**
 * Shared content typing. Every fact that could be wrong, outdated, or
 * unverified is wrapped in VerifiedFact rather than stored as a bare
 * string — see docs/04-content-verification.md, which this type mirrors.
 */

export type VerificationStatus = "verified" | "pending" | "blocked" | "retired";

/** Evidence hierarchy tiers — docs/04-content-verification.md */
export type EvidenceTier =
  | "gmc"
  | "nhs-trust"
  | "hospital-profile"
  | "academic-institution"
  | "professional-body"
  | "peer-reviewed"
  | "client-approved-material"
  | "reputable-secondary"
  | "local-news-context-only"
  | "unverified";

export interface VerifiedFact<T> {
  value: T;
  status: VerificationStatus;
  tier: EvidenceTier;
  /** Why this status/tier — a source URL, or the reason it's still pending. */
  note?: string;
}

export function verified<T>(value: T, tier: EvidenceTier, note?: string): VerifiedFact<T> {
  return { value, status: "verified", tier, note };
}

export function pending<T>(value: T, note: string, tier: EvidenceTier = "unverified"): VerifiedFact<T> {
  return { value, status: "pending", tier, note };
}

export function blocked<T>(value: T, note: string, tier: EvidenceTier = "unverified"): VerifiedFact<T> {
  return { value, status: "blocked", tier, note };
}

export function retired<T>(value: T, note: string, tier: EvidenceTier = "unverified"): VerifiedFact<T> {
  return { value, status: "retired", tier, note };
}
