import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Section } from "@/components/ui/section";

describe("Section", () => {
  it("renders children in a <section>", () => {
    render(<Section><p>content</p></Section>);
    expect(screen.getByText("content").closest("section")).toBeInTheDocument();
  });
  it("applies tone class", () => {
    const { container } = render(<Section tone="cream">x</Section>);
    expect(container.firstChild).toHaveClass("bg-cream");
  });
  it("includes noise overlay by default", () => {
    const { container } = render(<Section>x</Section>);
    expect(container.querySelector(".noise-overlay")).toBeTruthy();
  });
});
