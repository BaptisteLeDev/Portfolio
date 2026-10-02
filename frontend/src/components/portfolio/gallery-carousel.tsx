import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Lightbox } from "./lightbox";

// ponytail: drift 30px/s + retour smooth; lightbox sans dep. Upgrade: embla si besoin de boucles vraies.
export function GalleryCarousel({
  images,
  label,
  expandLabel,
  zoomLabel,
}: {
  images: string[];
  label: string;
  expandLabel: string;
  zoomLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const returning = useRef(false);
  const [zoom, setZoom] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const single = images.length === 1;

  useEffect(() => {
    if (reduced || single) return;
    let raf: number;
    let last = performance.now();
    const step = (now: number) => {
      const el = ref.current;
      const dt = Math.min(now - last, 100);
      last = now;
      if (el && !paused.current) {
        const max = el.scrollWidth - el.clientWidth;
        if (returning.current) {
          if (el.scrollLeft < 2) returning.current = false;
        } else if (max > 0 && el.scrollLeft >= max - 1) {
          returning.current = true;
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          el.scrollLeft += (dt / 1000) * 30;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduced, single]);

  const pause = () => (paused.current = true);
  const resume = () => (paused.current = false);

  return (
    <>
      {single ? (
        <button
          type="button"
          onClick={() => setZoom(0)}
          aria-label={expandLabel}
          className="mt-8 block mx-auto cursor-zoom-in transition-transform duration-300 ease-[var(--ease-signature)] hover:scale-[1.01]"
        >
          <img
            src={images[0]}
            alt=""
            loading="lazy"
            className="max-h-[360px] md:max-h-[440px] w-auto max-w-full rounded-[24px]"
          />
        </button>
      ) : (
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
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setZoom(i)}
              aria-label={expandLabel}
              className="shrink-0 snap-center cursor-zoom-in transition-transform duration-300 ease-[var(--ease-signature)] hover:scale-[1.01]"
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-[360px] md:h-[440px] w-auto rounded-[24px]"
              />
            </button>
          ))}
        </div>
      )}
      <Lightbox images={images} index={zoom} onIndex={setZoom} label={zoomLabel} />
    </>
  );
}
