/**
 * ProductFlow — the animated flow diagram used by every compliance hero.
 *
 * Source(s) → WhiteBooks → government portal, joined by a path a packet travels
 * along, morphing its label at each leg, with a receipt card sliding in on
 * arrival. Pure SVG + Framer Motion, fully token-driven so it reads native in
 * both themes, and it renders the static completed state under
 * prefers-reduced-motion or before the visual scrolls into view.
 *
 * Grew out of the connector-page pipeline, generalised to fan-in: one source is
 * the connector case (SAP → WhiteBooks → NIC), several is the product case
 * (purchase register + GSTR-2B → WhiteBooks → GSTN). With an odd number of
 * sources the middle one carries the packet and the rest feed into the hub; the
 * even case starts the packet at the hub, which is why the specs use 1 or 3.
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import type { FlowNode, FlowSpec } from "./types";
import { sleep, useHeroMotion, useIsDesktop } from "./useHeroMotion";

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Layout {
  viewBox: string;
  /** The path the packet travels — also the one that draws itself in. */
  d: string;
  /** Extra source legs that merge into the hub (fan-in only). */
  feeders: string[];
  sources: Rect[];
  hub: Rect;
  target: Rect;
  receipt: Rect;
  /** Path fractions at which the packet label morphs. */
  stageHub: number;
  stageTarget: number;
}

/* ── Single source: left→right with a vertical stagger so it doesn't read as a
   ruler. These are the connector-page geometries, unchanged. ─────────────── */
const SOLO_HORIZONTAL: Layout = {
  viewBox: "0 0 640 288",
  d: "M 162 80 C 202 80, 196 234, 238 234 L 426 234 C 468 234, 444 72, 478 72",
  feeders: [],
  sources: [{ x: 4, y: 48, w: 158, h: 64 }],
  hub: { x: 234, y: 196, w: 196, h: 76 },
  target: { x: 478, y: 40, w: 158, h: 64 },
  receipt: { x: 434, y: 150, w: 202, h: 84 },
  stageHub: 0.34,
  stageTarget: 0.8,
};

const SOLO_VERTICAL: Layout = {
  viewBox: "0 0 340 484",
  d: "M 104 66 C 104 104, 220 102, 220 140 L 220 212 C 220 250, 144 248, 144 286",
  feeders: [],
  sources: [{ x: 20, y: 6, w: 168, h: 60 }],
  hub: { x: 120, y: 140, w: 200, h: 72 },
  target: { x: 60, y: 286, w: 168, h: 60 },
  receipt: { x: 30, y: 380, w: 280, h: 84 },
  stageHub: 0.34,
  stageTarget: 0.8,
};

/* ── Fan-in: sources stack on the lead-in edge and converge on the hub ────── */

function fanHorizontal(n: number): Layout {
  const CY = 150;
  const SPACING = 110;
  const mid = (n - 1) / 2;
  const centreY = (i: number) => CY + (i - mid) * SPACING;
  const sources = Array.from({ length: n }, (_, i) => ({
    x: 4,
    y: centreY(i) - 28,
    w: 150,
    h: 56,
  }));
  const trunk = Number.isInteger(mid);
  const feeders = sources
    .map((_, i) => i)
    .filter((i) => !(trunk && i === mid))
    .map((i) => `M 154 ${centreY(i)} C 200 ${centreY(i)}, 184 ${CY}, 224 ${CY}`);
  return {
    viewBox: "0 0 640 300",
    d: trunk ? `M 154 ${CY} L 486 ${CY}` : `M 224 ${CY} L 486 ${CY}`,
    feeders,
    sources,
    hub: { x: 224, y: 112, w: 196, h: 76 },
    target: { x: 486, y: 118, w: 150, h: 64 },
    receipt: { x: 434, y: 202, w: 202, h: 82 },
    // Label morphs as the packet enters the hub and again as it leaves it.
    stageHub: trunk ? 0.22 : 0.1,
    stageTarget: 0.74,
  };
}

function fanVertical(n: number): Layout {
  const GAP = 12;
  const w = Math.round((340 - GAP * (n + 1)) / n);
  const centreX = (i: number) => GAP + i * (w + GAP) + w / 2;
  const mid = (n - 1) / 2;
  const trunk = Number.isInteger(mid);
  const sources = Array.from({ length: n }, (_, i) => ({
    x: GAP + i * (w + GAP),
    y: 12,
    w,
    h: 44,
  }));
  const feeders = sources
    .map((_, i) => i)
    .filter((i) => !(trunk && i === mid))
    .map((i) => `M ${centreX(i)} 56 C ${centreX(i)} 112, 170 108, 170 150`);
  return {
    viewBox: "0 0 340 456",
    d: trunk ? "M 170 56 L 170 280" : "M 170 150 L 170 280",
    feeders,
    sources,
    hub: { x: 50, y: 150, w: 240, h: 72 },
    target: { x: 70, y: 280, w: 200, h: 60 },
    receipt: { x: 30, y: 364, w: 280, h: 80 },
    stageHub: trunk ? 0.42 : 0.1,
    stageTarget: 0.74,
  };
}

function getLayout(n: number, desktop: boolean): Layout {
  if (n <= 1) return desktop ? SOLO_HORIZONTAL : SOLO_VERTICAL;
  return desktop ? fanHorizontal(n) : fanVertical(n);
}

const TRAVEL_S = 2.8;
const RECEIPT_HOLD_MS = 1700;

/* Fake 7×7 QR modules (finder squares + noise) for the receipt card. */
const QR_ROWS = [
  "1110111", "1010101", "1110111", "0011010", "1110010", "1010110", "1110101",
];

/* ── Node card ─────────────────────────────────────────────────────────────── */
function NodeCard({
  rect,
  node,
  accent = false,
  /** Chips are the narrow mobile fan-in sources: short label, centred, no sub. */
  chip = false,
  delay,
}: {
  rect: Rect;
  node: FlowNode;
  accent?: boolean;
  chip?: boolean;
  delay: number;
}) {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay }}>
      <rect
        x={rect.x}
        y={rect.y}
        width={rect.w}
        height={rect.h}
        rx={chip ? 11 : 14}
        strokeWidth={1}
        className={
          accent
            ? "fill-bg-card stroke-[color-mix(in_srgb,var(--brand)_40%,transparent)]"
            : "fill-bg-card stroke-[var(--hairline-strong)]"
        }
      />
      {chip ? (
        <text
          x={rect.x + rect.w / 2}
          y={rect.y + rect.h / 2 + 4}
          textAnchor="middle"
          className="fill-fg-primary font-display font-semibold tracking-[-0.01em] text-[12px]"
        >
          {node.short ?? node.label}
        </text>
      ) : (
        <>
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
        </>
      )}
    </motion.g>
  );
}

/* ── Receipt card (below the target node) ─────────────────────────────────── */
function Receipt({ rect, receipt }: { rect: Rect; receipt: FlowSpec["receipt"] }) {
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

/* ── Flow ─────────────────────────────────────────────────────────────────── */
export function ProductFlow({ spec, className }: { spec: FlowSpec; className?: string }) {
  const { ref, active, reduced } = useHeroMotion<SVGSVGElement>();
  const desktop = useIsDesktop();
  const layout = getLayout(spec.sources.length, desktop);

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
    if (!active || !ready) return;
    let alive = true;
    let ctrl: ReturnType<typeof animate> | undefined;

    const unsub = progress.on("change", (p) => {
      const s = p >= layout.stageTarget ? 2 : p >= layout.stageHub ? 1 : 0;
      if (s !== stageRef.current) {
        stageRef.current = s;
        setStage(s);
        if (s === 1) setPulseKey((k) => k + 1);
      }
    });

    (async () => {
      await sleep(1000); // let the path draw in first
      while (alive) {
        stageRef.current = 0;
        setStage(0);
        setPhase("travel");
        progress.set(0);
        ctrl = animate(progress, 1, { duration: TRAVEL_S, ease: "easeInOut" });
        await ctrl;
        if (!alive) return;
        setPhase("receipt");
        await sleep(RECEIPT_HOLD_MS);
      }
    })();

    return () => {
      alive = false;
      unsub();
      ctrl?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, ready, layout.d]);

  const showPacket = active && phase === "travel";
  const showReceipt = !active || phase === "receipt";
  const chipSources = spec.sources.length > 1 && !desktop;

  return (
    <svg
      ref={ref}
      viewBox={layout.viewBox}
      className={`block h-auto w-full ${className ?? ""}`}
      role="img"
      aria-label={`${spec.sources.map((s) => s.label).join(", ")} to ${spec.target.label} via ${spec.hub.label} — automated compliance pipeline`}
    >
      {/* Invisible twin used purely for length/point sampling. */}
      <path ref={measureRef} d={layout.d} fill="none" stroke="none" />

      {/* Static rails: the packet path plus any fan-in legs. */}
      {[layout.d, ...layout.feeders].map((d, i) => (
        <motion.path
          key={`rail-${i}`}
          d={d}
          fill="none"
          strokeWidth={1.5}
          className="stroke-[var(--hairline-strong)]"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: "easeInOut", delay: 0.15 + i * 0.06 }}
        />
      ))}

      {/* Continuous dash-offset flow (Stripe-style). */}
      {[layout.d, ...layout.feeders].map((d, i) => (
        <motion.path
          key={`flow-${i}`}
          d={d}
          fill="none"
          strokeWidth={1.5}
          strokeDasharray="6 14"
          strokeLinecap="round"
          className="stroke-brand"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 0.3, strokeDashoffset: [0, -100] } : { opacity: 0.3 }}
          transition={
            active
              ? {
                opacity: { duration: 0.4, delay: 0.9 },
                strokeDashoffset: { duration: 5, ease: "linear", repeat: Infinity, delay: 0.9 },
              }
              : { duration: 0.4 }
          }
        />
      ))}

      {spec.sources.map((node, i) => (
        <NodeCard
          key={node.label}
          rect={layout.sources[i]}
          node={node}
          chip={chipSources}
          delay={0.2 + i * 0.07}
        />
      ))}
      <NodeCard rect={layout.hub} node={spec.hub} accent delay={0.35} />
      <NodeCard rect={layout.target} node={spec.target} delay={0.5} />

      {/* Hub border pulse — fires once each time the packet enters. */}
      {pulseKey > 0 && (
        <motion.rect
          key={pulseKey}
          x={layout.hub.x}
          y={layout.hub.y}
          width={layout.hub.w}
          height={layout.hub.h}
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
        {showReceipt && <Receipt key="receipt" rect={layout.receipt} receipt={spec.receipt} />}
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
              {spec.packets[stage]}
            </motion.text>
          </AnimatePresence>
        </motion.g>
      )}
    </svg>
  );
}
