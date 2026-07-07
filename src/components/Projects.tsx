"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { portfolio, langColor, timeAgo, fmtDate, type Repo } from "@/lib/portfolio";

function LangBar({ repo }: { repo: Repo }) {
  const langs = repo.languages.slice(0, 5);
  if (!langs.length) return null;
  return (
    <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-[--color-bg-soft]">
      {langs.map((l) => (
        <span
          key={l.name}
          style={{ width: `${l.pct}%`, background: langColor(l.name, l.color) }}
          title={`${l.name} ${l.pct}%`}
        />
      ))}
    </div>
  );
}

function Card({ repo }: { repo: Repo }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className={`group relative flex flex-col rounded-2xl border bg-[--color-card]/60 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/50 ${
        repo.featured ? "border-primary/40" : "border-[--color-border]"
      }`}
    >
      {repo.featured && (
        <span className="absolute -top-2.5 left-4 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[--color-bg]">
          ★ featured
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          {repo.emoji && <span>{repo.emoji}</span>}
          {repo.name}
        </h3>
        <div className="flex shrink-0 items-center gap-2 text-xs text-[--color-muted]">
          {repo.private && <span title="Private repo">🔒</span>}
          {repo.stars > 0 && <span>★ {repo.stars}</span>}
        </div>
      </div>

      <p className="mt-2 line-clamp-3 flex-1 text-sm text-[--color-muted]">
        {repo.tagline || repo.description || "No description yet."}
      </p>

      {repo.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md bg-[--color-bg-soft] px-2 py-0.5 text-[11px] text-[--color-muted]"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 space-y-2">
        <LangBar repo={repo} />
        <div className="flex items-center justify-between text-xs text-[--color-muted]">
          <span className="flex items-center gap-1.5">
            {repo.primaryLanguage && (
              <>
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{
                    background: langColor(
                      repo.primaryLanguage.name,
                      repo.primaryLanguage.color,
                    ),
                  }}
                />
                {repo.primaryLanguage.name}
              </>
            )}
          </span>
          <span title={`Created ${fmtDate(repo.createdAt)}`}>
            {timeAgo(repo.pushedAt)}
          </span>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <a
          href={repo.url}
          target="_blank"
          rel="noreferrer"
          className="flex-1 rounded-lg border border-[--color-border] py-1.5 text-center text-sm transition-colors hover:border-primary hover:text-primary"
        >
          Code →
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-lg bg-primary/90 py-1.5 text-center text-sm font-medium text-[--color-bg] transition-colors hover:bg-primary"
          >
            Live ↗
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState<string | null>(null);
  const [onlyFeatured, setOnlyFeatured] = useState(false);

  const topLangs = useMemo(
    () => portfolio.stats.languages.slice(0, 8).map((l) => l.name),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return portfolio.repos.filter((r) => {
      if (onlyFeatured && !r.featured) return false;
      if (lang && r.primaryLanguage?.name !== lang) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        (r.description || "").toLowerCase().includes(q) ||
        (r.tagline || "").toLowerCase().includes(q) ||
        r.topics.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, lang, onlyFeatured]);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">All projects</h2>
        <p className="mt-3 text-[--color-muted]">
          {portfolio.repos.length} repositories · filter, search, dig in.
        </p>
      </div>

      {/* controls */}
      <div className="mb-8 flex flex-col items-center gap-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects, topics, tech…"
          className="w-full max-w-md rounded-full border border-[--color-border] bg-[--color-card]/60 px-5 py-2.5 text-sm outline-none backdrop-blur focus:border-primary"
        />
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setOnlyFeatured((v) => !v)}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
              onlyFeatured
                ? "border-primary bg-primary/20 text-primary-soft"
                : "border-[--color-border] text-[--color-muted] hover:text-[--color-fg]"
            }`}
          >
            ★ Featured
          </button>
          <button
            onClick={() => setLang(null)}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
              lang === null
                ? "border-primary bg-primary/20 text-primary-soft"
                : "border-[--color-border] text-[--color-muted] hover:text-[--color-fg]"
            }`}
          >
            All langs
          </button>
          {topLangs.map((l) => (
            <button
              key={l}
              onClick={() => setLang(lang === l ? null : l)}
              className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                lang === l
                  ? "border-primary bg-primary/20 text-primary-soft"
                  : "border-[--color-border] text-[--color-muted] hover:text-[--color-fg]"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((r) => (
            <Card key={r.name} repo={r} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-[--color-muted]">
          No projects match — try clearing filters.
        </p>
      )}
    </section>
  );
}
