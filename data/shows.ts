import type { Show } from "@/lib/types";

export const upcomingShows: Show[] = [
  {
    id: "s1",
    date: "2025-04-12",
    city: "Los Angeles",
    venue: "The Echo",
    status: "on_sale",
  },
  {
    id: "s2",
    date: "2025-04-18",
    city: "Brooklyn",
    venue: "Baby's All Right",
    status: "coming_soon",
  },
  {
    id: "s3",
    date: "2025-05-02",
    city: "Chicago",
    venue: "Empty Bottle",
    status: "sold_out",
  },
];

export const pastShows: Show[] = [
  {
    id: "p1",
    date: "2024-11-08",
    city: "LA",
    venue: "Small venue",
    status: "sold_out",
    isPast: true,
  },
  {
    id: "p2",
    date: "2024-09-20",
    city: "NYC",
    venue: "Basement show",
    status: "sold_out",
    isPast: true,
  },
];
