import Link from "next/link";
import { Section, SectionHeader } from "@/components/layout/section";
import { SpeciesShowcase } from "@/components/marketing/species-showcase";

export default function HomePage() {
  return (
    <>
      {/* Species showcase — hero video, extends under transparent header */}
      <SpeciesShowcase />

      {/* Supporting text + CTAs — dark full-bleed */}
      <section className="relative overflow-hidden bg-[oklch(0.16_0.025_260)] px-6 pt-8 pb-16 sm:py-28">
        <span className="absolute left-8 top-8 select-none font-mono text-2xl leading-none text-white/15">+</span>
        <span className="absolute right-8 top-8 select-none font-mono text-2xl leading-none text-white/15">+</span>
        <span className="absolute bottom-8 left-8 select-none font-mono text-2xl leading-none text-white/15">+</span>
        <span className="absolute bottom-8 right-8 select-none font-mono text-2xl leading-none text-white/15">+</span>

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <p className="text-base font-medium leading-snug text-white sm:text-xl">
              Of a billion or so species on Earth, humans have full genomic
              sequences for fewer than 100,000 of them. Within the genomic
              data of the remaining 99.999% of life lies the future of drug
              discovery, food security, materials science, and biotech. And
              like every precious resource, this data is unevenly distributed
              across (and within) geographic boundaries.
            </p>
            <p className="text-base font-medium leading-snug text-white sm:text-xl">
              Fairfield enables sovereign providers of this data to benefit
              from contributing it to global science, while providing
              researchers with clear contractual terms for the commercial use
              of validated data. To unblock the bottleneck, we provide
              validated data and legal frameworks, ensuring that everything
              that's discovered can benefit everyone, everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Problem — massive stat numbers */}
      <section className="border-t border-border py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            label="The Problem"
            title="A global data discovery crisis"
            description="The world's biological data is vast, urgent, and almost entirely inaccessible."
            className="max-w-2xl"
          />
          <div className="mt-16 grid divide-y border-t border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              {
                stat: "<0.01%",
                label: "of species on Earth have full genomic sequences available",
                detail:
                  "Of a billion or so species, we have meaningful genomic data for a vanishingly small fraction. The potential locked in the rest is enormous, urgent, and untapped.",
              },
              {
                stat: "95%+",
                label: "of genomic data requests are rejected or ignored",
                detail:
                  "Countries, institutions, communities, and companies hold vast collections of data, but refuse to make them available. They\u2019ve been burned. Biological data is extracted, value gets exploited, and providers see nothing in return.",
              },
              {
                stat: "0",
                label: "trusted commercial mechanisms to make the world\u2019s biological data discoverable to everyone",
                detail:
                  "The Nagoya Protocol established policy frameworks. But no commercial infrastructure exists to give providers the legal protections and revenue they need to participate, and to give users binding assurance that their data is valid and legal.",
              },
            ].map((item, i) => (
              <div
                key={item.stat}
                className={`py-10 sm:py-0 ${i === 0 ? "sm:pr-12" : i === 1 ? "sm:px-12" : "sm:pl-12"}`}
              >
                <p className="font-mono font-bold leading-none tracking-tight text-primary text-7xl sm:text-8xl">
                  {item.stat}
                </p>
                <p className="mt-4 text-base font-semibold text-foreground sm:mt-6">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <Section>
        <SectionHeader
          label="The Solution"
          title="A trusted marketplace for genomic data"
          description="Fairfield creates the commercial layer where policy alone has failed. Providers retain sovereignty. Users get legal access. Everyone benefits from what the data produces."
        />
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Sovereignty preserved",
              description:
                "Fairfield operates a federated model, in which genomic data remains on provider infrastructure, under provider control. Data never leaves the provider, until a contract is signed.",
              icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              ),
            },
            {
              title: "Revenue on commercialization",
              description:
                "Providers gain financial benefits whenever their data contributes to commercial outcomes, from drug discovery and beyond, to AI model training. For validated non-commercial research, access is free.",
              icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
              ),
            },
            {
              title: "Legally clear",
              description:
                "Everything in Fairfield\u2019s catalog of data is governed by clear contractual terms built up from Nagoya Access and Benefit Sharing frameworks.",
              icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              ),
            },
            {
              title: "Annotation, harmonization, and metadata",
              description:
                "Fairfield validates and enriches provider data at no cost to users or providers. Genomic metadata makes provider data discoverable by users, and returns immediate value to providers themselves.",
              icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                </svg>
              ),
            },
            {
              title: "Advancing global research",
              description:
                "Academic and validated researchers get access free; the commercial model is integral to funding science in non-commercial context. The world\u2019s data benefits the world\u2019s scientists.",
              icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
              ),
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
                {item.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* What Drives Us — dark full-bleed */}
      <section className="relative overflow-hidden bg-[oklch(0.16_0.025_260)] px-6 py-28">
        {/* Corner registration marks */}
        <span className="absolute left-8 top-8 font-mono text-2xl leading-none text-white/15 select-none">+</span>
        <span className="absolute right-8 top-8 font-mono text-2xl leading-none text-white/15 select-none">+</span>
        <span className="absolute bottom-8 left-8 font-mono text-2xl leading-none text-white/15 select-none">+</span>
        <span className="absolute bottom-8 right-8 font-mono text-2xl leading-none text-white/15 select-none">+</span>

        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              What Drives Us
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Why this matters
            </h2>
          </div>
          <div className="mt-16 grid gap-14 sm:grid-cols-3">
            {[
              {
                num: "01",
                title: "Invaluable, incalculable potential",
                body: "From novel therapeutics to climate-resilient crops to advances in biotech we can't yet imagine, the breakthroughs dormant in unsequenced biology will reshape entire industries.",
              },
              {
                num: "02",
                title: "Economic value for providers",
                body: "The commercial value of this data belongs, in part, to the sovereign providers who contribute it. Fairfield ensures providers benefit, whenever their genomic data creates commercial outcomes.",
              },
              {
                num: "03",
                title: "Scientific value for everyone",
                body: "The scientific value produced by this vast reservoir of new knowledge can't be carried across borders, just to end up in someone's moat. Fairfield is independent infrastructure to benefit everyone, everywhere, forever.",
              },
            ].map((item) => (
              <div key={item.num}>
                <p className="font-mono text-sm font-bold tracking-widest text-accent">
                  {item.num}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/55">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two audiences */}
      <Section>
        <SectionHeader
          label="Who We Serve"
          title="Two sides of a single marketplace"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          <div className="border border-border p-10">
            <h3 className="text-2xl font-semibold text-foreground">
              For Data Providers
            </h3>
            <p className="mt-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Nations, institutions, and collections
            </p>
            <div className="my-6 border-t border-border" />
            <p className="text-base leading-relaxed text-muted-foreground">
              Your genomic data is sovereign. Fairfield gives you a safe,
              legal, and commercially rewarding way to make it available to the
              world&mdash;without giving up control.
            </p>
          </div>

          <div className="border border-border p-10">
            <h3 className="text-2xl font-semibold text-foreground">
              For Researchers &amp; Industry
            </h3>
            <p className="mt-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Pharma, biotech, ag tech, AI, and academia
            </p>
            <div className="my-6 border-t border-border" />
            <p className="text-base leading-relaxed text-muted-foreground">
              Access genomic data that has been locked away for decades.
              Validated, annotated, and governed by clear legal terms. No more
              rejected requests. No more legal risk.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA — dark with corner marks */}
      <section className="relative overflow-hidden bg-primary px-6 py-28 text-primary-foreground">
        <span className="absolute left-8 top-8 font-mono text-2xl leading-none text-primary-foreground/20 select-none">+</span>
        <span className="absolute right-8 top-8 font-mono text-2xl leading-none text-primary-foreground/20 select-none">+</span>
        <span className="absolute bottom-8 left-8 font-mono text-2xl leading-none text-primary-foreground/20 select-none">+</span>
        <span className="absolute bottom-8 right-8 font-mono text-2xl leading-none text-primary-foreground/20 select-none">+</span>

        <div className="mx-auto max-w-4xl text-center">
          <p className="text-lg leading-relaxed text-primary-foreground/90 sm:text-xl">
            Fairfield Bio is in active conversations with national governments, research institutions,<br className="hidden sm:block" />
            and global health organizations across six continents.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-primary-foreground/75 sm:text-xl">
            Whether you&apos;re generating unique genomic data, or need access to that novel data for R&amp;D,<br className="hidden sm:block" />
            we&apos;d love to figure out how to unblock the bottleneck together.
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
