"use client";

import { site } from "@/data/site";
import { contacts } from "@/data/contacts";
import { ContactBlock } from "@/components/info/ContactBlock";

export function InfoModalContent() {
  const socials = [
    { label: "Twitter", href: site.twitterUrl },
    { label: "Instagram", href: site.instagramUrl },
    { label: "TikTok", href: site.tiktokUrl },
    { label: "YouTube", href: site.youtubeUrl },
  ].filter((s) => s.href);

  return (
    <div className="space-y-10">
      <p className="text-white/60 max-w-xl">Contact, management, press.</p>
      <section>
        <h3 className="text-sm uppercase tracking-wider text-white/50 mb-4">Bio</h3>
        <p className="text-white/80 leading-relaxed max-w-xl">
          Artist. Making music and building a world. Independent. Part of Twisted n Luv.
        </p>
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
