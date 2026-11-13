---
title: 'resume-pdf freshness check demands a rebuilt PDF for edits that cannot change the print'
severity: 'minor'
issue: 'pedroapfilho/website#111'
---

### Expected Behavior

A change that cannot alter what `/resume` prints should not need a new `public/resume.pdf`.

### Current Behavior

`resume-pdf.yml` decides freshness from a list of paths (`resume_sources_pattern`) and commit order, because Chrome stamps a date into the PDF and the bytes never match. Any edit under a listed path fails the PR until a regenerated PDF is committed, even when the print cannot change. Removing `suppressHydrationWarning` from `app/layout.tsx` (an attribute React never serializes) needed a new PDF that differs from the old one in 4 of 208,859 bytes, all in the date stamp. The same list misses real causes: a Tailwind, Next or font bump in `package.json` can change the print and passes.

### Possible Solution

Compare what the PDF shows instead of which paths moved: have CI print `/resume` with Playwright and compare text, link annotations and the tag tree with the committed file, which also needs Playwright's bundled Chromium to match local Chrome (today three headings sit 0.1pt lower). Or drop the committed PDF and let "download as PDF" open the print dialog, since the page already has a print layout.

### Minimal Reproducible Example

Delete `suppressHydrationWarning` in `app/layout.tsx`, open a PR without touching `public/resume.pdf`: the `freshness` job fails. Run `pnpm generate:resume`, then `cmp -l` the old and new PDF: only the date bytes differ.

### Context

Hit twice in one refactor pass (the generator rewrite and this attribute), and it would hit again on any edit to `lib/contact.ts` or `app/globals.css`. Each time costs a local Chrome run and a binary diff in the PR.
