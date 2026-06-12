import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface MouseState {
  clientX: number;
  clientY: number;
  x: number;
  y: number;
}

const MouseCtx = createContext<MouseState>({ clientX: 0, clientY: 0, x: 0.5, y: 0.5 });

export const useMouseCtx = () => useContext(MouseCtx);

export function MouseProvider({ children }: { children: ReactNode }) {
  const [m, setM] = useState<MouseState>({ clientX: 0, clientY: 0, x: 0.5, y: 0.5 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const handler = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setM({
          clientX: e.clientX,
          clientY: e.clientY,
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        });
      });
    };
    window.addEventListener("pointermove", handler);
    return () => {
      window.removeEventListener("pointermove", handler);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <MouseCtx.Provider value={m}>{children}</MouseCtx.Provider>;
}
