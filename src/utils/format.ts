export function toInLocale(n: number, decimals = 0): string {
  return n.toLocaleString('en-IN', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
}
