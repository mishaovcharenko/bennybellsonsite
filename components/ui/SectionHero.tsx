"use client";

import { motion } from "framer-motion";

interface SectionHeroProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHero({ title, subtitle, className = "" }: SectionHeroProps) {
  return (
    <motion.section
      className={`mb-16 ${className}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <h1 className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-white">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-white/60 text-lg max-w-xl">{subtitle}</p>
      )}
    </motion.section>
  );
}
