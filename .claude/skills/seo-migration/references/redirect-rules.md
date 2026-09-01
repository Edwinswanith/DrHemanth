# Redirect rules

- 301 (permanent) for anything with a genuine new equivalent — one hop,
  directly to the final destination.
- 410 (gone) only for content with no replacement that should genuinely
  disappear (confirmed system/junk pages like internal survey-response URLs
  or platform showcase pages).
- Never redirect an unrelated page to the homepage "to be safe" — that's a
  soft-404 pattern search engines and users both distrust.
- Never chain redirects (A→B→C). Resolve to the final target directly.
- Preserve query-string-free canonical old URLs where the content
  genuinely moved; don't redirect based on slug similarity alone — the
  audit's `content-quality note` decides destination, not the filename.
- Every redirect is tested, not just declared: status code, single hop, no
  loop, and the destination's own canonical tag doesn't point somewhere
  else again.
