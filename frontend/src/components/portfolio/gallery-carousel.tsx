import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// ponytail: drift 30px/s + retour smooth; lightbox sans dep. Upgrade: embla si besoin de boucles vraies.
export function GalleryCarousel({ images, label }: { images: string[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const returning = useRef(false);
  const [zoom, setZoom] = useState<string | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let raf: number;
    const step = () => {
      const el = ref.current;
      if (el && !paused.current) {
        const max = el.scrollWidth - el.clientWidth;
        if (returning.current) {
          if (el.scrollLeft < 2) returning.current = false;
        } else if (max > 0 && el.scrollLeft >= max - 1) {
          returning.current = true;
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          el.scrollLeft += 0.5;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom]);

  const pause = () => (paused.current = true);
  const resume = () => (paused.current = false);

  return (
    <>
      <div
        ref={ref}
        tabIndex={0}
        role="region"
        aria-label={label}
        onPointerEnter={pause}
        onPointerLeave={resume}
        onFocus={pause}
        onBlur={resume}
        onTouchStart={pause}
        className="mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src) => (
          <button
            key={src}
            type="button"
            onClick={() => setZoom(src)}
            aria-label="Agrandir l'image"
            className="min-w-[85%] md:min-w-[70%] snap-center shrink-0 cursor-zoom-in transition-transform duration-300 ease-[var(--ease-signature)] hover:scale-[1.01]"
          >
            <img src={src} alt="" loading="lazy" className="w-full h-auto rounded-[24px]" />
          </button>
        ))}
      </div>
      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Vue agrandie"
          onClick={() => setZoom(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 p-4 md:p-12 cursor-zoom-out animate-[fade-in_200ms_ease-out_both]"
        >
          <img src={zoom} alt="" className="max-h-full max-w-full rounded-[24px] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.7)]" />
        </div>
      )}
    </>
  );
}
