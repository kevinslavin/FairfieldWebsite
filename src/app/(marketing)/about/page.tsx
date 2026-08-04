import { Section, SectionHeader } from "@/components/layout/section";

export const metadata = {
  title: "About",
  description:
    "Who we are and why we're building a trusted marketplace for the world's non-human genomic data.",
};

// NOTE: First-pass founder bios drafted from public information — Kevin and
// Mitch should review and correct. Headshots are placeholders (initials);
// drop real photos in public/team/ and set the `photo` field to switch them in.
const founders = [
  {
    name: "Kevin Slavin",
    role: "Co-Founder",
    initials: "KS",
    photo: null as string | null,
    bio: [
      "Kevin has spent his career at the meeting point of technology, design, and the systems that shape how people live. He co-founded the game studio Area/Code, taught at the MIT Media Lab where he founded the Playful Systems group, and has worked across research, art, and industry on the ways complex systems become legible and usable.",
      "At Fairfield, he's focused on turning a policy problem into working infrastructure: giving providers of genomic data a way to share it that is sovereign, legal, and fairly rewarded.",
    ],
  },
  {
    name: "Mitch Wolfe",
    role: "Co-Founder",
    initials: "MW",
    photo: null as string | null,
    bio: [
      "Mitch brings the operating and commercial experience behind Fairfield's marketplace — the contracts, partnerships, and go-to-market work that let sovereign providers and researchers actually transact.",
      "His focus is building the trust and the terms that have been missing: clear benefit-sharing for the institutions that hold the world's biological data, and dependable, validated access for the people who put it to use.",
    ],
  },
];

function InitialsAvatar({ initials }: { initials: string }) {
  return (
    <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-sm bg-primary/10 font-mono text-4xl font-bold tracking-tight text-primary">
      {initials}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <Section className="pt-28">
        <SectionHeader
          label="About Fairfield"
          title="Infrastructure for the world's biological data"
          description="Fairfield Bio is building the first trusted marketplace for non-human genomic data — a place where sovereign providers can share what they hold safely and profitably, and where researchers get validated, legally clear access to data that has been out of reach for decades."
        />
      </Section>

      {/* Story / mission — dark full-bleed */}
      <section className="relative overflow-hidden bg-[oklch(0.16_0.025_260)] px-6 py-28">
        <span className="absolute left-8 top-8 select-none font-mono text-2xl leading-none text-white/15">+</span>
        <span className="absolute right-8 top-8 select-none font-mono text-2xl leading-none text-white/15">+</span>
        <span className="absolute bottom-8 left-8 select-none font-mono text-2xl leading-none text-white/15">+</span>
        <span className="absolute bottom-8 right-8 select-none font-mono text-2xl leading-none text-white/15">+</span>

        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Why We Exist
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              A resource the world can't reach
            </h2>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-16">
            <p className="text-base leading-relaxed text-white/70 sm:text-lg">
              Most of life on Earth has never been sequenced, and much of what
              has been is locked away. Institutions, communities, and countries
              hold vast biological collections, but too often the data gets
              extracted, the value gets captured elsewhere, and the providers
              see nothing back. So they stop sharing.
            </p>
            <p className="text-base leading-relaxed text-white/70 sm:text-lg">
              Policy frameworks like the Nagoya Protocol set out how benefits
              should be shared, but no commercial infrastructure existed to make
              that real. We started Fairfield to build it: a marketplace where
              providers keep control and get paid when their data creates
              commercial value, and where non-commercial research stays free.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <Section>
        <SectionHeader
          label="Who We Are"
          title="The team behind Fairfield"
        />
        <div className="mt-14 grid gap-12 sm:grid-cols-2">
          {founders.map((person) => (
            <div key={person.name} className="flex flex-col gap-6">
              <InitialsAvatar initials={person.initials} />
              <div>
                <h3 className="text-2xl font-semibold text-foreground">
                  {person.name}
                </h3>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-primary">
                  {person.role}
                </p>
                <div className="mt-5 space-y-4">
                  {person.bio.map((para, i) => (
                    <p key={i} className="text-base leading-relaxed text-muted-foreground">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA — dark with corner marks */}
      <section className="relative overflow-hidden bg-primary px-6 py-28 text-primary-foreground">
        <span className="absolute left-8 top-8 select-none font-mono text-2xl leading-none text-primary-foreground/20">+</span>
        <span className="absolute right-8 top-8 select-none font-mono text-2xl leading-none text-primary-foreground/20">+</span>
        <span className="absolute bottom-8 left-8 select-none font-mono text-2xl leading-none text-primary-foreground/20">+</span>
        <span className="absolute bottom-8 right-8 select-none font-mono text-2xl leading-none text-primary-foreground/20">+</span>

        <div className="mx-auto max-w-4xl text-center">
          <p className="text-lg leading-relaxed text-primary-foreground/90 sm:text-xl">
            Whether you hold genomic data the world hasn't seen, or you need
            access to it for your research, we'd like to hear from you.
          </p>
          <a
            href="mailto:info@fairfieldbio.com"
            className="mt-10 inline-flex h-12 items-center rounded-sm bg-primary-foreground px-10 text-sm font-semibold uppercase tracking-widest text-primary transition-colors hover:bg-primary-foreground/90"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </>
  );
}
