"use client";

import { motion } from "framer-motion";
import type { UnreleasedItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface UnreleasedCardProps {
  item: UnreleasedItem;
}

export function UnreleasedCard({ item }: UnreleasedCardProps) {
  return (
    <motion.article
      className={cn(
        "rounded-xl border overflow-hidden relative",
        item.locked
          ? "border-white/10 bg-white/5 opacity-80"
          : "border-white/15 bg-white/5 hover:bg-white/10"
      )}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {item.locked && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/40">
          <span className="text-xs uppercase tracking-wider text-white/70">Locked</span>
        </div>
      )}
      <div className="aspect-video bg-white/5 flex items-center justify-center">
        {item.audioPreviewPlaceholder && (
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
            <span className="text-white/50 text-xs">▶</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-white">{item.title}</h3>
        {item.description && (
          <p className="text-sm text-white/60 mt-1">{item.description}</p>
        )}
        {item.releaseNote && (
          <p className="text-xs text-white/40 mt-2">{item.releaseNote}</p>
        )}
      </div>
    </motion.article>
  );
}
