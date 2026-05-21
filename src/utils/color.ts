export interface RGB {
  r: number;
  g: number;
  b: number;
}

export function hexToRgb(hex: string): RGB {
  const m = hex.replace('#', '');
  return {
    r: parseInt(m.substring(0, 2), 16),
    g: parseInt(m.substring(2, 4), 16),
    b: parseInt(m.substring(4, 6), 16),
  };
}

export function lighten(hex: string, amt = 0.1): string {
  const { r, g, b } = hexToRgb(hex);
  const f = (c: number) => Math.min(255, Math.round(c + (255 - c) * amt));
  const toHex = (c: number) => c.toString(16).padStart(2, '0');
  return '#' + toHex(f(r)) + toHex(f(g)) + toHex(f(b));
}
