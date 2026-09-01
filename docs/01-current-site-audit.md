# 01 — Current site audit (keyholesurgeon.co.uk)

## Reproducibility

| Field | Value |
|---|---|
| Audit date/time | 2026-09-01T10:15:13Z – 2026-09-01T10:15:38Z (UTC) |
| Crawl tool | `scripts/audit-crawl.mjs` (Node 20, no external dependencies) |
| Command | `node scripts/audit-crawl.mjs --base https://www.keyholesurgeon.co.uk --out docs/raw-crawl` |
| Sitemap source | `https://www.keyholesurgeon.co.uk/sitemap.xml` (only sitemap source; no separate HTML sitemap URL discovered outside the `/sitemap/` page itself) |
| URLs discovered | **98** (sitemap-only discovery — see note below) |
| HTTP errors | 0 (all 98 URLs returned `200`) |
| Redirects encountered | 0 (no sitemap URL redirected during crawl) |
| robots.txt | `200`, permissive (`Allow: /`, disallows only `?dfw=on/off` query variants), sitemap declared correctly |
| Canonical conflicts | See "Canonical tags" below — every page is missing a canonical tag, so there are no *conflicting* canonicals, but there is a site-wide gap |
| Duplicate metadata | See "Duplicate/templated content" below |
| Raw evidence | `docs/raw-crawl/manifest.json`, `crawl-results.json`, `crawl-results.csv` (gitignored — regenerate with the command above; kept locally for this audit) |
| Search Console / GA4 / backlink data | **Not available** in this environment (no client credentials shared). Every "search traffic"/"backlinks" field in `03-content-inventory.csv`/`06-seo-migration-map.csv` is marked "not available," never estimated. If the client grants access later, re-run this audit and merge that data in. |

**Note on discovery count:** an earlier manual page-by-page review (via an AI
summarisation tool, before this scripted crawl existed) reported "127 URL
entries" in the sitemap. The scripted, byte-accurate crawl above found
**98**. The scripted count is authoritative — it parses `<loc>` tags
directly rather than summarising — and the discrepancy itself is a useful
reminder to trust the reproducible tool output over one-off manual/AI
summaries when they disagree.

Discovery was sitemap-only. In-page navigation was reviewed manually during
planning (main nav, footer) and every link found there resolves to a URL
already present in the sitemap — no additional nav-only URLs were found. If
Search Console access becomes available later, cross-check its indexed-URL
list against this 98-URL set for anything crawled but not sitemapped.

## Headline findings

1. **Platform:** "Your Practice Online" (YPO), a proprietary templated
   medical-website platform — not a CMS the client can be assumed to own
   content in independently. No git history, no accessible source.
2. **No canonical tags anywhere.** All 98 pages returned an empty canonical
   field. Combined with heavy content duplication (below), this is a real
   technical-SEO gap the old site was running with.
3. **Structured data is present but broken.** `hasJsonLd=true` on effectively
   every page, but the JSON-LD failed to parse as valid JSON on all but two
   pages (the bio page parsed a `Physician` block, the contact page parsed a
   `LocalBusiness` block). The rest is present markup that search engines
   likely can't use. Rebuild JSON-LD from scratch per `07-structured-data-plan.md`.
4. **Heavy content duplication/thinness.** Dozens of condition/procedure
   pages share near-identical templated meta-description sentence patterns
   ("Prof. Hemant Sheth, a general surgeon in Hertfordshire, Harrow and
   London UK offers treatment for X and Y") — a content-mill signal, not
   copy written specifically for each topic. The hernia/inguinal-hernia
   cluster alone has **10 separate near-duplicate URLs** for what should be
   one well-structured treatment page. See `06-seo-migration-map.csv` for
   the full merge mapping.
5. **Confirmed clinical-content defect:** `/post-op-instructions-general-
   laparoscopic-surgeon.../` mixes orthopaedic-surgery boilerplate into
   abdominal/laparoscopic guidance — verified by direct fetch, quoting the
   literal source text: *"Keep the operated extremity elevated, above the
   level of your heart, to control swelling," "Exercises in the first week
   are usually aimed at regaining joint motion,"* and *"Coldness, numbness,
   or blanched white or bluish colour of the fingers or toes."* Classified
   `requires-clinical-rewrite` — will not be migrated as-is under any
   circumstance.
6. **`/ypo-showcase/` is vendor junk, not practice content** — confirmed by
   crawl: ~17,500 words, ~2,000 external links and ~2,000 images on a single
   page, describing itself as a showcase of "orthopedic-related client"
   websites built by the YPO platform vendor. Classified `retire` (410).
7. **13 individual `/patient-survey-f14143*` URLs** are per-patient
   testimonial permalinks (H1 "Verified Patient's Story"), not throwaway
   form-confirmation pages as first assumed from the URL pattern alone —
   confirmed by fetching several directly. Whether they originate from a
   verifiable third-party review platform (the homepage links to
   `?sourc=iwantgreatcare`, suggesting I Want Great Care) or an internal,
   unverifiable form determines whether they can be reused at all —
   classified `investigate`, not auto-merged or auto-retired.
8. **No cookie-consent mechanism detected** anywhere in the crawled markup.
9. **All 98 pages are indexable** (no `noindex`), including the junk/system
   pages above — a real cleanup opportunity in the redirect/410 map.

## Doctor & practice facts found (unverified unless noted — see `04-content-verification.md`)

- Prof. Hemant Sheth, MBBS, MS, FRCS, MD (Res); Consultant UGI/Laparoscopic/
  HPB surgeon, Ealing & London North West University Healthcare NHS Trust;
  GMC number and "Clinical Professor" claim published but unverified.
- Positioning is inconsistent across pages: title tag says "Laparoscopic
  Surgeon," bio text gestures toward "Robotic Surgeon," services text says
  "UGI, laparoscopic and HPB surgeon." No single canonical statement exists
  today — see the Phase B/E approval gate in `04-content-verification.md`.
- 3 private-practice locations (Spire Bushey; The Clementine Churchill,
  Harrow; The Wellington Hospital Elstree Waterfront) with addresses and
  partial hours published, no parking/transport/accessibility info, no
  confirmation any are still current.
- Public corroboration (independent of the old site) that London North West
  University Healthcare NHS Trust runs a real da Vinci robotic programme at
  Ealing Hospital + Northwick Park (Ealing's targeting hernia repair and
  gallbladder surgery specifically): [ealing.news](https://www.ealing.news/health-wellbeing/the-robots-are-coming-to-ealing-hospital/),
  [ealing.news milestone piece](https://www.ealing.news/health-wellbeing/new-surgical-robot-reaches-milestone-at-ealing-hospital/),
  [lnwh.nhs.uk](https://www.lnwh.nhs.uk/). This corroborates the Trust's
  programme, not Prof. Sheth's personal robotic caseload/role, which stays
  unverified.

## Outputs of this audit

- `03-content-inventory.csv` — full per-URL crawl data (98 rows).
- `06-seo-migration-map.csv` — per-URL migration decision (98 rows; 0 blank
  dispositions): 1 `keep`, 14 `redirect`, 56 `merge`, 5 `retire`, 22
  `investigate`. Both generated by `scripts/build-migration-map.mjs` from
  the raw crawl, so the mapping is reviewable and re-runnable, not a
  one-off manual judgement call.

## Re-running this audit

```bash
node scripts/audit-crawl.mjs --base https://www.keyholesurgeon.co.uk --out docs/raw-crawl
node scripts/build-migration-map.mjs
```

Re-run before Phase E to catch any changes to the live site since this
audit, and whenever an `investigate` row needs re-evaluating.
