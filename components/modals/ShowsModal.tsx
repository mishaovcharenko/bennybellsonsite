"use client";

import { upcomingShows, pastShows } from "@/data/shows";
import { site } from "@/data/site";
import type { Show } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusLabels: Record<Show["status"], string> = {
  on_sale: "On sale",
  sold_out: "Sold out",
  coming_soon: "Coming soon",
};

function ShowRowCompact({ show }: { show: Show }) {
  const dateFormatted = new Date(show.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-4 border-b border-white/10 last:border-0",
        show.isPast && "opacity-70"
      )}
    >
      <div>
        <p className="text-xs uppercase tracking-wider text-white/50">{dateFormatted}</p>
        <p className="font-medium text-white mt-0.5">{show.venue}</p>
        <p className="text-white/60 text-sm">{show.city}</p>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "text-xs uppercase tracking-wider px-2 py-1 rounded",
            show.status === "on_sale" && "bg-white/10 text-white",
            show.status === "sold_out" && "text-white/50",
            show.status === "coming_soon" && "text-white/60"
          )}
        >
          {statusLabels[show.status]}
        </span>
        {show.ticketUrl && show.status !== "sold_out" && (
          <a
            href={show.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/80 hover:text-white underline"
          >
            Tickets
          </a>
        )}
      </div>
    </div>
  );
}

export function ShowsModalContent() {
  const hasUpcoming = upcomingShows.length > 0;
  const hasPast = pastShows.length > 0;

  return (
    <div className="space-y-6">
      <p className="text-sm text-white/50 mb-2">
        Shows + pop-ups. Dates update as soon as they&apos;re confirmed.
      </p>
      {hasUpcoming && (
        <section>
          <h3 className="text-xs uppercase tracking-wider text-white/50 mb-3">Upcoming</h3>
          {upcomingShows.map((show) => (
            <ShowRowCompact key={show.id} show={show} />
          ))}
        </section>
      )}
      {!hasUpcoming && (
        <p className="text-white/50 text-sm">No upcoming shows. Check back soon.</p>
      )}
      {hasPast && (
        <section>
          <h3 className="text-xs uppercase tracking-wider text-white/50 mb-3">Past</h3>
          {pastShows.map((show) => (
            <ShowRowCompact key={show.id} show={show} />
          ))}
        </section>
      )}
      {site.spotifyConcertsUrl && (
        <a
          href={site.spotifyConcertsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm text-white/70 hover:text-white underline mt-2"
        >
          All tickets on Spotify &rarr;
        </a>
      )}
    </div>
  );
}
