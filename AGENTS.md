# AGENTS.md

Guidance for AI coding agents working in `website`. `CLAUDE.md` is a symlink to this file.

## Friction Log

- Log papercuts and friction (tooling, docs, APIs, tests, conventions) as you hit them with `npx frog log`.
- Do not add global, system, or internal friction.
- Run `npx frog list` first to see what is already known.

Entries live in `.agents/friction-log/`, one directory each. A GitHub Action reports them as issues and deletes the entry once the issue closes, so anything still in that directory is still outstanding.

## Standards

This repo follows the fleet's shared standards, checked by `standy` (`~/dev/standy`).

- Before editing, run `standy standards --for <paths>` for the rules that apply to the files you will touch.
- Before finishing, run `standy check --changed --fix-hints` and fix what fails. It only sees tracked files, so run `git add -N` on new files first.
- When a failure is unclear, `standy explain <rule>` prints what the rule asserts, why, and how to fix it.

## What this repo is

Pedro's personal site at [pedroapfilho.com](https://pedroapfilho.com): a single Next.js app, no monorepo, no database, no auth. It is the only repo on the fleet's `site` profile, so standy holds it to the universal standards (versions, lint, ci, root-scripts, gitignore, naming, import-extensions) and skips every monorepo-shaped check. `standy verify --repo website` lists the applicable set.

## Layout

```
app/
  (site)/         the Poster pages: home, side/, uses/, and poster.tsx (PageTitle, PageIntro, PageSection, HostCaption)
  resume/         resume page + data.ts (the single source for both HTML and PDF)
lib/
  site.ts         origin and the page list (nav and sitemap)
  contact.ts      email, GitHub and X, shared by the footer, the resume and the metadata
scripts/
  generate-resume.ts   runs Next in-process on an ephemeral port, prints /resume to public/resume.pdf via puppeteer-core
```

## Dev workflow

`pnpm dev`, `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm format`. Pre-commit runs husky → lint-staged (oxlint + oxfmt), then regenerates `public/resume.pdf` when the commit touches the resume sources. CI runs build, lint, format, typecheck, fallow, the Playwright suite (`tests/e2e`, `pnpm test:e2e`), and the resume-PDF freshness check.

Type-aware linting reads Next's generated route types, so `lint.yml` and `typecheck.yml` both run `pnpm build` first. Running `pnpm lint` locally against a stale `.next` gives false positives; build once after pulling.

`pnpm generate:resume` needs a local Chrome (`channel: "chrome"`), so it never runs in CI. It starts a Next dev server inside its own process, so the server dies with it, and Next's `.next/dev/lock` allows one dev server per checkout: it fails at once with "Another next dev server is already running" while `pnpm dev` or another generation is up. The pre-commit hook calls it when a resume source is staged and `public/resume.pdf` is not, then stages the PDF into the same commit. Staging the PDF yourself skips it. It prints the resume from the working tree, not the index, so unstaged edits to those files land in the PDF.

`scripts/resume-sources.sh` owns the one definition of which paths change what the PDF renders. Both the pre-commit hook and `resume-pdf.yml` source it, the latter to fail a PR that edits those sources without committing a rebuilt PDF (which is what catches a `--no-verify` commit or a machine with no Chrome).

## Conventions

Fleet-wide rules live in standy's `standards.md`. Repo-specific notes:

- Build allowlist is `allowBuilds:` in `pnpm-workspace.yaml`, not `pnpm.onlyBuiltDependencies` in `package.json`; pnpm 11 only reads the former, and it works here even though this is not a workspace. That file lists `packages: ["."]` because Vercel installs with pnpm 9, which fails on a workspace file with an empty `packages`.
- Resume dates are typed `IsoMonth` in `app/resume/data.ts`. Only `start` is stored: `experience` is newest-first and contiguous, so each job's end date is read off the previous entry's `start` and the newest entry renders as "present". A career gap or two concurrent roles cannot be expressed without reintroducing an explicit `end`. The `MM/YYYY` label and the word "present" are both produced at render time, so `<time dateTime>` always gets a machine-readable value.
- Every link that opens a new tab goes through `ExternalLink` (`app/external-link.tsx`), which owns the `rel="noopener noreferrer" target="_blank"` pairing and the screen-reader "(opens in new tab)" so a new link cannot ship without them.
- The focus ring is one `:focus-visible` rule in the base layer of `app/globals.css`. Elements only opt out (`outline-none` on headings focused by script); none set their own ring.
- The grid gutter is one token, `--gutter` (`gap-x-gutter`), so nested grids line up with the page grid.
- `app/global-error.tsx` replaces the root layout, so it imports `globals.css` itself. It cannot call the font loader (on Next 16.3 Turbopack, a `next/font` call in a client component fails the build with "Font loader calls must be assigned to a const"), so `--font-sans` falls back to the `Host Grotesk` face the root layout already loaded.
- Fonts are imported aliased (`Host_Grotesk as hostGroteskFont`) so the loader call does not trip `new-cap`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Design-system linting

Run `pnpm lint` after changes and fix every error. `oxlint.config.ts` registers `@shadcn/lint` and enforces all six rules as errors: component contracts, known Tailwind classes, static component class names, semantic colors, theme or scale values, and class-based styling. Use CSS custom properties for runtime geometry and named theme tokens for custom values. Use component variants for appearance and layout classes at call sites. All six rules also apply inside primitive directories. Shared styles belong to component variants or the owning stylesheet. Keep theme discovery local to each app. Exact class-merging fixture allowances apply only to the named test files.
