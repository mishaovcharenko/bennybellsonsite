"use client";

import { motion } from "framer-motion";

interface PlatformCardProps {
  name: string;
  href: string;
  description?: string;
}

export function PlatformCard({ name, href, description }: PlatformCardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="font-medium text-white">{name}</span>
      {description && (
        <p className="mt-1 text-sm text-white/50">{description}</p>
      )}
    </motion.a>
  );
}
