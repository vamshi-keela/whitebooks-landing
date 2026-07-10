/**
 * IntegrationFlow — on-brand rendition of the legacy "Flow of the E-Invoice
 * Integration" chart, compacted into a vertical rail for the connector-page
 * hero. ERP lane content adapts per platform (SAP / Oracle / Dynamics /
 * Tally); the government + receiver lanes adapt per document type
 * (e-Invoice vs e-Way Bill, inferred from the page slug).
 */
import { motion } from "framer-motion";
import { Landmark, QrCode, ShieldCheck, Truck, Undo2, type LucideIcon } from "lucide-react";
import { EASE } from "./_sections";
import type { ConnectorData } from "./connectors.data";

const ACCENT = "var(--brand)";

interface PlatformLane {
  name: string;
  modules: string[];
  addOnItems: string[];
}

const PLATFORM_LANES: Record<ConnectorData["platform"], PlatformLane> = {
  sap: { name: "SAP", modules: ["SD", "MM", "FI"], addOnItems: ["JSON Extractor", "Invoice Cockpit"] },
  oracle: { name: "Oracle", modules: ["AR", "AP", "GL"], addOnItems: ["REST Adapter", "Invoice Cockpit"] },
  dynamics: { name: "Dynamics 365", modules: ["F&O", "BC", "NAV"], addOnItems: ["OData Extractor", "Invoice Cockpit"] },
  tally: { name: "Tally", modules: ["Sales", "Purchase", "Vouchers"], addOnItems: ["TDL Add-on (DLL)", "Invoice Cockpit"] },
};

interface DocFlow {
  flowLabel: string;
  /** Connector labels between the 4 nodes, top to bottom. */
  handoffs: [string, string, string];
  gsp: { points: string[] };
  govt: { title: string; points: string[] };
  receiver: { eyebrow: string; title: string; icon: LucideIcon; points: string[] };
  returnLine: (erp: string) => string;
}

const EINVOICE_FLOW: DocFlow = {
  flowLabel: "e-Invoice flow",
  handoffs: ["Invoice JSON", "Signed JSON + QR", "Registered invoice"],
  gsp: {
    points: ["Validates invoice details", "De-duplication check with GSTN", "Digital signature + QR added"],
  },
  govt: {
    title: "GSTN · IRP",
    points: ["Unique IRN registered", "ANX-1 (seller) & ANX-2 (buyer) updated"],
  },
  receiver: {
    eyebrow: "Buyer",
    title: "Buyer",
    icon: QrCode,
    points: ["Verifies invoice via QR code", "ITC details visible in ANX-2"],
  },
  returnLine: (erp) => `IRN + signed QR posted back to ${erp}`,
};

const EWB_FLOW: DocFlow = {
  flowLabel: "e-Way Bill flow",
  handoffs: ["Transport JSON", "Validated payload", "EWB + validity"],
  gsp: {
    points: ["Validates transport details", "Distance & vehicle checks", "Part-A / Part-B assembly"],
  },
  govt: {
    title: "NIC · EWB system",
    points: ["EWB number generated", "Validity window applied"],
  },
  receiver: {
    eyebrow: "Transporter",
    title: "Transporter",
    icon: Truck,
    points: ["EWB available for transit", "Part-B vehicle updates"],
  },
  returnLine: (erp) => `EWB number + validity posted back to ${erp}`,
};

/* ── Building blocks ──────────────────────────────────────────────────────── */

function LaneEyebrow({ children }: { children: string }) {
  return (
    <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--fg-tertiary)]">
      {children}
    </span>
  );
}

function Chip({ children }: { children: string }) {
  return (
    <span className="rounded-md border border-solid border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_4%,transparent)] px-2 py-0.5 font-mono text-[10px] text-[var(--fg-secondary)]">
      {children}
    </span>
  );
}

function Node({
  eyebrow,
  title,
  icon: Icon,
  children,
}: {
  eyebrow: string;
  title: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-[14px] border border-solid border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_3%,transparent)] p-3.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <span
              className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-solid border-[var(--hairline-strong)]"
              style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
            >
              <Icon size={14} style={{ color: ACCENT }} />
            </span>
          )}
          <span className="font-display text-[13.5px] font-semibold tracking-[-0.01em] text-[var(--fg-primary)]">
            {title}
          </span>
        </div>
        <LaneEyebrow>{eyebrow}</LaneEyebrow>
      </div>
      {children}
    </div>
  );
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="m-0 mt-2.5 flex list-none flex-col gap-1.5 p-0">
      {items.map((p) => (
        <li key={p} className="flex items-start gap-2 text-[11.5px] leading-[1.4] text-[var(--fg-secondary)]">
          <span aria-hidden className="mt-[5px] h-1 w-1 shrink-0 rounded-full" style={{ background: ACCENT }} />
          {p}
        </li>
      ))}
    </ul>
  );
}

/** Vertical connector with a pulsing packet and a handoff label. */
function Handoff({ label, delay }: { label: string; delay: number }) {
  return (
    <div className="relative mx-auto h-7 w-px bg-[var(--hairline-strong)]" aria-hidden>
      <motion.span
        className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
        style={{ background: ACCENT, boxShadow: "0 0 6px var(--brand-glow)" }}
        animate={{ y: [0, 22], opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay }}
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--fg-tertiary)]">
        {label}
      </span>
    </div>
  );
}

/* ── Component ────────────────────────────────────────────────────────────── */

export function IntegrationFlow({ data }: { data: Pick<ConnectorData, "platform" | "slug" | "logo"> }) {
  const lane = PLATFORM_LANES[data.platform];
  const flow = data.slug.includes("way-bill") ? EWB_FLOW : EINVOICE_FLOW;
  const ReceiverIcon = flow.receiver.icon;

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10"
        style={{ background: "radial-gradient(circle at 50% 40%, var(--brand-glow), transparent 68%)" }}
      />
      <div className="overflow-hidden rounded-[22px] border border-solid border-[var(--hairline-strong)] bg-[var(--bg-card)] shadow-[0_40px_100px_-50px_rgba(0,0,0,0.7)]">
        {/* Header bar */}
        <div className="flex items-center justify-between border-0 border-b border-solid border-[var(--hairline)] px-4 py-3">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: ACCENT }}>
            {flow.flowLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/12 px-2 py-0.5 text-[10px] font-medium text-emerald-500">
            <motion.span
              className="h-1 w-1 rounded-full bg-emerald-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            Real-time
          </span>
        </div>

        <div className="p-4">
          {/* 1 · ERP lane */}
          <div className="rounded-[14px] border border-solid border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_3%,transparent)] p-3.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-4 items-center">
                  <img src={data.logo} alt={lane.name} className="h-[14px] w-auto object-contain" />
                </span>
                <span className="font-display text-[13.5px] font-semibold tracking-[-0.01em] text-[var(--fg-primary)]">
                  {lane.name}
                </span>
              </div>
              <LaneEyebrow>ERP system</LaneEyebrow>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {lane.modules.map((m) => (
                <Chip key={m}>{m}</Chip>
              ))}
            </div>
            {/* WhiteBooks add-on inside the ERP — the dashed box in the source chart */}
            <div className="mt-2.5 rounded-[10px] border border-dashed border-[var(--brand-border)] bg-[color-mix(in_srgb,var(--brand)_5%,transparent)] p-2.5">
              <LaneEyebrow>WhiteBooks add-on</LaneEyebrow>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {lane.addOnItems.map((a) => (
                  <Chip key={a}>{a}</Chip>
                ))}
              </div>
            </div>
          </div>

          <Handoff label={flow.handoffs[0]} delay={0} />

          {/* 2 · GSP lane */}
          <Node eyebrow="GSP layer" title="WhiteBooks GSP" icon={ShieldCheck}>
            <Points items={flow.gsp.points} />
          </Node>

          <Handoff label={flow.handoffs[1]} delay={0.5} />

          {/* 3 · Government lane */}
          <Node eyebrow="Govt layer" title={flow.govt.title} icon={Landmark}>
            <Points items={flow.govt.points} />
          </Node>

          <Handoff label={flow.handoffs[2]} delay={1} />

          {/* 4 · Receiver lane */}
          <Node eyebrow={flow.receiver.eyebrow} title={flow.receiver.title} icon={ReceiverIcon}>
            <Points items={flow.receiver.points} />
          </Node>

          {/* Return path */}
          <div className="mt-3 flex items-center gap-2 rounded-full border border-solid border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--brand)_7%,transparent)] px-3 py-2">
            <Undo2 size={13} className="shrink-0" style={{ color: ACCENT }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--fg-secondary)]">
              {flow.returnLine(lane.name)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
