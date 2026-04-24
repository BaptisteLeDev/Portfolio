import { cn } from "@/lib/cn";

type Palette = "hero" | "chaud" | "froid";
type Speed = "slow" | "normal";

const palettes: Record<Palette, string> = {
  hero: "var(--color-indigo), var(--color-pink), var(--color-cream), var(--color-indigo)",
  chaud: "oklch(85% 0.15 65), var(--color-pink), oklch(70% 0.22 25), oklch(85% 0.15 65)",
  froid: "var(--color-indigo), oklch(60% 0.2 220), var(--color-cream), var(--color-indigo)",
};

const speeds: Record<Speed, string> = {
  slow: "60s",
  normal: "40s",
};

export function AnimatedGradient({
  palette = "hero",
  speed = "normal",
  className,
}: {
  palette?: Palette;
  speed?: Speed;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 -z-10", className)}
      style={{
        backgroundImage: `conic-gradient(from var(--angle), ${palettes[palette]})`,
        animation: `spin-slow ${speeds[speed]} linear infinite`,
      }}
    />
  );
}
