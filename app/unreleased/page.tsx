import { PageShell } from "@/components/layout/PageShell";
import { SectionHero } from "@/components/ui/SectionHero";
import { UnreleasedCard } from "@/components/unreleased/UnreleasedCard";
import { unreleasedItems } from "@/data/unreleased";

export default function UnreleasedPage() {
  return (
    <PageShell>
      <SectionHero
        title="Unreleased"
        subtitle="Demos, snippets, secret drops. Some are locked — more coming soon."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {unreleasedItems.map((item) => (
          <UnreleasedCard key={item.id} item={item} />
        ))}
      </div>
    </PageShell>
  );
}
