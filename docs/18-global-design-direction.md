# Global Design Direction

## North Star

The redesigned homepage should feel like a senior consultant's private surgical practice: calm, precise, evidence-led and easy to act on. The surgeon remains the protagonist. Robotic surgery is important, but it must read as a controlled capability inside clinical judgement, not as the brand.

## Preserved Elements

- Source Serif 4 and Manrope.
- Navy, ivory, teal and restrained bronze palette.
- Existing treatment routes, appointment validation, API payload, SEO safeguards and noindex rules.
- Click-to-load video behaviour.
- Medical-content safeguards and verified-only publication rules.

## Design Principles

1. Lead with identity: the first screen must show Prof. Hemant Sheth, a defensible positioning line, portrait, appointment action and trust evidence before secondary media.
2. Reflow structurally: components must change layout before content becomes cramped. The patient journey uses `4 + 3` on large desktop, smaller editorial grids on medium widths, and a connected mobile timeline.
3. Use evidence as design: verified facts may appear publicly; pending, blocked and retired facts are hidden unless an explicit staging flag is enabled.
4. Make forms consistent: label, control, help/error spacing and state treatment should come from shared primitives.
5. Keep clinical restraint: bronze is for fine rules and markers only; small body text must use accessible ink, muted text or teal.
6. Prefer image-optional layouts: missing approved clinical imagery is documented and omitted from production rather than replaced with stock, AI or grey placeholders.

## Section Decisions

- Hero: portrait and appointment panel become primary; the YouTube video becomes supporting media below the first hierarchy.
- Patient stories: hidden in production until verified quotations and consent exist.
- Research: replaced by a production-safe academic index pattern; unverified records do not render publicly.
- Locations: use selector/details only for verified locations. If none are verified, show a safe appointment-led location confirmation message.
- Robotic chapter: use a deep-ink educational composition with benefits, limits, suitability and alternatives.

## Open Content Blockers

- Canonical professional title and current NHS role.
- GMC and regulatory details.
- Current private practice locations, clinic times, telephone numbers and directions.
- Approved patient quotations.
- Verified publications and source links.
- Rights-cleared robotic, theatre, hospital and teaching imagery.
