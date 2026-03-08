"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Full-screen glassmorphic overlay. The homescreen remains visible (dimmed) behind;
 * content sits on a frosted glass layer. No popup card — the whole viewport is the overlay.
 */
export function GlassOverlay({ isOpen, onClose, title, children, className }: GlassOverlayProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal
          aria-labelledby="glass-overlay-title"
          className={cn(
            "fixed inset-0 z-50 flex flex-col",
            "bg-black/30 backdrop-blur-xl",
            "border-none rounded-none",
            className
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/10 pointer-events-none" aria-hidden />

          <div
            className="relative flex flex-col flex-1 min-h-0 pointer-events-none"
            aria-hidden
          >
            <div className="flex items-center justify-between shrink-0 px-6 py-5 border-b border-white/10 pointer-events-auto">
              <h2 id="glass-overlay-title" className="text-xl font-serif text-white tracking-tight">
                {title}
              </h2>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="p-2 -m-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div
              className="flex-1 overflow-y-auto px-6 py-6 max-w-4xl mx-auto w-full pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
