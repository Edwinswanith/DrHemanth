import { PendingBadge } from "@/components/ui/badge";
import type { MedicalReviewMeta } from "@/types/medical";

/**
 * Renders the honest review state for every medical page. Never shows a
 * "clinically approved" state — that status doesn't exist in
 * MedicalContentStatus and cannot be produced by this component. See
 * .claude/rules/medical-content.md.
 */
export function MedicalReviewDetails({ reviewMeta }: { reviewMeta: MedicalReviewMeta }) {
  return (
    <div className="rounded-md border border-stone-200 bg-stone-100 p-4 text-small text-ink-700">
      <p className="mb-1 flex items-center gap-2 font-medium text-ink-900">
        {reviewMeta.status === "requires-clinical-review" ? "Content status: pending clinical review" : reviewMeta.status}
        {reviewMeta.status === "requires-clinical-review" && <PendingBadge />}
      </p>
      <p>Author: {reviewMeta.author}</p>
      <p>Clinical reviewer: {reviewMeta.clinicalReviewer ?? "not yet assigned"}</p>
      <p>Published: {reviewMeta.publishedDate}</p>
      <p>Last reviewed: {reviewMeta.lastReviewed ?? "not yet reviewed"}</p>
    </div>
  );
}
