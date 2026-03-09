import { PageShell } from "@/components/layout/PageShell";
import { SectionHero } from "@/components/ui/SectionHero";
import { BandMemberCard } from "@/components/tnl/BandMemberCard";
import { tnlData } from "@/data/tnl";

export default function TNLPage() {
  return (
    <PageShell>
      <SectionHero
        title={tnlData.title}
        subtitle={tnlData.subtitle}
      />
      <section className="mb-16">
        <p className="text-white/70 leading-relaxed max-w-xl">
          {tnlData.manifesto}
        </p>
      </section>
      <section className="mb-16">
        <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4">
          Members
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tnlData.members.map((member) => (
            <BandMemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4">
          Links
        </h2>
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
    </PageShell>
  );
}
