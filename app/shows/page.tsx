import { PageShell } from "@/components/layout/PageShell";
import { SectionHero } from "@/components/ui/SectionHero";
import { ShowRow } from "@/components/shows/ShowRow";
import { upcomingShows, pastShows } from "@/data/shows";

export default function ShowsPage() {
  return (
    <PageShell>
      <SectionHero
        title="Shows"
        subtitle="Shows + pop-ups. Dates update as soon as they're confirmed."
      />
      <section className="mb-16">
        <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4">
          Upcoming
        </h2>
        {upcomingShows.length === 0 ? (
          <p className="text-white/50">No upcoming shows. Check back soon.</p>
        ) : (
          upcomingShows.map((show) => <ShowRow key={show.id} show={show} />)
        )}
      </section>
      <section>
        <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4">
          Past
        </h2>
        {pastShows.length === 0 ? (
          <p className="text-white/50">No past shows listed yet.</p>
        ) : (
          pastShows.map((show) => (
            <ShowRow key={show.id} show={show} />
          ))
        )}
      </section>
    </PageShell>
  );
}
