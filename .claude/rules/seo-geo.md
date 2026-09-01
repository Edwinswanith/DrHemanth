# SEO & GEO rules

- Every URL discovered on the old site is classified in
  `docs/06-seo-migration-map.csv` (keep/improve/merge/redirect/retire/
  investigate) before the new site can 404 or replace it. Unresolved
  ("investigate") URLs never get guessed into a redirect.
- Redirects: 301 to the genuine new equivalent only — never bulk-redirect
  unrelated content to the homepage, never create chains or loops. 410 only
  for content with no replacement that should genuinely disappear.
- One canonical URL, one H1, unique title/meta description per page.
- JSON-LD only encodes facts that are true, currently verified, and visibly
  present on the page. No `Review`/`AggregateRating` schema without
  genuinely valid, permitted, verifiable reviews. No fabricated
  organisation/hospital relationships.
- GEO is answer-first structure and genuine expertise signals — direct
  definitions, balanced comparisons, expert authorship, medical-reviewer
  and last-reviewed dates, source references, crawlable FAQs, strong
  internal linking between doctor/treatment/condition/location entities. It
  is not keyword stuffing and not a substitute for real content quality. An
  `llms.txt` file, if ever added, is a documentation aid only — never treat
  it as a ranking requirement.
- Internal search results, staging, confirmation, and other low-value
  system pages are `noindex`. Thin/duplicate content gets merged into one
  authoritative page and redirected, not left to compete with itself.
