// InvoiceTemplates.tsx — premium "Invoice templates" gallery section.
//
// Single compact two-column composition (fits in ~1-2 screens, not 3):
// left = the active template's info, customize/export affordances and
// feature chips; right = a fanned card stack showing all four templates
// at once — the active one large and straight up front, the other three
// tilted around it like a hand of fanned cards. Hovering a tilted card
// straightens it as a preview cue; clicking promotes it to the front.
// Deliberately breaks from the rest of the page's visual language — a
// fixed dark, editorial stage in the spirit of Canva / Figma Community /
// Apple Wallet.

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  Expand,
  Image as ImageIcon,
  Palette,
  PenTool,
  QrCode,
  ScanLine,
  Stamp,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { useTheme } from "@/contexts/ThemeContext";
import {
  CUSTOMIZATION_ITEMS,
  FEATURE_CHIPS,
  SECTION_HEADER,
  SUPPORTED_PILLS,
  TEMPLATES,
  type InvoiceTemplate,
  type TemplateId,
} from "./invoice-templates.data";
import EyebrowPill from "@/shared/ui/EyebrowPill";

const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#ff5a8e";

/* ── Section header — centered, editorial, tight ─────────────────────────── */
function SectionHeader() {
  return (
    <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
      {/* <span className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_5%,transparent)] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--fg-secondary)]">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: ACCENT, boxShadow: `0 0 8px ${ACCENT}b3` }}
        />
        {SECTION_HEADER.eyebrow}
      </span> */}
      <EyebrowPill label={SECTION_HEADER.eyebrow} textSize='text-[0.75rem]'>
      </EyebrowPill>
      <h2 className="m-0 font-display text-[clamp(32px,3.8vw,44px)] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--fg-primary)] text-balance">
        {SECTION_HEADER.heading}
      </h2>
      <p className="m-0 max-w-[560px] text-[15px] leading-[1.55] text-[var(--fg-secondary)] sm:text-[16px]">
        {SECTION_HEADER.subtitle}
      </p>
    </div>
  );
}

/* ── Template pills — top-level selector for clarity, mirrors the fan
   stage's selection state (pick a template here or by clicking its card). */
function TemplatePill({
  template,
  isActive,
  onSelect,
}: {
  template: InvoiceTemplate;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-300 sm:px-5",
        isActive
          ? "border-transparent bg-[var(--brand)] text-white shadow-[0_8px_24px_-8px_var(--brand-glow)]"
          : "border-[color-mix(in_srgb,var(--fg-primary)_12%,transparent)] bg-[color-mix(in_srgb,var(--fg-primary)_4%,transparent)] text-[var(--fg-tertiary)] hover:border-[color-mix(in_srgb,var(--fg-primary)_25%,transparent)] hover:text-[var(--fg-primary)]",
      )}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: isActive ? "#ffffff" : template.colors[0] }}
      />
      {template.name}
    </button>
  );
}

function TemplatePills({ active, onSelect }: { active: TemplateId; onSelect: (id: TemplateId) => void }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {TEMPLATES.map((t) => (
        <TemplatePill key={t.id} template={t} isActive={t.id === active} onSelect={() => onSelect(t.id)} />
      ))}
    </div>
  );
}

/* ── Template preview — the real rendered invoice screenshot ──────────────
   Image letterboxed on a tinted mat in the template's own accent colour
   so all four sit consistently inside the fan stage.                      */
function TemplatePreview({ template }: { template: InvoiceTemplate }) {
  const [c1, , c3] = template.colors;
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ background: `linear-gradient(150deg, ${c1}1f 0%, ${c3}3d 100%)` }}
    >
      <img
        src={template.image}
        alt={`${template.name} invoice template preview`}
        className="h-full w-full rounded-[10px] object-contain shadow-[0_14px_36px_-16px_rgba(0,0,0,0.6)]"
        draggable={false}
      />
    </div>
  );
}

/* ── Fan stage — all four templates at once ───────────────────────────────
   The active template sits dead-centre, large and straight. The other
   three fill the surrounding corners at a tilt, like a fanned hand of
   cards — no more dead background space. Hover de-rotates a tilted card
   as an affordance; clicking promotes it to the front slot.               */
interface FanSlot {
  left: number;
  top: number;
  rotate: number;
  scale: number;
}

const FAN_SLOTS: FanSlot[] = [
  { left: 50, top: 54, rotate: -3, scale: 1.06 },
  { left: 21, top: 22, rotate: -16, scale: 0.54 },
  { left: 80, top: 19, rotate: 13, scale: 0.52 },
  { left: 77, top: 87, rotate: 9, scale: 0.5 },
];

function FanCard({
  template,
  slot,
  isActive,
  onSelect,
  onExpand,
}: {
  template: InvoiceTemplate;
  slot: FanSlot;
  isActive: boolean;
  onSelect: () => void;
  onExpand?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const straighten = hovered && !isActive;
  const showExpand = hovered && isActive && !!onExpand;
  const rotate = straighten ? 0 : slot.rotate;
  const scale = straighten ? slot.scale * 1.15 : slot.scale;
  const zIndex = isActive ? 40 : straighten ? 38 : 20 - Math.round(slot.top / 10);

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      aria-pressed={isActive}
      aria-label={`Show ${template.name} template`}
      className={cn(
        "absolute w-[150px] cursor-pointer overflow-hidden rounded-[20px] border bg-[var(--bg-card)] transition-[left,top,transform,box-shadow] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] sm:w-[190px] lg:w-[230px] xl:w-[250px]",
        isActive
          ? "border-[color-mix(in_srgb,var(--fg-primary)_16%,transparent)] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)]"
          : "border-[color-mix(in_srgb,var(--fg-primary)_10%,transparent)] shadow-[0_28px_64px_-26px_rgba(0,0,0,0.55)]",
      )}
      style={{
        left: `${slot.left}%`,
        top: `${slot.top}%`,
        transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`,
        zIndex,
      }}
    >
      <div className=" w-full">
        <TemplatePreview template={template} />
      </div>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent py-2 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-white/85">
        {template.name}
      </span>

      {/* Always-visible on the active card so touch devices (no hover) can reach it too. */}
      {isActive && onExpand && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
          aria-label={`Enlarge ${template.name} preview`}
          className="absolute right-2.5 top-2.5 z-[2] flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-sm transition-colors duration-200 hover:bg-black/60 hover:text-white"
        >
          <Expand size={12} />
        </button>
      )}

      <AnimatePresence>
        {showExpand && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => {
              e.stopPropagation();
              onExpand?.();
            }}
            aria-label={`Enlarge ${template.name} preview`}
            className="absolute inset-0 z-[1] flex items-center justify-center bg-black/45 backdrop-blur-[1px]"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[12px] font-medium text-white backdrop-blur-xl">
              <Expand size={14} />
              Enlarge
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function TemplateFanStage({
  activeId,
  onSelect,
  onExpand,
}: {
  activeId: TemplateId;
  onSelect: (id: TemplateId) => void;
  onExpand: () => void;
}) {
  const activeIndex = TEMPLATES.findIndex((t) => t.id === activeId);
  return (
    <div className="relative mx-auto aspect-[1/1] w-full max-w-[380px] sm:max-w-[460px] lg:max-w-[560px] xl:max-w-[600px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
        style={{ background: `radial-gradient(circle at 50% 50%, ${ACCENT}26, transparent 65%)` }}
      />
      {TEMPLATES.map((t, i) => {
        const offset = (i - activeIndex + TEMPLATES.length) % TEMPLATES.length;
        const isActive = offset === 0;
        return (
          <FanCard
            key={t.id}
            template={t}
            slot={FAN_SLOTS[offset]}
            isActive={isActive}
            onSelect={() => onSelect(t.id)}
            onExpand={isActive ? onExpand : undefined}
          />
        );
      })}
    </div>
  );
}

/* ── Lightbox — full-view preview opened from the "Enlarge" overlay ──────── */
function TemplateLightbox({ template, onClose }: { template: InvoiceTemplate; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.22, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[88vh] max-w-[min(92vw,560px)]"
      >
        <img
          src={template.image}
          alt={`${template.name} invoice template — full preview`}
          className="max-h-[88vh] w-full rounded-2xl object-contain shadow-[0_60px_140px_-30px_rgba(0,0,0,0.7)]"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#15151c] text-white/80 shadow-lg transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={16} />
        </button>
        <div className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
          {template.name} template
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Customize row — compact inline glass block (was a floating panel) ───── */
const CUSTOMIZATION_ICONS: Record<string, LucideIcon> = {
  Logo: ImageIcon,
  Signature: PenTool,
  Stamp: Stamp,
  "Brand Color": Palette,
  "QR Code": QrCode,
  "GST Ready": BadgeCheck,
};

function CustomizationRow() {
  return (
    <div className="rounded-2xl border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_4%,transparent)] p-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg-tertiary)]">Customize</span>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {CUSTOMIZATION_ITEMS.map((label) => {
          const Icon = CUSTOMIZATION_ICONS[label];
          return (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_4%,transparent)] px-2.5 py-1 text-[12px] text-[var(--fg-secondary)]"
            >
              <Icon size={12} style={{ color: ACCENT }} />
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ── Template info — name, description, social proof, support pills ──────── */
function TemplateInfo({ template }: { template: InvoiceTemplate }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={template.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="m-0 font-display text-[22px] font-semibold tracking-[-0.01em] text-[var(--fg-primary)]">
            {template.name}
          </h3>
          <span className="rounded-full border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_5%,transparent)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--fg-tertiary)]">
            {template.usedBy} businesses
          </span>
        </div>
        <p className="m-0 max-w-[440px] text-[14px] leading-[1.55] text-[var(--fg-secondary)]">{template.description}</p>
        <div className="flex flex-wrap items-center gap-1.5">
          {SUPPORTED_PILLS.map((p) => (
            <span
              key={p}
              className="rounded-full border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_4%,transparent)] px-2.5 py-1 text-[11.5px] font-medium text-[var(--fg-secondary)]"
            >
              {p}
            </span>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Feature chips — replaces the old bullet list ─────────────────────────── */
function FeatureChip({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: EASE }}
      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_4%,transparent)] px-3 py-1.5 text-[12px] font-medium text-[var(--fg-secondary)]"
    >
      <span className="h-1 w-1 rounded-full" style={{ background: ACCENT }} />
      {children}
    </motion.span>
  );
}

function FeaturesRow() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {FEATURE_CHIPS.map((f) => (
        <FeatureChip key={f}>{f}</FeatureChip>
      ))}
    </div>
  );
}

/* ── Signed IRN QR — e-Invoice-only affordance ────────────────────────────
   Every e-invoice carries the IRP-signed QR (IRN, GSTINs, invoice value,
   HSN, timestamp). We render it as a placeholder so the page reads as
   genuinely e-invoice-aware. The QR itself is a self-contained SVG
   (finder patterns + deterministic module field) — no asset, always dark-
   on-white so it stays legible in either theme, wrapped in the same glass
   card language as the Customize block so it blends in rather than shouting. */
const QR_MODULES = 21; // QR version 1 grid
const QR_UNIT = 4;
const QR_QUIET = 8; // 2-module quiet zone → 21*4 + 16 = 100 viewBox

function inFinderZone(x: number, y: number) {
  const box = (bx: number, by: number) => x >= bx - 1 && x <= bx + 7 && y >= by - 1 && y <= by + 7;
  return box(0, 0) || box(QR_MODULES - 7, 0) || box(0, QR_MODULES - 7);
}

// Deterministic pseudo-random module field so the placeholder looks like a
// real code yet never shifts between renders.
const QR_DATA_MODULES: Array<[number, number]> = (() => {
  const cells: Array<[number, number]> = [];
  for (let y = 0; y < QR_MODULES; y++) {
    for (let x = 0; x < QR_MODULES; x++) {
      if (inFinderZone(x, y)) continue;
      const h = ((x * 73856093) ^ (y * 19349663) ^ ((x + y) * 83492791)) >>> 0;
      if (h % 100 < 47) cells.push([x, y]);
    }
  }
  return cells;
})();

function QrFinder({ gx, gy }: { gx: number; gy: number }) {
  const p = (m: number) => QR_QUIET + m * QR_UNIT;
  return (
    <g>
      <rect x={p(gx)} y={p(gy)} width={QR_UNIT * 7} height={QR_UNIT * 7} rx={6} fill="#0B0F17" />
      <rect x={p(gx + 1)} y={p(gy + 1)} width={QR_UNIT * 5} height={QR_UNIT * 5} rx={4} fill="#ffffff" />
      <rect x={p(gx + 2)} y={p(gy + 2)} width={QR_UNIT * 3} height={QR_UNIT * 3} rx={2.5} fill="#0B0F17" />
    </g>
  );
}

function QrPlaceholder() {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="Placeholder signed IRN QR code"
      className="h-full w-full"
      shapeRendering="crispEdges"
    >
      {QR_DATA_MODULES.map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={QR_QUIET + x * QR_UNIT}
          y={QR_QUIET + y * QR_UNIT}
          width={QR_UNIT}
          height={QR_UNIT}
          rx={0.6}
          fill="#0B0F17"
        />
      ))}
      <QrFinder gx={0} gy={0} />
      <QrFinder gx={QR_MODULES - 7} gy={0} />
      <QrFinder gx={0} gy={QR_MODULES - 7} />
    </svg>
  );
}

/* ── QR lightbox — enlarged view opened from the QR tile, mirrors the
   template lightbox so the interaction feels native to the section. */
function QrLightbox({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.22, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[min(88vw,340px)]"
      >
        <div className="rounded-3xl bg-white p-5 shadow-[0_60px_140px_-30px_rgba(0,0,0,0.7)] ring-1 ring-black/5 sm:p-6">
          <div className="aspect-square w-full">
            <QrPlaceholder />
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close QR preview"
          className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#15151c] text-white/80 shadow-lg transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={16} />
        </button>
        <div className="mt-4 flex flex-col items-center gap-1.5 text-center">
          <div className="inline-flex items-center gap-2 text-[15px] font-semibold text-white">
            <ScanLine size={16} strokeWidth={2.2} style={{ color: ACCENT }} />
            Scan to verify
          </div>
          <p className="m-0 max-w-[280px] text-[12.5px] leading-[1.5] text-white/60">
            Point your camera at the code to confirm the IRN, both GSTINs and the invoice value.
          </p>
          <span className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/40">
            Signed IRN QR
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function InvoiceQrPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-4 rounded-2xl border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_4%,transparent)] p-4">
        <div className="relative shrink-0">
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-2 rounded-2xl blur-lg"
            style={{ background: `radial-gradient(circle, ${ACCENT}33, transparent 70%)` }}
          />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Enlarge signed IRN QR"
            className="group relative block h-[76px] w-[76px] cursor-pointer rounded-xl border-0 bg-white p-2 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.5)] outline-none ring-1 ring-black/5 transition-transform duration-300 hover:scale-[1.04] focus-visible:ring-2 focus-visible:ring-[var(--brand)] sm:h-[84px] sm:w-[84px]"
          >
            <QrPlaceholder />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover:opacity-100">
              <Expand size={16} className="text-white" />
            </span>
          </button>
        </div>
        <div className="min-w-0 flex flex-col gap-2">
          <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-[var(--fg-tertiary)]">
            Signed IRN QR
          </span>
          <div className="flex items-center gap-2">
            <ScanLine size={17} strokeWidth={2.2} style={{ color: ACCENT }} />
            <h4 className="m-0 font-display text-[16px] font-semibold leading-[1.2] tracking-[-0.01em] text-[var(--fg-primary)]">
              Scan to verify
            </h4>
          </div>
          <p className="m-0 text-[13.5px] leading-[1.6] text-[var(--fg-secondary)]">
            Every e-invoice carries the IRP-signed QR. Scan it to instantly confirm the IRN, both GSTINs and the invoice value.
          </p>
          <span className="mt-0.5 inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_4%,transparent)] px-2.5 py-1 text-[11.5px] font-medium text-[var(--fg-secondary)]">
            <BadgeCheck size={13} style={{ color: ACCENT }} />
            IRP-verified
          </span>
        </div>
      </div>

      <AnimatePresence>{open && <QrLightbox onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}

/* ── Section ───────────────────────────────────────────────────────────── */
export function InvoiceTemplates({ showQr = false }: { showQr?: boolean } = {}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [activeId, setActiveId] = useState<TemplateId>(TEMPLATES[0].id);
  const [previewId, setPreviewId] = useState<TemplateId | null>(null);
  const activeTemplate = TEMPLATES.find((t) => t.id === activeId) ?? TEMPLATES[0];
  const previewTemplate = TEMPLATES.find((t) => t.id === previewId) ?? null;

  return (
    <section
      className="relative overflow-hidden py-14 sm:py-16 lg:py-20"
      style={{
        background: isDark
          ? "linear-gradient(180deg, #050509 0%, #0B0F17 100%)"
          : "linear-gradient(180deg, #fdfdff 0%, #eef0f6 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 70% 40%, var(--brand-glow), transparent 50%)" }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">
        <SectionHeader />

        <div className="mt-8 lg:mt-10">
          <TemplatePills active={activeId} onSelect={setActiveId} />
        </div>

        <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div className="order-2 flex flex-col gap-5 lg:order-1">
            <TemplateInfo template={activeTemplate} />
            <CustomizationRow />
            {showQr && <InvoiceQrPanel />}
            {/* <ExportRow /> */}
            <FeaturesRow />
          </div>
          <div className="order-1 lg:order-2">
            <TemplateFanStage
              activeId={activeId}
              onSelect={setActiveId}
              onExpand={() => setPreviewId(activeId)}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {previewTemplate && (
          <TemplateLightbox template={previewTemplate} onClose={() => setPreviewId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

export default InvoiceTemplates;
