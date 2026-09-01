#!/usr/bin/env node
/**
 * Summarises the migration/verification status from
 * docs/06-seo-migration-map.csv into a quick console report — a cheaper
 * alternative to re-reading the full CSV by hand when checking phase
 * progress. Does not modify anything.
 *
 * Usage: node scripts/generate-content-report.mjs
 */
import { readFile } from "node:fs/promises";

function parseCsv(text) {
  const [header, ...rows] = text.trim().split("\n");
  const cols = header.split(",");
  return rows.map((row) => {
    const values = row.match(/(?:"(?:[^"]|"")*"|[^,]*)(?:,|$)/g).slice(0, -1).map((v) =>
      v.replace(/,$/, "").replace(/^"|"$/g, "").replace(/""/g, '"')
    );
    return Object.fromEntries(cols.map((c, i) => [c, values[i]]));
  });
}

function tally(rows, key) {
  const counts = {};
  for (const r of rows) counts[r[key]] = (counts[r[key]] ?? 0) + 1;
  return counts;
}

async function main() {
  const csv = await readFile(new URL("../docs/06-seo-migration-map.csv", import.meta.url), "utf8");
  const rows = parseCsv(csv);

  console.log(`Total tracked URLs: ${rows.length}\n`);
  console.log("By migration decision:");
  for (const [k, v] of Object.entries(tally(rows, "migrationDecision")).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${k.padEnd(12)} ${v}`);
  }

  console.log("\nBy medical-review classification:");
  for (const [k, v] of Object.entries(tally(rows, "medicalReviewClassification")).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${k.padEnd(30)} ${v}`);
  }

  const pending = rows.filter((r) => r.verificationStatus === "pending");
  console.log(`\n${pending.length} of ${rows.length} URLs have at least one item pending client/clinical verification.`);
  console.log("Full detail: docs/04-content-verification.md and docs/06-seo-migration-map.csv");
}

main();
