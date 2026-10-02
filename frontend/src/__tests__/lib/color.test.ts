import { darkest } from "@/lib/color";

describe("darkest", () => {
  it("picks the lowest luminance color", () => {
    expect(darkest(["#ffffff", "#ffda43", "#1497ab"])).toBe("#1497ab");
    expect(darkest(["#090908", "#7bd0ff"])).toBe("#090908");
  });
});
