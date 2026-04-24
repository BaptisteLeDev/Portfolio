import { describe, it, expect } from "vitest";
import { cn } from "@/lib/cn";

describe("cn", () => {
  it("merges classes", () => {
    expect(cn("a", "b")).toBe("a b");
  });
  it("handles conditional", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });
  it("merges tailwind conflicts (last wins)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
