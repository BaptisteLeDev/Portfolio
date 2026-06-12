import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Bracket } from "@/components/ui/bracket";

describe("Bracket", () => {
  it("renders left bracket", () => {
    render(<Bracket side="left" />);
    expect(screen.getByText("[")).toBeInTheDocument();
  });
  it("renders right bracket", () => {
    render(<Bracket side="right" />);
    expect(screen.getByText("]")).toBeInTheDocument();
  });
});
