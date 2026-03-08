import { PageShell } from "@/components/layout/PageShell";
import { SectionHero } from "@/components/ui/SectionHero";
import { site } from "@/data/site";

export default function TwitterPage() {
  return (
    <PageShell>
      <SectionHero
        title="Twitter"
        subtitle="Latest from the feed."
      />
      {site.twitterUrl && (
        <section>
          <p className="text-white/60 mb-6 max-w-md">
            Follow @bennybellson on X for updates, drops, and more.
          </p>
          <a
            href={site.twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-full border border-white/20 text-white/90 hover:bg-white/10 transition-colors"
          >
            Follow on X
          </a>
        </section>
      )}
    </PageShell>
  );
}
