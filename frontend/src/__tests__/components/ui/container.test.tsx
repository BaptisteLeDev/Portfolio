import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Container } from "@/components/ui/container";

describe("Container", () => {
  it("renders children", () => {
    render(<Container><span>hi</span></Container>);
    expect(screen.getByText("hi")).toBeInTheDocument();
  });

  it("applies size max-width class", () => {
    const { container } = render(<Container size="sm">x</Container>);
    expect(container.firstChild).toHaveClass("max-w-2xl");
  });

  it("forwards className", () => {
    const { container } = render(<Container className="custom">x</Container>);
    expect(container.firstChild).toHaveClass("custom");
  });
});
