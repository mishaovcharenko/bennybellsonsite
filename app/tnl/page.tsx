import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHero } from "@/components/ui/SectionHero";
import { CollectiveCard } from "@/components/tnl/CollectiveCard";
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
          Collaborators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tnlData.members.map((member) => (
            <CollectiveCard key={member.id} member={member} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4">
          Explore
        </h2>
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
    </PageShell>
  );
}
