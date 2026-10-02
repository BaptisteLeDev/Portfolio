// Relative luminance of a #rrggbb color, enough to rank a palette.
const luminance = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255);
};

export const darkest = (colors: string[]) =>
  colors.reduce((a, b) => (luminance(b) < luminance(a) ? b : a));
