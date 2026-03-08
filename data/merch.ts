import type { MerchItem } from "@/lib/types";

export const merchItems: MerchItem[] = [
  {
    id: "m1",
    title: "TNL Logo Tee",
    price: "32",
    badge: "New",
    collection: "TNL",
  },
  {
    id: "m2",
    title: "Midnight Drive Hoodie",
    price: "68",
    soldOut: false,
  },
  {
    id: "m3",
    title: "Echoes Vinyl",
    price: "24",
    soldOut: true,
  },
  {
    id: "m4",
    title: "Cap",
    price: "28",
    badge: "Limited",
  },
];

export const featuredMerch = merchItems.slice(0, 2);
