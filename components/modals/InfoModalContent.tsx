"use client";

import { site } from "@/data/site";
import { contacts } from "@/data/contacts";
import { ContactBlock } from "@/components/info/ContactBlock";

export function InfoModalContent() {
  const socials = [
    { label: "Instagram", href: site.instagramUrl },
    { label: "YouTube", href: site.youtubeUrl },
    { label: "TikTok", href: site.tiktokUrl },
    { label: "SoundCloud", href: site.soundcloudUrl },
  ].filter((s) => s.href);

  return (
    <div className="space-y-10">
      <p className="text-white/60 max-w-xl">Contact &amp; newsletter. Press/booking on request.</p>
      <section>
        <h3 className="text-sm uppercase tracking-wider text-white/50 mb-4">Bio</h3>
        <div className="space-y-3 text-white/80 leading-relaxed max-w-xl">
          <p>
            Benny Bellson is a California-born independent alternative artist known for eccentric
            vocal inflections and genre-blending songwriting, with a catalog that has recently surged
            on streaming platforms.
          </p>
          <p>
            From an early grungy debut with &quot;Wasteful Games&quot; through the &quot;Posters&quot; era and
            into the breakout moment of &quot;theclubrock,&quot; the trajectory has been a steady build —
            now at ~2.3M monthly listeners on Spotify. Member of the band Twisted N&apos; Luv.
          </p>
        </div>
      </section>
      <section>
        <h3 className="text-sm uppercase tracking-wider text-white/50 mb-4">Contact</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contacts.map((contact) => (
            <ContactBlock key={contact.id} contact={contact} />
          ))}
        </div>
      </section>
      {socials.length > 0 && (
        <section>
          <h3 className="text-sm uppercase tracking-wider text-white/50 mb-4">Social</h3>
          <div className="flex gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white underline"
              >
                {s.label}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
