"use client";

import { motion } from "framer-motion";
import type { Track } from "@/lib/types";

interface ReleaseCardProps {
  track: Track;
}

export function ReleaseCard({ track }: ReleaseCardProps) {
  return (
    <motion.article
      className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-square bg-white/5" />
      <div className="p-4">
        <p className="text-xs uppercase tracking-wider text-white/50">{track.type}</p>
        <h3 className="font-serif text-xl text-white mt-1">{track.title}</h3>
        <p className="text-sm text-white/60 mt-1">{track.releaseDate}</p>
        {track.description && (
          <p className="text-sm text-white/50 mt-2">{track.description}</p>
        )}
        <div className="mt-4 flex gap-3">
          {track.spotifyUrl && (
            <a
              href={track.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/80 hover:text-white underline"
            >
              Spotify
            </a>
          )}
          {track.appleMusicUrl && (
            <a
              href={track.appleMusicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/80 hover:text-white underline"
            >
              Apple Music
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
