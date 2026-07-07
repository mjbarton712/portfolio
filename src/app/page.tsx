import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import { portfolio, fmtDate } from "@/lib/portfolio";

export default function Home() {
  return (
    <main>
      <Hero />
      <Timeline />
      <Projects />
      <footer className="border-t border-[--color-border] py-10 text-center text-sm text-[--color-muted]">
        <p>
          Auto-synced from{" "}
          <a
            href={`https://github.com/${portfolio.user.login}`}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            @{portfolio.user.login}
          </a>{" "}
          · data as of {fmtDate(portfolio.generatedAt)}
        </p>
        <p className="mt-1 text-xs opacity-60">Rebuilt daily via GitHub Actions.</p>
      </footer>
    </main>
  );
}
