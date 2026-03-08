import { PageShell } from "@/components/layout/PageShell";
import { SectionHero } from "@/components/ui/SectionHero";
import { VideoCard } from "@/components/watch/VideoCard";
import { videos, featuredVideo } from "@/data/videos";

export default function WatchPage() {
  const otherVideos = videos.filter((v) => v.id !== featuredVideo?.id);

  return (
    <PageShell>
      <SectionHero
        title="Watch"
        subtitle="Music videos, live clips, interviews, BTS."
      />
      {featuredVideo && featuredVideo.embedUrl && (
        <section className="mb-16">
          <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4">
            Featured
          </h2>
          <div className="aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5">
            <iframe
              src={featuredVideo.embedUrl}
              title={featuredVideo.title}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
          <h3 className="font-serif text-xl text-white mt-4">{featuredVideo.title}</h3>
        </section>
      )}
      {featuredVideo && !featuredVideo.embedUrl && (
        <section className="mb-16">
          <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4">
            Featured
          </h2>
          <div className="aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
            <p className="text-white/40 text-sm">Coming soon</p>
          </div>
          <h3 className="font-serif text-xl text-white mt-4">{featuredVideo.title}</h3>
        </section>
      )}
      <section>
        <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4">
          All Videos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
