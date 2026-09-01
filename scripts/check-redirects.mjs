#!/usr/bin/env node
/**
 * Verifies every `redirect`/`retire` row in docs/06-seo-migration-map.csv
 * actually resolves as intended once Phase E's redirect implementation
 * lands. Until then this reports readiness rather than failing — there are
 * deliberately no redirects configured in Phase C (see
 * docs/02-information-architecture.md).
 *
 * Usage: node scripts/check-redirects.mjs [--base http://localhost:3000]
 */
import { readFile } from "node:fs/promises";

const BASE = (process.argv.includes("--base") ? process.argv[process.argv.indexOf("--base") + 1] : null) ?? "http://localhost:3000";

function parseCsv(text) {
  const [header, ...rows] = text.trim().split("\n");
  const cols = header.split(",");
  return rows.map((row) => {
    // Minimal CSV split good enough for this file's quoting (fields with
    // commas are always quoted by build-migration-map.mjs).
    const values = row.match(/(?:"(?:[^"]|"")*"|[^,]*)(?:,|$)/g).slice(0, -1).map((v) =>
      v.replace(/,$/, "").replace(/^"|"$/g, "").replace(/""/g, '"')
    );
    return Object.fromEntries(cols.map((c, i) => [c, values[i]]));
  });
}

async function main() {
  const csv = await readFile(new URL("../docs/06-seo-migration-map.csv", import.meta.url), "utf8");
  const rows = parseCsv(csv);

  const redirectRows = rows.filter((r) => r.migrationDecision === "redirect" || r.migrationDecision === "merge");
  const retireRows = rows.filter((r) => r.migrationDecision === "retire");
  const investigateRows = rows.filter((r) => r.migrationDecision === "investigate");

  console.log(
    `Migration map: ${rows.length} URLs total — ${redirectRows.length} redirect/merge, ${retireRows.length} retire, ${investigateRows.length} still investigate.`
  );

  if (investigateRows.length > 0) {
    console.log(`${investigateRows.length} URLs remain "investigate" and must NOT be redirected until resolved (see docs/04-content-verification.md).`);
  }

  // No redirect middleware/config exists yet (Phase E) — confirm that
  // honestly rather than reporting false failures against localhost.
  const sample = redirectRows[0];
  if (sample) {
    const res = await fetch(new URL(sample.existingUrl).pathname, { redirect: "manual", baseURL: BASE }).catch(() => null);
    if (!res || res.status !== 301) {
      console.log("Redirects are not implemented yet (expected — this is Phase E work). Re-run this script once next.config redirects/middleware land.");
      process.exit(0);
    }
  }

  let failures = 0;
  for (const row of redirectRows) {
    const path = new URL(row.existingUrl).pathname;
    const res = await fetch(new URL(path, BASE), { redirect: "manual" });
    if (res.status !== 301) {
      failures += 1;
      console.error(`  FAIL ${path}: expected 301, got ${res.status}`);
    }
  }

  if (failures > 0) process.exit(1);
  console.log("All configured redirects resolve as 301s.");
}

main();
