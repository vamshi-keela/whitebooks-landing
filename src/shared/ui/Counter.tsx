import React, { useState, useEffect } from 'react';

interface CounterProps {
  value: number;
  format?: (n: number) => string;
  duration?: number;
  motion?: boolean;
}

export function Counter({
  value,
  format = (n) => n.toLocaleString('en-IN'),
  duration = 1400,
  motion = true,
}: CounterProps) {
  const [v, setV] = useState(motion ? 0 : value);

  useEffect(() => {
    if (!motion) {
      setV(value);
      return;
    }
    let raf: number;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / duration);
      const e = 1 - Math.pow(1 - k, 3);
      setV(value * e);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, motion]);

  return <span className="counter">{format(v)}</span>;
}

export default Counter;
