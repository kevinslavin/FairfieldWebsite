"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, Objects } from "topojson-specification";

const HIGHLIGHT_COLOR = "#2a5a9e";

export const GLOBE_SPECIES = [
  {
    location: "United States and Mexico",
    countryCodes: [840, 484],
    center: [100, -38] as [number, number],
  },
  {
    location: "Madagascar",
    countryCodes: [450],
    center: [-47, 20] as [number, number],
  },
  {
    location: "Philippines",
    countryCodes: [608],
    center: [-122, -12] as [number, number],
  },
  {
    location: "Easter Island / Rapa Nui",
    countryCodes: [152],
    center: [109, 27] as [number, number],
  },
];

const ROTATE_DURATION = 900; // ms

function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function interpolateAngle(a: number, b: number, t: number): number {
  let diff = b - a;
  while (diff > 180) diff -= 360;
  while (diff < -180) diff += 360;
  return a + diff * t;
}

interface Props {
  targetIndex: number;
  size?: number;
}

export function AnimatedGlobe({ targetIndex, size = 88 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mutable animation state — not React state, lives in a ref
  const stateRef = useRef({
    worldData: null as GeoJSON.FeatureCollection | null,
    currentRotation: [...GLOBE_SPECIES[0].center] as [number, number],
    fromRotation: [...GLOBE_SPECIES[0].center] as [number, number],
    toRotation: [...GLOBE_SPECIES[0].center] as [number, number],
    highlightCodes: new Set<number>(GLOBE_SPECIES[0].countryCodes),
    rotating: false,
    rotateStart: 0,
    animFrameId: 0,
  });

  // Trigger rotation whenever targetIndex changes
  useEffect(() => {
    const s = stateRef.current;
    if (
      s.toRotation[0] === GLOBE_SPECIES[targetIndex].center[0] &&
      s.toRotation[1] === GLOBE_SPECIES[targetIndex].center[1]
    ) {
      return; // already targeting this location
    }
    s.fromRotation = [...s.currentRotation] as [number, number];
    s.toRotation = [...GLOBE_SPECIES[targetIndex].center] as [number, number];
    s.highlightCodes = new Set(GLOBE_SPECIES[targetIndex].countryCodes);
    s.rotating = true;
    s.rotateStart = performance.now();
  }, [targetIndex]);

  // Set up canvas + animation loop (runs once)
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
    const radius = size / 2 - 2;
    const s = stateRef.current;

    function drawGlobe(rotation: [number, number], highlighted: Set<number>) {
      if (!s.worldData) return;
      ctx.clearRect(0, 0, size, size);

      const projection = d3
        .geoOrthographic()
        .scale(radius)
        .translate([cx, cy])
        .rotate(rotation)
        .clipAngle(90);

      const path = d3.geoPath(projection, ctx);

      // Sphere with top-right lighting
      const grad = ctx.createRadialGradient(
        cx + radius * 0.3, cy - radius * 0.35, radius * 0.05,
        cx, cy, radius
      );
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.45, "#e8edf2");
      grad.addColorStop(1, "#b0bec8");
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Countries
      s.worldData.features.forEach((feat) => {
        const id = Number((feat as GeoJSON.Feature).id);
        ctx.beginPath();
        path(feat as d3.GeoPermissibleObjects);
        ctx.fillStyle = highlighted.has(id) ? HIGHLIGHT_COLOR : "rgba(200,210,218,0.5)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,0.5)";
        ctx.lineWidth = 0.4;
        ctx.stroke();
      });

      // Outline
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.2)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Specular glint
      const spec = ctx.createRadialGradient(
        cx + radius * 0.28, cy - radius * 0.32, 0,
        cx + radius * 0.28, cy - radius * 0.32, radius * 0.45
      );
      spec.addColorStop(0, "rgba(255,255,255,0.55)");
      spec.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = spec;
      ctx.fill();
    }

    function animate(now: number) {
      if (s.rotating) {
        const t = Math.min((now - s.rotateStart) / ROTATE_DURATION, 1);
        const eased = easeInOut(t);
        s.currentRotation = [
          interpolateAngle(s.fromRotation[0], s.toRotation[0], eased),
          interpolateAngle(s.fromRotation[1], s.toRotation[1], eased),
        ];
        if (t >= 1) {
          s.currentRotation = [...s.toRotation] as [number, number];
          s.rotating = false;
        }
      }
      drawGlobe(s.currentRotation, s.highlightCodes);
      s.animFrameId = requestAnimationFrame(animate);
    }

    fetch("/countries-110m.json")
      .then((r) => r.json())
      .then((world: Topology<Objects>) => {
        s.worldData = feature(world, world.objects.countries) as GeoJSON.FeatureCollection;
        s.animFrameId = requestAnimationFrame(animate);
      });

    return () => cancelAnimationFrame(s.animFrameId);
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, flexShrink: 0 }}
      className="drop-shadow-lg"
    />
  );
}
