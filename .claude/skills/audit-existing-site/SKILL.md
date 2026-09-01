---
name: audit-existing-site
description: Crawl and inventory the current keyholesurgeon.co.uk site as a reproducible, evidence-based migration source — never assuming old content is automatically correct, current, or safe to reuse. Use before any URL is redirected, retired, or content migrated.
---

# Audit existing site

## When to use

Before Phase E redirect/route work, whenever a previously "investigate"
URL needs resolving, or whenever the client reports the live site changed.

## Required inputs

- Live site access (public — no login required for the public site).
- `references/audit-schema.md` (the exact per-URL fields to record).

## Steps

1. Discover URLs from: XML sitemap (`/sitemap.xml`), HTML sitemap if one
   exists, and in-page navigation crawl. Record discovery source per URL.
2. For each URL, fetch and record every field in `references/audit-schema.md`.
3. Classify medical/clinical content using the 5-state taxonomy
   (`approved-reusable` / `reusable-after-editing` /
   `requires-clinical-rewrite` / `retire` / `requires-doctor-confirmation`)
   — never `approved` by Claude, see `.claude/rules/medical-content.md`.
4. Classify migration action using the 6-state taxonomy (keep / improve /
   merge / redirect / retire / **investigate**). Anything that can't be
   confidently resolved without Search Console/analytics/backlink access
   (not available in this environment) stays `investigate` — never guessed.
5. Record reproducibility metadata: audit date/time, crawl method, sitemap
   sources, URL count, redirects/errors encountered, canonical conflicts,
   duplicate metadata, robots restrictions.
6. Write/update `docs/01-current-site-audit.md`,
   `docs/03-content-inventory.csv`, `docs/06-seo-migration-map.csv`.

## Required outputs

- 100% of discovered URLs present in the inventory with no blank
  disposition (unresolved ones are explicitly `investigate`).
- Reproducibility metadata recorded so the audit can be re-run and diffed.

## Failure conditions

- A URL silently dropped from the inventory.
- A disposition guessed without the evidence the schema requires.
- Old-site copy treated as reusable without a content-quality check (see the
  confirmed orthopaedic-content defect in the post-op instructions page as
  the standing example of why this matters).
