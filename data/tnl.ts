import type { TNLConfig } from "@/lib/types";

export const tnlData: TNLConfig = {
  title: "Twisted N' Luv",
  subtitle: "Twisted N' Luv world: music + street shows + archive.",
  manifesto:
    "Twisted N' Luv like Guns N' Roses. A band built in the margins — music, visuals, street shows, and community that don't fit the grid.",
  members: [
    { id: "tnl1", name: "Benny Bellson", role: "Artist" },
    { id: "tnl2", name: "Sha Crow", role: "Artist" },
  ],
  relatedLinks: [
    {
      label: "TNL on Spotify",
      href: "https://open.spotify.com/artist/4pXR8awl28k2FwjDS2WjEb",
    },
    {
      label: "TNL on Instagram",
      href: "https://www.instagram.com/twistednluvv/",
    },
    {
      label: "Needa Bih (OMG) — Apple Music",
      href: "https://music.apple.com/us/album/needa-bih-omg-single/1824738489",
    },
    { label: "Releases", href: "/listen" },
    { label: "Shows", href: "/shows" },
  ],
};
