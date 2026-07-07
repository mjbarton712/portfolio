"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import { portfolio, timeAgo } from "@/lib/portfolio";

const stats = [
  { label: "projects", value: portfolio.stats.totalRepos, color: "text-primary" },
  { label: "commits", value: portfolio.stats.totalCommits, color: "text-grape" },
  {
    label: "years building",
    value: new Date().getFullYear() - portfolio.stats.firstYear + 1,
    color: "text-cyan",
  },
  {
    label: "languages",
    value: portfolio.stats.languages.length,
    color: "text-lime",
  },
];

export default function Hero() {
  const { user, changelog, generatedAt } = portfolio;
  return (
    <header className="relative overflow-hidden">
      <div className="grid-backdrop pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[--color-border] bg-[--color-card]/60 px-4 py-1.5 text-sm text-[--color-muted] backdrop-blur"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime" />
          </span>
          Synced from GitHub · {timeAgo(generatedAt)}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-5xl font-bold tracking-tight sm:text-7xl"
        >
          Everything{" "}
          <span className="text-gradient">{user.name || user.login}</span>{" "}
          has built
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-[--color-muted]"
        >
          {user.bio ||
            "A living archive of side projects, experiments, and shipped apps — pulled straight from GitHub and kept in sync automatically."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-[--color-border] bg-[--color-card]/50 p-5 backdrop-blur transition-transform hover:-translate-y-1"
            >
              <div className={`text-3xl font-bold ${s.color}`}>
                <AnimatedCounter to={s.value} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-[--color-muted]">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {changelog.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            <span className="text-sm text-[--color-muted]">Since last sync:</span>
            {changelog.slice(0, 6).map((c) => (
              <span
                key={c.repo + c.type}
                className="rounded-full border border-[--color-border] bg-[--color-bg-soft] px-3 py-1 text-xs"
              >
                {c.type === "new-repo" ? "✨ new" : "🔁 updated"} {c.repo}
              </span>
            ))}
          </motion.div>
        )}

        <motion.a
          href="#timeline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-14 inline-block animate-float text-[--color-muted] hover:text-[--color-fg]"
          aria-label="Scroll to timeline"
        >
          ↓ explore the timeline
        </motion.a>
      </div>
    </header>
  );
}
