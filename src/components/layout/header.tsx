"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 border-b ${
        scrolled
          ? "border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
          : "border-white/20 bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Fairfield Bio"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span
            className={`text-lg font-semibold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            Fairfield Bio
          </span>
        </Link>

      </div>
    </header>
  );
}
