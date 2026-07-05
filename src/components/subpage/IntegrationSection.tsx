import type { CSSProperties } from "react";
import { ButtonLink } from "../ui/Button";
import { EyebrowPill } from "../ui/EyebrowPill";
import type {
  IntegrationSection as IntegrationSectionData,
  IntegrationHighlight,
  IntegrationStat,
} from "../../types/pages.ts";
import { useNavigate } from "react-router-dom";
import { Zap, ShieldCheck, CheckCircle2, Lock, Image as ImageIcon, Boxes } from "lucide-react";
import wbLogo from "@/assets/logo-white-books.svg";
import { SiteLogo } from "../ui/SiteLogo.tsx";
import { getLogoAsset } from "./logoAssets.ts";

interface Props {
  data: IntegrationSectionData;
}

const wrap = "w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4";

const HIGHLIGHT_ICONS = {
  sync: Zap,
  shield: ShieldCheck,
  check: CheckCircle2,
  lock: Lock,
} as const;

const DEFAULT_HIGHLIGHTS: IntegrationHighlight[] = [
  { icon: "sync", title: "Real-time Sync", body: "Native connectors for instant data flow" },
  { icon: "shield", title: "Always Up-to-date", body: "Maintained against every ERP upgrade" },
  { icon: "check", title: "Zero Manual Work", body: "No CSV exports. No email uploads." },
  { icon: "lock", title: "Enterprise Secure", body: "Bank-grade security & data protection" },
];

const DEFAULT_STATS: IntegrationStat[] = [
  { value: "40+", label: "ERP Integrations" },
  { value: "1000+", label: "Active Customers" },
  { value: "Real-time", label: "Data Push" },
  { value: "99.9%", label: "Uptime SLA" },
];

/**
 * Orbit slots as % coordinates inside the square visual, ordered so the most
 * recognisable logos (first in data.logos) land in the most prominent spots.
 * `x`/`y` apply from sm up; `mx`/`my` are pulled inward so the compact cards
 * stay inside a ~320px viewport without clipping.
 */
interface OrbitSlot { x: number; y: number; mx: number; my: number }

const ORBIT_SLOTS: OrbitSlot[] = [
  { x: 50, y: 5, mx: 50, my: 4 },   // top
  { x: 24, y: 13, mx: 22, my: 15 }, // upper left
  { x: 76, y: 13, mx: 78, my: 15 }, // upper right
  { x: 8, y: 32, mx: 17, my: 34 },  // left high
  { x: 92, y: 32, mx: 83, my: 34 }, // right high
  { x: 4, y: 55, mx: 15, my: 55 },  // left mid
  { x: 96, y: 55, mx: 85, my: 55 }, // right mid
  { x: 14, y: 78, mx: 19, my: 76 }, // left low
  { x: 86, y: 78, mx: 81, my: 76 }, // right low
  { x: 34, y: 93, mx: 32, my: 94 }, // bottom left
  { x: 66, y: 93, mx: 68, my: 94 }, // bottom right
];

/** Decorative dot colours along the spokes (matches the constellation styling). */
const SPOKE_DOT_COLORS = [
  "var(--brand)",
  "#8b7cf6",
  "#5ec9e8",
  "#e8a25e",
  "#7ce8b0",
];

function OrbitNode({ label }: { label: string }) {
  const asset = getLogoAsset(label);
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 py-1.5 px-2 sm:py-2 sm:px-3 rounded-lg sm:rounded-xl bg-[var(--bg-2)] border border-solid border-hairline shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)] transition-colors duration-[160ms] hover:border-brand-border">
      {asset ? (
        <span className="flex items-center justify-center w-5 h-5 sm:w-7 sm:h-7 shrink-0 rounded sm:rounded-md bg-white p-0.5 sm:p-1">
          <img src={asset} alt={label} className="w-full h-full object-contain" loading="lazy" />
        </span>
      ) : (
        /* Image placeholder — used when no brand asset exists for this label */
        <span className="flex items-center justify-center w-5 h-5 sm:w-7 sm:h-7 shrink-0 rounded sm:rounded-md border border-dashed border-[var(--hairline-bright)] text-[var(--muted-2)]">
          <ImageIcon size={12} strokeWidth={1.5} />
        </span>
      )}
      <span className="font-body text-[10.5px] sm:text-[12px] font-medium leading-tight text-[var(--fg-primary)] whitespace-nowrap max-w-[60px] truncate sm:max-w-none">
        {label}
      </span>
    </div>
  );
}

/** Dotted spokes from the hub to each active slot. Rendered once per breakpoint. */
function Spokes({ slots, className }: { slots: { x: number; y: number }[]; className?: string }) {
  return (
    <svg className={`absolute inset-0 w-full h-full ${className ?? ""}`} viewBox="0 0 100 100" fill="none">
      {slots.map((slot, i) => {
        // Trim the spoke so it stops short of the hub and the node card
        const hx = 50 + (slot.x - 50) * 0.18;
        const hy = 50 + (slot.y - 50) * 0.18;
        const nx = 50 + (slot.x - 50) * 0.82;
        const ny = 50 + (slot.y - 50) * 0.82;
        const dx = 50 + (slot.x - 50) * 0.5;
        const dy = 50 + (slot.y - 50) * 0.5;
        return (
          <g key={i}>
            <line
              x1={hx} y1={hy} x2={nx} y2={ny}
              stroke="var(--hairline-bright)"
              strokeWidth="0.35"
              strokeDasharray="0.6 1.6"
            />
            <circle cx={dx} cy={dy} r="0.9" fill={SPOKE_DOT_COLORS[i % SPOKE_DOT_COLORS.length]} opacity="0.75" />
          </g>
        );
      })}
    </svg>
  );
}

function OrbitVisual({ logos, overflowLabel }: { logos: string[]; overflowLabel?: string }) {
  const maxNodes = ORBIT_SLOTS.length;
  const visible =
    logos.length > maxNodes ? logos.slice(0, maxNodes - 1) : logos.slice(0, maxNodes);
  const overflow =
    overflowLabel ?? (logos.length > maxNodes ? `& ${logos.length - visible.length}+ more` : null);
  const nodes = overflow ? [...visible, overflow] : visible;
  const activeSlots = ORBIT_SLOTS.slice(0, nodes.length);

  return (
    <div className="relative w-full max-w-[560px] mx-auto aspect-square select-none" aria-hidden="true">
      {/* Ambient glow behind the hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[62%] h-[62%] rounded-full bg-[radial-gradient(circle,var(--brand-glow)_0%,transparent_68%)]" />

      {/* Concentric dashed rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[46%] h-[46%] rounded-full border border-dashed border-[var(--hairline-bright)]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[68%] h-[68%] rounded-full border border-dashed border-hairline" />

      {/* Spokes from hub to each node — mobile and desktop use different slot coords */}
      <Spokes slots={activeSlots.map((s) => ({ x: s.mx, y: s.my }))} className="sm:hidden" />
      <Spokes slots={activeSlots} className="hidden sm:block" />

      {/* Center hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 sm:w-[104px] sm:h-[104px] rounded-2xl sm:rounded-[26px] bg-[var(--bg-2)] border border-solid border-brand-border shadow-[0_0_60px_var(--brand-glow),0_18px_40px_-18px_rgba(0,0,0,0.6)]">
        <SiteLogo className="w-20" />
        {/* <img src={wbLogo} alt="" className="w-8 h-8 sm:w-12 sm:h-12 object-contain" loading="lazy" /> */}
      </div>

      {/* Orbiting integration nodes */}
      {nodes.map((label, i) => {
        const slot = ORBIT_SLOTS[i];
        return (
          <div
            key={label}
            className="absolute -translate-x-1/2 -translate-y-1/2 left-[var(--mx)] top-[var(--my)] sm:left-[var(--x)] sm:top-[var(--y)]"
            style={
              {
                "--x": `${slot.x}%`,
                "--y": `${slot.y}%`,
                "--mx": `${slot.mx}%`,
                "--my": `${slot.my}%`,
              } as CSSProperties
            }
          >
            <OrbitNode label={label} />
          </div>
        );
      })}
    </div>
  );
}

export function IntegrationSection({ data }: Props) {
  const navigate = useNavigate();
  const highlights = data.highlights ?? DEFAULT_HIGHLIGHTS;
  const stats = data.stats ?? DEFAULT_STATS;

  return (
    <section className={`${wrap} relative py-[72px] sm:py-[120px]`}>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] gap-14 lg:gap-10 items-center">
        {/* ── Left: narrative + proof ─────────────────────────── */}
        <div>
          <EyebrowPill label={data.eyebrow ?? `${data.logos.length}+ ERP Integrations`} />

          {data.heading && (
            <h2 className="mt-5 font-display font-medium text-[clamp(28px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] text-balance m-0 text-[var(--fg-primary)]">
              {data.heading}
              {data.headingAccent && (
                <>
                  <br />
                  <span className="text-[var(--brand)]">{data.headingAccent}</span>
                </>
              )}
            </h2>
          )}

          {data.body && (
            <p className="mt-4 text-[16.5px] text-[var(--muted-2)] max-w-[560px] leading-[1.55]">
              {data.body}
            </p>
          )}

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8">
            {highlights.map((h) => {
              const Icon = HIGHLIGHT_ICONS[h.icon] ?? Boxes;
              return (
                <div key={h.title}>
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--brand-soft)] text-[var(--brand)]">
                    <Icon size={17} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-3.5 font-body text-[14px] font-semibold m-0 text-[var(--fg-primary)]">
                    {h.title}
                  </h3>
                  <p className="mt-1.5 text-[12.5px] leading-[1.5] text-[var(--muted-2)] m-0">
                    {h.body}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-9 grid grid-cols-2 sm:grid-cols-4 rounded-2xl bg-[var(--bg-2)]">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`py-5 px-5 ${i > 0 ? "sm:border-l max-sm:odd:border-l-0 max-sm:border-l" : ""} ${i > 1 ? "max-sm:border-t" : ""} ${i > 0 ? "border-solid border-hairline border-t-0 border-r-0 border-b-0" : ""}`}
              >
                <div className="font-display text-[22px] font-semibold leading-none text-[var(--brand)]">
                  {s.value}
                </div>
                <div className="mt-2 text-[12.5px] text-[var(--muted-2)]">{s.label}</div>
              </div>
            ))}
          </div>

          {data.cta && (
            <div className="mt-7">
              <ButtonLink
                onClick={() => navigate("/developer")}
                href={data.cta.href || "#"}

                arrow
              >
                {data.cta.label}
              </ButtonLink>
            </div>
          )}
        </div>

        {/* ── Right: integration constellation ────────────────── */}
        <div>
          <OrbitVisual logos={data.logos} overflowLabel={data.logosOverflowLabel} />
          {/* The orbit is decorative for assistive tech; expose the list itself */}
          <ul className="sr-only">
            {data.logos.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
