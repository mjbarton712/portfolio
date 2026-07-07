import data from "@/data/portfolio.json";

export type Lang = { name: string; color: string | null; size: number; pct: number };

export type Repo = {
  name: string;
  featured: boolean;
  emoji: string | null;
  tagline: string | null;
  description: string | null;
  url: string;
  homepage: string | null;
  private: boolean;
  archived: boolean;
  stars: number;
  forks: number;
  diskKb: number;
  createdAt: string;
  pushedAt: string;
  updatedAt: string;
  primaryLanguage: { name: string; color: string | null } | null;
  languages: Lang[];
  topics: string[];
  commitTotal: number;
  commitsByMonth: Record<string, number>;
  firstCommit: string;
  lastCommit: string;
};

export type YearBucket = {
  year: number;
  created: string[];
  active: string[];
  commits: number;
};

export type Change = { type: "new-repo" | "updated"; repo: string; at: string };

export type Portfolio = {
  generatedAt: string;
  user: { login: string; name: string | null; bio: string | null; avatarUrl: string };
  stats: {
    totalRepos: number;
    publicRepos: number;
    privateRepos: number;
    totalStars: number;
    totalCommits: number;
    firstYear: number;
    languages: { name: string; size: number }[];
  };
  timeline: YearBucket[];
  changelog: Change[];
  repos: Repo[];
};

export const portfolio = data as unknown as Portfolio;

/** Fallback colors for languages GitHub doesn't return a color for. */
export function langColor(name: string, fallback: string | null): string {
  if (fallback) return fallback;
  const map: Record<string, string> = {
    GLSL: "#5686a5",
    HCL: "#844FBA",
    Dockerfile: "#384d54",
  };
  return map[name] || "#8b8b8b";
}

/** Relative time like "3 days ago". */
export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const day = 86400000;
  const units: [number, string][] = [
    [365 * day, "year"],
    [30 * day, "month"],
    [7 * day, "week"],
    [day, "day"],
    [3600000, "hour"],
    [60000, "minute"],
  ];
  for (const [ms, label] of units) {
    const n = Math.floor(diff / ms);
    if (n >= 1) return `${n} ${label}${n > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

export function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

/** Repos whose FIRST commit lands in the given year → "born" that year. */
export function bornInYear(year: number): Repo[] {
  return portfolio.repos
    .filter((r) => new Date(r.createdAt).getFullYear() === year)
    .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
}

/** Repos created before `year` but still committed to during it → "built on". */
export function builtOnInYear(year: number, activeNames: string[]): Repo[] {
  return portfolio.repos
    .filter(
      (r) =>
        activeNames.includes(r.name) &&
        new Date(r.createdAt).getFullYear() < year,
    )
    .sort((a, b) => (b.commitsByMonth ? 1 : -1));
}
