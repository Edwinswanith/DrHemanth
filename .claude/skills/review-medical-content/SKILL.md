---
name: review-medical-content
description: Identify unsupported, unsafe, outdated, generic, or unverified clinical statements in draft content. Use on every treatment/condition/robotic-surgery/comparison page before it can be considered for a production route.
---

# Review medical content

## When to use

Before any medical/clinical content moves from `draft` toward being eligible
for a production route — this skill never grants final approval (only Prof.
Sheth or an authorised clinical reviewer can), it only screens for defects.

## Required inputs

- The draft content and its cited sources.
- `references/medical-review-rubric.md`.
- The evidence hierarchy in `docs/04-content-verification.md`.

## Steps

1. Trace every factual claim to its evidence tier; anything without a
   traceable source gets flagged, not assumed.
2. Check for the specific failure mode found in the old site: content
   copy-pasted from an unrelated specialty (see the orthopaedic post-op
   instructions example) — does every sentence actually apply to this
   procedure?
3. Check forbidden-superlative list in `.claude/rules/medical-content.md`.
4. Confirm the 13-part treatment-page shape is present where required.
5. Set status to `draft`, `requires-clinical-review`, or `retired` — never
   `approved`.
6. Log unresolved items in `docs/04-content-verification.md`.

## Required outputs

A reviewed content file with an honest status and a list of anything still
needing Prof. Sheth's or an authorised reviewer's sign-off.

## Failure conditions

- Marking content `approved`/clinically reviewed.
- Publishing a superlative or unsupported statistic.
- Letting mismatched/generic boilerplate through unflagged.
