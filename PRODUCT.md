# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

General visitors — peers, curious professionals, people who found Pedro through work or social links. Confirmed: the site's primary job is **personal presence** — a home on the web with no conversion goal. Success is that it feels like Pedro. Recruiters, founders, and the dev community visit, but none was confirmed as a primary audience to design for.

## Product Purpose

Pedro Filho's personal website at pedroapfilho.com: introduce Pedro (home), show side projects and libraries (/side), document gear and tooling (/uses), and serve the resume (/resume, which is also the source of the committed resume PDF). No database, no auth, no analytics-driven goals.

## Positioning

**Undecided.** The user was asked what a visitor should believe about Pedro after 30 seconds and left it open. Repository evidence (hypothesis only, not confirmed positioning): product engineer with significant crypto/web3 experience (pump.fun, Kraken, Blockchain.com per resume data); self-deprecating casual voice ("I like to write code sometimes"); ships side projects and OSS libraries.

## Operating Context

Single Next.js app (App Router, Tailwind v4 CSS-first). The /resume screen is the single source for `public/resume.pdf` via a puppeteer print pipeline — resume changes trigger PDF regeneration and are out of scope for visual redesign work unless explicitly requested. Every off-site link must go through `app/external-link.tsx`.

## Capabilities and Constraints

- Static content pages only; content lives in per-route `data.ts` files (side, uses, resume).
- Fully responsive; currently no dark mode.
- Redesigns preserve all factual content (bio copy, project lists, gear lists, links) unless the user approves copy changes.

## Brand Commitments

**None confirmed.** The user was asked which incumbent traits are binding (the "gm" crypto voice, the profile photo, the monospace identity) and left the question unanswered. Treat all incumbent visual and tonal traits as evidence, not authority; existing copy is content and stays factually intact, but no visual trait is pinned. Ask before replacing factual copy.

## Evidence on Hand

- Real profile photo: `app/(site)/profile.jpg` (used on home at 128×128).
- Real project/library list with URLs: `app/(site)/side/data.ts`.
- Real gear/tooling list with URLs: `app/(site)/uses/data.ts`.
- Real resume data: `app/resume/data.ts` (7 jobs, education, languages, contacts).
- No testimonials, metrics dashboards, client logos, or case studies exist — do not fabricate any.

## Product Principles

1. Presence over persuasion: the site's job is to feel authentically like Pedro, not to convert.
2. Content is truth: lists, links, dates, and bio facts are real and stay real; design dramatizes them, never invents.
3. Low ceremony: no database, no auth, minimal dependencies; design work should respect the single-app simplicity.
4. The resume pipeline is load-bearing: never let visual work silently break the PDF source.
