import { cn } from "@/lib/cn";

export function NoiseOverlay({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("noise-overlay", className)} />;
}
