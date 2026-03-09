"use client";

import { motion } from "framer-motion";
import type { TNLMember } from "@/lib/types";

interface BandMemberCardProps {
  member: TNLMember;
}

export function BandMemberCard({ member }: BandMemberCardProps) {
  const Wrapper = member.link ? "a" : "div";
  const wrapperProps = member.link
    ? { href: member.link, target: "_blank", rel: "noopener noreferrer" as const }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Wrapper
        {...wrapperProps}
        className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
      >
        <div className="w-16 h-16 rounded-full bg-white/10 mb-4" />
        <h3 className="font-medium text-white">{member.name}</h3>
        {member.role && (
          <p className="text-sm text-white/50 mt-1">{member.role}</p>
        )}
      </Wrapper>
    </motion.div>
  );
}
