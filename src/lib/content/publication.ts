import type { VerificationStatus, VerifiedFact } from "@/types/content";

export const showNonPublicContent = process.env.NEXT_PUBLIC_SHOW_PENDING_CONTENT === "true";

export function canRenderStatus(status: VerificationStatus) {
  return status === "verified" || (status === "pending" && showNonPublicContent);
}

export function canRenderFact<T>(fact: VerifiedFact<T> | null | undefined): fact is VerifiedFact<T> {
  return Boolean(fact && canRenderStatus(fact.status));
}

export function isVerifiedFact<T>(fact: VerifiedFact<T> | null | undefined): fact is VerifiedFact<T> {
  return Boolean(fact && fact.status === "verified");
}

export function publicFactValue<T>(fact: VerifiedFact<T> | null | undefined, fallback: T): T {
  return canRenderFact(fact) ? fact.value : fallback;
}
