# 07 — Structured data plan

Old-site JSON-LD is present but unparseable on 96/98 pages (see
`01-current-site-audit.md`) — this is a rebuild from zero, not a fix.

## Principle

Every JSON-LD property must be true, currently verified, and visibly
present as text/content on the same page. No `Review`/`AggregateRating`
without genuinely valid, permitted, verifiable reviews. No invented
affiliations.

## Planned types, by route

| Route(s) | Types | Notes |
|---|---|---|
| `/` , `/about` | `Person`/`Physician` | Blocked on canonical-title approval (`04-content-verification.md`) for the `name`/`jobTitle` fields — structure built now, populated once approved |
| `/`, `/contact`, `/locations/*` | `MedicalBusiness` / `MedicalClinic` | One per active, confirmed location only |
| `/treatments/*` | `MedicalProcedure` | Only for pages that clear `approved-reusable`/`reusable-after-editing` |
| All content pages | `BreadcrumbList` | Matches real nav depth |
| `/faqs`, treatment-page FAQ sections | `FAQPage` | Only for genuinely crawlable, visible FAQ content |
| `/research-publications` | `Article`/citation-style data | Only for confirmed-current publications |
| `/videos-media` | `VideoObject` | Only for videos with confirmed hosting rights + transcript |
| `/` | `WebSite` | Sitelinks search box omitted (no internal site search planned) |
| Every route | `WebPage`/`ContactPage` (contact only) | |

## Explicitly excluded

- `Review`/`AggregateRating` — the old site's testimonials have unverified
  consent (`04-content-verification.md`); no aggregate rating exists
  anywhere on the old site to begin with, so none is invented for the new
  one either.
- Any hospital/professional-body logo or relationship not independently
  confirmed and permitted for use.
- Any statistic (case counts, success rates) not sourced from an approved,
  reliably-maintained process.

## Validation

`scripts/check-structured-data.mjs` (Phase E) validates every route's
JSON-LD is syntactically valid and cross-checks referenced facts (name,
address, procedure names) against the rendered page text. Google's Rich
Results Test is run manually against representative templates (home,
treatment, location, FAQ) before Phase F sign-off.
