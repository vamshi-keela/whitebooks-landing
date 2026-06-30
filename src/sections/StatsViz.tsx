import { useEffect, useRef } from "react";

/**
 * Particle data-viz inspired by Stripe's "backbone of global commerce" canvas.
 * A field of line+dot particles morphs between four formations — sunburst,
 * globe, wave ribbon and a converging tunnel — synced to the active stat.
 * Pure Canvas 2D, devicePixelRatio-aware, pauses when offscreen, and falls
 * back to a single static frame under prefers-reduced-motion.
 */

type Vec = { x: number; y: number; lx: number; ly: number; c: number; a: number };
type Formation = (i: number, n: number, t: number, r: Float32Array) => Vec;

const TAU = Math.PI * 2;
const lerp = (a: number, b: number, m: number) => a + (b - a) * m;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// colour stops travelled by each particle's `c` factor (0 → cool, 1 → warm).
// Brand-led spectrum: periwinkle → WhiteBooks pink → warm rose (no Stripe orange).
const STOPS: [number, number, number][] = [
  [146, 128, 240], // periwinkle violet
  [220, 47, 101], // brand pink (#dc2f65)
  [255, 146, 176], // warm rose
];
function sample(c: number): [number, number, number] {
  c = clamp01(c);
  const seg = c < 0.5 ? 0 : 1;
  const t = c < 0.5 ? c * 2 : (c - 0.5) * 2;
  const a = STOPS[seg];
  const b = STOPS[seg + 1];
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

// ── Formations (logical space ~[-1.1, 1.1]) ───────────────────────────────────

const sunburst: Formation = (i, n, t, r) => {
  const r0 = r[i * 3], r1 = r[i * 3 + 1], r2 = r[i * 3 + 2];
  const frac = i / (n - 1);
  const ang = Math.PI * 0.1 + frac * Math.PI * 0.8 + (r0 - 0.5) * 0.05;
  let rad = 0.34 + r1 * 0.96;
  rad *= 1 + Math.sin(t * 0.7 + r2 * TAU) * 0.03;
  const fx = 0,
    fy = 0.78;
  return {
    x: fx + Math.cos(ang) * rad * 1.18,
    y: fy - Math.sin(ang) * rad,
    lx: fx,
    ly: fy,
    c: 1 - clamp01((rad - 0.34) / 0.96),
    a: 0.9,
  };
};

const globe: Formation = (i, n, t, r) => {
  const k = i + 0.5;
  const phi = Math.acos(1 - (2 * k) / n);
  const theta = Math.PI * (1 + Math.sqrt(5)) * k + t * 0.22;
  const R = 0.86;
  const sx = Math.sin(phi) * Math.cos(theta);
  const sy = Math.cos(phi);
  const sz = Math.sin(phi) * Math.sin(theta);
  const x = sx * R;
  const y = sy * R * 0.92 - 0.04;
  return {
    x,
    y,
    lx: x * 0.16,
    ly: y * 0.16,
    c: clamp01((y / R + 1) / 2),
    a: 0.22 + ((sz + 1) / 2) * 0.72,
  };
};

const wave: Formation = (i, n, t, r) => {
  const r0 = r[i * 3];
  const frac = i / (n - 1);
  const x = -1.08 + frac * 2.16;
  const topY =
    -0.18 + Math.sin(x * 2.4 + t * 0.9) * 0.28 + Math.sin(x * 1.1 - t * 0.5) * 0.06;
  return {
    x,
    y: topY,
    lx: x,
    ly: Math.min(0.92, topY + 0.5 + r0 * 0.3),
    c: 1 - clamp01(Math.abs(x) / 1.1) * 0.55,
    a: 0.85,
  };
};

const tunnel: Formation = (i, n, t, r) => {
  const r0 = r[i * 3], r1 = r[i * 3 + 1];
  const side = i % 2 === 0 ? -1 : 1;
  const u = r0;
  const v = (r1 + t * 0.07) % 1;
  const ease = v * v;
  const x = side * (1 - ease) * 1.02;
  const y = (u - 0.5) * 0.96 * (1 - ease * 0.85);
  const ease2 = Math.min(1, ease + 0.13);
  return {
    x,
    y,
    lx: side * (1 - ease2) * 1.02,
    ly: (u - 0.5) * 0.96 * (1 - ease2 * 0.85),
    c: ease,
    a: 0.3 + (1 - Math.abs(v - 0.5) * 2) * 0.55,
  };
};

const FORMATIONS: Formation[] = [sunburst, globe, wave, tunnel];
const MORPH_MS = 1300;

export default function StatsViz({ active }: { active: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRef = useRef(active);
  const prevRef = useRef(active);
  const morphStartRef = useRef(-Infinity);

  // react to active changes without restarting the render loop
  useEffect(() => {
    if (active !== activeRef.current) {
      prevRef.current = activeRef.current;
      activeRef.current = active;
      morphStartRef.current = performance.now();
    }
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    const N = mobile ? 130 : 240;

    // stable per-particle randomness
    const rnd = new Float32Array(N * 3);
    for (let i = 0; i < rnd.length; i++) rnd[i] = Math.random();

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0,
      H = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(frame);
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);

    const start = performance.now();

    const draw = (now: number) => {
      const t = reduced ? 0 : (now - start) / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const scale = Math.min(W * 0.46, H * 0.52);
      const cx = W * 0.5;
      const cy = H * 0.46;

      const cur = FORMATIONS[activeRef.current];
      const prev = FORMATIONS[prevRef.current];
      const m = reduced
        ? 1
        : easeInOut(clamp01((now - morphStartRef.current) / MORPH_MS));

      for (let i = 0; i < N; i++) {
        const b = cur(i, N, t, rnd);
        let x = b.x,
          y = b.y,
          lx = b.lx,
          ly = b.ly,
          c = b.c,
          a = b.a;
        if (m < 1) {
          const p = prev(i, N, t, rnd);
          x = lerp(p.x, x, m);
          y = lerp(p.y, y, m);
          lx = lerp(p.lx, lx, m);
          ly = lerp(p.ly, ly, m);
          c = lerp(p.c, c, m);
          a = lerp(p.a, a, m);
        }

        const px = cx + x * scale;
        const py = cy + y * scale;
        const plx = cx + lx * scale;
        const ply = cy + ly * scale;
        const [r, g, bl] = sample(c);

        // trailing line toward the formation's focal path
        ctx.strokeStyle = `rgba(${r | 0},${g | 0},${bl | 0},${a * 0.32})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(plx, ply);
        ctx.lineTo(px, py);
        ctx.stroke();

        // dot at the tip
        ctx.fillStyle = `rgba(${r | 0},${g | 0},${bl | 0},${a})`;
        ctx.beginPath();
        ctx.arc(px, py, 1.6, 0, TAU);
        ctx.fill();
      }
    };

    const frame = (now: number) => {
      draw(now);
      if (!visible) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="wb-stats__canvas" aria-hidden="true" />;
}
