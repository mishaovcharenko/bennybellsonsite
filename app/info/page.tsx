import { PageShell } from "@/components/layout/PageShell";
import { SectionHero } from "@/components/ui/SectionHero";
import { ContactBlock } from "@/components/info/ContactBlock";
import { site } from "@/data/site";
import { contacts } from "@/data/contacts";

export default function InfoPage() {
  const socials = [
    { label: "Twitter", href: site.twitterUrl },
    { label: "Instagram", href: site.instagramUrl },
    { label: "TikTok", href: site.tiktokUrl },
    { label: "YouTube", href: site.youtubeUrl },
  ].filter((s) => s.href);

  return (
    <PageShell>
      <SectionHero
        title="Info"
        subtitle="Contact, management, press."
      />
      <section className="mb-16">
        <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4">
          Bio
        </h2>
        <p className="text-white/80 leading-relaxed max-w-xl">
          Artist. Making music and building a world. Independent. Part of Twisted n Luv.
        </p>
      </section>
      <section className="mb-16">
        <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4">
          Contact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contacts.map((contact) => (
            <ContactBlock key={contact.id} contact={contact} />
          ))}
        </div>
      </section>
      {socials.length > 0 && (
        <section>
          <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4">
            Social
          </h2>
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
    </PageShell>
  );
}
