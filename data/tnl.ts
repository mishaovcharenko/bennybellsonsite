import type { TNLConfig } from "@/lib/types";

export const tnlData: TNLConfig = {
  title: "Twisted n Luv",
  subtitle: "A collective. A world.",
  manifesto:
    "We build in the margins. Music, visuals, and community that don't fit the grid. Twisted n Luv is the space for that — a shared universe of collaborators and friends.",
  members: [
    { id: "tnl1", name: "Benny Bellson", role: "Artist" },
    { id: "tnl2", name: "Collaborator A", role: "Producer" },
    { id: "tnl3", name: "Collaborator B", role: "Visuals" },
  ],
  relatedLinks: [
    { label: "Releases", href: "/listen" },
    { label: "Shows", href: "/shows" },
    { label: "Merch", href: "/merch" },
  ],
};
