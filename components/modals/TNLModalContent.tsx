"use client";

import { BandMemberCard } from "@/components/tnl/BandMemberCard";
import { tnlData } from "@/data/tnl";

export function TNLModalContent() {
  return (
    <div className="space-y-10">
      <p className="text-white/60 max-w-xl">{tnlData.subtitle}</p>
      <section>
        <p className="text-white/70 leading-relaxed max-w-xl">{tnlData.manifesto}</p>
      </section>
      <section>
        <h3 className="text-sm uppercase tracking-wider text-white/50 mb-4">Members</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tnlData.members.map((member) => (
            <BandMemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>
      <section>
        <h3 className="text-sm uppercase tracking-wider text-white/50 mb-4">Links</h3>
        <div className="flex flex-wrap gap-4">
          {tnlData.relatedLinks.map((link) => {
            const isExternal = link.href.startsWith("http");
            return (
              <a
                key={link.label}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-white/80 hover:text-white underline"
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
