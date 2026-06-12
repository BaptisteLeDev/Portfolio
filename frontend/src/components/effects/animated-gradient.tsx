import { cn } from "@/lib/cn";

type Palette = "hero" | "chaud" | "froid";

type Blob = {
  color: string;
  /** initial position in % */
  x: number;
  y: number;
  size: number;
  duration: number;
  delay?: number;
  blend?: string;
  opacity?: number;
};

const palettes: Record<Palette, { base: string; blobs: Blob[] }> = {
  hero: {
    base: "var(--color-bg)",
    blobs: [
      { color: "var(--color-indigo-2)", x: 18, y: 22, size: 90, duration: 26, blend: "screen", opacity: 0.85 },
      { color: "var(--color-pink)",     x: 78, y: 70, size: 80, duration: 32, delay: -8, blend: "screen", opacity: 0.75 },
      { color: "var(--color-indigo)",   x: 65, y: 12, size: 70, duration: 38, delay: -14, blend: "screen", opacity: 0.7 },
      { color: "var(--color-pink-2)",   x: 12, y: 82, size: 75, duration: 30, delay: -20, blend: "screen", opacity: 0.7 },
      { color: "var(--color-cream)",    x: 50, y: 95, size: 55, duration: 44, delay: -6, blend: "overlay", opacity: 0.35 },
    ],
  },
  chaud: {
    base: "oklch(28% 0.1 30)",
    blobs: [
      { color: "var(--color-pink)",     x: 18, y: 78, size: 85, duration: 28, blend: "screen", opacity: 0.85 },
      { color: "oklch(78% 0.18 60)",    x: 75, y: 30, size: 75, duration: 34, delay: -10, blend: "screen", opacity: 0.7 },
      { color: "oklch(55% 0.22 25)",    x: 50, y: 95, size: 70, duration: 40, delay: -16, blend: "screen", opacity: 0.7 },
      { color: "var(--color-pink-2)",   x: 88, y: 85, size: 65, duration: 30, delay: -4, blend: "screen", opacity: 0.65 },
    ],
  },
  froid: {
    base: "var(--color-bg)",
    blobs: [
      { color: "var(--color-indigo-2)", x: 22, y: 28, size: 85, duration: 30, blend: "screen", opacity: 0.8 },
      { color: "oklch(60% 0.2 220)",    x: 80, y: 78, size: 80, duration: 36, delay: -12, blend: "screen", opacity: 0.7 },
      { color: "oklch(65% 0.18 260)",   x: 60, y: 18, size: 70, duration: 42, delay: -18, blend: "screen", opacity: 0.7 },
      { color: "var(--color-cream)",    x: 35, y: 88, size: 55, duration: 46, delay: -6, blend: "overlay", opacity: 0.3 },
    ],
  },
};

export function AnimatedGradient({
  palette = "hero",
  className,
}: {
  palette?: Palette;
  className?: string;
}) {
  const p = palettes[palette];
  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 -z-10 overflow-hidden", className)}
      style={{ backgroundColor: p.base }}
    >
      <div
        className="absolute"
        style={{
          inset: "-20%",
          filter: "blur(80px) saturate(1.1)",
        }}
      >
        {p.blobs.map((b, i) => (
          <span
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.size}%`,
              height: `${b.size}%`,
              background: `radial-gradient(circle, ${b.color} 0%, color-mix(in oklch, ${b.color} 35%, transparent) 45%, transparent 70%)`,
              opacity: b.opacity ?? 0.7,
              mixBlendMode: (b.blend as React.CSSProperties["mixBlendMode"]) ?? "screen",
              transform: "translate(-50%, -50%)",
              animation: `blob-drift-${i % 4} ${b.duration}s ease-in-out infinite`,
              animationDelay: `${b.delay ?? 0}s`,
              willChange: "transform",
            }}
          />
        ))}
      </div>
    </div>
  );
}
