"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Cormorant_Garamond, Bebas_Neue } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["italic"],
  variable: "--font-cormorant",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

interface SpeciesEntry {
  videoSrc: string;
  scientificName: string;
  location: string;
  discovery: string;
}

const SPECIES: SpeciesEntry[] = [
  {
    videoSrc: "/videos/gila_monster.mp4",
    scientificName: "Heloderma suspectum",
    location: "United States and Mexico",
    discovery: "Exendin-4 \u2192 GLP-1 agonists",
  },
  {
    videoSrc: "/videos/madagascar_periwinkle.mp4",
    scientificName: "Catharanthus roseus",
    location: "Madagascar",
    discovery: "Vinca alkaloids \u2192 Vincristine",
  },
  {
    videoSrc: "/videos/cone_snail.mp4",
    scientificName: "Conus magus",
    location: "Philippines",
    discovery: "Ziconotide \u2192 Prialt\u00ae",
  },
  {
    videoSrc: "/videos/streptomyces.mp4",
    scientificName: "Streptomyces hygroscopicus",
    location: "Easter Island / Rapa Nui",
    discovery: "mTOR pathway \u2192 Everolimus",
  },
];

const HEADLINE = (
  <>
    Global Marketplace{" "}
    <span
      style={{
        fontFamily: "var(--font-cormorant)",
        fontSize: "0.45em",
        fontStyle: "italic",
        fontWeight: 400,
        verticalAlign: "baseline",
        letterSpacing: "0.02em",
        textTransform: "lowercase",
      }}
    >
      for
    </span>
    <br />
    Genomic Discovery
  </>
);

export function SpeciesShowcase() {
  // activeSlot: which video element (0 or 1) is currently visible
  const [activeSlot, setActiveSlot] = useState(0);
  const [index, setIndex] = useState(0);

  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];

  // When index advances, the inactive slot already has the next video preloaded.
  // Flip visibility immediately, then preload the one after that into the now-hidden slot.
  const handleEnded = useCallback(() => {
    const nextIndex = (index + 1) % SPECIES.length;
    const nextNextIndex = (index + 2) % SPECIES.length;
    const nextSlot = 1 - activeSlot;

    // Start playing the preloaded next video immediately
    const nextVideo = videoRefs[nextSlot].current;
    if (nextVideo) nextVideo.play().catch(() => {});

    // Swap visible slot
    setActiveSlot(nextSlot);
    setIndex(nextIndex);

    // Preload next-next into the slot we just vacated
    const hiddenVideo = videoRefs[activeSlot].current;
    if (hiddenVideo) {
      hiddenVideo.src = SPECIES[nextNextIndex].videoSrc;
      hiddenVideo.load();
    }
  }, [index, activeSlot]);

  // On mount: slot 0 plays first video, slot 1 preloads second
  useEffect(() => {
    const v0 = videoRefs[0].current;
    const v1 = videoRefs[1].current;
    if (v0) v0.play().catch(() => {});
    if (v1) {
      v1.src = SPECIES[1].videoSrc;
      v1.load();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const entry = SPECIES[index];

  return (
    <div className={`${cormorant.variable} ${bebas.variable}`}>

      {/* ── Mobile: headline sits above the video ── */}
      <div className="sm:hidden -mt-16 bg-[oklch(0.16_0.025_260)] px-6 pb-4 pt-20">
        <p
          className="text-5xl uppercase leading-none text-white"
          style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.005em" }}
        >
          Global Marketplace
        </p>
        <p
          className="text-xl italic leading-none -mt-[6px] mb-1 text-white/90"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
        >
          for
        </p>
        <p
          className="text-5xl uppercase leading-none text-white"
          style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.005em" }}
        >
          Genomic Discovery
        </p>
      </div>

      {/* ── Video container ── */}
      <div
        className="relative w-full overflow-hidden aspect-video bg-black sm:-mt-16 sm:aspect-[2/0.8]"
      >
        {/* Two video elements — only the active slot is visible */}
        {[0, 1].map((slot) => (
          <video
            key={slot}
            ref={videoRefs[slot]}
            src={SPECIES[slot === 0 ? 0 : 1].videoSrc}
            autoPlay={slot === 0}
            muted
            playsInline
            onEnded={slot === activeSlot ? handleEnded : undefined}
            className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-0"
            style={{ opacity: slot === activeSlot ? 1 : 0, zIndex: slot === activeSlot ? 1 : 0 }}
          />
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" style={{ zIndex: 2 }} />

        {/* Desktop-only headline — centered over video */}
        <div className="hidden sm:flex absolute inset-0 items-center justify-center" style={{ zIndex: 3 }}>
          <h1
            className="text-6xl uppercase text-white drop-shadow-lg sm:text-7xl lg:text-8xl xl:text-9xl"
            style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.005em", lineHeight: 0.8 }}
          >
            {HEADLINE}
          </h1>
        </div>

        {/* Species labels — lower left */}
        <div className="absolute bottom-0 left-0 px-6 pb-5 sm:px-8 sm:pb-6" style={{ zIndex: 3 }}>
          <div className="text-white">
            <p
              className="text-lg italic leading-snug tracking-wide text-white/90 sm:text-2xl"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 700 }}
            >
              {entry.scientificName}
            </p>
            <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.08em] text-yellow-300 sm:text-sm">
              {entry.location}
            </p>
            <p className="mt-1.5 text-base font-light tracking-wide text-white sm:mt-2 sm:text-2xl">
              {entry.discovery}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
