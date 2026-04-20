"use client";

import { useState, useEffect } from "react";
import { AnimatedGlobe, GLOBE_SPECIES } from "@/components/marketing/animated-globe";

const SPECIES_META = [
  { latinName: "Heloderma suspectum", discovery: "Exendin-4 → GLP-1 agonists" },
  { latinName: "Catharanthus roseus", discovery: "Vinca alkaloids → Vincristine" },
  { latinName: "Conus magus", discovery: "Ziconotide → Prialt®" },
  { latinName: "Streptomyces hygroscopicus", discovery: "mTOR pathway → Everolimus" },
];

export default function GlobePreview() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % GLOBE_SPECIES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const species = GLOBE_SPECIES[index];
  const meta = SPECIES_META[index];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-10">
      <AnimatedGlobe targetIndex={index} size={380} />

      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-white font-bold tracking-widest uppercase text-sm">
          {species.location}
        </p>
        <p className="text-white/50 text-base italic">
          {meta.latinName}
        </p>
        <p className="text-white/70 text-lg tracking-wide mt-1">
          {meta.discovery}
        </p>
      </div>
    </div>
  );
}
