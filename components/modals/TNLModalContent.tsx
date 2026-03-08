"use client";

import Link from "next/link";
import { CollectiveCard } from "@/components/tnl/CollectiveCard";
import { tnlData } from "@/data/tnl";

export function TNLModalContent() {
  return (
    <div className="space-y-10">
      <p className="text-white/60 max-w-xl">{tnlData.subtitle}</p>
      <section>
        <p className="text-white/70 leading-relaxed max-w-xl">{tnlData.manifesto}</p>
      </section>
      <section>
        <h3 className="text-sm uppercase tracking-wider text-white/50 mb-4">Collaborators</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tnlData.members.map((member) => (
            <CollectiveCard key={member.id} member={member} />
          ))}
        </div>
      </section>
      <section>
        <h3 className="text-sm uppercase tracking-wider text-white/50 mb-4">Explore</h3>
        <div className="flex flex-wrap gap-4">
          {tnlData.relatedLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white/80 hover:text-white underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
