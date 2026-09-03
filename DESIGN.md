---
name: pedroapfilho.com
description: One typographic poster in Host Grotesk, black on white; hierarchy comes from scale and grid position alone.
colors:
  paper: "#ffffff"
  ink: "#000000"
typography:
  display:
    fontFamily: "Host Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "8rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.025em"
  contact:
    fontFamily: "Host Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Host Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: "1.5rem"
    letterSpacing: "normal"
  body-strong:
    fontFamily: "Host Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: "1.5rem"
    letterSpacing: "normal"
  label:
    fontFamily: "Host Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: "1.5rem"
    letterSpacing: "0.1em"
rounded:
  none: "0px"
spacing:
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
  "10": "40px"
  "12": "48px"
  "16": "64px"
  "20": "80px"
  "24": "96px"
components:
  page-shell:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "24px 20px 32px"
  page-shell-sm:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "40px 48px 40px"
  index-link:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  index-link-current:
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
  section-label:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  list-row:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "6px 0"
  list-row-name:
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
  list-row-host:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  contact-home:
    textColor: "{colors.ink}"
    typography: "{typography.contact}"
  contact-inline:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  portrait:
    rounded: "{rounded.none}"
    size: "120px"
---

# Design System: pedroapfilho.com

## Overview

**Creative North Star: "The Poster"**

The whole site is one sheet of paper in the Swiss International Typographic Style. There is no chrome, no card, no rule, no accent: a single grotesk set in three sizes on a white ground, and a 12-column grid that decides where each thing lands. Hierarchy is carried by scale and position only. The greeting ("gm, I'm Pedro.") is set at monumental size against a near-empty sheet, and the scale jump from that line to the 14px bio is the memorable moment; everything else on the page is deliberately quiet so that jump reads.

Density is low and asymmetric. The index sits top-left, the headline runs flush-left across the sheet, the intro copy is pushed to columns 5 through 8, the portrait is small and grayscale in the last two columns, and the email is the second-largest thing on the home page, anchored bottom-left. On the list pages (/side, /uses) the same grid becomes a ruler: rows are separated by column alignment and six pixels of padding, never by a line. The world refuses the terminal/README dev-site default and the centered-avatar hero.

Scope note: the world covers the `(site)` route group (home, /side, /uses). The /resume route is a scoped legacy surface that deliberately keeps the incumbent monospace theme (IBM Plex Mono, #1a1a1a on white, hairline section rules, opacity-ramped grays, a rounded bottom nav) because it is the print source for `public/resume.pdf`. Do not extend that treatment to new surfaces, and do not restyle the resume without a decision about the PDF pipeline.

**Key Characteristics:**

- Paper white and one black; no accent, no gray ramp; even the photograph is grayscale.
- One typeface (Host Grotesk) in three sizes: monumental, 14px text, 11px tracked uppercase.
- Bold in exactly three places: the greeting "gm", the current index item, and list row names.
- Asymmetric 12-column grid at 1024px and up; six columns below; 48px page margins on the sheet, 20px on phones.
- No hairlines, borders, shadows, radii, icons, or glyphs anywhere in the world.
- One interaction: an underline that draws in from the left on hover or focus.

## Colors

Two inks and nothing else: the palette is the paper and the print.

### Primary

- **Ink** (#000000): all text, the focus outline, and the underline that draws in on hover. There is no lighter tint of ink; secondary information is demoted by size and tracking (the 11px caption), never by opacity.

### Neutral

- **Paper** (#ffffff): the ground of every Poster surface. Nothing sits on top of the paper except ink and the one grayscale photograph; there are no surface containers, panels, or fills.

### Named Rules

**The Two-Ink Rule.** Every Poster surface is #000000 on #ffffff. No accent, no gray, no opacity ramp. If something needs to read as secondary, set it in the caption size, not in a lighter color.

**The Grayscale Portrait Rule.** Photography is desaturated (`filter: grayscale(100%)`) so an image never introduces a third color to the sheet.

## Typography

**Display Font:** Host Grotesk (variable, loaded via next/font/google as `--font-host`; falls back to Helvetica Neue, Helvetica, Arial, sans-serif)
**Body Font:** Host Grotesk (same family, same fallback)
**Label/Mono Font:** none in the Poster world. IBM Plex Mono is loaded as `--font-mono` for the root body default and the legacy /resume route only.

**Character:** A single neutral grotesk carrying the whole voice. The monumental size is tight and dense (negative tracking, line-height under 1); the text size is plain and unremarkable on purpose; the caption size is small, wide-tracked, and uppercase so it reads as metadata rather than prose. Emphasis inside body copy is italic (`<i>`), never bold.

### Hierarchy

- **Display** (400, Tailwind `text-7xl` / `sm:text-8xl` / `lg:text-9xl`, so 4.5rem, 6rem, 8rem by breakpoint; `leading-none`; `tracking-tight`): the page title on every Poster surface ("gm, I'm Pedro.", "Side", "/uses"). Flush-left, spans the full grid, `text-wrap: balance` on the home greeting. The word "gm" is the only bold display text (700).
- **Contact** (400, `text-3xl` / `lg:text-5xl`, so 1.875rem and 3rem; `leading-none`; `tracking-tight`): the email address on the home footer only, where it must be the second-largest thing on the sheet. Its draw-in underline scales with the type, so it reads heavier here. Not a general-purpose headline size.
- **Body** (400, 0.875rem / 1.5rem): index items, bio copy, list-page intros (`max-w-md`), row descriptions, and item names. Paragraphs in a stack sit 12px apart.
- **Body Strong** (700, 0.875rem / 1.5rem): the current index item, project and library names on /side, and the category terms (`<dt>`) on /uses.
- **Label** (400, 0.75rem / 1.5rem, tracking 0.1em, uppercase): section headings ("Projects", "Libraries", hardware/software groups), link hosts ("localveil.com"), and the footer's elsewhere links. This is the `text-xs leading-6 tracking-widest uppercase` utility in `app/globals.css`. On the inner pages the footer email uses this size but stays in normal case so the address remains a readable address.

### Named Rules

**The Three Sizes Rule.** Monumental, text, caption. Every new element must be one of these three; the home-footer contact size is the single sanctioned exception, and it belongs only to the email.

**The Three Bolds Rule.** Weight 700 appears only on "gm", the current index item, and list row names. Nothing else is bold; emphasis inside prose is italic.

**The Caption Is the Signifier Rule.** An external link is signified by its host name set in tracked caps in the row's last columns. No arrow glyph, no icon, no "opens in new tab" in the visible text; that phrase lives in `sr-only` for screen readers.

## Layout

The sheet is the viewport. The `(site)` shell paints paper edge to edge and pads it 20px left and right (24px top, 32px bottom) on phones; from 640px (`sm`) the margins become 48px on the sides, 40px top and bottom. Inside that margin, every page and the footer share one grid: six columns with 16px gutters below 1024px, twelve columns with 24px gutters at `lg` (1024px) and up. The index nav sits above the grid at the top-left corner and never moves.

Placement at `lg` is asymmetric and fixed:

- Page title: full span, flush-left, 96px below the index (64px on phones).
- Intro copy and bio: columns 5 to 8, 64px below the title (40px on phones), `max-w-md` (28rem) on the list pages.
- Portrait (home): columns 11 to 12, right-aligned, top nudged 69px so it sits level with the bio.
- List rows (/side): name in columns 1 to 3, description in 4 to 9, host in 10 to 12. On /uses the term takes columns 1 to 3 and each item splits the remaining nine as six for the name and three for the host.
- Footer: 64px above it; email in columns 1 to 8 on home (1 to 4 on inner pages), the "elsewhere" block right-aligned in columns 9 to 12.

Below `lg` everything collapses to a single column in source order: index, title, copy, portrait (below the copy), lists, then the footer with the email above the elsewhere block. List rows stack their three parts and are spaced 20px apart; at `lg` the row spacing drops to 6px of vertical padding and the columns do the separating.

Vertical rhythm uses Tailwind's numeric steps as recorded in the frontmatter `spacing` scale: 12px between paragraphs, 16px under a section label, 20px between stacked rows and between elsewhere links, 24px between footer rows, 32px above the phone portrait, 40/64px above intros, 64/80px above sections, 64/96px above titles.

### Named Rules

**The Grid Is the Ruler Rule.** Rows and sections are separated by column alignment and whitespace only. If two things need dividing, give them grid position or a spacing step, never a line.

**The Column 5 Rule.** Running copy at `lg` starts in column 5. The empty first four columns to the left of the intro are the composition; do not fill them.

## Elevation & Depth

The Poster is completely flat. There are no shadows, no tonal layering, no overlays, no blurs, and no surface containers; the only thing that ever sits above the paper is ink. Depth is not conveyed at all, and that is the point: one sheet, one plane. Interactive state is expressed by the draw-in underline, not by lift.

### Named Rules

**The One Plane Rule.** No `box-shadow`, no `backdrop-filter`, no background fills behind text. A new surface that needs containment gets a grid position, not a card.

## Shapes

Everything is square. There is no radius anywhere in the world (`0px`): the portrait is a hard-edged 120px square, the focus outline is a square 2px ink line offset 4px from its target, and the draw-in underline is a flat 1px (2px on the home email) bar sitting 0.06em under the text. No borders, no outlines at rest, no clipping, no pills or chips. The recurring silhouette is the flush-left block of text on an open field.

## Components

### Index Nav

- **Character:** a numbered table of contents, top-left, the same on every page. A visitor is never without a way home.
- **Style:** ordered list in Body (14px / 24px); each row is a tabular numeral in a fixed 12px gutter, an 8px gap, then the link. Items read `1 Pedro`, `2 Side`, `3 /uses`, `4 Resume`.
- **Default / Hover / Active:** ink text, no underline at rest; hover or focus draws the 1px underline in from the left; the current page's row is Body Strong (700) and carries `aria-current="page"`. Focus-visible adds the 2px ink outline offset 4px.
- **Mobile:** unchanged; it stays top-left at the 20px margin.

### Draw-In Link

- **Character:** the site's one authored interaction (`link-draw` utility).
- **Style:** an ink-colored underline rendered as a background gradient at 0% width, anchored bottom-left, growing to 100% on `:hover` and `:focus-visible`, or when a parent `.group` row is hovered or focused. Weight defaults to 1px and is set per element with `(removed)` (2px on the home email).
- **Motion:** `background-size 150ms (Tailwind's default transition duration) the theme's `--ease-out` curve`; disabled under `prefers-reduced-motion: reduce`.
- **Focus:** paired with a 2px ink outline offset 4px on every focusable link.

### List Row (/side, /uses)

- **Character:** the whole row is one external link; the grid rules it, nothing else does.
- **Style:** Body text on a 12-column subgrid at `lg` (`6px 0` padding); name in Body Strong (700) on /side, in Body on /uses (where the bold belongs to the category term); description in Body; host name in Label (tracked caps) via `hostOf()`, which strips `www.`.
- **Hover / Focus:** the row is a `.group`, so hovering anywhere on it draws the underline under the name only. Focus-visible outlines the whole row.
- **Mobile:** stacks name, description, host; rows 20px apart.
- **Semantics:** /side is a `<ul>` of links; /uses is a `<dl>` with the category as `<dt>` and the item list as `<dd>`.

### Section Label

- **Style:** an `<h2>` in Label (11px tracked uppercase) with 16px below it, 64px above the section (80px from `sm`). Used for "Projects", "Libraries", and the hardware/software groups on /uses.

### Contact Line (footer)

- **Character:** the email is the destination of the page.
- **Home:** `mailto:` link in Contact size (`text-3xl lg:text-5xl`, `tracking-tight`), columns 1 to 8, draw-in underline that scales with the text.
- **Inner pages:** the same link in Label size but normal case, columns 1 to 4.
- **Elsewhere block:** right-aligned in columns 9 to 12, Label size: the line "usually on chain" above a 20px-gapped row of GitHub, X, YouTube, each an `ExternalLink` with the draw-in underline and an `sr-only` "(opens in new tab)".

### Portrait

- **Style:** the real profile photo at 120px square, `filter: grayscale(100%)`, square corners, `priority` and blur placeholder, right-aligned in columns 11 to 12 at `lg`; below the bio on phones.

### External Link

- **Rule:** every off-site anchor renders through `ExternalLink` (`app/external-link.tsx`), which owns `rel="noopener noreferrer" target="_blank"`. It carries no styling of its own; the caller supplies the draw-in and focus classes.

## Do's and Don'ts

### Do:

- **Do** set every Poster surface in Host Grotesk on paper white with #000000 ink; the `(site)` shell applies `font-sans`, `bg-paper`, `text-ink`.
- **Do** place a new page's title full-span at Display size and its intro in columns 5 to 8 at `lg`, 40/64px below.
- **Do** use `text-xs leading-6 tracking-widest uppercase` (11px, 0.1em, uppercase) for section labels, link hosts, and footer meta.
- **Do** make a whole list row the link, mark it `.group`, and put `link-draw` on the name only.
- **Do** pair `link-draw` with `outline-ink focus-visible:outline-2 focus-visible:outline-offset-4` on every focusable element.
- **Do** route every off-site link through `ExternalLink` and add `<span class="sr-only"> (opens in new tab)</span>`.
- **Do** keep the numbered index top-left on every page with the current item bold and `aria-current="page"`.
- **Do** desaturate any photograph to grayscale before it touches the sheet.

### Don't:

- **Don't** add a hairline, border, divider, `<hr>`, or ruled row; the grid and whitespace are the only separators.
- **Don't** introduce an accent color, a gray text tint, or an opacity ramp; demote with the caption size instead.
- **Don't** use bold outside "gm", the current index item, and list row names; emphasize prose with italic.
- **Don't** add a fourth type size. The home-email Contact size belongs to the email alone.
- **Don't** use shadows, radii, background fills, cards, chips, or pills.
- **Don't** add arrow glyphs (↗), icons, or illustrations; the host name in tracked caps is the external signifier.
- **Don't** add a second hover or focus treatment; the draw-in underline plus the ink outline is the whole interaction vocabulary.
- **Don't** carry the /resume monospace theme (IBM Plex Mono, #1a1a1a, hairlines, opacity grays, rounded nav) into any Poster surface.
