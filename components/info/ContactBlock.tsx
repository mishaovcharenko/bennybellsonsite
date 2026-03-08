"use client";

import { motion } from "framer-motion";
import type { Contact } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ContactBlockProps {
  contact: Contact;
}

export function ContactBlock({ contact }: ContactBlockProps) {
  const Wrapper = contact.href ? "a" : "div";
  const wrapperProps = contact.href
    ? { href: contact.href, target: "_blank", rel: "noopener noreferrer" as const }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Wrapper
        {...wrapperProps}
        className={cn(
          "block p-4 rounded-xl border border-white/10",
          contact.href && "hover:bg-white/5 hover:border-white/15 transition-colors"
        )}
      >
        <p className="text-xs uppercase tracking-wider text-white/50">{contact.label}</p>
        <p className="text-white mt-1">{contact.value}</p>
      </Wrapper>
    </motion.div>
  );
}
