/**
 * Medical/clinical content status. Claude may set draft,
 * requires-clinical-review, or retired — never approved. Only Prof. Sheth
 * or an authorised clinical reviewer can approve content, outside this
 * codebase. See .claude/rules/medical-content.md.
 */
export type MedicalContentStatus = "draft" | "requires-clinical-review" | "retired";

export interface MedicalReviewMeta {
  status: MedicalContentStatus;
  author?: string;
  clinicalReviewer?: string;
  publishedDate?: string;
  lastReviewed?: string;
  references?: { label: string; url: string }[];
}
