# AGENTS.md

Guidance for AI coding agents working in `website`. `CLAUDE.md` is a symlink to this file.

## What this repo is

Pedro's personal site at [pedroapfilho.com](https://pedroapfilho.com): a single Next.js app, no monorepo, no database, no auth. It is the only repo on the fleet's `site` profile, so the orchestrator holds it to the universal standards (versions, lint, ci, root-scripts, gitignore, naming, import-extensions) and skips every monorepo-shaped check. `orchestrator verify --repo website` lists the applicable set.

## Layout

```
app/
  page.tsx        home
  side/           projects and libraries
  uses/           gear and tooling
  resume/         resume page + data.ts (the single source for both HTML and PDF)
scripts/
  generate-resume.ts   boots `next dev` on a free port, prints /resume to public/resume.pdf via puppeteer-core
```

## Dev workflow

`pnpm dev`, `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm format`, `pnpm test`. Pre-commit runs husky → lint-staged (oxlint + oxfmt), then regenerates `public/resume.pdf` when the commit touches the resume sources. CI runs build, test, lint, format, typecheck, fallow, and the resume-PDF freshness check.

Type-aware linting reads Next's generated route types, so `lint.yml` and `typecheck.yml` both run `pnpm build` first. Running `pnpm lint` locally against a stale `.next` gives false positives; build once after pulling.

`pnpm generate:resume` needs a local Chrome (`channel: "chrome"`), so it never runs in CI. The pre-commit hook calls it when a resume source is staged and `public/resume.pdf` is not, then stages the PDF into the same commit. Staging the PDF yourself skips it. It prints the resume from the working tree, not the index, so unstaged edits to those files land in the PDF.

`scripts/resume-sources.sh` owns the one definition of which paths change what the PDF renders. Both the pre-commit hook and `resume-pdf.yml` source it, the latter to fail a PR that edits those sources without committing a rebuilt PDF (which is what catches a `--no-verify` commit or a machine with no Chrome).

## Conventions

Fleet-wide rules live in the orchestrator's `standards.md`. Repo-specific notes:

- Build allowlist is `allowBuilds:` in `pnpm-workspace.yaml`, not `pnpm.onlyBuiltDependencies` in `package.json`; pnpm 11 only reads the former, and it works here even though this is not a workspace. That file lists `packages: ["."]` because Vercel installs with pnpm 9, which fails on a workspace file with an empty `packages`.
- Resume dates are typed `IsoMonth` in `app/resume/data.ts`. Only `start` is stored: `experience` is newest-first and contiguous, so each job's end date is read off the previous entry's `start` and the newest entry renders as "present". A career gap or two concurrent roles cannot be expressed without reintroducing an explicit `end`. The `MM/YYYY` label and the word "present" are both produced at render time, so `<time dateTime>` always gets a machine-readable value.
- Every off-site link goes through `ExternalLink` (`app/external-link.tsx`), which owns the `rel="noopener noreferrer" target="_blank"` pairing so a new link cannot ship without it.
- Fonts are imported aliased (`Host_Grotesk as hostGroteskFont`) so the loader call does not trip `new-cap`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
