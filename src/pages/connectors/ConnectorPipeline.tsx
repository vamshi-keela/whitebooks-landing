/**
 * ConnectorPipeline — the hero visual for every connector landing page.
 * Three nodes (ERP → WhiteBooks → NIC/GSTN) joined by a flowing path; a small
 * packet travels the path morphing IDOC → JSON → IRN ✓, and a receipt card
 * slides in under the target node on arrival. Pure SVG + Framer Motion,
 * fully token-driven so it reads native in both themes, and it renders the
 * static completed state under prefers-reduced-motion.
 *
 * Node labels / packet stages / receipt copy come in via `PipelineConfig`, so
 * the same component serves SAP, Oracle, Dynamics and Tally across the
 * e-Invoicing, e-Way Bill and GST pages.
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

export interface PipelineNode {
  label: string;
  sub: string;
}

export interface PipelineConfig {
  source: PipelineNode;
  hub: PipelineNode;
  target: PipelineNode;
  /** Packet label per leg: [at source, inside hub, arriving at target] */
  packets: [string, string, string];
  receipt: { title: string; meta: string; qr?: boolean };
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Layout {
  viewBox: string;
  d: string;
  a: Rect;
  b: Rect;
  c: Rect;
  receipt: Rect;
}

/* Desktop: left→right with a vertical stagger so it doesn't read as a ruler. */
const HORIZONTAL: Layout = {
  viewBox: "0 0 640 288",
  d: "M 162 80 C 202 80, 196 234, 238 234 L 426 234 C 468 234, 444 72, 478 72",
  a: { x: 4, y: 48, w: 158, h: 64 },
  b: { x: 234, y: 196, w: 196, h: 76 },
  c: { x: 478, y: 40, w: 158, h: 64 },
  receipt: { x: 434, y: 150, w: 202, h: 84 },
};

/* Mobile: the same flow rotated to a vertical S-curve. */
const VERTICAL: Layout = {
  viewBox: "0 0 340 484",
  d: "M 104 66 C 104 104, 220 102, 220 140 L 220 212 C 220 250, 144 248, 144 286",
  a: { x: 20, y: 6, w: 168, h: 60 },
  b: { x: 120, y: 140, w: 200, h: 72 },
  c: { x: 60, y: 286, w: 168, h: 60 },
  receipt: { x: 30, y: 380, w: 280, h: 84 },
};

/* Path-progress fractions where the packet label morphs (enter hub / near target). */
const STAGE_HUB = 0.34;
const STAGE_TARGET = 0.8;
const TRAVEL_S = 2.8;
const RECEIPT_HOLD_MS = 1700;

/* Fake 7×7 QR modules (finder squares + noise) for the receipt card. */
const QR_ROWS = [
  "1110111", "1010101", "1110111", "0011010", "1110010", "1010110", "1110101",
];

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

/* ── Node card ─────────────────────────────────────────────────────────────── */
function NodeCard({
  rect,
  node,
  accent = false,
  delay,
}: {
  rect: Rect;
  node: PipelineNode;
  accent?: boolean;
  delay: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <rect
        x={rect.x}
        y={rect.y}
        width={rect.w}
        height={rect.h}
        rx={14}
        strokeWidth={1}
        className={
          accent
            ? "fill-bg-card stroke-[color-mix(in_srgb,var(--brand)_40%,transparent)]"
            : "fill-bg-card stroke-[var(--hairline-strong)]"
        }
      />
      <text
        x={rect.x + 16}
        y={rect.y + rect.h / 2 - 4}
        className="fill-fg-primary font-display font-semibold tracking-[-0.01em] text-[14px] lg:text-[16px]"
      >
        {node.label}
      </text>
      <text
        x={rect.x + 16}
        y={rect.y + rect.h / 2 + 15}
        className="fill-fg-tertiary font-body text-[10.5px] lg:text-[12px] [overflow:visible]"
      >
        {node.sub}
      </text>
    </motion.g>
  );
}

/* ── Receipt card (below target node) ─────────────────────────────────────── */
function Receipt({ rect, receipt }: { rect: Rect; receipt: PipelineConfig["receipt"] }) {
  const qrCell = 4;
  const qrSize = QR_ROWS.length * qrCell;
  const qrX = rect.x + rect.w - qrSize - 14;
  const qrY = rect.y + (rect.h - qrSize) / 2;
  return (
    <motion.g
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <rect
        x={rect.x}
        y={rect.y}
        width={rect.w}
        height={rect.h}
        rx={12}
        strokeWidth={1}
        className="fill-bg-card stroke-[var(--hairline-strong)]"
      />
      <circle cx={rect.x + 18} cy={rect.y + 26} r={3.5} className="fill-ok" />
      <text
        x={rect.x + 28}
        y={rect.y + 30}
        className="fill-fg-primary font-display font-semibold text-[13px] lg:text-[14px]"
      >
        {receipt.title}
      </text>
      <text
        x={rect.x + 15}
        y={rect.y + 56}
        className="fill-fg-secondary font-mono text-[11px] lg:text-[9px]"
      >
        {receipt.meta}
      </text>
      {receipt.qr &&
        QR_ROWS.map((row, r) =>
          row.split("").map((bit, c) =>
            bit === "1" ? (
              <rect
                key={`${r}-${c}`}
                x={qrX + c * qrCell}
                y={qrY + r * qrCell}
                width={qrCell - 1}
                height={qrCell - 1}
                className="fill-fg-primary opacity-80"
              />
            ) : null,
          ),
        )}
    </motion.g>
  );
}

/* ── Pipeline ─────────────────────────────────────────────────────────────── */
export function ConnectorPipeline({ config, className }: { config: PipelineConfig; className?: string }) {
  const reduced = useReducedMotion();
  const desktop = useIsDesktop();
  const layout = desktop ? HORIZONTAL : VERTICAL;

  const measureRef = useRef<SVGPathElement>(null);
  const lenRef = useRef(0);
  const [ready, setReady] = useState(false);

  const [stage, setStage] = useState(0);
  const stageRef = useRef(0);
  const [pulseKey, setPulseKey] = useState(0);
  const [phase, setPhase] = useState<"travel" | "receipt">("travel");

  const progress = useMotionValue(0);
  const px = useTransform(progress, (p) => {
    const el = measureRef.current;
    return el && lenRef.current ? el.getPointAtLength(p * lenRef.current).x : -100;
  });
  const py = useTransform(progress, (p) => {
    const el = measureRef.current;
    return el && lenRef.current ? el.getPointAtLength(p * lenRef.current).y : -100;
  });

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    lenRef.current = el.getTotalLength();
    setReady(true);
  }, [layout.d]);

  useEffect(() => {
    if (reduced || !ready) return;
    let active = true;
    let ctrl: ReturnType<typeof animate> | undefined;

    const unsub = progress.on("change", (p) => {
      const s = p >= STAGE_TARGET ? 2 : p >= STAGE_HUB ? 1 : 0;
      if (s !== stageRef.current) {
        stageRef.current = s;
        setStage(s);
        if (s === 1) setPulseKey((k) => k + 1);
      }
    });

    (async () => {
      await sleep(1000); // let the path draw in first
      while (active) {
        stageRef.current = 0;
        setStage(0);
        setPhase("travel");
        progress.set(0);
        ctrl = animate(progress, 1, { duration: TRAVEL_S, ease: "easeInOut" });
        await ctrl;
        if (!active) return;
        setPhase("receipt");
        await sleep(RECEIPT_HOLD_MS);
      }
    })();

    return () => {
      active = false;
      unsub();
      ctrl?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ready, layout.d]);

  const showPacket = !reduced && phase === "travel";
  const showReceipt = reduced || phase === "receipt";
  const { a, b, c } = layout;

  return (
    <svg
      viewBox={layout.viewBox}
      className={`block h-auto w-full ${className ?? ""}`}
      role="img"
      aria-label={`${config.source.label} to ${config.target.label} via ${config.hub.label} — automated compliance pipeline`}
    >
      {/* Invisible twin used purely for length/point sampling. */}
      <path ref={measureRef} d={layout.d} fill="none" stroke="none" />

      {/* Connecting path — draws itself on entrance. */}
      <motion.path
        d={layout.d}
        fill="none"
        strokeWidth={1.5}
        className="stroke-[var(--hairline-strong)]"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: "easeInOut", delay: 0.15 }}
      />
      {/* Continuous dash-offset flow (Stripe-style). */}
      <motion.path
        d={layout.d}
        fill="none"
        strokeWidth={1.5}
        strokeDasharray="6 14"
        strokeLinecap="round"
        className="stroke-brand"
        initial={{ opacity: 0 }}
        animate={
          reduced
            ? { opacity: 0.3 }
            : { opacity: 0.3, strokeDashoffset: [0, -100] }
        }
        transition={
          reduced
            ? { duration: 0.4 }
            : {
              opacity: { duration: 0.4, delay: 0.9 },
              strokeDashoffset: { duration: 5, ease: "linear", repeat: Infinity, delay: 0.9 },
            }
        }
      />

      <NodeCard rect={a} node={config.source} delay={0.2} />
      <NodeCard rect={b} node={config.hub} accent delay={0.35} />
      <NodeCard rect={c} node={config.target} delay={0.5} />

      {/* Hub border pulse — fires once each time the packet enters. */}
      {pulseKey > 0 && (
        <motion.rect
          key={pulseKey}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx={14}
          fill="none"
          strokeWidth={1.5}
          className="stroke-brand [filter:drop-shadow(0_0_10px_var(--brand-glow))]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0] }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      )}

      <AnimatePresence>
        {showReceipt && <Receipt key="receipt" rect={layout.receipt} receipt={config.receipt} />}
      </AnimatePresence>

      {/* Travelling packet — brand pill with a morphing mono label. */}
      {showPacket && (
        <motion.g style={{ x: px, y: py }}>
          <rect
            x={-33}
            y={-13}
            width={66}
            height={26}
            rx={13}
            className="fill-brand [filter:drop-shadow(0_0_12px_var(--brand-glow))]"
          />
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.text
              key={stage}
              textAnchor="middle"
              y={4}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="fill-white font-mono font-semibold tracking-[0.06em] text-[13px] lg:text-[15px]"
            >
              {config.packets[stage]}
            </motion.text>
          </AnimatePresence>
        </motion.g>
      )}
    </svg>
  );
}
