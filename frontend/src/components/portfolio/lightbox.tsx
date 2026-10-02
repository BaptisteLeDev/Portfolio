import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

export function Lightbox({
  images,
  index,
  onIndex,
  label,
}: {
  images: string[];
  index: number | null;
  onIndex: (i: number | null) => void;
  label: string;
}) {
  const { t } = useTranslation("project");
  const ref = useRef<HTMLDivElement>(null);
  const open = index !== null;
  const many = images.length > 1;
  const [long, setLong] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    return () => prev?.focus();
  }, [open]);

  useEffect(() => {
    if (index === null) return;
    const go = (d: number) => onIndex((index + d + images.length) % images.length);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onIndex(null);
      else if (many && e.key === "ArrowRight") go(1);
      else if (many && e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, images.length, many, onIndex]);

  if (index === null) return null;
  const step = (d: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onIndex((index + d + images.length) % images.length);
  };
  const arrow =
    "absolute top-1/2 -translate-y-1/2 size-12 rounded-full bg-fg/10 backdrop-blur-md text-fg font-mono text-xl hover:bg-fg/20 transition-colors";

  // Portal: a transformed ancestor (ScrollReveal) would trap position:fixed.
  return createPortal(
    <div
      ref={ref}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={() => onIndex(null)}
      onContextMenu={(e) => e.preventDefault()}
      className={`fixed inset-0 z-50 flex justify-center bg-bg/90 p-4 md:p-12 cursor-zoom-out animate-[fade-in_200ms_ease-out_both] scrollbar-site text-fg ${long ? "items-start overflow-y-auto" : "items-center"}`}
    >
      <img
        src={images[index]}
        alt=""
        draggable={false}
        onLoad={(e) => setLong(e.currentTarget.naturalHeight > e.currentTarget.naturalWidth * 2)}
        className={`${long ? "w-full max-w-5xl" : "max-h-full max-w-full"} rounded-[24px] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.7)] select-none`}
      />
      {many && (
        <>
          <button type="button" aria-label={t("prev")} onClick={step(-1)} className={`${arrow} fixed left-3 md:left-6`}>
            ←
          </button>
          <button type="button" aria-label={t("next")} onClick={step(1)} className={`${arrow} fixed right-3 md:right-6`}>
            →
          </button>
          <span className="fixed bottom-4 left-1/2 -translate-x-1/2 font-mono text-sm text-fg/70">
            {index + 1} / {images.length}
          </span>
        </>
      )}
    </div>,
    document.body,
  );
}
