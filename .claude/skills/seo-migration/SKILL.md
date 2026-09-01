---
name: seo-migration
description: Map every existing keyholesurgeon.co.uk URL to keep, improve, merge, redirect, retire, or investigate, and implement/test the resulting redirects. Use during Phase E, or whenever the migration map changes.
---

# SEO migration

## When to use

Phase E route/redirect implementation, or any time
`docs/06-seo-migration-map.csv` changes and redirects need to catch up.

## Required inputs

- `docs/06-seo-migration-map.csv` (produced by `audit-existing-site`).
- `references/redirect-rules.md`.

## Steps

1. For every `redirect` row, implement a single-hop 301 to the genuine new
   equivalent (never the homepage, never a chain).
2. For every `retire` row with no replacement, implement a 410.
3. Leave `investigate` rows unredirected and flagged — do not guess.
4. Run `scripts/check-redirects.mjs` against the full map: assert status
   codes, detect chains/loops, detect canonical conflicts.
5. Update `docs/06-seo-migration-map.csv` with implementation status.

## Required outputs

- Every `keep`/`improve`/`merge`/`redirect`/`retire` row implemented and
  verified by the redirect-check script.
- Zero chains, zero loops, zero canonical conflicts.

## Failure conditions

- Any unrelated old URL redirected to the homepage.
- A redirect chain (A→B→C) instead of a single hop.
- An `investigate` row redirected anyway to make the checklist look done.
