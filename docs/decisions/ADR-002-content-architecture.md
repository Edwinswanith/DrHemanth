# ADR-002 — Content architecture

- **Status:** accepted
- **Date:** 2026-09-01
- **Phase:** A

## Context

Client decision (via clarifying question during planning): editable
practice content (treatments, FAQs, locations, credentials) should be
file-based in-repo rather than a hosted headless CMS.

## Decision

Content lives as typed JSON/MDX under `src/content/`, validated by Zod
schemas in `src/lib/content/`, edited via normal code review. Every content
record carries `verificationStatus` (`verified` / `pending` / `blocked` /
`retired`), `reviewedBy`, `publishedDate`, `lastReviewed`.

## Alternatives considered

- Self-hosted headless CMS (Payload/Strapi) — gives non-technical staff a
  direct editing UI, at the cost of a second service to host, secure, and
  keep in the UK region. Rejected for this build; documented here so it can
  be revisited if the practice needs direct non-developer editing later.

## Consequences

Keeps every byte of content inside the same UK-hostable build pipeline, no
extra attack surface, fully git-history-auditable — directly supports the
UK-hosting and provenance requirements. Trade-off: content changes require
a code change/PR, not a CMS login — acceptable given the file-based choice
was the client's explicit preference.
