"use client";

import { UnreleasedCard } from "@/components/unreleased/UnreleasedCard";
import { unreleasedItems } from "@/data/unreleased";

export function UnreleasedModalContent() {
  return (
    <div className="space-y-6">
      <p className="text-white/60 max-w-xl">
        Demos, snippets, secret drops. Some are locked — more coming soon.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {unreleasedItems.map((item) => (
          <UnreleasedCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
