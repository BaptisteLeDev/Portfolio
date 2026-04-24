import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders text", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button", { name: "Click" })).toBeInTheDocument();
  });
  it("applies variant class", () => {
    render(<Button variant="solid-cream">x</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-cream");
  });
  it("supports asChild via Slot", () => {
    render(<Button asChild><a href="/x">link</a></Button>);
    expect(screen.getByRole("link", { name: "link" })).toBeInTheDocument();
  });
});
