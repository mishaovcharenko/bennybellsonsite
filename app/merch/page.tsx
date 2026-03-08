import { PageShell } from "@/components/layout/PageShell";
import { SectionHero } from "@/components/ui/SectionHero";
import { MerchCard } from "@/components/merch/MerchCard";
import { merchItems, featuredMerch } from "@/data/merch";

export default function MerchPage() {
  const restMerch = merchItems.filter((m) => !featuredMerch.find((f) => f.id === m.id));

  return (
    <PageShell>
      <SectionHero
        title="Merch"
        subtitle="Official merch drops. Limited runs when available."
      />
      {featuredMerch.length > 0 && (
        <section className="mb-16">
          <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4">
            Featured
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredMerch.map((item) => (
              <MerchCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
      <section>
        <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4">
          All
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restMerch.map((item) => (
            <MerchCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
