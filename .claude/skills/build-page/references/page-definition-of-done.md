# Page definition of done

- [ ] One H1, correct heading hierarchy, semantic landmarks.
- [ ] Unique title, meta description, canonical URL.
- [ ] Structured data present where applicable, validates, encodes only
      true/visible/verified facts.
- [ ] Responsive at 390×844, 430×932, 768×1024, 1024×768, 1440×900, 1920×1080
      — no horizontal overflow, no broken image cropping, touch targets
      ≥44×44px.
- [ ] Keyboard-only pass: every interactive element reachable and operable,
      visible focus state throughout.
- [ ] `prefers-reduced-motion` respected.
- [ ] No dead links, `#` hrefs, or non-functional controls.
- [ ] Every claim on the page traces to a verified source or is visibly
      flagged `requires-clinical-review`/pending — nothing fabricated.
- [ ] Medical pages: full 13-part shape present (see
      `.claude/rules/medical-content.md` and `docs/content-briefs/treatments.md`).
- [ ] e2e test covering the page's primary interaction; accessibility check
      run with zero critical/serious violations (or explicitly listed).
- [ ] If this page replaces an old-site URL, the redirect is implemented
      and tested, not just planned.
