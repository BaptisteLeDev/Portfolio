import { cn } from "@/lib/cn";

export function FluidBlobs({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("fluid-blobs", className)}>
      <style>{`
        .fluid-blobs::before,
        .fluid-blobs::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 30%, color-mix(in oklch, var(--color-indigo) 70%, transparent) 0 20%, transparent 40%),
            radial-gradient(circle at 75% 65%, color-mix(in oklch, var(--color-pink) 55%, transparent) 0 18%, transparent 38%),
            radial-gradient(circle at 50% 90%, color-mix(in oklch, var(--color-indigo) 55%, transparent) 0 20%, transparent 42%),
            radial-gradient(circle at 85% 15%, color-mix(in oklch, var(--color-pink) 60%, transparent) 0 15%, transparent 35%);
          animation: fluid-morph 22s ease-in-out infinite;
        }
        .fluid-blobs::after {
          animation-duration: 32s;
          animation-direction: reverse;
          opacity: 0.7;
          mix-blend-mode: screen;
        }
      `}</style>
    </div>
  );
}
