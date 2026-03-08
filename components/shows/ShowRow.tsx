"use client";

import { motion } from "framer-motion";
import type { Show } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusLabels: Record<Show["status"], string> = {
  on_sale: "On sale",
  sold_out: "Sold out",
  coming_soon: "Coming soon",
};

interface ShowRowProps {
  show: Show;
}

export function ShowRow({ show }: ShowRowProps) {
  const dateFormatted = new Date(show.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.article
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-white/10 last:border-0",
        show.isPast && "opacity-70"
      )}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <p className="text-xs uppercase tracking-wider text-white/50">{dateFormatted}</p>
        <h3 className="font-medium text-white mt-1">{show.venue}</h3>
        <p className="text-white/60">{show.city}</p>
      </div>
      <div className="flex items-center gap-4">
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
    </motion.article>
  );
}
