#!/usr/bin/env node
/**
 * Validates every <script type="application/ld+json"> block on each known
 * route is syntactically valid JSON. (Semantic validation — that emitted
 * properties are true and visible on the page — is a manual/Rich-Results-
 * Test step per docs/07-structured-data-plan.md; this script only catches
 * the "broken JSON-LD" class of defect the old site shipped with — see
 * docs/01-current-site-audit.md.)
 *
 * Usage: node scripts/check-structured-data.mjs [--base http://localhost:3000]
 */
const BASE = (process.argv.includes("--base") ? process.argv[process.argv.indexOf("--base") + 1] : null) ?? "http://localhost:3000";
const ROUTES = [
  "/",
  "/appointments",
  "/privacy",
  "/accessibility",
  "/medical-disclaimer",
  "/patient-feedback",
  "/qualifications-and-memberships",
  "/robotic-vs-laparoscopic",
  "/treatments",
  "/treatments/upper-gi-endoscopy",
  "/treatments/anti-reflux-surgery",
  "/treatments/hernia-surgery",
  "/treatments/gallbladder-surgery",
  "/treatments/bile-duct-exploration",
  "/treatments/liver-and-spleen-surgery",
  "/treatments/appendicectomy",
];

async function main() {
  let totalBlocks = 0;
  const problems = [];

  for (const route of ROUTES) {
    const res = await fetch(new URL(route, BASE));
    const html = await res.text();
    const blocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];

    for (const [, json] of blocks) {
      totalBlocks += 1;
      try {
        const parsed = JSON.parse(json);
        if (!parsed["@context"] || !parsed["@type"]) {
          problems.push(`${route}: JSON-LD block missing @context or @type`);
        }
      } catch (err) {
        problems.push(`${route}: invalid JSON-LD — ${err.message}`);
      }
    }
  }

  if (problems.length > 0) {
    console.error(`Structured data problems found (${problems.length}):`);
    for (const p of problems) console.error(`  ${p}`);
    process.exit(1);
  }
  console.log(`Checked ${totalBlocks} JSON-LD blocks across ${ROUTES.length} routes — all valid.`);
}

main();
