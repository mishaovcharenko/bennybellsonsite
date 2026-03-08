"use client";

import { motion } from "framer-motion";
import type { TimelineEvent } from "@/lib/types";

interface TimelineBlockProps {
  event: TimelineEvent;
}

export function TimelineBlock({ event }: TimelineBlockProps) {
  return (
    <motion.article
      className="relative pl-8 pb-16 border-l border-white/10 last:pb-0"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-white/30" />
      {event.date && (
        <p className="text-xs uppercase tracking-wider text-white/50">{event.date}</p>
      )}
      <p className="text-xs uppercase tracking-wider text-white/40 mt-1">{event.era}</p>
      <h3 className="font-serif text-xl text-white mt-2">{event.title}</h3>
      <p className="text-white/70 mt-3 leading-relaxed">{event.body}</p>
      {event.imageUrl && (
        <div className="mt-4 aspect-video max-w-md rounded-lg bg-white/5 overflow-hidden" />
      )}
    </motion.article>
  );
}
