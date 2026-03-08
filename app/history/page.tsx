import { PageShell } from "@/components/layout/PageShell";
import { SectionHero } from "@/components/ui/SectionHero";
import { TimelineBlock } from "@/components/history/TimelineBlock";
import { timelineEvents } from "@/data/timeline";

export default function HistoryPage() {
  return (
    <PageShell>
      <SectionHero
        title="History"
        subtitle="Artist lore, timeline, archive."
      />
      <section>
        {timelineEvents.map((event) => (
          <TimelineBlock key={event.id} event={event} />
        ))}
      </section>
    </PageShell>
  );
}
