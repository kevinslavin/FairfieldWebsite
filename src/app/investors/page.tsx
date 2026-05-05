'use client';

import { useState, useEffect, useRef } from 'react';

const PASSWORD = 'nagoya-periwinkle';
const SESSION_KEY = 'ffb_investor_2026q1';

const NAV_SECTIONS = [
  { id: 'opening', label: 'Opening' },
  { id: 'funding', label: 'Funding Closed' },
  { id: 'team', label: 'Head of Science & Advisors' },
  { id: 'website', label: 'Website' },
  { id: 'market', label: 'Market Discovery' },
  { id: 'kenya', label: 'Kenya & UK' },
  { id: 'georgia', label: 'Georgia' },
  { id: 'kinray', label: 'Kinray Hub' },
  { id: 'singapore', label: 'Singapore' },
  { id: 'irri', label: 'IRRI' },
  { id: 'product', label: 'Fairfield Select' },
  { id: 'competitive', label: 'Competitive Landscape' },
  { id: 'legislative', label: 'Legislative Tailwinds' },
  { id: 'platform', label: 'Platform Infrastructure' },
  { id: 'concerns', label: 'On Our Mind' },
  { id: 'opportunities', label: 'Biggest Opportunities' },
  { id: 'help', label: 'How You Can Help' },
];

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      onUnlock();
    } else {
      setShake(true);
      setValue('');
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f8f5] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[340px]">
        <div className="mb-10">
          <p className="text-[12px] tracking-[0.18em] text-stone-400 uppercase font-medium mb-2">
            Fairfield Bio
          </p>
          <h1 className="text-[26px] font-medium text-stone-900 tracking-tight leading-tight">
            Investor Update
          </h1>
          <p className="text-base text-stone-400 mt-1">February – April 2026</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[12px] tracking-[0.14em] text-stone-400 uppercase mb-2">
              Access code
            </label>
            <input
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
              autoComplete="off"
              className={`w-full bg-white border rounded px-4 py-3 text-base text-stone-900 outline-none transition-colors font-mono placeholder:text-stone-300 ${
                shake ? 'border-red-300 bg-red-50' : 'border-stone-200 focus:border-stone-400'
              }`}
              placeholder="···"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-stone-900 text-white text-[15px] py-3 rounded hover:bg-stone-700 transition-colors tracking-wide"
          >
            Continue
          </button>
        </form>
        <p className="text-[12px] text-stone-300 mt-8 text-center tracking-wide">
          Confidential — investors and advisors only
        </p>
      </div>
    </div>
  );
}

function SectionLink({
  section,
  active,
}: {
  section: (typeof NAV_SECTIONS)[number];
  active: boolean;
}) {
  return (
    <a
      href={`#${section.id}`}
      onClick={(e) => {
        e.preventDefault();
        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
      }}
      className={`block text-[18px] leading-snug py-2 transition-colors ${
        active ? 'text-white font-medium' : 'text-stone-500 hover:text-stone-300'
      }`}
    >
      {section.label}
    </a>
  );
}

function Divider() {
  return <hr className="border-stone-200 my-10" />;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[25px] font-medium text-stone-900 tracking-tight mb-5 leading-snug">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[20px] font-semibold text-stone-700 mt-7 mb-3 tracking-tight">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[20px] text-stone-700 leading-relaxed mb-5">{children}</p>;
}

function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-2 mb-4 pl-0">{children}</ul>;
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="text-[20px] text-stone-700 leading-relaxed flex gap-3">
      <span className="text-stone-300 select-none mt-[3px] shrink-0">—</span>
      <span>{children}</span>
    </li>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-stone-900 pl-4 my-6">
      <p className="text-[20px] text-stone-800 leading-relaxed italic">{children}</p>
    </div>
  );
}

function UpdateContent({ activeSection }: { activeSection: string }) {
  return (
    <div className="flex min-h-screen bg-[#f9f8f5]">
      {/* Left sidebar */}
      <aside className="hidden lg:block w-[300px] shrink-0 sticky top-0 h-screen overflow-y-auto bg-stone-900 px-7 py-10">
        <div className="mb-8">
          <p className="text-[13px] tracking-[0.18em] text-stone-500 uppercase font-medium mb-1">
            Fairfield Bio
          </p>
          <p className="text-[19px] text-white font-medium leading-snug">
            Investor Update
          </p>
          <p className="text-[15px] text-stone-500 mt-0.5">Feb – Apr 2026</p>
        </div>
        <nav className="space-y-0.5">
          {NAV_SECTIONS.map((section) => (
            <SectionLink
              key={section.id}
              section={section}
              active={activeSection === section.id}
            />
          ))}
        </nav>
        <div className="mt-10 pt-6 border-t border-stone-700">
          <p className="text-[13px] text-stone-600 uppercase tracking-widest">Confidential</p>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-10 bg-[#f9f8f5]/95 backdrop-blur-sm border-b border-stone-100 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[10px] tracking-[0.15em] text-stone-400 uppercase">
              Fairfield Bio
            </span>
            <span className="text-stone-200 mx-2">·</span>
            <span className="text-[11px] text-stone-500">Investor Update, Feb–Apr 2026</span>
          </div>
          <span className="text-[9px] tracking-widest text-stone-300 uppercase">Confidential</span>
        </div>
        <nav className="flex gap-3 overflow-x-auto pb-0.5 scrollbar-hide">
          {NAV_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`shrink-0 text-[11px] py-1 transition-colors ${
                activeSection === section.id
                  ? 'text-stone-900 font-medium'
                  : 'text-stone-400'
              }`}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-[680px] mx-auto px-6 lg:px-12 py-12 lg:py-16 mt-16 lg:mt-0">
        {/* Header */}
        <header className="mb-12">
          <p className="text-[14px] tracking-[0.15em] text-stone-400 uppercase font-medium mb-4">
            April 30, 2026 · Confidential
          </p>
          <p className="text-[22px] text-stone-600 leading-relaxed">
            Dear Investors and Advisors,
          </p>
        </header>

        {/* Opening */}
        <section id="opening">
          <SectionHeading>Fairfield&rsquo;s first three months</SectionHeading>
          <P>
            Catching up: this is our first formal investor update, with lots to share.
          </P>
          <P>
            The last three months have been, um, operationally intensive. We opened, and then concluded,
            funding with all of your support. We brought on our first science hire and fractional
            admin support, built and tested the mvp of our first product, launched a first website,
            traveled to meetings in seven countries (governments, institutions, and potential
            providers and users) and began establishing our Singapore data operations entity. In
            total we&rsquo;ve done over 70 meetings on four continents to better understand the
            market, and to start developing it.
          </P>
          <P>
            As a side note, immediately following a CDC biosecurity dinner from our partners at
            Commonweal, Kevin contracted Epstein-Barr virus in a consequential way (Mitch notes
            this is correlation, not causation!) This has slowed us down a bit, but we are adapting
            and Kevin gains a little more energy every day. Nothing stops, it just forces
            prioritization wrt time and energy.
          </P>
        </section>

        <Divider />

        {/* Funding */}
        <section id="funding">
          <SectionHeading>Funding Closed</SectionHeading>
          <P>
            We completed our pre-seed round at ~$2M on a $15M post-money valuation; all SAFEs are
            signed, all wires received.
          </P>
          <P>
            Thank you to everyone here. We are grateful for your early and meaningful conviction in
            what we&rsquo;re building, and we are working hard to make best possible use of your
            support.
          </P>
          <P>
            We may also be pursuing 250-500k in additional funding shortly; see below.
          </P>
        </section>

        <Divider />

        {/* Team */}
        <section id="team">
          <SectionHeading>Head of Science, Advisors</SectionHeading>
          <P>
            We made our first key hire, Head of Science. Name to be disclosed later, she brings
            deep expertise in environmental genomics, microbial ecology, and data standards, with a
            solid professional background including working with the NIH. Her official employee
            start date is September 2026 with equity and a defined set of responsibilities spanning
            data quality, demand-led brokerage support, provider architecture, and science
            leadership. This hire fills the single most important gap in the founding team (and has
            some other positive nuance to discuss offline.)
          </P>
          <P>
            Among other advisors, we continue to work closely with <strong>John Wilbanks</strong>.
            John is a pioneer in open science and genomic data governance. He was former Head of
            Data at Biogen, founding Executive Director of Science Commons at Creative Commons, and
            a Senior Fellow at the Datasphere Initiative. He&rsquo;s been instrumental in shaping
            our federated architecture, our thinking on data licensing frameworks, and the legal
            structures around provider agreements. We have regular check-ins with John, and
            he&rsquo;s contributed directly to the design of our access and benefit-sharing model.
          </P>
          <P>
            We&rsquo;ve also added <strong>Krystal Pacifico</strong> as fractional admin support;
            she&rsquo;s been invaluable.
          </P>
        </section>

        <Divider />

        {/* Website */}
        <section id="website">
          <SectionHeading>Website</SectionHeading>
          <P>
            Our website is live at{' '}
            <a
              href="https://fairfieldbio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-900 underline underline-offset-2 hover:text-stone-600"
            >
              fairfieldbio.com
            </a>
            . It establishes our public identity and core positioning: the global marketplace for
            non-human genomic data.
          </P>
          <P>
            It&rsquo;s also the first version of our public-facing messaging as the{' '}
            <strong>&ldquo;Global marketplace for genomic discovery.&rdquo;</strong> We&rsquo;ve
            identified &ldquo;discovery&rdquo; as the common goal for both{' '}
            <em>providers</em> (looking to discover novel genomic data, and looking to make that
            data discoverable) and <em>users</em> (looking to make new discoveries in their field,
            using novel genomic data).
          </P>
          <P>
            We are continuing to develop it, but we now have a front door. Next steps are
            segment-specific messaging, and deeper product content. What&rsquo;s up right now is
            genuine MVP; feedback and input welcome.
          </P>
        </section>

        <Divider />

        {/* Market Discovery */}
        <section id="market">
          <SectionHeading>Active Market Discovery and Development for Users, Providers, and Partners</SectionHeading>
          <P>
            We&rsquo;ve been doing intensive market discovery and development on both sides of the
            marketplace. We&rsquo;ve been talking to potential users (pharma, biotech, agtech,
            industrials) and providers (national biodiversity agencies, research institutions,
            botanical gardens, microbial culture collections and wildcards like phage research and
            food staple institutes)
          </P>
          <P>
            We&rsquo;ve found is a landscape that is wildly heterogeneous in its concerns, hopes,
            plans, and capabilities. No two conversations sound the same. That said, we identified
            several actionable trends and conclusions.
          </P>

          <SubHeading>Users</SubHeading>
          <P>
            We&rsquo;re sharpening our near-term focus toward{' '}
            <strong>user sectors where the value of novel biological data is high</strong> and the{' '}
            <strong>combined R&amp;D and regulatory cycles are measured in 1&ndash;3 years.</strong>{' '}
            This is as opposed to many sectors in traditional pharma drug development, where the
            cycle can be more like 5-10 years.
          </P>
          <P>
            That leads us to prioritize <strong>agtech/agrochemicals</strong> (biopesticides,
            biostimulants, crop protection), and <strong>industrials</strong> (enzymes, specialty
            chemicals, flavors &amp; fragrances). There are also specific{' '}
            <strong>subsets of pharma</strong> (particularly natural product screening and enzyme
            engineering) where the path from sequence data to commercial application is shorter,
            and unlikely to be displaceable in near / medium term by purely bio-computational
            approaches.
          </P>
          <P>
            We&rsquo;ve now had in-person meetings with three multinational providers: two in
            fertile sectors of pharma, and one in consumer-facing industrial. Each of them
            immediately understood the value of our demand-led brokerage model / product, and we
            intend to be able to get at least one of them onboard using it in the next quarter.
            We&rsquo;ve now optimized the positioning, offering, and approach for these specific
            sectors users, and we&rsquo;re just starting to broaden the funnel to develop them.
          </P>

          <SubHeading>Providers</SubHeading>
          <P>
            Most of the last three months have been spent in provider meetings, to better
            understand what the marketplace will be able to deliver effectively, and its value to
            specific user classes.
          </P>
          <P>
            We&rsquo;re honing in on areas that are be most likely to have immediate value to the
            early market. One area we&rsquo;ve identified is <strong>terpenes,</strong> the largest
            class of natural products, responsible for everything from the scent of pine trees to
            blockbuster cancer drugs like paclitaxel (Taxol). Terpenes are produced by enzymes
            called terpene synthases, and{' '}
            <strong>
              the vast majority of terpene synthases in nature remain undiscovered. They are
              sitting in plant and microbial collections worldwide, catalogued but unsequenced.
            </strong>
          </P>
          <P>
            The global terpene market is $700M&ndash;$1.2B today and projected to reach
            $2&ndash;2.4B by 2033, with demand driven by pharma, flavor &amp; fragrance,
            agrochemicals, and industrial biotech. What makes terpenes especially interesting for
            us is that the discovery bottleneck isn&rsquo;t computational, it&rsquo;s access to
            novel source organisms and legal/cleared genetic resources, and that&rsquo;s what
            we&rsquo;re here for.
          </P>
          <P>
            We&rsquo;ve also gone deeper into discussions, heading towards LOIs with a a
            multilateral crop research institution with its own genebank, a phage research
            institute, and a large scale fungus research specimen lab. Each of these hold large
            repos of existing or potential OOD sequences that have never been exposed to a global
            market.
          </P>

          <SubHeading>Partners</SubHeading>
          <P>
            Among partner meetings, our most extraordinary was In Singapore with{' '}
            <strong>Illumina</strong>, which produces the hardware that produces 90% of all genomic
            data produced globally. We met with four senior people including Michael Abdo, the lead
            for non-human genomic data Illumina AMEA.{' '}
            <strong>
              Illumina was powerfully excited about what we&rsquo;re building, which could become
              a big deal for them and for Fairfield.
            </strong>
          </P>
          <P>
            In the room, they immediately grasped the commercial logic, in which Fairfield creates
            incentives for providers to <em>produce genomic data they currently have no financial
            incentive to sequence</em>. For Illumina, this means greater sequencing demand, and
            use, their core business; Fairfield&rsquo;s success would expand their TAM
            meaningfully.
          </P>
          <P>
            Abdo (non-human genomics lead) lit up to suggest two key ideas: 1) illumina can
            integrate Fairfield directly into their pipeline, the same way e.g., Netflix is
            integrated into your smart TV remote. Consider sequencing something on an illumina seq
            and being able to upload it to Fairfield directly. Notional, but Illumina&rsquo;s
            lead, and the right direction. 2) Abdo noted &ldquo;what you guys are building is
            basically the backbone for gig sequencing&rdquo; as in, the same way uber allowed
            anyone to become a financialized driver, Fairfield allows anyone to become a
            financialized genomic data provider. Again, what&rsquo;s remarkable is that these came
            from the non-human genomics lead at Illumina.
          </P>
          <P>
            They expressed strong interest in pursuing collaboration, and we shared our full
            presentation materials. As the dominant sequencing platform globally, Illumina&rsquo;s
            enthusiasm is both validating and strategically significant. If we can formalize this
            relationship, it could accelerate provider onboarding significantly, and rapidly.
            Identifying who to work with to move this up the chain at Illumina San Diego HQ.
          </P>

          <SubHeading>Value proposition lands quickly</SubHeading>
          <P>
            On both sides &mdash; users and providers &mdash; people are quick to understand what
            Fairfield is building and why it matters. We&rsquo;ve found that the phrase{' '}
            <strong>&ldquo;bringing non-human genomics from the Napster era to the Spotify
            era&rdquo;</strong> has been a sort-of-stupid but very effective shortcut in meetings.
          </P>
          <P>
            It captures the core idea, which us that right now, genomic data either gets dumped
            into public databases with no possible provenance, validation, or compensation
            (Napster), or it stays locked up in institutional silos doing no one any good.
            Fairfield creates the legitimate, structured marketplace (Spotify) where providers get
            paid and users get clean, frictionless, risk-free access.
          </P>
          <P>
            Insofar as there&rsquo;s resistance, it comes from people and institutions who trust
            our intentions but can&rsquo;t yet see &ldquo;how it&rsquo;s all gonna really work.&rdquo;
            The concept is compelling; the execution is what they&rsquo;re waiting to see, and as
            always it&rsquo;s hard to get the first provider across the line, which is why we are
            focusing on leading with demand, see below.
          </P>
          <P>
            There are also some concerns (voiced openly in meetings) about the geopolitical
            dimension of Fairfield&rsquo;s status as an American company in 2026. These are offset
            in part by Mitch&rsquo;s experience, credibility, connections, and reputation, and will
            be further offset when our Singapore entity is up and running (next quarter).
          </P>
        </section>

        <Divider />

        {/* Kenya & UK */}
        <section id="kenya">
          <SectionHeading>Kenya and UK, Institutional Credibility (March 2&ndash;12)</SectionHeading>
          <P>
            Mitch spent 10 days across Nairobi and London/Windsor, speaking at the CEPI/PPX
            Technical Consultation in Kenya and moderating a WHO Berlin Hub meeting at Windsor
            Castle. The trip generated 50+ follow-ups and a set of institutional relationships that
            would have taken years to build through conventional channels.
          </P>
          <SubHeading>Key outcomes:</SubHeading>
          <Ul>
            <Li>
              <strong>WHO Berlin Hub</strong> (Dr. Oliver Morgan, Joseima Campos): Now a strong
              institutional supporter. The Berlin Hub leads WHO&rsquo;s global surveillance
              function for health emergencies. They immediately understood Fairfield&rsquo;s model
              and connected us to providers in Latin America (Costa Rica, Chile, Argentina) and to
              the Vice Dean of the National University of Singapore.
            </Li>
            <Li>
              <strong>Wellcome Trust</strong> (Dr. Josie Golding): Deep strategic alignment.
              Wellcome is connecting us to three high-value partners: Prof. Mark Blaxter at
              Wellcome Sanger (Darwin Tree of Life programme &mdash; sequencing all biology on
              Earth), Wellcome&rsquo;s Discovery Research team (active fungal programme with Kew
              Gardens), and the SEDRI laboratory information system. An important new idea emerged:
              Fairfield could reprocess and improve existing public genomic data &mdash; which is
              often fragmented and poorly annotated &mdash; and attach provenance ledgers to it,
              significantly expanding marketplace scale.
            </Li>
            <Li>
              <strong>Kew Gardens</strong> (China Williams): Ground-level ABS compliance
              intelligence from one of the world&rsquo;s foremost practitioners. Surfaced concrete
              operational complexity in country-specific ABS obligations (Cameroon, Malawi,
              Indonesia). Key insight is that capacity building, not revenue sharing alone, helps
              build trust with providers.
            </Li>
            <Li>
              <strong>Africa CDC</strong>: Key decision maker identified (Dr. Yenew Kebede Tebeje,
              HQ Addis Ababa), who recently launched AGARI, a continent-wide genomic data sharing
              platform.
            </Li>
            <Li>
              <strong>CDC Kenya</strong> (U.S. Embassy): Strong interest &mdash; they engaged on
              practical &ldquo;how would this work&rdquo; questions, not treating it as
              speculative. Kenya viewed as a dual-sided early node: provider supply and user demand
              in the same market.
            </Li>
            <Li>
              <strong>CEPI</strong>: Danny Scarponi&rsquo;s EVEscape model (AI-based viral
              mutation prediction, $8M CEPI-funded with Harvard) is directly data-hungry &mdash;
              model confidence is tied to volume and diversity of genomic sequences, which is
              exactly what Fairfield&rsquo;s marketplace is designed to provide.
            </Li>
            <Li>
              <strong>Kenya CBD National Authority</strong>: Met with Priscillar Mumo and Kavaka
              Mukonyi Watai (Chair, National ABS Permitting Committee). They were explicit:
              capacity building may be the single most important benefit Fairfield can offer, more
              so than financial returns.
            </Li>
            <Li>
              <strong>Prof. David Heymann</strong> (LSHTM): One of the world&rsquo;s most
              prominent infectious disease epidemiologists, former WHO Executive Director of
              Communicable Diseases who led the global SARS response. Recommended we engage with CBD Secretariat in Montreal.
            </Li>
          </Ul>
          <P>
            Between the CEPI conference (90 registrants from 20+ countries), Windsor Castle, and
            bilateral meetings, Mitch was in sustained contact with WHO, CEPI, Africa CDC, CDC
            Kenya, Harvard Global Health, Rwanda RBC, U.S. Embassy Nairobi, Wellcome Trust, Kew
            Gardens, LSHTM, and Kenya&rsquo;s national CBD authority. Each of these produced
            concrete next steps and named contacts.
          </P>
        </section>

        <Divider />

        {/* Georgia */}
        <section id="georgia">
          <SectionHeading>Georgia Phage Research and Provider Pipeline (March)</SectionHeading>
          <P>
            Mitch traveled to Tbilisi, Georgia to explore a provider relationship with the{' '}
            <strong>Eliava Institute of Bacteriophages, Microbiology and Virology</strong> &mdash;
            one of the world&rsquo;s most important phage research centers. Eliava holds a
            collection of approximately 6,000 bacteriophage samples, the vast majority of which
            have never been sequenced. This is precisely the kind of out-of-distribution biological
            data that powers Fairfield&rsquo;s marketplace.
          </P>
          <P>
            Phages are, like, having a moment. With antibiotic resistance accelerating globally,
            phage therapy and phage-derived enzymes have serious pharmaceutical and industrial
            interest and attention. Unsequenced phage libraries represent a massive untapped
            resource for drug discovery, industrial biotechnology, and AI model training.
          </P>
          <P>
            Georgia is not a signatory to the Nagoya Protocol, which creates a simpler regulatory
            environment for data access. BioChimPharm, a Georgian phage company with a growing
            number of products on the market, is close with Mitch and interested in exploring
            collaboration opportunities. This is an early-stage conversation, but the potential
            scope, thousands of novel, unsequenced organisms, is wild and significant.
          </P>
        </section>

        <Divider />

        {/* Kinray */}
        <section id="kinray">
          <SectionHeading>Kinray Hub (Indigenous Data Sovereignty: Ecuador / Peru / Brazil)</SectionHeading>
          <P>
            We connected with WarīNkwī Flores (Kinray Hub) and Eduardo Gomez Restrepo (C Minds),
            who are developing a <em>Sovereign Data Supply Chain</em> governance framework for
            territory-originating biological and environmental data. Flores is an Indigenous Data
            Sovereignty scholar and IPBES Fellow leading five pilot implementations across Latin
            America, including environmental DNA bioprospecting in Peru, biocultural credits
            governance through Pachamama Alliance in Ecuador, and AI governance platforms in
            Brazil. The framework is being refined through these pilots for a version 2.0 launch
            at COP17 in Armenia later this year.
          </P>
          <P>
            In our May 4 call, the teams identified strong alignment. Kinray offered two
            collaboration pathways, Fairfield is evaluating which path fits best and identifying a
            candidate project, potentially involving legacy open-database data and how
            Fairfield&rsquo;s benefit-sharing architecture could work retroactively to connect with
            source communities. Kinray Hub noted that they&rsquo;ve refused to work with Basecamp
            research (see below) and the evolving relationship is an important one for critical OOD
            data that&rsquo;s not being made available to anyone else.
          </P>
        </section>

        <Divider />

        {/* Singapore */}
        <section id="singapore">
          <SectionHeading>Singapore Data Operations (April 22&ndash;29)</SectionHeading>
          <P>
            Fairfield spent 10 days in Singapore executing on our plan to establish Singapore as
            the data operations base. We had 25+ scheduled meetings across government, research
            institutions, pharma, and the investment community.
          </P>
          <P>
            The depth of our engagement with Singapore&rsquo;s national infrastructure is hard to
            overstate. In the span of one week, we met with the{' '}
            <strong>U.S. Embassy</strong> (Commercial Counselor Lora Baker and Luanne Theseira,
            who facilitated introductions across the trip), the{' '}
            <strong>Economic Development Board (EDB)</strong>,{' '}
            <strong>A*STAR</strong> (Singapore&rsquo;s national science and research agency &mdash;
            two separate meetings),{' '}
            <strong>NParks</strong> (National Parks Board, Singapore&rsquo;s lead agency to the
            Convention on Biologic Diversity, at the Singapore Botanic Gardens), and presented to
            an <strong>AmCham Singapore</strong> roundtable of 30 registrants from pharma,
            biotech, and government. We are now embedded in Singapore&rsquo;s institutional
            ecosystem at a level that would otherwise have taken a year, and the reception has been
            quite enthusiastic.
          </P>
          <P>
            The geopolitical concerns over an American marketplace for genomic data are very real
            (we heard it voiced frequently in Singapore) so the role of Singapore data ops as
            practical / perceptual counterbalance is crucial.
          </P>
          <SubHeading>Key meetings:</SubHeading>
          <Ul>
            <Li>
              <strong>U.S. Embassy Singapore</strong>: Met with Lora Baker (Commercial Counselor)
              and Luanne Theseira. They facilitated introductions throughout the trip and are
              continuing to support our Singapore engagement. Having the Embassy actively working
              on our behalf opened doors across the government and research landscape.
            </Li>
            <Li>
              <strong>EDB (Singapore&rsquo;s Economic Development Board)</strong>: Met with Sonam
              George and Ray Yi Choun. EDB has already followed up with extensive materials on
              available support programs for Singapore-based biotech operations. We are actively
              working toward Singapore incorporation and formalizing the EDB relationship for
              operational support.
            </Li>
            <Li>
              <strong>A*STAR</strong>: Two meetings &mdash; one with Xueli Chew (a key connector
              since early outreach) and one with SIFBI (Singapore Institute for Food and
              Biotechnology Innovation), with Qian Wen Tan and Vincent Tong. SIFBI followed up
              immediately with next steps. A*STAR is a potential first significant provider of
              genomic data for the marketplace &mdash; and having Singapore&rsquo;s national
              science agency as an early provider would be a powerful signal. Some very promising
              opportunities here.
            </Li>
            <Li>
              <strong>AmCham Singapore</strong>: KEVIN AND Mitch presented at an AmCham
              roundtable &mdash; &ldquo;Global Genomic Discovery: From Pandemic Prevention to
              Building the New Frontier of Human Health, Agriculture, and Industrial
              Innovation.&rdquo; 30 registrants including representatives from pharma, biotech,
              and Singapore government agencies. Dr. Hsien-Hsien Lei (AmCham CEO) has been a
              major connector for the company and continues to open doors.
            </Li>
            <Li>
              <strong>NParks</strong>: Met at Singapore Botanic Gardens with Brian Tan, Gillian
              Khew, and Wendy Yap. Singapore&rsquo;s biodiversity agencies are actively thinking
              about how to increase the commercial value of their data assets, and Fairfield is the
              first entity offering them a concrete path to do so. They have already rejected
              another company that set out to purchase data outright, and were interested in
              Fairfield&rsquo;s provider-benefit model.
            </Li>
            <Li>
              <strong>ClavystBio</strong>: Met with Marcus Tan at their Science Park office.
              ClavystBio is a life sciences investor and venture builder backed by Temasek. Marcus
              was very interested in Fairfield&rsquo;s model, recommended we connect with TRUST
              (Singapore&rsquo;s national data platform) and Paratus, which has deep proprietary
              genomic data on bats, a surprisingly valuable sector of OOD data. Tan also suggested
              ClavystBio and EDBI (EDB&rsquo;s investment arm) as potential investors for our next
              round.
            </Li>
            <Li>
              <strong>PRECISE</strong> (Precision Medicine Initiative): Met with Weiling Zheng.
              Singapore&rsquo;s precision medicine infrastructure is directly relevant to
              Fairfield&rsquo;s federated architecture. Zheng understood immediately the role of
              what we are doing in non-human genomic data, relative to Singapore&rsquo;s large
              initiatives with human genomic data. There&rsquo;s much to learn from how they&rsquo;ve
              built their pipeline, data access, and analysis.
            </Li>
            <Li>
              <strong>Ipsen Pharmaceutical</strong>: Meeting arranged through our Singapore
              contacts.
            </Li>
          </Ul>
          <P>
            Singapore incorporation is now a near-term priority. EDB is engaged. The institutional
            relationships are in place. We are moving from exploration to execution on making
            Singapore our data operations base.
          </P>
        </section>

        <Divider />

        {/* IRRI */}
        <section id="irri">
          <SectionHeading>IRRI, First Institutional Provider Relationship Taking Shape</SectionHeading>
          <P>
            Separately from the Singapore trip, we&rsquo;ve been building a relationship with the{' '}
            <strong>International Rice Research Institute (IRRI.)</strong> IRRI is one of the most
            important agricultural genomics organizations in the world, headquartered in the
            Philippines. Fairfield met with IRRI Director General Dr. Yvonne Pinto, and the
            conversation moved immediately to formal engagement.
          </P>
          <P>
            They are now proceeding with internal clearance for signing an LOI. This would be our
            first formal institutional provider relationship, and it would be a big one.
            IRRI&rsquo;s genomic data holdings in rice and associated species are exactly the kind
            of high-value / well-characterized biological data that agtech and pharma users will
            want to access through our marketplace.
          </P>
        </section>

        <Divider />

        {/* Product */}
        <section id="product">
          <SectionHeading>Fairfield Select in Testing</SectionHeading>
          <P>
            Our first product, Fairfield Select (our demand-led brokerage tool) is in active
            testing. It takes a user&rsquo;s natural language research interest and extracts
            structured query parameters to identify relevant genomic data across our provider
            network.
          </P>
          <P>
            We&rsquo;ve been running systematic tests. Early results show strong parameter
            extraction capability, but we&rsquo;ve identified issues we&rsquo;re actively fixing.
            1) KEGG pathway validation is systematically failing and 2) NCBI Taxonomy mapping is
            inconsistent across queries, and there&rsquo;s hallucination risk in patent family
            suggestions. These are known issues, not surprises, and we&rsquo;re working through
            them.
          </P>
          <P>
            Simultaneously, we&rsquo;ve been building the{' '}
            <strong>Fairfield Data Model (FDM)</strong> which is the core schema that defines how
            we standardize, index, and describe genomic data across providers. FDM v1 is the
            gating work for everything else. It determines what Select can query and what providers
            need to deliver.
          </P>
        </section>

        <Divider />

        {/* Competitive */}
        <section id="competitive">
          <SectionHeading>Competitive Landscape, Basecamp Research</SectionHeading>
          <P>
            We&rsquo;re keeping a close eye on Basecamp Research, which has reached out several
            ways to meet with us (scheduled for May). They&rsquo;re not a competitor in the
            traditional sense, but they operate in the same space and what they&rsquo;re doing is
            important wrt Fairfield.
          </P>
          <P>
            Basecamp (just announced 60m series A with NVIDIA, others) has been gathering
            out-of-distribution genomic data globally. We know they&rsquo;ve negotiated agreements
            with ~27 countries, paying cash up front to providers, and using that data to train
            their own AI models. Their proprietary bio-AI platform is killing it&hellip; they
            announced crazy outcomes at JPM HW in January. But the business model is now clear to
            the outside world, as they recently announced{' '}
            <strong>
              they&rsquo;re developing their own therapeutics from the AI they built on the OOD
              data they&rsquo;ve gathered.
            </strong>
          </P>
          <P>
            This is the best possible advertisement for the value of out-of-distribution genomic
            data, and we view it as a good thing. They are demonstrating real commercial results
            with the extraordinary value of the OOD data Fairfield is building a marketplace
            around.
          </P>
          <P>
            But the Basecamp model is a moat. They &ldquo;own&rdquo; the data they&rsquo;ve
            collected and are disincentivized to share it, this is what powers their competitive
            advantage. Under international treaty (the Nagoya Protocol), any provider that has
            shared data with Basecamp can also share that same data through Fairfield. We want to
            use the same data (and a lot more of it) to power the entire market, not just one
            company&rsquo;s internal model.
          </P>
          <P>
            Basecamp is doing a lot of lifting to establish how valuable this market will be.
            Fairfield is building the marketplace that serves it.
          </P>
        </section>

        <Divider />

        {/* Legislative */}
        <section id="legislative">
          <SectionHeading>Legislative Tailwinds</SectionHeading>
          <P>
            Two bills now pending in Congress directly validate Fairfield&rsquo;s model:
          </P>
          <Ul>
            <Li>
              <strong>The AI-Ready Bio-Data Standards Act</strong> (S. 4069 / H.R. 7907) &mdash;
              Young, Luján, Khanna, Obernolte
            </Li>
            <Li>
              <strong>America&rsquo;s Living Library Act</strong> (S. 4023) &mdash; Padilla,
              Young, Bice, Khanna
            </Li>
          </Ul>
          <P>
            These are hyper relevant and could position the US itself as a key commercial provider
            of OOD data assets.
          </P>
          <P>
            Both emerged from the National Security Commission on Emerging Biotechnology. We are
            working with our contacts and partners in government affairs to track and engage with
            relevant offices.
          </P>
        </section>

        <Divider />

        {/* Platform */}
        <section id="platform">
          <SectionHeading>Platform Infrastructure</SectionHeading>
          <P>
            We completed a comprehensive assessment of federated platforms for our non-human
            genomics marketplace &mdash; evaluating both open-source projects and commercial
            platforms against our requirements. The conclusion: no turnkey solution exists for
            what we&rsquo;re doing. But we don&rsquo;t need to build one from scratch, and we
            don&rsquo;t intend to.
          </P>
          <P>
            To be direct, building SOC-2 compliant infrastructure for heterogeneous
            out-of-distribution genomic data in a global federated architecture is no bullshit.
            Fairfield doesn&rsquo;t have the time or money to build it from the ground up in the
            first 2&ndash;3 years and fortunately we don&rsquo;t have to.
          </P>
          <P>
            We&rsquo;ve identified two existing platforms, <strong>DNAstack</strong> and{' '}
            <strong>Manifold,</strong> that are very well suited to our needs with relatively
            modest modifications. Both were built to do essentially what we need to do, but for{' '}
            <em>human</em> genomic data, namely: federated discovery, access control, metadata
            indexing, and secure data transactions without centralizing raw data. The core
            architecture can be translated directly to non-human genomics. We need to adapt these
            platforms to work with the data model, the licensing layer, and the
            provenance/benefit-sharing workflows (where Fairfield&rsquo;s value lives.)
          </P>
          <P>
            We have CEO-level conversations underway with both companies. The next step is finding
            technical alignment and reaching commercial agreement. Once that&rsquo;s in place, we
            have a platform up and running, one that&rsquo;s already been built, tested, and
            hardened for sensitive genomic data at scale. They bring infrastructure, Fairfield
            brings the marketplace logic, the provider network, and the licensing architecture.
          </P>
        </section>

        <Divider />

        {/* On Our Mind */}
        <section id="concerns">
          <SectionHeading>On Our Mind</SectionHeading>
          <Ul>
            <Li>
              <strong>Accelerate provider relationships.</strong> We&rsquo;ve become quite aware
              that Institutions like Wellcome Sanger, botanic gardens and national parks, museums,
              NGOs, and national and subnational biodiversity agencies are being courted now by
              Basecamp (and other single-focus data interests.) The window to lock in non-exclusive
              provider relationships isn&rsquo;t infinite, so we need to accelerate our ability
              and timeline in establishing them.
            </Li>
            <Li>
              <strong>Data quality verification.</strong> Our federated, non-custodial model means
              raw genomic data stays with providers. How we verify sequence quality and
              authenticity without hosting the data is an open architectural question. While we
              have expert capabilities, advice and counsel, this has emerged as a new but important
              problem to solve.
            </Li>
            <Li>
              <strong>ABS enforcement in AI/ML.</strong> The Nagoya Protocol compliance story is
              strong for demand-led brokerage and high-homology products where regulatory filings
              create auditable provenance trails. It&rsquo;s weaker for pure AI model training,
              where enforcement parallels the copyright-versus-AI challenges we see everywhere
              else. In any case, immediate priorities revolve around direct use of genomic data in
              high/low homology research (as opposed to integration in data models.)
            </Li>
            <Li>
              <strong>Travel costs in the high-chaos geopolitical chapter.</strong> Our success is
              predicated on building global networks, with providers, institutions, and governments
              across Africa, Southeast Asia, Latin America, Europe, and the Caucasus. This
              obviously means an absurd amount of travel, for which we&rsquo;d budgeted in our
              projections. But with jet fuel prices skyrocketing in the near term (and probably the
              longer term) it has blown up the cost of maintaining the pace of in-person onsite
              relationship-building that&rsquo;s driven our progress so far. It&rsquo;s a real
              operational concern. We&rsquo;re watching this closely, and thinking about how to
              maintain tempo as travel gets more expensive. If necessary (if jet fuel remains
              escalated) we would seek an additional $250-500 for the SAFE in this round, as it
              would allow us to continue traveling as we have and as we need to.
            </Li>
          </Ul>
        </section>

        <Divider />

        {/* Opportunities */}
        <section id="opportunities">
          <SectionHeading>Biggest Opportunities</SectionHeading>
          <Ul>
            <Li>
              <strong>Singapore incorporation and EDB formalization</strong> are near-term. We&rsquo;re
              moving from relationship-building to entity establishment.
            </Li>
            <Li>
              <strong>IRRI LOI signing</strong> is ia very likely to be our first formal
              institutional provider relationship.
            </Li>
            <Li>
              <strong>Provider pipeline is deep.</strong> Kenya, Georgia (Eliava Institute phage
              library), UK (Wellcome Sanger, Kew), Latin America (Costa Rica, Chile, Argentina via
              WHO Berlin Hub), A*STAR Singapore, and now IRRI. Multiple tracks, different stages,
              all moving forward at different speeds. We&rsquo;re likely to need a dedicated
              resource sooner rather than later, to manage all the relationships and bring them to
              close.
            </Li>
            <Li>
              <strong>Terpenes as a beachhead market</strong> for demand-led brokerage, this is a
              ~1B+ market where the discovery bottleneck is access to novel source organisms, not
              computation.
            </Li>
            <Li>
              <strong>Illumina as a commercial partner</strong> could be transformative. If
              Fairfield drives sequencing demand from providers, Illumina&rsquo;s interests and
              ours are directly aligned. It also provides us with a means to have deeper
              conversations with PacBio (where we have connect to CEO) and Oxford Nanopore. One of
              these will be a primary partner for Fairfield, within 3-6 months.
            </Li>
            <Li>
              <strong>CEPI/EVEscape</strong> represents a concrete use case where our data could
              directly improve a model that predicts viral mutations for pandemic preparedness.
              Worth pursuing as a flagship partnership.
            </Li>
          </Ul>
        </section>

        <Divider />

        {/* How to Help */}
        <section id="help">
          <SectionHeading>How You Can Help</SectionHeading>
          <Ul>
            <Li>
              <strong>Introductions to agtech / industrial / pharma / biotech R&amp;D
              leadership</strong> who are acquiring or licensing non-human genomic data, especially
              for industrial/commercial use (think Unilever or Kimberly Clark), drug discovery, or
              agricultural applications.
            </Li>
            <Li>
              <strong>Introductions to Singapore-based investors</strong> for our next round,
              especially those with life sciences or deep tech focus. ClavystBio and EDBI have
              already been flagged as interested.
            </Li>
            <Li>
              <strong>Introductions to anyone working on</strong> genomic data governance,
              federated data infrastructure, or biological data marketplaces.
            </Li>
            <Li>
              <strong>Portfolio companies in ag-biotech, industrial biotech, or
              AI-for-biology,</strong> we&rsquo;d welcome introductions. They may be Fairfield
              Select customers.
            </Li>
            <Li>
              <strong>Travel optimization,</strong> we need strategies / ideas / partners wrt how
              to deal with hyperinflation of travel costs.
            </Li>
            <Li>
              <strong>Connections to anyone in / influential in DC</strong> who can help us get
              inside-tracked on <strong>The AI-Ready Bio-Data Standards Act</strong> (S. 4069 /
              H.R. 7907, Young, Luján, Khanna, Obernolte) and{' '}
              <strong>America&rsquo;s Living Library Act</strong> (S. 4023, Padilla, Young, Bice,
              Khanna). Fairfield needs to understand what is actually happening, and get integrated
              into the discussions as early as possible. An analogy would be, it&rsquo;s like we
              are building a platform for advertising on television, and the US is just spinning up
              the FCC. We want to help inform, and get fully integrated, into the data and the
              standards the US is building.
            </Li>
          </Ul>
        </section>

        <Divider />

        {/* Closing */}
        <footer className="pb-16">
          <p className="text-[20px] text-stone-700 leading-relaxed mb-5">
            <em>Thank you again for your support.</em> We&rsquo;re building something that
            didn&rsquo;t exist before. These first three months have confirmed, through dozens of
            meetings across seven countries (with the folks closest to these problems) that the
            market needs are real, urgent, and growing.
          </p>
          <P>More soon.</P>
          <p className="text-[20px] text-stone-700 mt-6 font-medium">Kevin and Mitch</p>
          <p className="text-[17px] text-stone-400">Fairfield Bio</p>
        </footer>
      </main>
    </div>
  );
}

export default function InvestorUpdatePage() {
  const [unlocked, setUnlocked] = useState(false);
  const [activeSection, setActiveSection] = useState('opening');

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY) === '1') {
      setUnlocked(true);
    }
  }, []);

  useEffect(() => {
    if (!unlocked) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-15% 0% -75% 0%', threshold: 0 }
    );

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [unlocked]);

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return <UpdateContent activeSection={activeSection} />;
}
