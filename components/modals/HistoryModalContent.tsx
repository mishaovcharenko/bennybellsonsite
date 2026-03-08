"use client";

import { TimelineBlock } from "@/components/history/TimelineBlock";
import { timelineEvents } from "@/data/timeline";

export function HistoryModalContent() {
  return (
    <div className="space-y-6">
      <p className="text-white/60 max-w-xl">Artist lore, timeline, archive.</p>
      <section>
        {timelineEvents.map((event) => (
          <TimelineBlock key={event.id} event={event} />
        ))}
      </section>
    </div>
  );
}
