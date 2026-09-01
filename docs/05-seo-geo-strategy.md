# 05 — SEO & GEO strategy

## Technical SEO baseline fixes (all confirmed gaps on the old site)

- Add a canonical tag to every route (old site has none).
- Rebuild JSON-LD from scratch — old site's structured data is present but
  unparseable on 96 of 98 pages.
- Consolidate the ~56 `merge`-classified thin/duplicate condition pages
  into a small set of authoritative treatment pages (see
  `02-information-architecture.md`), each internally linked from the
  others rather than competing for the same queries.
- Retire (`410`) confirmed junk (`/ypo-showcase/`) and legacy engagement
  pages (`/tell-a-friend/`, `/feedback-.../`, `/facebook/`, `/sitemap/`)
  with no functional replacement.
- Single-hop 301s for every genuine content move — never a chain, never a
  bulk redirect to the homepage. Implementation + testing via the
  `seo-migration` skill and `scripts/check-redirects.mjs`.
- `sitemap.ts`/`robots.ts` generated from the actual route tree, excluding
  any `noindex` system/confirmation routes.

## GEO (generative-engine optimisation)

Treated as an extension of good SEO/content quality, not a separate
trick-set:

- Answer-first openings on every treatment/condition/comparison page.
- Explicit, consistent entity relationships: doctor ↔ specialty ↔
  procedure ↔ hospital ↔ location, stated the same way everywhere (blocked
  until the canonical positioning gate in `04-content-verification.md`
  clears for the wording itself — the *structure* is built now).
- Balanced comparison content (robotic vs laparoscopic) — never one-sided.
- Author + medical reviewer + published/last-reviewed dates on every
  medical page.
- Source references from the evidence hierarchy, visible on-page.
- Crawlable FAQs in real HTML (never JS-only accordions that hide content
  from a non-JS fetch).
- No `llms.txt` file is planned as a ranking tactic; if added later it's
  documentation only.

## Local SEO

Consistent NAP (name/address/phone) across the site and any Google
Business Profiles, once locations are verified per `04-content-verification.md`.
One genuinely useful page per real, currently-active location — never a
doorway page with the town name swapped. Parking/transport/accessibility
content is new, not migrated (the old site had none).

## What "done" looks like for this doc's scope

Every route has unique metadata, valid structured data, a working canonical,
and is reachable through real internal linking; every changed old URL 301s
correctly with zero chains/loops (verified by `scripts/check-redirects.mjs`);
no thin/duplicate page competes with its own consolidated replacement.
