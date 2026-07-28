# AGENTS.md

Guidance for AI coding agents working in `website`. `CLAUDE.md` is a symlink to this file.

## What this repo is

Pedro's personal site at [pedroapfilho.com](https://pedroapfilho.com): a single Next.js app, no monorepo, no database, no auth. It is the only repo on the fleet's `site` profile, so the orchestrator holds it to the universal standards (versions, lint, ci, root-scripts, gitignore, naming, import-extensions) and skips every monorepo-shaped verifier.

## Layout

```
app/
  page.tsx        home
  oss/            open source list
  uses/           gear and tooling
  resume/         resume page + data.ts (the single source for both HTML and PDF)
scripts/
  generate-resume.ts   boots `next dev` on a free port, prints /resume to public/resume.pdf via puppeteer-core
```

## Dev workflow

`pnpm dev`, `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm format`. Pre-commit runs husky → lint-staged (oxlint + oxfmt). CI runs lint, format, typecheck, build, and fallow.

Type-aware linting reads Next's generated route types, so `lint.yml` and `typecheck.yml` both run `pnpm build` first. Running `pnpm lint` locally against a stale `.next` gives false positives; build once after pulling.

`pnpm generate:resume` needs a local Chrome (`channel: "chrome"`); it is a manual step, not part of CI.

## Conventions

Fleet-wide rules live in the orchestrator's `standards.md`. Repo-specific notes:

- Build allowlist is `allowBuilds:` in `pnpm-workspace.yaml`, not `pnpm.onlyBuiltDependencies` in `package.json`; pnpm 11 only reads the former, and it works here even though this is not a workspace. That file lists `packages: ["."]` because Vercel installs with pnpm 9, which fails on a workspace file with an empty `packages`.
- Resume dates are `MM/YYYY` strings parsed into `<time dateTime>` ISO months; keep the format stable or `toIsoMonth` silently drops the machine-readable date.
- Fonts are imported aliased (`IBM_Plex_Mono as ibmPlexMonoFont`) so the loader call does not trip `new-cap`.
