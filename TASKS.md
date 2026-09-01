# TASKS

Live status. Update this as work happens — an item is only "done" once its
verification command has actually been run in this session.

## Phase gate status

| Phase | Scope | Status |
|---|---|---|
| A | Repository foundation + reproducible existing-site audit | **in progress** |
| B | Architecture, appointment operations, data-protection decisions | not started |
| C | Design system + homepage frontend (scope-limited routes) | not started |
| D | Production appointment integration | not started |
| E | SEO migration + approved content routes | not started |
| F | Production-readiness verification + deployment | not started |

Full acceptance criteria per phase: `C:\Users\bizzz\.claude\plans\you-are-the-lead-snoopy-toast.md` (approved plan) — will be mirrored into `docs/decisions/` as ADRs during Phase A/B.

## Phase A — in progress

- [x] Root files created (CLAUDE.md, README.md, .env.example, .gitignore, PROJECT_STRUCTURE.md, TASKS.md, CLAUDE.local.example.md)
- [ ] `.claude/` rules, skills, agents created
- [ ] `docs/00–15` skeleton created with real initial content
- [ ] git init + first commit
- [ ] Reproducible crawl of keyholesurgeon.co.uk completed
- [ ] `docs/01-current-site-audit.md` written
- [ ] `docs/03-content-inventory.csv` populated (all discovered URLs)
- [ ] `docs/06-seo-migration-map.csv` populated (disposition for every URL)
- [ ] `docs/04-content-verification.md` written (evidence-hierarchy table)
- [ ] Phase A acceptance criteria re-checked and signed off before Phase B starts

## Known verification items (growing list — see docs/04-content-verification.md for the full tracked version)

- GMC number, exact canonical title, "Clinical Professor" claim — unverified
- Robotic surgery: Prof. Sheth's personal role/caseload/platform — unverified (Trust-level programme is publicly corroborated, personal claim is not)
- Per-location current-practice status, hours, parking/transport/accessibility — unverified
- Testimonial consent/attribution for the 3 currently published — unverified
- Post-op instructions content contains orthopaedic boilerplate — confirmed defect, requires full clinical rewrite, will not be migrated as-is

## Next task

Finish Phase A: build `.claude/` structure and `docs/` skeleton, then run the
existing-site crawl and populate the audit/migration/verification docs.
