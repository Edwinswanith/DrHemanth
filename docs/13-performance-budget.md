# 13 — Performance budget

## Targets (75th percentile)

- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1

## Budget rules

- Only the true LCP element (hero heading or hero image, whichever
  renders first/largest) gets priority image loading.
- Below-the-fold images, embedded video, and maps: lazy-load or
  click-to-load — never eager.
- Images: responsive `srcset`, AVIF/WebP with fallback, sized to their
  actual rendered dimensions.
- Fonts: self-hosted or `next/font`-optimised, no render-blocking web-font
  requests without `font-display: swap`/fallback metrics.
- JavaScript: RSC-first, minimal client bundles, no animation library
  unless a specific, justified need exists (motion is CSS
  opacity/transform per `.claude/rules/design-system.md`).
- Third-party scripts (analytics, bot protection): deferred, loaded only
  post-consent where applicable.
- No layout shift from late-loading fonts, unsized images/embeds, or
  injected banners without reserved space.

## Verification

Lighthouse/CI (or the project's configured equivalent) run against the
homepage and at least one treatment-page template before each phase
sign-off that touches layout; actual scores recorded in the phase's
verification note, not estimated.
