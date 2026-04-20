"use client";

import { useState, useRef, useCallback } from "react";
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
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnded = useCallback(() => {
    setIndex((prev) => (prev + 1) % SPECIES.length);
  }, []);

  const entry = SPECIES[index];

  return (
    <div className={`${cormorant.variable} ${bebas.variable}`}>

      {/* ── Mobile: headline sits above the video ── */}
      {/* -mt-16 pulls it behind the transparent header; pt-[4.5rem] clears the nav text */}
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

      {/* ── Video container ──
          Desktop: full-bleed under transparent header (-mt-16), fixed short aspect ratio
          Mobile: flush below headline block, 16:9  */}
      <div
        className="relative w-full overflow-hidden aspect-video sm:-mt-16 sm:aspect-[2/0.8]"
      >
        <video
          key={entry.videoSrc}
          ref={videoRef}
          src={entry.videoSrc}
          autoPlay
          muted
          playsInline
          onEnded={handleEnded}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

        {/* Desktop-only headline — centered over video */}
        <div className="hidden sm:flex absolute inset-0 items-center justify-center">
          <h1
            className="text-6xl uppercase text-white drop-shadow-lg sm:text-7xl lg:text-8xl xl:text-9xl"
            style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.005em", lineHeight: 0.8 }}
          >
            {HEADLINE}
          </h1>
        </div>

        {/* Species labels — lower left */}
        <div className="absolute bottom-0 left-0 px-6 pb-5 sm:px-8 sm:pb-6">
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
