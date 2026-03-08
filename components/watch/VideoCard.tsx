"use client";

import { motion } from "framer-motion";
import type { Video } from "@/lib/types";
import { cn } from "@/lib/utils";

const categoryLabels: Record<Video["category"], string> = {
  music_video: "Music Video",
  live: "Live",
  interview: "Interview",
  bts: "BTS",
};

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const content = (
    <>
      <div className="aspect-video bg-white/5 relative flex items-center justify-center">
        {video.embedUrl ? (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
            <span className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center text-white">
              ▶
            </span>
          </div>
        ) : (
          <span className="text-white/40 text-sm">Coming soon</span>
        )}
        {video.duration && (
          <span className="absolute bottom-2 right-2 text-xs bg-black/60 px-2 py-1 rounded text-white/90">
            {video.duration}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-wider text-white/50">
          {categoryLabels[video.category]}
        </p>
        <h3 className="font-medium text-white mt-1">{video.title}</h3>
      </div>
    </>
  );

  return (
    <motion.article
      className="rounded-xl border border-white/10 bg-white/5 overflow-hidden group"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {video.embedUrl ? (
        <a
          href={video.embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {content}
        </a>
      ) : (
        <div className="block cursor-default">{content}</div>
      )}
    </motion.article>
  );
}
