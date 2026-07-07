"use client";

import { motion } from "framer-motion";
import { portfolio } from "@/lib/portfolio";

const repoMap = Object.fromEntries(portfolio.repos.map((r) => [r.name, r]));
const maxCommits = Math.max(...portfolio.timeline.map((y) => y.commits), 1);

function Chip({
  name,
  kind,
}: {
  name: string;
  kind: "new" | "built";
}) {
  const r = repoMap[name];
  if (!r) return null;
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-sm transition-all hover:-translate-y-0.5 ${
        kind === "new"
          ? "border-primary/40 bg-primary/10 text-primary-soft hover:bg-primary/20"
          : "border-[--color-border] bg-[--color-bg-soft] text-[--color-muted] hover:text-[--color-fg]"
      }`}
      title={r.tagline || r.description || r.name}
    >
      {r.emoji && <span>{r.emoji}</span>}
      {kind === "new" && !r.emoji && <span>✨</span>}
      {name}
      {r.private && <span className="text-[10px] opacity-60">🔒</span>}
    </a>
  );
}

export default function Timeline() {
  return (
    <section id="timeline" className="mx-auto max-w-4xl px-6 py-20">
      <div className="mb-14 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">The build timeline</h2>
        <p className="mt-3 text-[--color-muted]">
          Every year — what got started, and what kept growing.
        </p>
      </div>

      <div className="relative">
        {/* spine */}
        <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-grape to-cyan sm:left-1/2" />

        <div className="space-y-12">
          {portfolio.timeline.map((yr, i) => {
            const built = yr.active.filter((n) => !yr.created.includes(n));
            return (
              <motion.div
                key={yr.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
                className="relative pl-12 sm:pl-0"
              >
                {/* node dot */}
                <div className="absolute left-4 top-3 z-10 -translate-x-1/2 sm:left-1/2">
                  <span className="block h-4 w-4 rounded-full border-2 border-[--color-bg] bg-primary shadow-[0_0_16px_var(--color-primary)]" />
                </div>

                <div className="sm:grid sm:grid-cols-2 sm:gap-8">
                  {/* year label */}
                  <div className="mb-3 sm:mb-0 sm:text-right sm:pr-4">
                    <div className="text-4xl font-bold tabular-nums text-gradient sm:text-5xl">
                      {yr.year}
                    </div>
                    <div className="mt-1 text-sm text-[--color-muted]">
                      {yr.created.length} new · {built.length} continued
                    </div>
                    {/* commit intensity bar */}
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[--color-bg-soft] sm:ml-auto sm:w-40">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-grape"
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${(yr.commits / maxCommits) * 100}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-[--color-muted] sm:text-right">
                      ~{yr.commits} commits
                    </div>
                  </div>

                  {/* repos */}
                  <div className="sm:pl-4">
                    {yr.created.length > 0 && (
                      <div className="mb-3">
                        <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                          Started
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {yr.created.map((n) => (
                            <Chip key={n} name={n} kind="new" />
                          ))}
                        </div>
                      </div>
                    )}
                    {built.length > 0 && (
                      <div>
                        <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[--color-muted]">
                          Kept building
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {built.map((n) => (
                            <Chip key={n} name={n} kind="built" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
