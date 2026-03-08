import { PageShell } from "@/components/layout/PageShell";
import { SectionHero } from "@/components/ui/SectionHero";
import { PlatformCard } from "@/components/listen/PlatformCard";
import { ReleaseCard } from "@/components/listen/ReleaseCard";
import { site } from "@/data/site";
import { tracks, latestRelease } from "@/data/tracks";

export default function ListenPage() {
  const platforms = [
    { name: "Spotify", href: site.spotifyUrl ?? "#", description: "Stream" },
    { name: "Apple Music", href: site.appleMusicUrl ?? "#", description: "Stream" },
    { name: "YouTube Music", href: site.youtubeMusicUrl ?? "#", description: "Stream" },
    { name: "SoundCloud", href: site.soundcloudUrl ?? "#", description: "Stream" },
  ];

  return (
    <PageShell>
      <SectionHero
        title={site.artistName}
        subtitle="Stream everywhere. Choose your platform."
      />
      <section className="mb-16">
        <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4">
          Listen
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {platforms.map((p) => (
            <PlatformCard key={p.name} name={p.name} href={p.href} description={p.description} />
          ))}
        </div>
      </section>
      {latestRelease && (
        <section className="mb-16">
          <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4">
            Latest Release
          </h2>
          <ReleaseCard track={latestRelease} />
        </section>
      )}
      <section>
        <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4">
          Releases
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <ReleaseCard key={track.id} track={track} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
