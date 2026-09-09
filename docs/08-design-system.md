# 08 - Design System

Full enforceable rules remain in `.claude/rules/design-system.md`. This document records the current visual direction and implementation choices.

## Direction

The active concept is **Clinical Editorial Precision**: academic surgical authority, private-consultation warmth, patient-information clarity and restrained minimally invasive precision. The old site is a content and SEO source only. The interface must not read as a generic healthcare template, SaaS landing page, luxury hotel, cosmetic clinic or futuristic robotics company.

## Colour

Tokens are defined in `src/styles/tokens.css`.

- Ink/navy: `#081C23`, `#102A33`, `#183B44` for authority and dark sections.
- Teal: `#286865`, `#347875`, `#DCEAE7`, `#EEF5F3` for primary actions and calm support surfaces.
- Ivory/stone: `#F7F4EE`, `#EAE5DD`, `#D8D1C7` for the dominant page base.
- Bronze: `#A47A4D`, `#D8C3A7` for editorial rules and small details only, not primary CTAs.
- Status: success `#28614D`, warning `#846224`, error `#A33F3F`.

Target allocation: 55% ivory/white, 25% ink, 15% teal and 5% bronze/status colour. No purple, bright blue, neon accents, decorative gradients or hardcoded component colours.

## Typography

`src/app/layout.tsx` loads Source Serif 4 for display text and Manrope for body, navigation, forms and UI through `next/font/google`. Scale tokens follow the client brief: hero name up to `4.75rem`, homepage H2 up to `3.5rem`, H3 up to `1.75rem`, lead body up to `1.25rem`. Body copy targets 58-70ch, 1.55-1.7 line height and no centred long paragraphs.

## Layout And Motion

The site uses a max width around 1280px, 12-column desktop grids, 8-point spacing, asymmetric editorial layouts and section spacing of 56-128px depending on viewport. Radius tokens are 4px, 10px and 16px. Shadows are limited to appointment interfaces, drawers and functional overlays.

Motion is limited to opacity and 8-16px translate transitions at 160-240ms. `RevealOnScroll`, hero stagger and accordion expansion respect reduced motion and keep content understandable without animation.

## Homepage Composition

The homepage preserves 15 semantic modules but groups them into fewer visual compositions: restrained header, 5/3/4 hero, evidence ledger, editorial profile, dark robotic education, neutral comparison, treatment selector, why/journey/locations, stories/research/FAQ, final appointment close and footer. Avoid repeating identical cards, generic icon rows, fake counters, review stars or unsupported claims.

## Imagery

Use only approved portraits, hospital imagery, robotic-system/theatre imagery or clinically reviewed diagrams. Development image slots are labelled and tracked in `docs/image-requirements.md`; they are not final photography.
