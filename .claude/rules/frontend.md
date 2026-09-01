# Frontend rules

- No dead buttons, `href="#"` links, empty modals, static "success" screens
  not wired to a real submission, or non-functional filters/tabs in
  anything presented as finished. A route foundation that isn't ready yet
  simply doesn't exist in `src/app/` — see `architecture.md`.
- Minimal client-side JavaScript. Reach for Server Components and native
  HTML first; justify every `"use client"` boundary.
- Every interactive component needs loading, empty, success, failure,
  validation, mobile, and keyboard states as applicable — see
  `design-system.md` for the full state list.
- Images: responsive, correctly sized, modern formats (AVIF/WebP with
  fallback), only the true LCP element gets priority loading, everything
  below the fold is lazy. No third-party embed (video, maps) loads eagerly
  — use click-to-load.
- Forms: label every field programmatically, announce errors accessibly,
  validate client-side for usability and always re-validate server-side for
  authority (client validation is never trusted alone).
- Keep JSON-LD, metadata, and canonical URLs colocated with the route that
  owns them (`src/lib/seo/`, `src/lib/structured-data/`) — don't duplicate
  facts across components that could drift out of sync.
