/**
 * Central content-loading barrel. Every export here is Zod-validated at
 * import time (see the individual content files under src/content/) — an
 * invalid or missing required field fails the build rather than rendering
 * silently-wrong data. See .claude/rules/architecture.md.
 */
export { siteConfig } from "@/content/site";
export { surgeonProfile } from "@/content/surgeon";
export { primaryNav, mobilePersistentActions } from "@/content/navigation";
