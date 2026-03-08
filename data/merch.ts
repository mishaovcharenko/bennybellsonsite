import type { MerchItem } from "@/lib/types";

export const merchItems: MerchItem[] = [
  {
    id: "m1",
    title: "Benny Bellson Tee",
    price: "26",
    badge: "Available",
    collection: "BB",
  },
  {
    id: "m2",
    title: "BB Seal Tee (Black/White)",
    price: "32",
    badge: "Coming Soon",
  },
  {
    id: "m3",
    title: "TNL Street Tour Poster (11×17)",
    price: "18",
    collection: "TNL",
  },
  {
    id: "m4",
    title: "Posters Era Zine",
    price: "14",
    badge: "Limited",
  },
];

export const featuredMerch = merchItems.slice(0, 1);
