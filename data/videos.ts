import type { Video } from "@/lib/types";

export const videos: Video[] = [
  {
    id: "v1",
    title: "Midnight Drive — Official Video",
    category: "music_video",
    duration: "3:24",
    featured: true,
  },
  {
    id: "v2",
    title: "Live at The Echo",
    category: "live",
    duration: "12:00",
  },
  {
    id: "v3",
    title: "Making of Echoes",
    category: "bts",
    duration: "5:41",
  },
  {
    id: "v4",
    title: "Interview — Radio Session",
    category: "interview",
    duration: "18:00",
  },
];

export const featuredVideo = videos.find((v) => v.featured) ?? videos[0];
