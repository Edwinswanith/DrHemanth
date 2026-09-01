#!/usr/bin/env node
/**
 * Reproducible existing-site audit crawl for the keyholesurgeon.co.uk
 * migration (Phase A). Discovers URLs from the XML sitemap (and optionally
 * robots.txt), fetches each one, and extracts the fields required by
 * .claude/skills/audit-existing-site/references/audit-schema.md that are
 * derivable from a plain HTTP fetch (status, title, meta description, H1,
 * canonical, word count, internal/external link counts, image count,
 * structured data presence, indexability).
 *
 * Fields the schema requires that this script CANNOT fill (search traffic,
 * backlinks) are left as "not available" in the output — never guessed.
 *
 * Usage:
 *   node scripts/audit-crawl.mjs [--base https://www.keyholesurgeon.co.uk] [--out docs/raw-crawl]
 */

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
function argVal(flag, fallback) {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : fallback;
}

const BASE = argVal("--base", "https://www.keyholesurgeon.co.uk").replace(/\/$/, "");
const OUT_DIR = argVal("--out", "docs/raw-crawl");
const CONCURRENCY = 5;
const TIMEOUT_MS = 15000;
const USER_AGENT = "KeyholeSurgeonMigrationAuditBot/1.0 (+read-only migration audit)";

async function fetchText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const started = Date.now();
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      redirect: "follow",
      signal: controller.signal,
    });
    const text = await res.text();
    return {
      status: res.status,
      finalUrl: res.url,
      redirected: res.redirected,
      body: text,
      ms: Date.now() - started,
      error: null,
    };
  } catch (err) {
    return { status: null, finalUrl: url, redirected: false, body: "", ms: Date.now() - started, error: String(err) };
  } finally {
    clearTimeout(timer);
  }
}

function extractSitemapUrls(xml) {
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].trim());
  return [...new Set(urls)];
}

function extractTag(html, re) {
  const m = html.match(re);
  return m ? m[1].replace(/\s+/g, " ").trim() : "";
}

function extractField(html) {
  const title = extractTag(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const metaDescription = extractTag(
    html,
    /<meta[^>]+name=["']description["'][^>]+content=["']([\s\S]*?)["']/i
  );
  const canonical = extractTag(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
  );
  const robotsMeta = extractTag(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);
  const hasJsonLd = /<script[^>]+type=["']application\/ld\+json["']/i.test(html);
  const jsonLdTypes = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => {
      try {
        const parsed = JSON.parse(m[1]);
        const obj = Array.isArray(parsed) ? parsed[0] : parsed;
        return obj?.["@type"] ?? "unknown";
      } catch {
        return "unparsed";
      }
    });

  const bodyMatch = html.match(/<body[\s\S]*?>([\s\S]*)<\/body>/i);
  const bodyHtml = bodyMatch ? bodyMatch[1] : html;
  const textOnly = bodyHtml
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const wordCount = textOnly ? textOnly.split(" ").filter(Boolean).length : 0;

  const internalLinks = [...bodyHtml.matchAll(/<a[^>]+href=["']([^"']+)["']/gi)]
    .map((m) => m[1])
    .filter((href) => href.startsWith("/") || href.includes("keyholesurgeon.co.uk"));
  const externalLinks = [...bodyHtml.matchAll(/<a[^>]+href=["'](https?:\/\/[^"']+)["']/gi)]
    .map((m) => m[1])
    .filter((href) => !href.includes("keyholesurgeon.co.uk"));
  const images = [...bodyHtml.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map((m) => m[1]);
  const imagesWithoutAlt = [...bodyHtml.matchAll(/<img((?!alt=)[^>])*>/gi)].length;

  return {
    title,
    metaDescription,
    canonical,
    h1Count: h1Matches.length,
    h1: h1Matches[0] ?? "",
    robotsMeta,
    indexable: !/noindex/i.test(robotsMeta),
    hasJsonLd,
    jsonLdTypes: [...new Set(jsonLdTypes)].join("|"),
    wordCount,
    internalLinkCount: new Set(internalLinks).size,
    externalLinkCount: new Set(externalLinks).size,
    imageCount: images.length,
    imagesWithoutAlt,
  };
}

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  console.log(`Fetching sitemap: ${BASE}/sitemap.xml`);
  const sitemapRes = await fetchText(`${BASE}/sitemap.xml`);
  if (!sitemapRes.body) {
    console.error("Failed to fetch sitemap.xml:", sitemapRes.error ?? sitemapRes.status);
    process.exit(1);
  }
  const sitemapUrls = extractSitemapUrls(sitemapRes.body);
  console.log(`Discovered ${sitemapUrls.length} URLs from sitemap.xml`);

  const robotsRes = await fetchText(`${BASE}/robots.txt`);

  const startedAt = new Date().toISOString();
  const results = await mapLimit(sitemapUrls, CONCURRENCY, async (url) => {
    const res = await fetchText(url);
    const fields = res.body ? extractField(res.body) : {};
    process.stdout.write(res.status ? "." : "x");
    return {
      url,
      discoverySource: "sitemap.xml",
      httpStatus: res.status,
      finalUrl: res.finalUrl,
      redirected: res.redirected,
      fetchError: res.error,
      fetchMs: res.ms,
      ...fields,
    };
  });
  console.log("\nDone.");

  const finishedAt = new Date().toISOString();
  const manifest = {
    auditedAt: startedAt,
    finishedAt,
    base: BASE,
    sitemapUrlCount: sitemapUrls.length,
    robotsTxtStatus: robotsRes.status,
    robotsTxtBody: robotsRes.body,
    tool: "scripts/audit-crawl.mjs",
    notes:
      "Search traffic and backlink data are NOT available from this crawl (no Search Console/GA/backlink export access). Those fields are 'not available' in the migration map, never estimated.",
  };

  await writeFile(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
  await writeFile(path.join(OUT_DIR, "crawl-results.json"), JSON.stringify(results, null, 2));

  const csvHeader = [
    "url", "discoverySource", "httpStatus", "redirected", "finalUrl", "title", "metaDescription",
    "canonical", "h1Count", "h1", "indexable", "robotsMeta", "hasJsonLd", "jsonLdTypes",
    "wordCount", "internalLinkCount", "externalLinkCount", "imageCount", "imagesWithoutAlt", "fetchError",
  ];
  const csvRows = results.map((r) =>
    csvHeader
      .map((k) => {
        const v = r[k] ?? "";
        const s = String(v).replace(/"/g, '""');
        return /[",\n]/.test(s) ? `"${s}"` : s;
      })
      .join(",")
  );
  await writeFile(path.join(OUT_DIR, "crawl-results.csv"), [csvHeader.join(","), ...csvRows].join("\n"));

  console.log(`Wrote ${results.length} rows to ${OUT_DIR}/crawl-results.csv (+ .json, manifest.json)`);
}

main();
