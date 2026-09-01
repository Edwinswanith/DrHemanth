# Quality gates

- `npm run typecheck` — zero errors.
- `npm run lint` — zero errors (warnings documented if not fixed).
- `npm run test` — unit + integration, all passing.
- `npm run build` — production build succeeds.
- `npm run test:e2e` — Playwright suite passing at all required viewports
  (390×844, 430×932, 768×1024, 1024×768, 1440×900, 1920×1080).
- Accessibility — zero critical/serious axe violations.
- `scripts/check-links.mjs` — zero broken internal links.
- `scripts/check-redirects.mjs` — every migration-map redirect resolves
  correctly, single-hop, no loops, no canonical conflicts.
- `scripts/check-metadata.mjs` — every route has a unique title/description/
  canonical.
- `scripts/check-structured-data.mjs` — all JSON-LD valid and traceable to
  verified visible facts.
- Performance — LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at the 75th percentile
  (Lighthouse/CI check).
- No fabricated claim, dead control, or placeholder interaction anywhere in
  the reviewed scope.
