"use client";

import { site } from "@/data/site";

const platforms = [
  { name: "Spotify", href: site.spotifyUrl, description: "Stream" },
  { name: "Apple Music", href: site.appleMusicUrl, description: "Stream" },
  { name: "SoundCloud", href: site.soundcloudUrl, description: "Stream" },
].filter((p) => p.href);

export function ListenModalContent() {
  return (
    <div>
      <p className="text-sm text-white/50 mb-5">Listen on your preferred platform.</p>
      <ul className="list-none">
        {platforms.map((p, i) => (
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
      {platforms.length === 0 && (
        <p className="text-white/50 text-sm">Links coming soon.</p>
      )}
    </div>
  );
}
