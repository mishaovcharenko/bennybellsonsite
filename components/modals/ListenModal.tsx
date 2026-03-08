"use client";

import { site } from "@/data/site";

const platforms = [
  { name: "Spotify", href: site.spotifyUrl, description: "Stream" },
  { name: "Apple Music", href: site.appleMusicUrl, description: "Stream" },
  { name: "YouTube Music", href: site.youtubeMusicUrl, description: "Stream" },
  { name: "SoundCloud", href: site.soundcloudUrl, description: "Stream" },
].filter((p) => p.href);

const featuredPlays = [
  {
    title: "Fellinlove",
    links: [
      { platform: "Spotify", href: "https://open.spotify.com/track/6PaRNDk5COsNzRdasACqgV" },
      { platform: "Apple Music", href: "https://music.apple.com/us/album/fellinlove-single/1875212510" },
    ],
  },
  {
    title: "theclubrock",
    links: [
      { platform: "Spotify", href: "https://open.spotify.com/track/1pC8k7AoP2uSDOgmNo0vHN" },
      { platform: "Apple Music", href: "https://music.apple.com/us/album/theclubrock-single/1833791105" },
    ],
  },
];

export function ListenModalContent() {
  return (
    <div>
      <p className="text-sm text-white/50 mb-5">Stream everywhere. Choose your platform.</p>
      <ul className="list-none mb-8">
        {platforms.map((p) => (
          <li key={p.name}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-baseline justify-between gap-4 py-2.5 text-white border-b border-white/5 last:border-0 hover:text-white/90 transition-colors group"
            >
              <span className="font-medium group-hover:underline underline-offset-2">{p.name}</span>
              {p.description && (
                <span className="text-xs text-white/40 tabular-nums">{p.description}</span>
              )}
            </a>
          </li>
        ))}
      </ul>
      {featuredPlays.length > 0 && (
        <div>
          <h3 className="text-xs uppercase tracking-wider text-white/40 mb-3">Featured</h3>
          {featuredPlays.map((track) => (
            <div key={track.title} className="mb-4 last:mb-0">
              <p className="text-white/80 text-sm font-medium mb-1">{track.title}</p>
              <div className="flex gap-3">
                {track.links.map((link) => (
                  <a
                    key={link.platform}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/50 hover:text-white underline underline-offset-2"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
