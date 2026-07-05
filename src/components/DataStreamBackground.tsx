import { useEffect, useRef } from "react";

/**
 * DataStreamBackground
 * ---------------------
 * A transparent canvas backdrop of slow, thin flowing spline curves with tiny
 * glowing data packets travelling along them — "millions of invoices quietly
 * flowing through a compliance network."
 *
 * Design constraints:
 *  - Transparent — the host section supplies the (theme-aware) background so
 *    this reads correctly in both dark and light mode. Everything is extremely
 *    subtle (curves 5–10% visible).
 *  - 10 organic curves that undulate, drift, approach and part (soft merge glow).
 *  - 2–3px pink (#dc2f65) packets, varying speeds, occasional fades.
 *  - Motion is very slow; honours prefers-reduced-motion.
 */

const PINK = "220, 47, 101"; // #dc2f65 rgb channels
const CURVE_COUNT = 10;
const PACKET_COUNT = 26;

const rand = (a: number, b: number) => a + Math.random() * (b - a);

type Wave = { amp: number; freq: number; phase: number; speed: number };
type Curve = {
    baseY: number;
    waves: Wave[];
    drift: number;
    driftSpeed: number;
    opacity: number;
};
type Packet = {
    curve: number;
    t: number;
    speed: number;
    radius: number;
    fadeSpeed: number;
    fadePhase: number;
};

export default function DataStreamBackground({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        // Track the active theme so curves/packets stay visible on light too.
        const root = document.documentElement;
        let isLight = root.getAttribute("data-theme") === "light";
        const themeObserver = new MutationObserver(() => {
            isLight = root.getAttribute("data-theme") === "light";
            if (reduceMotion) draw(0); // repaint the static frame on toggle
        });
        themeObserver.observe(root, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        let width = 0;
        let height = 0;
        let dpr = 1;
        let raf = 0;

        // ── Curve field ──────────────────────────────────────────────────
        const curves: Curve[] = Array.from({ length: CURVE_COUNT }, (_, i) => ({
            baseY: (i + 0.5) / CURVE_COUNT + rand(-0.025, 0.025),
            waves: [
                { amp: rand(0.035, 0.065), freq: rand(0.7, 1.4), phase: rand(0, Math.PI * 2), speed: rand(0.04, 0.09) },
                { amp: rand(0.012, 0.028), freq: rand(1.8, 3.0), phase: rand(0, Math.PI * 2), speed: rand(0.06, 0.13) },
            ],
            drift: rand(0.012, 0.03),
            driftSpeed: rand(0.02, 0.05),
            opacity: rand(0.05, 0.1),
        }));

        const packets: Packet[] = Array.from({ length: PACKET_COUNT }, () => ({
            curve: Math.floor(Math.random() * CURVE_COUNT),
            t: Math.random(),
            speed: rand(0.008, 0.026), // fraction of width per second
            radius: rand(1, 1.5), // CSS px → 2–3px diameter
            fadeSpeed: rand(0.25, 0.7),
            fadePhase: rand(0, Math.PI * 2),
        }));

        // Curve y (fraction 0..1) at fractional x and time (seconds)
        const curveY = (c: Curve, x: number, t: number) => {
            let y = c.baseY + Math.sin(t * c.driftSpeed + c.baseY * 12) * c.drift;
            for (const w of c.waves) {
                y += Math.sin(x * Math.PI * 2 * w.freq + w.phase + t * w.speed) * w.amp;
            }
            return y;
        };

        // ── Sizing ───────────────────────────────────────────────────────
        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();

        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        // ── Render ───────────────────────────────────────────────────────
        const draw = (t: number) => {
            // Transparent — the section's themed background shows through.
            ctx.clearRect(0, 0, width, height);

            // On light backgrounds a light highlight vanishes, so darken the
            // mid-stroke tint; the bloom/packet blend must darken too (source-over
            // instead of the additive "lighter" used on dark).
            const light = isLight;
            const midStop = light ? "150, 70, 100" : "230, 210, 220";
            const blend: GlobalCompositeOperation = light ? "source-over" : "lighter";

            const step = 12; // px sampling interval along x
            const cols = Math.max(2, Math.ceil(width / step));

            // Precompute sampled points per curve (also reused for merge glows)
            const pts: number[][] = curves.map((c) => {
                const ys: number[] = new Array(cols + 1);
                for (let i = 0; i <= cols; i++) {
                    const x = i / cols;
                    ys[i] = curveY(c, x, t) * height;
                }
                return ys;
            });

            // Strokes — faint, edge-faded so streams emerge and dissolve
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            ctx.lineWidth = 1;
            for (let ci = 0; ci < curves.length; ci++) {
                const ys = pts[ci];
                const grad = ctx.createLinearGradient(0, 0, width, 0);
                const op = curves[ci].opacity;
                grad.addColorStop(0, `rgba(${PINK}, 0)`);
                grad.addColorStop(0.18, `rgba(${PINK}, ${op * 0.7})`);
                grad.addColorStop(0.5, `rgba(${midStop}, ${op})`);
                grad.addColorStop(0.82, `rgba(${PINK}, ${op * 0.7})`);
                grad.addColorStop(1, `rgba(${PINK}, 0)`);
                ctx.strokeStyle = grad;

                ctx.beginPath();
                ctx.moveTo(0, ys[0]);
                for (let i = 1; i <= cols; i++) {
                    const x = (i / cols) * width;
                    const px = ((i - 1) / cols) * width;
                    const midX = (px + x) / 2;
                    // smooth curve using quadratic midpoint control
                    ctx.quadraticCurveTo(px, ys[i - 1], midX, (ys[i - 1] + ys[i]) / 2);
                }
                ctx.stroke();
            }

            // Merge glows — where two streams nearly touch, bloom softly
            ctx.globalCompositeOperation = blend;
            const mergeThreshold = height * 0.02;
            for (let i = 0; i <= cols; i += 2) {
                const x = (i / cols) * width;
                for (let a = 0; a < curves.length; a++) {
                    for (let b = a + 1; b < curves.length; b++) {
                        const d = Math.abs(pts[a][i] - pts[b][i]);
                        if (d < mergeThreshold) {
                            const y = (pts[a][i] + pts[b][i]) / 2;
                            const closeness = 1 - d / mergeThreshold;
                            const r = 34 + closeness * 26;
                            const alpha = closeness * closeness * 0.12;
                            const g = ctx.createRadialGradient(x, y, 0, x, y, r);
                            g.addColorStop(0, `rgba(${PINK}, ${alpha})`);
                            g.addColorStop(1, `rgba(${PINK}, 0)`);
                            ctx.fillStyle = g;
                            ctx.beginPath();
                            ctx.arc(x, y, r, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                }
            }

            // Data packets — tiny travelling pink dots that fade in and out
            ctx.shadowColor = `rgba(${PINK}, 0.9)`;
            for (const p of packets) {
                const y = curveY(curves[p.curve], p.t, t) * height;
                const x = p.t * width;
                const fade = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * p.fadeSpeed + p.fadePhase));
                // fade near the horizontal edges too
                const edge = Math.min(1, p.t / 0.08, (1 - p.t) / 0.08);
                const alpha = fade * edge;
                if (alpha <= 0.01) continue;
                ctx.shadowBlur = 6;
                ctx.fillStyle = `rgba(${PINK}, ${alpha})`;
                ctx.beginPath();
                ctx.arc(x, y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.shadowBlur = 0;
            ctx.globalCompositeOperation = "source-over";
        };

        // ── Loop ─────────────────────────────────────────────────────────
        const start = performance.now();
        let last = start;
        const loop = (now: number) => {
            const t = (now - start) / 1000;
            const dt = Math.min((now - last) / 1000, 0.05); // clamp tab-switch jumps
            last = now;
            // advance packets (speed = fraction of the track per second)
            for (const p of packets) {
                p.t += p.speed * dt;
                if (p.t > 1) {
                    p.t = 0;
                    p.curve = Math.floor(Math.random() * CURVE_COUNT);
                    p.speed = rand(0.008, 0.026);
                }
            }
            draw(t);
            raf = requestAnimationFrame(loop);
        };

        if (reduceMotion) {
            draw(0);
        } else {
            raf = requestAnimationFrame(loop);
        }

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            themeObserver.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={className}
            style={{ display: "block", width: "100%", height: "100%" }}
        />
    );
}
