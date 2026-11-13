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
  generate-resume.ts   serves the production build in-process on an ephemeral port, prints /resume to public/resume.pdf with Playwright
```

## Dev workflow

`pnpm dev`, `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm format`. Pre-commit runs husky → `pnpm typegen`, then lint-staged (oxlint + oxfmt). CI runs build, lint, format, typecheck, fallow, the Playwright suite (`tests/e2e`, `pnpm test:e2e`), and the resume-PDF freshness check.

Type-aware linting and `tsc` read the types Next generates (`next-env.d.ts` and `.next/types`). `pnpm typegen` writes them in about a second, and `pnpm lint`, `pnpm typecheck` and the pre-commit hook all run it first, so none of them depends on a build having happened. `lint.yml` and `typecheck.yml` still run `pnpm build` first, as the fleet's workflows do.

`public/resume.pdf` is committed, and nothing regenerates it for you: after a change to what the resume renders, run `pnpm generate:resume` and commit the PDF with it. `resume-pdf.yml` fails a PR that edits a path in its `resume_sources_pattern` without a rebuilt PDF, and that pattern is the one definition of which paths change what the PDF renders.

`pnpm generate:resume` builds the site and prints `/resume` from that production build, so the PDF is what production renders, and it runs while `pnpm dev` is up. It drives the local Google Chrome (`channel: "chrome"`), so it never runs in CI: Playwright's bundled Chromium sets three headings 0.1pt lower. The page size is A4 in millimetres because Playwright's `A4` preset is 11.7in tall, which prints a page a third of a millimetre taller than the committed PDF. Next's server logs an unhandled rejection and leaves the exit code at 0, so the script sets a failing exit code itself.

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

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Design-system linting

Run `pnpm lint` after changes and fix every error. `oxlint.config.ts` registers `@shadcn/lint` and enforces all six rules as errors: component contracts, known Tailwind classes, static component class names, semantic colors, theme or scale values, and class-based styling. Use CSS custom properties for runtime geometry and named theme tokens for custom values. Use component variants for appearance and layout classes at call sites. All six rules also apply inside primitive directories. Shared styles belong to component variants or the owning stylesheet. Keep theme discovery local to each app. Exact class-merging fixture allowances apply only to the named test files.
