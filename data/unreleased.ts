import type { UnreleasedItem } from "@/lib/types";

export const unreleasedItems: UnreleasedItem[] = [
  {
    id: "u1",
    title: "Snippet 001",
    description: "Work in progress. Dropping soon.",
    locked: false,
    releaseNote: "Next drop",
    audioPreviewPlaceholder: true,
  },
  {
    id: "u2",
    title: "Vault Track",
    description: "Unreleased demo from last year.",
    locked: true,
    releaseNote: "TBA",
    audioPreviewPlaceholder: true,
  },
  {
    id: "u3",
    title: "Collab Snippet",
    description: "Something special with the collective.",
    locked: false,
    releaseNote: "Q2",
    audioPreviewPlaceholder: true,
  },
];
