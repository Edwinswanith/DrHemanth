# 15 — Launch checklist

Nothing here is checked until its actual verification command/approval has
happened. Walked in full only at Phase F.

## Content & clinical
- [ ] Canonical positioning statement approved by client (see `04-content-verification.md`)
- [ ] No route live with medical-content classification `requires-clinical-rewrite` or `requires-doctor-confirmation`
- [ ] All testimonials on `/patient-reviews` have confirmed consent/attribution
- [ ] All location pages confirmed current (active practice, hours, address)

## SEO / migration
- [ ] Full redirect map implemented and tested (`scripts/check-redirects.mjs`): zero chains, zero loops, zero canonical conflicts
- [ ] No `investigate` row redirected by guess
- [ ] Sitemap/robots correct; system/thin routes `noindex`
- [ ] Structured data validated (script + manual Rich Results Test spot-check)

## Legal / data protection
- [ ] Article 6 lawful basis, Article 9 condition (if applicable), DPIA decision, retention schedule, processor sign-off, international-transfer assessment all confirmed by the client/legal — not authored by Claude
- [ ] Privacy notice, cookie policy (if applicable), accessibility statement, medical disclaimer complete and approved
- [ ] `docs/12-data-processing-register.csv` has zero rows at `pending` — every processor is `approved` or removed

## Appointment workflow
- [ ] Production `NotificationProvider` selected, approved, and configured (or the practice has explicitly accepted operating without one at launch)
- [ ] End-to-end test in a production-like environment, including a forced notification-failure path
- [ ] Idempotency verified under simulated double-submit/retry
- [ ] No PII in logs/analytics — spot-checked

## Technical
- [ ] `npm run typecheck`/`lint`/`test`/`build`/`test:e2e` all passing
- [ ] Accessibility: zero critical/serious violations
- [ ] Performance budget met (`13-performance-budget.md`)
- [ ] Security headers/CSP in place; dependency scan clean
- [ ] Staging environments confirmed `noindex`

## Operational
- [ ] Rollback plan documented
- [ ] Old site remains live and untouched until cutover
- [ ] Client has provided DNS/domain access for the actual cutover step (external dependency — cannot be completed unilaterally)

## Sign-off
Every unchecked item above is either completed with evidence or listed as
an explicit open blocker with an owner (client vs. Claude) in `TASKS.md` —
never silently skipped.
