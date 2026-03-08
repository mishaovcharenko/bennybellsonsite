"use client";

import { motion } from "framer-motion";
import type { MerchItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MerchCardProps {
  item: MerchItem;
}

export function MerchCard({ item }: MerchCardProps) {
  return (
    <motion.article
      className={cn(
        "rounded-xl border overflow-hidden",
        item.soldOut ? "border-white/10 opacity-70" : "border-white/10 hover:border-white/20"
      )}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-square bg-white/5 relative">
        {item.badge && (
          <span className="absolute top-3 left-3 text-xs uppercase tracking-wider bg-white/20 text-white px-2 py-1 rounded">
            {item.badge}
          </span>
        )}
        {item.soldOut && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm uppercase text-white/80">
            Sold out
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-white">{item.title}</h3>
        <p className="text-white/60 mt-1">${item.price}</p>
        {!item.soldOut && (
          <button
            type="button"
            className="mt-4 text-sm text-white/80 hover:text-white underline"
          >
            View
          </button>
        )}
      </div>
    </motion.article>
  );
}
