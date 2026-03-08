import type { UnreleasedItem } from "@/lib/types";

export const unreleasedItems: UnreleasedItem[] = [
  {
    id: "u1",
    title: "BB Vault 001: Late Night Demo",
    description: "A raw one-take demo — unfinished on purpose.",
    locked: true,
    statusTag: "LOCKED",
    releaseNote: "TBA",
    audioPreviewPlaceholder: true,
  },
  {
    id: "u2",
    title: "TNL Summer Sketch",
    description: "A quick hook + drum idea that might become a full track.",
    locked: false,
    statusTag: "PREVIEW",
    releaseNote: "Preview available",
    audioPreviewPlaceholder: true,
  },
  {
    id: "u3",
    title: "Hotel Room Bounce (Alt Mix)",
    description: "Early mix experiment — tempo pushed, vocals rough-cut.",
    locked: false,
    statusTag: "UNLISTED",
    releaseNote: "Unlisted",
    audioPreviewPlaceholder: true,
  },
];
