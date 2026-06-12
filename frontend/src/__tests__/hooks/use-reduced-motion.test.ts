import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

describe("useReducedMotion", () => {
  it("returns true when media query matches", () => {
    vi.stubGlobal("matchMedia", (q: string) => ({
      matches: q.includes("reduce"),
      media: q,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });
});
