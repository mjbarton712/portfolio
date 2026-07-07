#!/usr/bin/env node
// Portfolio sync: pulls repo + commit-activity data for a GitHub user and
// writes src/data/portfolio.json. Reliable regardless of commit email because
// it reads each repo's own commit history rather than the contribution calendar.
//
// Auth: uses GH_SYNC_TOKEN or GITHUB_TOKEN env, else falls back to `gh auth token`.
// A token with `repo` scope is required to include PRIVATE repos.
//
// Usage: node scripts/sync.mjs [--login <user>]

import { execSync } from "node:child_process";
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "src", "data", "portfolio.json");
const CONFIG_PATH = join(__dirname, "portfolio.config.json");

const config = existsSync(CONFIG_PATH)
  ? JSON.parse(readFileSync(CONFIG_PATH, "utf8"))
  : { hidden: [], featured: [], overrides: {} };
const HIDDEN = new Set(config.hidden || []);
const FEATURED = new Set(config.featured || []);
const OVERRIDES = config.overrides || {};

const args = process.argv.slice(2);
const LOGIN =
  args[args.indexOf("--login") + 1] && args.includes("--login")
    ? args[args.indexOf("--login") + 1]
    : "mjbarton712";

// Repos that are forks of other people's work — never showcase these as "mine".
const EXCLUDE = new Set(["spring-petclinic", "snyk-test", "shadcn-vite-template"]);

function getToken() {
  const t = process.env.GH_SYNC_TOKEN || process.env.GITHUB_TOKEN;
  if (t) return t;
  try {
    return execSync("gh auth token", { encoding: "utf8" }).trim();
  } catch {
    throw new Error("No token: set GH_SYNC_TOKEN or run `gh auth login`.");
  }
}

const TOKEN = getToken();

async function gql(query, variables = {}) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  const json = await res.json();
  if (json.errors) throw new Error(`GraphQL: ${JSON.stringify(json.errors)}`);
  return json.data;
}

const REPO_QUERY = `
query($login: String!, $cursor: String) {
  user(login: $login) {
    name
    avatarUrl
    bio
    repositories(first: 30, after: $cursor, ownerAffiliations: OWNER,
                 orderBy: {field: PUSHED_AT, direction: DESC}) {
      pageInfo { hasNextPage endCursor }
      nodes {
        name
        description
        url
        homepageUrl
        isPrivate
        isFork
        isArchived
        stargazerCount
        forkCount
        diskUsage
        createdAt
        pushedAt
        updatedAt
        primaryLanguage { name color }
        languages(first: 8, orderBy: {field: SIZE, direction: DESC}) {
          totalSize
          edges { size node { name color } }
        }
        repositoryTopics(first: 12) { nodes { topic { name } } }
        defaultBranchRef {
          target {
            ... on Commit {
              history(first: 100) { totalCount nodes { committedDate } }
            }
          }
        }
      }
    }
  }
}`;

function monthKey(iso) {
  return iso.slice(0, 7); // YYYY-MM
}

async function main() {
  console.log(`Syncing github.com/${LOGIN} …`);
  let cursor = null;
  let user = null;
  const raw = [];
  do {
    const data = await gql(REPO_QUERY, { login: LOGIN, cursor });
    user = data.user;
    const page = user.repositories;
    raw.push(...page.nodes);
    cursor = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null;
  } while (cursor);

  const repos = raw
    .filter((r) => !EXCLUDE.has(r.name) && !HIDDEN.has(r.name) && !r.isFork)
    .map((r) => {
      const commits = r.defaultBranchRef?.target?.history?.nodes ?? [];
      const commitTotal = r.defaultBranchRef?.target?.history?.totalCount ?? 0;
      // bucket sampled commit dates by month for a per-project sparkline
      const byMonth = {};
      for (const c of commits) {
        const k = monthKey(c.committedDate);
        byMonth[k] = (byMonth[k] || 0) + 1;
      }
      const langs = r.languages.edges.map((e) => ({
        name: e.node.name,
        color: e.node.color,
        size: e.size,
        pct: r.languages.totalSize
          ? Math.round((e.size / r.languages.totalSize) * 100)
          : 0,
      }));
      const ov = OVERRIDES[r.name] || {};
      return {
        name: r.name,
        featured: FEATURED.has(r.name),
        emoji: ov.emoji || null,
        tagline: ov.tagline || null,
        description: ov.description || r.description,
        url: r.url,
        homepage: r.homepageUrl || null,
        private: r.isPrivate,
        archived: r.isArchived,
        stars: r.stargazerCount,
        forks: r.forkCount,
        diskKb: r.diskUsage,
        createdAt: r.createdAt,
        pushedAt: r.pushedAt,
        updatedAt: r.updatedAt,
        primaryLanguage: r.primaryLanguage
          ? { name: r.primaryLanguage.name, color: r.primaryLanguage.color }
          : null,
        languages: langs,
        topics: r.repositoryTopics.nodes.map((n) => n.topic.name),
        commitTotal,
        commitsByMonth: byMonth,
        firstCommit: commits.length
          ? commits[commits.length - 1].committedDate
          : r.createdAt,
        lastCommit: commits.length ? commits[0].committedDate : r.pushedAt,
      };
    });

  // ---- Timeline: group by year of activity ----
  const years = {};
  const ensureYear = (y) =>
    (years[y] ??= { year: y, created: [], active: [], commits: 0 });
  for (const r of repos) {
    ensureYear(new Date(r.createdAt).getFullYear()).created.push(r.name);
    for (const [m, n] of Object.entries(r.commitsByMonth)) {
      const y = Number(m.slice(0, 4));
      const yr = ensureYear(y);
      yr.commits += n;
      if (!yr.active.includes(r.name)) yr.active.push(r.name);
    }
  }
  const timeline = Object.values(years).sort((a, b) => b.year - a.year);

  // ---- Diff against previous sync for "what's new" ----
  let changelog = [];
  if (existsSync(OUT)) {
    try {
      const prev = JSON.parse(readFileSync(OUT, "utf8"));
      const prevMap = Object.fromEntries(
        (prev.repos || []).map((r) => [r.name, r]),
      );
      for (const r of repos) {
        const p = prevMap[r.name];
        if (!p) changelog.push({ type: "new-repo", repo: r.name, at: r.createdAt });
        else if (r.pushedAt > p.pushedAt)
          changelog.push({ type: "updated", repo: r.name, at: r.pushedAt });
      }
    } catch {
      /* first run or unreadable prev */
    }
  }

  const now = new Date().toISOString();
  const languageTotals = {};
  for (const r of repos)
    for (const l of r.languages)
      languageTotals[l.name] = (languageTotals[l.name] || 0) + l.size;

  const out = {
    generatedAt: now,
    user: {
      login: LOGIN,
      name: user.name,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
    },
    stats: {
      totalRepos: repos.length,
      publicRepos: repos.filter((r) => !r.private).length,
      privateRepos: repos.filter((r) => r.private).length,
      totalStars: repos.reduce((s, r) => s + r.stars, 0),
      totalCommits: repos.reduce((s, r) => s + r.commitTotal, 0),
      firstYear: Math.min(...repos.map((r) => new Date(r.createdAt).getFullYear())),
      languages: Object.entries(languageTotals)
        .map(([name, size]) => ({ name, size }))
        .sort((a, b) => b.size - a.size),
    },
    timeline,
    changelog,
    repos: repos.sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.pushedAt < b.pushedAt ? 1 : -1;
    }),
  };

  writeFileSync(OUT, JSON.stringify(out, null, 2));
  console.log(
    `✓ ${repos.length} repos → ${OUT}` +
      (changelog.length ? `  (${changelog.length} change(s))` : ""),
  );
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
