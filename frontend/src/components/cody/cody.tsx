import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useMouseCtx } from "./mouse-context";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export type CodyMood =
  | "idle"
  | "curious"
  | "happy"
  | "confused"
  | "thinking"
  | "star"
  | "wow";
export type CodyVariant = "portfolio" | "bracket";

export interface CodyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "style" | "onClick"> {
  mood?: CodyMood;
  variant?: CodyVariant;
  size?: number;
  /** If true, clicking Cody triggers a temporary 'wow' burst. Default: true. */
  clickable?: boolean;
}

// ASCII face per mood — pure text, no SVG shapes.
const faceByMood: Record<CodyMood, { left: string; right: string; mouth: string }> = {
  idle:     { left: "o", right: "o", mouth: "_" },
  curious:  { left: "o", right: "O", mouth: "_" },
  happy:    { left: "^", right: "^", mouth: "‿" },
  confused: { left: "?", right: "?", mouth: "~" },
  thinking: { left: "-", right: "-", mouth: "." },
  star:     { left: "✦", right: "✦", mouth: "‿" },
  wow:      { left: "✦", right: "✦", mouth: "o" },
};

export function Cody({
  mood: propMood = "curious",
  variant = "bracket",
  size = 200,
  clickable = true,
  className,
  ...props
}: CodyProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const faceRef = useRef<HTMLDivElement | null>(null);
  const leftEyeRef = useRef<HTMLSpanElement | null>(null);
  const rightEyeRef = useRef<HTMLSpanElement | null>(null);
  const mouse = useMouseCtx();
  const reduce = useReducedMotion();
  const [blink, setBlink] = useState(false);
  const [burst, setBurst] = useState<CodyMood | null>(null);
  const [pulseKey, setPulseKey] = useState(0);
  const mood = burst ?? propMood;

  const triggerWow = () => {
    setBurst("wow");
    setPulseKey((k) => k + 1);
    window.setTimeout(() => setBurst(null), 1200);
  };

  useEffect(() => {
    if (reduce) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      const delay = 2500 + Math.random() * 3500;
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
        loop();
      }, delay);
    };
    loop();
    return () => clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const applyEye = (el: HTMLSpanElement | null) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = mouse.clientX - cx;
      const dy = mouse.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const maxShift = Math.max(2, size * 0.012);
      const nx = (dx / dist) * Math.min(maxShift, dist / 40);
      const ny = (dy / dist) * Math.min(maxShift, dist / 40);
      el.style.setProperty("--ex", `${nx.toFixed(2)}px`);
      el.style.setProperty("--ey", `${ny.toFixed(2)}px`);
    };
    applyEye(leftEyeRef.current);
    applyEye(rightEyeRef.current);

    // 3D head tilt — rotateX (pitch, up/down) + rotateY (yaw, left/right)
    const face = faceRef.current;
    if (face) {
      const r = face.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = mouse.clientX - cx;
      const dy = mouse.clientY - cy;
      // Normalize by viewport distance, cap at ±1
      const nx = Math.max(-1, Math.min(1, dx / (window.innerWidth * 0.45)));
      const ny = Math.max(-1, Math.min(1, dy / (window.innerHeight * 0.45)));
      // Max tilt ~14 degrees, pitch inverted (mouse up → head up)
      const yaw = nx * 14;
      const pitch = -ny * 10;
      face.style.setProperty("--yaw", `${yaw.toFixed(2)}deg`);
      face.style.setProperty("--pitch", `${pitch.toFixed(2)}deg`);
    }
  }, [mouse.clientX, mouse.clientY, reduce, size]);

  const face = faceByMood[mood];
  const accent = variant === "portfolio" ? "text-cream" : "text-fg";

  const eyeWrap: React.CSSProperties = {
    display: "inline-block",
    transform: "translate(var(--ex,0), var(--ey,0))",
    transition: "transform 80ms linear",
  };
  const blinkWrap: React.CSSProperties = {
    display: "inline-block",
    transform: blink ? "scaleY(0.15)" : "scaleY(1)",
    transformOrigin: "center",
    transition: "transform 90ms ease",
  };

  const isClickable = clickable && !reduce;
  const handleKey = isClickable
    ? (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          triggerWow();
        }
      }
    : undefined;

  return (
    <div
      ref={containerRef}
      role={isClickable ? "button" : "img"}
      aria-label={`Cody ${mood}`}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? triggerWow : undefined}
      onKeyDown={handleKey}
      className={cn(
        "inline-block relative",
        isClickable && "cursor-pointer",
        className,
      )}
      style={{ perspective: `${size * 2.5}px` }}
      {...props}
    >
      <div
        ref={faceRef}
        key={pulseKey}
        className={cn(
          "font-mono font-black select-none leading-none whitespace-nowrap",
          "inline-flex items-center justify-center gap-[0.3em]",
          accent,
          burst && "cody-pulse",
        )}
        style={{
          fontSize: size * 0.28,
          transform: "rotateY(var(--yaw,0)) rotateX(var(--pitch,0))",
          transformStyle: "preserve-3d",
          transition: "transform 180ms cubic-bezier(0.32,0.72,0,1)",
          willChange: "transform",
        }}
      >
        <span aria-hidden="true">[</span>
        <span ref={leftEyeRef} style={eyeWrap}>
          <span style={blinkWrap}>{face.left}</span>
        </span>
        <span aria-hidden="true" className="opacity-70">
          {face.mouth}
        </span>
        <span ref={rightEyeRef} style={eyeWrap}>
          <span style={blinkWrap}>{face.right}</span>
        </span>
        <span aria-hidden="true">]</span>
      </div>
      {burst === "wow" && !reduce && <CodyBurst />}
    </div>
  );
}

function CodyBurst() {
  // ASCII sparkle particles that briefly radiate outward
  const particles = [
    { tx: "-60%", ty: "-80%", rot: "-20deg", delay: "0ms" },
    { tx: "60%", ty: "-70%", rot: "15deg", delay: "60ms" },
    { tx: "-80%", ty: "20%", rot: "-10deg", delay: "120ms" },
    { tx: "80%", ty: "40%", rot: "25deg", delay: "90ms" },
    { tx: "0%", ty: "-100%", rot: "0deg", delay: "0ms" },
  ];
  return (
    <>
      {particles.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono font-black text-pink"
          style={{
            fontSize: "0.9em",
            animation: `cody-burst 700ms ${p.delay} cubic-bezier(0.32,0.72,0,1) both`,
            ["--tx" as string]: p.tx,
            ["--ty" as string]: p.ty,
            ["--rot" as string]: p.rot,
          }}
        >
          ✦
        </span>
      ))}
    </>
  );
}
