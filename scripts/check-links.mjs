#!/usr/bin/env node
/**
 * Crawls the running app (starting from "/") and reports any internal link
 * that doesn't resolve with a 2xx/3xx status, plus any literal "#" href.
 * Run against a server already listening at BASE_URL (default localhost:3000).
 *
 * Usage: node scripts/check-links.mjs [--base http://localhost:3000]
 */
const BASE = (process.argv.includes("--base") ? process.argv[process.argv.indexOf("--base") + 1] : null) ?? "http://localhost:3000";

const visited = new Set();
const queue = ["/"];
const broken = [];
const deadHashLinks = [];

function extractLinks(html) {
  return [...html.matchAll(/<a[^>]+href=["']([^"']+)["']/gi)].map((m) => m[1]);
}

async function main() {
  while (queue.length > 0) {
    const path = queue.shift();
    if (visited.has(path)) continue;
    visited.add(path);

    const url = new URL(path, BASE).toString();
    let res;
    try {
      res = await fetch(url, { redirect: "manual" });
    } catch (err) {
      broken.push({ path, error: String(err) });
      continue;
    }

    if (res.status >= 400) {
      broken.push({ path, status: res.status });
      continue;
    }

    if (!path.startsWith("/api/") && res.headers.get("content-type")?.includes("text/html")) {
      const html = await res.text();
      for (const href of extractLinks(html)) {
        if (href === "#") {
          deadHashLinks.push(path);
          continue;
        }
        if (href.startsWith("/") && !href.startsWith("//") && !visited.has(href.split("#")[0])) {
          queue.push(href.split("#")[0] || "/");
        }
      }
    }
  }

  console.log(`Checked ${visited.size} internal URLs.`);
  if (deadHashLinks.length > 0) {
    console.error(`Found ${deadHashLinks.length} literal "#" links (see .claude/rules/frontend.md):`);
    for (const p of deadHashLinks) console.error(`  ${p}`);
  }
  if (broken.length > 0) {
    console.error(`Found ${broken.length} broken internal links:`);
    for (const b of broken) console.error(`  ${JSON.stringify(b)}`);
  }
  if (broken.length > 0 || deadHashLinks.length > 0) {
    process.exit(1);
  }
  console.log("No broken links or dead '#' hrefs found.");
}

main();
