"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Cormorant_Garamond, Bebas_Neue } from "next/font/google";

// Videos are served from a CDN (Cloudflare R2) to keep them off Vercel's
// Fast Data Transfer quota. Falls back to a same-origin path when unset,
// which is only useful in local dev if the files still exist under public/.
const VIDEO_CDN_URL = process.env.NEXT_PUBLIC_VIDEO_CDN_URL ?? "";
const videoUrl = (path: string) => `${VIDEO_CDN_URL}${path}`;

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
  // Double-buffered playback for seamless transitions.
  // Two fixed <video> slots. `active` is the visible one; the hidden slot
  // always holds the NEXT clip with preload="auto", so when the active clip
  // ends we hard-cut to an already-buffered first frame — no flash or gap.
  // `content` maps each slot -> the SPECIES index it currently has loaded.
  const [state, setState] = useState<{ active: 0 | 1; content: [number, number] }>({
    active: 0,
    content: [0, 1],
  });

  const ref0 = useRef<HTMLVideoElement>(null);
  const ref1 = useRef<HTMLVideoElement>(null);
  const videoRefs = [ref0, ref1];

  const handleEnded = useCallback(() => {
    setState((s) => {
      const nextActive = (1 - s.active) as 0 | 1;
      const content: [number, number] = [...s.content] as [number, number];
      // The slot we're leaving now preloads the clip AFTER the one we cut to.
      content[s.active] = (s.content[nextActive] + 1) % SPECIES.length;
      return { active: nextActive, content };
    });
  }, []);

  // Whenever the active slot changes, restart it from frame 0 and play.
  // Runs on mount too, guaranteeing the first clip autoplays.
  useEffect(() => {
    const v = videoRefs[state.active].current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.active]);

  const entry = SPECIES[state.content[state.active]];

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
      <div className="relative w-full overflow-hidden aspect-video bg-black sm:-mt-16 sm:aspect-[2/0.8]">
        {/* Double buffer: two slots, only the active one visible */}
        {[0, 1].map((slot) => (
          <video
            key={slot}
            ref={videoRefs[slot]}
            src={videoUrl(SPECIES[state.content[slot]].videoSrc)}
            muted
            playsInline
            autoPlay={slot === 0}
            preload="auto"
            onEnded={slot === state.active ? handleEnded : undefined}
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{ opacity: slot === state.active ? 1 : 0 }}
          />
        ))}

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
