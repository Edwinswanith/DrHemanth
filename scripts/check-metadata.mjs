#!/usr/bin/env node
/**
 * Confirms every known real route has a unique <title>, a meta description,
 * exactly one <h1>, and a canonical link tag. Run against a server already
 * listening at BASE_URL.
 *
 * Usage: node scripts/check-metadata.mjs [--base http://localhost:3000]
 */
const BASE = (process.argv.includes("--base") ? process.argv[process.argv.indexOf("--base") + 1] : null) ?? "http://localhost:3000";

// Kept in sync with src/app/sitemap.ts — the only routes considered
// production-ready in the current phase (see docs/02-information-architecture.md).
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

function extract(html) {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([\s\S]*?)["']/i)?.[1];
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1];
  const h1Count = [...html.matchAll(/<h1[\s>]/gi)].length;
  return { title, description, canonical, h1Count };
}

async function main() {
  const seenTitles = new Map();
  const problems = [];

  for (const route of ROUTES) {
    const res = await fetch(new URL(route, BASE));
    const html = await res.text();
    const meta = extract(html);

    if (!meta.title) problems.push(`${route}: missing <title>`);
    else if (seenTitles.has(meta.title)) problems.push(`${route}: duplicate <title> also used by ${seenTitles.get(meta.title)}`);
    else seenTitles.set(meta.title, route);

    if (!meta.description) problems.push(`${route}: missing meta description`);
    if (!meta.canonical) problems.push(`${route}: missing canonical link`);
    if (meta.h1Count === 0) problems.push(`${route}: no <h1> found`);
    if (meta.h1Count > 1) problems.push(`${route}: ${meta.h1Count} <h1> elements found, expected exactly 1`);
  }

  if (problems.length > 0) {
    console.error(`Metadata problems found (${problems.length}):`);
    for (const p of problems) console.error(`  ${p}`);
    process.exit(1);
  }
  console.log(`All ${ROUTES.length} routes have a unique title, description, canonical, and single H1.`);
}

main();
