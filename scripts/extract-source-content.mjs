#!/usr/bin/env node
/**
 * Read-only source-content extraction for the existing-site migration.
 * Captures the live site's visible text, heading outline, links, and image
 * references so rebuild work can preserve topics without copying unsafe
 * clinical prose directly into production pages.
 *
 * Usage:
 *   node scripts/extract-source-content.mjs [--base https://www.keyholesurgeon.co.uk] [--out docs/raw-crawl]
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
function argVal(flag, fallback) {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : fallback;
}

const BASE = argVal("--base", "https://www.keyholesurgeon.co.uk").replace(/\/$/, "");
const OUT_DIR = argVal("--out", "docs/raw-crawl");
const CONCURRENCY = 4;
const TIMEOUT_MS = 15000;
const USER_AGENT = "KeyholeSurgeonMigrationAuditBot/1.0 (+read-only content extraction)";

async function fetchText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      redirect: "follow",
      signal: controller.signal,
    });
    return { status: res.status, finalUrl: res.url, body: await res.text(), error: null };
  } catch (err) {
    return { status: null, finalUrl: url, body: "", error: String(err) };
  } finally {
    clearTimeout(timer);
  }
}

function decodeEntities(text) {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
    rsquo: "'",
    lsquo: "'",
    rdquo: '"',
    ldquo: '"',
    ndash: "-",
    mdash: "-",
  };

  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number.parseInt(dec, 10)))
    .replace(/&([a-z]+);/gi, (match, name) => named[name.toLowerCase()] ?? match);
}

function cleanText(html) {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|li|h[1-6]|div|section|article|tr)>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/[ \t]+/g, " ")
      .replace(/\n\s+/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

function extractTag(html, re) {
  const match = html.match(re);
  return match ? cleanText(match[1]) : "";
}

function extractBody(html) {
  return html.match(/<body[\s\S]*?>([\s\S]*)<\/body>/i)?.[1] ?? html;
}

function extractSitemapUrls(xml) {
  return [...new Set([...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].trim()))];
}

function extractHeadings(html) {
  return [...html.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => ({
    level: Number(m[1].slice(1)),
    text: cleanText(m[2]),
  })).filter((h) => h.text);
}

function extractLinks(html) {
  return [...html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ href: decodeEntities(m[1]).trim(), text: cleanText(m[2]) }))
    .filter((link) => link.href);
}

function extractImages(html) {
  return [...html.matchAll(/<img\b([^>]+)>/gi)]
    .map((m) => {
      const attrs = m[1];
      const src = attrs.match(/\bsrc=["']([^"']+)["']/i)?.[1] ?? "";
      const alt = attrs.match(/\balt=["']([^"']*)["']/i)?.[1] ?? "";
      return { src: decodeEntities(src).trim(), alt: decodeEntities(alt).trim() };
    })
    .filter((image) => image.src);
}

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i;
      i += 1;
      results[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function toMarkdown(pages, manifest) {
  const lines = [
    "# Source Content Archive",
    "",
    `Generated: ${manifest.generatedAt}`,
    `Base: ${manifest.base}`,
    `URLs: ${manifest.urlCount}`,
    "",
    "This archive is source material for migration review. It is not proof that old medical, testimonial, location, or professional claims are current or approved for republication.",
    "",
  ];

  for (const page of pages) {
    lines.push(`## ${page.url}`, "", `Status: ${page.httpStatus ?? "fetch failed"}`, `Title: ${page.title}`, "");
    if (page.metaDescription) lines.push(`Meta description: ${page.metaDescription}`, "");
    if (page.headings.length > 0) {
      lines.push("### Headings");
      for (const heading of page.headings) lines.push(`${"  ".repeat(heading.level - 1)}- h${heading.level}: ${heading.text}`);
      lines.push("");
    }
    if (page.visibleText) lines.push("### Visible Text", "", page.visibleText, "");
    if (page.links.length > 0) {
      lines.push("### Links");
      for (const link of page.links) lines.push(`- ${link.text || "(no text)"} -> ${link.href}`);
      lines.push("");
    }
    if (page.images.length > 0) {
      lines.push("### Images");
      for (const image of page.images) lines.push(`- ${image.alt || "(no alt)"} -> ${image.src}`);
      lines.push("");
    }
  }

  return lines.join("\n");
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  console.log(`Fetching sitemap: ${BASE}/sitemap.xml`);
  const sitemap = await fetchText(`${BASE}/sitemap.xml`);
  if (!sitemap.body) throw new Error(`Failed to fetch sitemap: ${sitemap.error ?? sitemap.status}`);

  const urls = extractSitemapUrls(sitemap.body);
  console.log(`Discovered ${urls.length} URLs`);

  const pages = await mapLimit(urls, CONCURRENCY, async (url) => {
    const res = await fetchText(url);
    process.stdout.write(res.status ? "." : "x");
    const body = extractBody(res.body);
    return {
      url,
      httpStatus: res.status,
      finalUrl: res.finalUrl,
      fetchError: res.error,
      title: extractTag(res.body, /<title[^>]*>([\s\S]*?)<\/title>/i),
      metaDescription: extractTag(res.body, /<meta[^>]+name=["']description["'][^>]+content=["']([\s\S]*?)["']/i),
      headings: extractHeadings(body),
      visibleText: cleanText(body),
      links: extractLinks(body),
      images: extractImages(body),
    };
  });

  console.log("\nDone.");
  const manifest = {
    generatedAt: new Date().toISOString(),
    base: BASE,
    urlCount: pages.length,
    tool: "scripts/extract-source-content.mjs",
    note: "Raw source archive for migration review only. Do not treat old-site claims as verified or clinically approved.",
  };

  await writeFile(path.join(OUT_DIR, "source-content.json"), JSON.stringify({ manifest, pages }, null, 2));
  await writeFile(path.join(OUT_DIR, "source-content.md"), toMarkdown(pages, manifest));
  console.log(`Wrote ${pages.length} pages to ${OUT_DIR}/source-content.json and source-content.md`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
