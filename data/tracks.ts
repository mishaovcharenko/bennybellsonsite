import type { Track } from "@/lib/types";

export const tracks: Track[] = [
  {
    id: "1",
    title: "Midnight Drive",
    type: "single",
    releaseDate: "2024",
    description: "Latest single.",
  },
  {
    id: "2",
    title: "Echoes",
    type: "ep",
    releaseDate: "2023",
    description: "Debut EP.",
  },
  {
    id: "3",
    title: "First Light",
    type: "single",
    releaseDate: "2023",
    description: "First release.",
  },
];

export const latestRelease = tracks[0];
