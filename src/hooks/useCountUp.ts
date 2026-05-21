import { useState, useEffect } from 'react';

export interface CountUpOptions {
  duration?: number;
  decimals?: number;
  enabled?: boolean;
}

// Unified hook — supports both call signatures:
//   useCountUp(target, { duration, decimals, enabled })  — components.jsx style
//   useCountUp(target, duration, started)                 — wb-content.jsx style
export function useCountUp(
  target: number,
  optionsOrDuration?: CountUpOptions | number,
  legacyStarted?: boolean
): number {
  const duration =
    typeof optionsOrDuration === 'number'
      ? optionsOrDuration
      : (optionsOrDuration?.duration ?? 1400);

  const enabled =
    typeof optionsOrDuration === 'number'
      ? (legacyStarted ?? true)
      : (optionsOrDuration?.enabled ?? true);

  const [val, setVal] = useState(enabled ? 0 : target);

  useEffect(() => {
    if (!enabled) {
      setVal(target);
      return;
    }
    let raf: number;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / duration);
      const e = 1 - Math.pow(1 - k, 3); // easeOutCubic
      setVal(target * e);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, enabled]);

  return val;
}
