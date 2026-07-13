import { useEffect, useRef } from "react";

/**
 * WhiteBooks compliance data-viz. A field of line+dot particles morphs
 * between four formations, each one a literal picture of the active stat:
 *
 *  0 — ledger   : invoice-volume columns. Particles rise at terminal velocity
 *                 (constant speed under drag) inside ascending bars — invoices
 *                 flowing into the filing archive.
 *  1 — network  : businesses orbiting the GSP core. Ring angular velocity
 *                 follows Kepler's third law (ω ∝ r^-3/2) and motion trails
 *                 lengthen with orbital speed, so inner rings visibly outrun
 *                 outer ones.
 *  2 — lattice  : the practitioner network. A grid of nodes carries a circular
 *                 wave whose amplitude decays 1/r from the source — how real
 *                 2-D waves attenuate — each node showing its displacement
 *                 vector from rest.
 *  3 — pulse    : the uptime trace. A heartbeat sweeps two monitored baselines
 *                 at constant velocity with phosphor decay behind the beam,
 *                 like an ops monitor that never flatlines.
 *
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
// Brand-led spectrum: periwinkle → WhiteBooks pink → warm rose.
const STOPS: [number, number, number][] = [
  [146, 128, 240], // periwinkle violet
  [220, 47, 101], // brand pink (#d33568)
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

/* 0 · "10 Cr+ invoices filed" — ascending volume columns. Each particle is an
   invoice climbing its column at a constant terminal velocity; it fades in at
   the base and out at the cap so recycling is invisible (nothing teleports). */
const COL_H = [0.34, 0.48, 0.4, 0.62, 0.52, 0.74, 0.6, 0.9, 0.7, 1.04, 0.82, 1.18, 0.94, 1.28];
// const ledger: Formation = (i, n, t, r) => {

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

//   const cols = COL_H.length;
//   const col = i % cols;
//   const h = COL_H[col];
//   const r0 = r[i * 3], r1 = r[i * 3 + 1], r2 = r[i * 3 + 2];
//   const x = -1.04 + (col + 0.5) * (2.08 / cols) + (r2 - 0.5) * 0.06;
//   const base = 0.9;
//   const v = 0.14 + r1 * 0.1; // terminal velocity — steady rise under drag
//   const p = (r0 + (t * v) / h) % 1;
//   const y = base - p * h;
//   const edge = Math.min(p / 0.14, (1 - p) / 0.2, 1); // fade at base & cap
//   return {
//     x,
//     y,
//     lx: x,
//     ly: base, // streamline back to the column base — bars read as luminous fill
//     c: clamp01(0.2 + p * 0.75),
//     a: 0.3 + 0.65 * clamp01(edge),
//   };
// };

/* 1 · "12,000+ businesses" — hub-and-spoke orbits around the GSP core. Three
   rings of businesses circle a dense central hub; angular velocity follows
   Kepler's third law (ω ∝ r^-3/2), and each node's trail traces its actual
   path along the orbit — faster ring, longer trail. */
const RINGS = [0.3, 0.58, 0.9];
const HUB_Y = 0.04;
// const network: Formation = (i, n, t, r) => {
//   const r0 = r[i * 3], r1 = r[i * 3 + 1];
//   // ~8% of particles form the dense GSP hub at the centre
//   if (r1 < 0.08) {
//     const ang = r0 * TAU + t * 0.4;
//     const rad = 0.035 + r0 * 0.07;
//     const x = Math.cos(ang) * rad;
//     const y = Math.sin(ang) * rad * 0.8 + HUB_Y;
//     return { x, y, lx: x * 0.35, ly: HUB_Y + (y - HUB_Y) * 0.35, c: 0.55, a: 0.95 };
//   }
//   const ring = i % 3;
//   const R = RINGS[ring];
//   const om = 0.42 / Math.pow(R, 1.5); // Kepler: inner orbits are faster
//   const ang = r0 * TAU + t * om;
//   const tilt = 0.72; // viewing tilt — orbits project to ellipses
//   const x = Math.cos(ang) * R * 1.14;
//   const y = Math.sin(ang) * R * tilt + HUB_Y;
//   const back = ang - om * 0.36; // trail along the orbital path
//   return {
//     x,
//     y,
//     lx: Math.cos(back) * R * 1.14,
//     ly: Math.sin(back) * R * tilt + HUB_Y,
//     c: 0.18 + ring * 0.34,
//     a: 0.4 + 0.5 * ((Math.sin(ang) + 1) / 2), // near side of the disc brighter
//   };
// };
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


/* 2 · "5,000+ CAs & tax professionals" — the practitioner lattice. A grid of
   nodes carries a circular wave radiating from the centre with 1/r amplitude
   decay (true 2-D wave attenuation). Each node draws its displacement vector
   from rest, so the wavefront reads as coordinated motion, not noise. */
const lattice: Formation = (i, n, t) => {
  const cols = n > 180 ? 20 : 13;
  const rows = Math.ceil(n / cols);
  const gx = (i % cols) / (cols - 1);
  const gy = Math.floor(i / cols) / Math.max(1, rows - 1);
  const x0 = -1.06 + gx * 2.12;
  const y0 = -0.6 + gy * 1.44;
  const d = Math.hypot(x0, y0 - 0.06);
  const env = 0.11 / (1 + d * 1.2); // amplitude ∝ 1/r
  const phase = Math.sin(d * 5.6 - t * 2.3);
  const w = phase * env;
  const crest = (phase + 1) / 2;
  return {
    x: x0,
    y: y0 - w * 2.4,
    lx: x0,
    ly: y0,
    c: clamp01(0.35 + crest * 0.55 - d * 0.18),
    a: 0.28 + 0.62 * crest * clamp01(1.3 - d * 0.45),
  };
};

/* 3 · "99.95% API uptime" — the uptime trace. A heartbeat pulse sweeps two
   monitored baselines left-to-right at constant velocity; brightness decays
   behind the beam like monitor phosphor. The line never flatlines. */
function ekg(s: number) {
  // P wave, QRS complex, T wave — a classic monitor trace
  return (
    0.16 * Math.exp(-((s + 1.5) ** 2) * 6) -
    0.2 * Math.exp(-((s + 0.3) ** 2) * 60) +
    Math.exp(-s * s * 40) -
    0.26 * Math.exp(-((s - 0.35) ** 2) * 40) +
    0.3 * Math.exp(-((s - 1.2) ** 2) * 5)
  );
}
const pulse: Formation = (i, n, t, r) => {
  const r0 = r[i * 3];
  const echo = i % 3 === 2; // every third particle traces a second endpoint
  const m = echo ? Math.floor(i / 3) / Math.max(1, Math.floor((n - 1) / 3)) : 0;
  const frac = echo ? m : (i - Math.floor(i / 3)) / Math.max(1, n - 1 - Math.floor((n - 1) / 3));
  const x = -1.08 + frac * 2.16;
  const y0 = (echo ? 0.52 : -0.06) + (r0 - 0.5) * 0.02;
  const amp = echo ? 0.17 : 0.36;
  const sweep = 0.62; // constant beam velocity
  const px = -1.5 + ((t * sweep + (echo ? 1.4 : 0)) % 3.4);
  const s = (x - px) * 6;
  const y = y0 - ekg(s) * amp;
  const behind = px - x;
  const glow = behind >= 0 ? Math.exp(-behind * 1.1) : Math.exp(behind * 26);
  return {
    x,
    y,
    lx: x,
    ly: y0 + 0.015,
    c: clamp01(0.2 + 0.8 * glow),
    a: (echo ? 0.24 : 0.32) + (echo ? 0.5 : 0.66) * glow,
  };
};

const FORMATIONS: Formation[] = [globe, sunburst, lattice, pulse];
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
      // reduced-motion still gets a composed (non-zero-time) static frame
      const t = reduced ? 8 : (now - start) / 1000;
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
