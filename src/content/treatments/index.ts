export { antiRefluxSurgeryContent } from "@/content/treatments/anti-reflux-surgery";
export { appendicectomyContent } from "@/content/treatments/appendicectomy";
export { bileDuctExplorationContent } from "@/content/treatments/bile-duct-exploration";
export { gallbladderSurgeryContent } from "@/content/treatments/gallbladder-surgery";
export { herniaSurgeryContent } from "@/content/treatments/hernia-surgery";
export { liverAndSpleenSurgeryContent } from "@/content/treatments/liver-and-spleen-surgery";
export { upperGiEndoscopyContent } from "@/content/treatments/upper-gi-endoscopy";

import { antiRefluxSurgeryContent } from "@/content/treatments/anti-reflux-surgery";
import { appendicectomyContent } from "@/content/treatments/appendicectomy";
import { bileDuctExplorationContent } from "@/content/treatments/bile-duct-exploration";
import { gallbladderSurgeryContent } from "@/content/treatments/gallbladder-surgery";
import { herniaSurgeryContent } from "@/content/treatments/hernia-surgery";
import { liverAndSpleenSurgeryContent } from "@/content/treatments/liver-and-spleen-surgery";
import { upperGiEndoscopyContent } from "@/content/treatments/upper-gi-endoscopy";

export const allTreatmentContent = [
  upperGiEndoscopyContent,
  antiRefluxSurgeryContent,
  gallbladderSurgeryContent,
  bileDuctExplorationContent,
  herniaSurgeryContent,
  liverAndSpleenSurgeryContent,
  appendicectomyContent,
] as const;
