import { PageShell } from "@/components/layout/PageShell";
import { SectionHero } from "@/components/ui/SectionHero";
import { site } from "@/data/site";

export default function SocialPage() {
  return (
    <PageShell>
      <SectionHero
        title="Social"
        subtitle="Updates and behind the scenes."
      />
      <section>
        <p className="text-white/60 mb-6 max-w-md">
          Follow @bennybellson on Instagram for updates, drops, and more.
        </p>
        {site.instagramUrl && (
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-full border border-white/20 text-white/90 hover:bg-white/10 transition-colors"
          >
            Follow on Instagram
          </a>
        )}
      </section>
    </PageShell>
  );
}
