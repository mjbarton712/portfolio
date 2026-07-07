# Portfolio — a living, auto-synced showcase

An animated portfolio that pulls **everything you've built** straight from your
GitHub account (`mjbarton712`) and keeps itself in sync. Features a scrubbable
build **timeline** ("what I started" vs "what I kept building" per year),
animated stats, and a filterable project grid.

## How it works

```
GitHub API ──(scripts/sync.mjs)──▶ src/data/portfolio.json ──▶ Next.js static site ──▶ GitHub Pages
```

- **`scripts/sync.mjs`** — reads every repo (public + private) via the GitHub
  GraphQL API, including each repo's own commit history (reliable even when
  commits use a different email). Writes `src/data/portfolio.json` and diffs
  against the previous file to compute a "since last sync" changelog.
- **`scripts/portfolio.config.json`** — your curation layer:
  - `hidden` — repos to drop entirely (use for confidential/client work).
  - `featured` — repos to float to the top with a ★ badge.
  - `overrides` — per-repo `emoji`, `tagline`, or `description`.
- The site is a **static export** (`output: "export"`), so it hosts anywhere.

## Sync — manual & automatic

`.github/workflows/sync-and-deploy.yml` runs the sync + redeploys:

- **Automatic:** daily at 07:00 UTC (`schedule` cron).
- **Manual "sync now":** GitHub → **Actions** tab → *Sync & Deploy Portfolio*
  → **Run workflow**. (A literal in-site button would need a serverless proxy,
  since a public static page can't safely hold a token — this is the secure
  equivalent.)
- Also redeploys on every push to `main`.

## Local development

```bash
npm install
npm run sync     # refresh data from GitHub (uses `gh auth token`)
npm run dev      # http://localhost:3000
npm run build    # static export → ./out
```

## First-time deploy (GitHub Pages)

1. Create a repo (e.g. `portfolio`) and push this folder to it.
2. **Settings → Secrets → Actions →** add `GH_SYNC_TOKEN`: a
   [fine-grained PAT](https://github.com/settings/tokens) with **read access to
   your repositories** (needed to include *private* repos). Without it the sync
   still runs but only sees public repos.
3. **Settings → Pages →** Source = **GitHub Actions**.
4. Push, or run the workflow manually. Site publishes at
   `https://mjbarton712.github.io/<repo>/`.

> ⚠️ **Privacy:** the generated `portfolio.json` is committed and served
> publicly, so private repo **names, descriptions, and topics become public**.
> Add any client/confidential repos to `hidden` in `portfolio.config.json`.
