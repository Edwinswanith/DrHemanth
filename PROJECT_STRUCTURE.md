# Project structure

This describes what each top-level area is for. Detailed rules live in
`.claude/rules/`; this file is the map, not the policy.

```
.
├── CLAUDE.md                 Permanent operating rules (read this first)
├── CLAUDE.local.example.md   Template for personal/local notes (gitignored copy)
├── TASKS.md                  Live status: phase gates, done/next work
├── PROJECT_STRUCTURE.md      This file
├── README.md                 Orientation + commands
├── .env.example              Every env var, with its approval status
├── .claude/
│   ├── settings.json          Shared Claude Code settings
│   ├── settings.local.example.json
│   ├── rules/                 Standing rules Claude must follow by domain
│   ├── skills/                Narrow, invokable workflows (SKILL.md + references/)
│   └── agents/                Specialised review agents (design, SEO, medical, a11y, security, perf)
├── docs/
│   ├── 00-project-brief.md … 15-launch-checklist.md   Numbered pipeline docs
│   ├── content-briefs/        Editorial briefs per major page/section
│   └── decisions/             Architecture Decision Records (ADR-000 template + ADR-001…)
├── scripts/                   check-links / check-redirects / check-metadata /
│                               check-structured-data / generate-content-report / check-repository
├── src/
│   ├── app/                   Next.js App Router routes (only what's approved to exist — see Phase C/E scoping)
│   ├── components/            layout/ ui/ sections/ appointment/ medical/ seo/ consent
│   ├── features/appointments/ Schema, service, repository, notification, rate-limit, analytics
│   ├── content/                Typed file-based content (site, surgeon, nav, treatments, locations, faqs, testimonials, publications, legal)
│   ├── lib/                    analytics/ consent/ email/ security/ seo/ structured-data/ validation/ logging/ content/ utils
│   ├── styles/                 tokens.css, typography.css, utilities.css, globals.css
│   └── types/                  content.ts, medical.ts, seo.ts
├── tests/
│   └── unit/ integration/ accessibility/ seo/ visual/ e2e/
└── public/                     Static assets (only real, approved imagery — see .claude/rules/medical-content.md)
```

## Why file-based content, not a hosted CMS

Decided with the client: content is typed JSON/MDX in `src/content/`,
validated by Zod schemas, edited via normal code review. This keeps every
byte of practice content inside the same UK-hostable repository/build
pipeline, avoids standing up and securing a second service, and is fully
git-history-auditable. See `docs/decisions/ADR-002-content-architecture.md`.

## Why routes are scoped by phase

`src/app/` does not contain a folder for every page in the information
architecture on day one. Only routes with genuinely reviewable content ship
(see Phase C/E in `docs/decisions/`); everything else stays documented in
`docs/02-information-architecture.md` until its content clears verification,
so the live site never exposes a thin placeholder page to a patient or a
search engine.
