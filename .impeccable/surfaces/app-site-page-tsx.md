---
version: 1
slug: "app-site-page-tsx"
primary_target: "app/(site)/page.tsx"
related_targets: ["app/(site)/side/page.tsx", "app/(site)/uses/page.tsx"]
---

# Surface brief: main screens (home, /side, /uses)

## Scope and mode

Home = Experience/Persuade (personal presence). /side and /uses = Read. /resume out of scope (PDF pipeline source).

## Audience, job, action

General visitors; the site's job is personal presence, not conversion (PRODUCT.md). Every screen must offer a way home with an active state and a visible contact line (pedro@filho.me) — confirmed by Pedro, 2026-09-03.

## Chosen direction: THE POSTER (Swiss International Typographic Style)

Locked by Pedro on 2026-09-03 from three minimalist mocks (`.impeccable/mocks/decision/poster*.html|png`). User-pinned "very minimalist" beat the roll (seed key f2323713, rounds 0–1 all declined).

- THESIS: the whole site is one typographic poster; hierarchy comes only from scale and grid position. Refuses the terminal/README dev-site default and the centered-avatar hero.
- OWN-WORLD: pure white ground, one black, no accent. One grotesk: **Host Grotesk** via next/font/google (variable, wght 300–800; chosen by Pedro 2026-09-03 from Archivo / Hanken / Schibsted / Host comparison), Helvetica Neue fallback, one weight for text, bold only for the greeting "gm" and the current nav item. Three sizes: monumental (~10vw), 14px text, 11px tracked uppercase captions. Asymmetric 12-column grid, 48px margins, no hairlines anywhere.
- STORY: visitor reads the greeting at poster scale, finds the two lines of bio in column 5–8, sees the portrait small and grayscale in the right column, and leaves with the email as the second-largest thing on the page.
- FIRST VIEWPORT (home): numbered index top-left (1 Pedro / 2 Side / 3 /uses / 4 Resume, current item bold); "gm, I'm Pedro." flush-left at ~10vw, line-height .92, tracking -.035em; body copy caption-size in cols 5–8; portrait ≤120px in cols 11–12; "WRITE ME / pedro@filho.me" bottom-left at ~48px.
- LISTS (/side, /uses): monumental page title, intro in cols 5–8, then ruled-by-grid rows: name bold / description / host or category in tracked caps. No ↗ glyph; the host name is the external signifier. /uses keeps dl semantics.
- MOBILE: 6-column grid, 20px margins, headline ~19vw, index stays top-left, portrait below body copy, email 26px.
- Scheme: light only.
- Copy verbatim. Location line confirmed by Pedro 2026-09-03: "usually on chain" (replaces the mock placeholder "Rio de Janeiro").

- FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Memorable moment

The scale jump: a 150px greeting on an otherwise near-empty white sheet.

## Unresolved

- Nav labels stay as-is ("Side", "/uses") per "keep voice verbatim".

## Status

Built 2026-09-03 (code-led). Finish review (fresh general agent running the degraded finish-reviewer procedure, since the harness has no registered impeccable-finish-reviewer) returned fix on 4 material findings, all scored resolved on recapture; disposition ship. Composition engages at lg (1024px), single stack below. /resume keeps its incumbent mono theme plus the pre-redesign bottom nav via app/resume/bottom-nav.tsx; PDF regenerated, pixel-identical page 1. Open for Pedro: "usually on chain" renders in tracked caps via text-caption; keep or set normal-case.
