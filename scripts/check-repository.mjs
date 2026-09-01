#!/usr/bin/env node
/**
 * Sanity-checks that the documented commands and project structure
 * actually exist — used by the initialise-project skill. Fails loudly
 * rather than letting README/TASKS.md drift from reality.
 *
 * Usage: node scripts/check-repository.mjs
 */
import { access } from "node:fs/promises";
import { constants } from "node:fs";

const REQUIRED_PATHS = [
  "package.json",
  "CLAUDE.md",
  "PROJECT_STRUCTURE.md",
  "TASKS.md",
  ".claude/rules",
  ".claude/skills",
  ".claude/agents",
  "docs/00-project-brief.md",
  "docs/06-seo-migration-map.csv",
  "src/app/layout.tsx",
  "src/app/page.tsx",
];

const REQUIRED_SCRIPTS = ["dev", "build", "typecheck", "lint", "test", "test:e2e"];

async function main() {
  const problems = [];

  for (const p of REQUIRED_PATHS) {
    try {
      await access(new URL(`../${p}`, import.meta.url), constants.F_OK);
    } catch {
      problems.push(`Missing required path: ${p}`);
    }
  }

  const pkg = JSON.parse(await (await import("node:fs/promises")).readFile(new URL("../package.json", import.meta.url), "utf8"));
  for (const script of REQUIRED_SCRIPTS) {
    if (!pkg.scripts?.[script]) problems.push(`package.json is missing the "${script}" script`);
  }

  if (problems.length > 0) {
    console.error(`Repository check failed (${problems.length} problem(s)):`);
    for (const p of problems) console.error(`  ${p}`);
    process.exit(1);
  }
  console.log("Repository structure and documented scripts are present.");
}

main();
