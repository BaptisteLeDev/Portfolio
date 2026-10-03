import { useState } from "react";
import { Lightbox } from "./lightbox";

// Frame height drives the page fit: portrait pages show whole, landscape
// pages are capped by width. Long pages (site mockups) go full width and
// scroll, else they shrink to a sliver.
export function DocViewer({ title, pages }: { title: string; pages: string[] }) {
  const [zoom, setZoom] = useState<number | null>(null);
  const [long, setLong] = useState<Set<number>>(new Set());
  return (
    <>
      <div
        tabIndex={0}
        role="region"
        aria-label={title}
        onContextMenu={(e) => e.preventDefault()}
        className="scrollbar-site mt-6 h-[min(720px,80vh)] overflow-y-auto overscroll-contain snap-y snap-proximity rounded-[16px] bg-bg/5 p-3 space-y-3"
      >
        {pages.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setZoom(i)}
            aria-label={`Page ${i + 1}, agrandir`}
            className={`block mx-auto cursor-zoom-in ${long.has(i) ? "w-full snap-start" : "snap-center"}`}
          >
            <img
              src={src}
              alt={`${title}, page ${i + 1}`}
              loading="lazy"
              draggable={false}
              onLoad={(e) => {
                const img = e.currentTarget;
                if (img.naturalHeight > img.naturalWidth * 2) setLong((s) => new Set(s).add(i));
              }}
              className={`${long.has(i) ? "w-full" : "max-h-[calc(min(720px,80vh)-1.5rem)] w-auto"} max-w-full rounded-[8px] select-none`}
            />
          </button>
        ))}
      </div>
      <Lightbox images={pages} index={zoom} onIndex={setZoom} label={title} alt={title} />
    </>
  );
}
