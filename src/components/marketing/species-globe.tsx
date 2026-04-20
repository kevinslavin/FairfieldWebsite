"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, Objects } from "topojson-specification";

// Fairfield blue: oklch(0.45 0.12 250) ≈ #2a5a9e
const FAIRFIELD_BLUE = "#2a5a9e";

// ISO numeric country codes for each species location
const COUNTRY_CODES: Record<string, number[]> = {
  "United States and Mexico": [840, 484],
  Madagascar: [450],
  Philippines: [608],
  "Easter Island / Rapa Nui": [152], // Chile owns Easter Island
};

// [longitude, latitude] to rotate globe toward — negated for d3-geo rotate()
const GLOBE_CENTER: Record<string, [number, number]> = {
  "United States and Mexico": [100, -38],   // center on North America
  Madagascar: [-47, 20],                     // center on Madagascar
  Philippines: [-122, -12],                  // center on Philippines
  "Easter Island / Rapa Nui": [109, 27],    // center on Chile / Easter Island
};

interface Props {
  location: string;
  size?: number;
}

export function SpeciesGlobe({ location, size = 220 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 4;

    fetch("/countries-110m.json")
      .then((r) => r.json())
      .then((world: Topology<Objects>) => {
        const countries = feature(world, world.objects.countries);
        const highlighted = new Set(COUNTRY_CODES[location] ?? []);

        const rotate = GLOBE_CENTER[location] ?? [0, 0];
        const projection = d3
          .geoOrthographic()
          .scale(radius)
          .translate([cx, cy])
          .rotate(rotate)
          .clipAngle(90);

        const path = d3.geoPath(projection, ctx);

        // --- Sphere base with lighting gradient ---
        ctx.clearRect(0, 0, size, size);

        const grad = ctx.createRadialGradient(
          cx + radius * 0.3,  // light source: top-right
          cy - radius * 0.35,
          radius * 0.05,
          cx,
          cy,
          radius
        );
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(0.45, "#e8edf2");
        grad.addColorStop(1, "#b0bec8");

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // --- Countries ---
        (countries as GeoJSON.FeatureCollection).features.forEach((feat) => {
          const id = Number((feat as GeoJSON.Feature).id);
          const isHighlighted = highlighted.has(id);

          ctx.beginPath();
          path(feat as d3.GeoPermissibleObjects);

          if (isHighlighted) {
            ctx.fillStyle = FAIRFIELD_BLUE;
            ctx.fill();
          } else {
            // subtle land fill so borders read clearly
            ctx.fillStyle = "rgba(200,210,218,0.5)";
            ctx.fill();
          }

          ctx.strokeStyle = "rgba(0,0,0,0.55)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });

        // --- Sphere outline ---
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0,0,0,0.25)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // --- Specular highlight (top-right glint) ---
        const spec = ctx.createRadialGradient(
          cx + radius * 0.28,
          cy - radius * 0.32,
          0,
          cx + radius * 0.28,
          cy - radius * 0.32,
          radius * 0.45
        );
        spec.addColorStop(0, "rgba(255,255,255,0.55)");
        spec.addColorStop(1, "rgba(255,255,255,0)");

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = spec;
        ctx.fill();
      });
  }, [location, size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className="drop-shadow-xl"
    />
  );
}
