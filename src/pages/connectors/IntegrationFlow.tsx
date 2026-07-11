/**
 * IntegrationFlowSection — "SAP e-Invoicing, powered by WhiteBooks" flowchart,
 * rebuilt 1:1 from the reference mock: four titled lanes (ERP · GSP Layer ·
 * IRP Layer · Buyer) with hexagon nodes, checklist cards, connector arrows and
 * the IRN + Signed QR return elbow back into the ERP. Fully token-driven so it
 * reads correctly in both themes. ERP lane adapts per platform; copy adapts
 * per document type (inferred from the page slug).
 */
import {
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  FileText,
  Landmark,
  Truck,
  Undo2,
  type LucideIcon,
} from "lucide-react";
import type { ConnectorData } from "./connectors.data";
import { Section } from "./_sections";

const ACCENT = "var(--brand)";
const WB_LOGO = "/favicon.png";
/* Pointy-top hexagon, like the reference nodes. */
const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
/* Vertical center of the hexagons inside a lane: lane p-6 (24) + lane title
   22 + title mb-7 (28) + dashed-box inset 17 + half hex (48). The connector
   arrows and the ERP-lane alignment offset both derive from this. */
const HEX_CENTER_Y = 139;

const PLATFORM_LANES: Record<ConnectorData["platform"], { name: string; modules: string }> = {
  sap: { name: "SAP", modules: "SD / MM / FI" },
  oracle: { name: "Oracle", modules: "AR / AP / GL" },
  dynamics: { name: "Dynamics 365", modules: "F&O / BC / NAV" },
  tally: { name: "Tally", modules: "Sales / Purchase" },
};

interface DocConfig {
  docTitle: string;
  sub: (erp: string) => string;
  erpCaption: string;
  cockpit: string;
  gsp: { caption: string; checks: string[] };
  govt: { lane: string; title: string; caption: string; icon: LucideIcon; checks: string[] };
  receiver: { lane: string; title: string; caption: string; icon: LucideIcon; checks: string[] };
  ret: { title: string; caption: (erp: string) => string };
}

const EINVOICE: DocConfig = {
  docTitle: "e-Invoicing",
  sub: (erp) => `Real-time invoice flow from ${erp} to IRP and back — accurate, compliant, and hassle-free.`,
  erpCaption: "Invoice Data Generated",
  cockpit: "e-Invoice Cockpit",
  gsp: {
    caption: "Validation & Enrichment",
    checks: ["GSTIN Validation", "De-duplication Check", "Schema Validation", "Digital Signature", "QR Code Generation"],
  },
  govt: {
    lane: "IRP Layer",
    title: "GSTN – IRP",
    caption: "Invoice Registration",
    icon: Landmark,
    checks: ["IRN Generation", "ANX-1 (Seller) Update", "ANX-2 (Buyer) Update"],
  },
  receiver: {
    lane: "Buyer",
    title: "Buyer System (ANX-2)",
    caption: "Invoice Received",
    icon: Building2,
    checks: ["ITC Details Visible", "Invoice Verified via QR", "Ready for Reconciliation"],
  },
  ret: { title: "IRN + Signed QR", caption: (erp) => `Posted back to ${erp}` },
};

const EWB: DocConfig = {
  docTitle: "e-Way Bill",
  sub: (erp) => `Real-time e-way bill flow from ${erp} to NIC and back — accurate, compliant, and hassle-free.`,
  erpCaption: "Despatch Data Generated",
  cockpit: "e-Way Bill Cockpit",
  gsp: {
    caption: "Validation & Enrichment",
    checks: ["Transport Details Validation", "Distance & Vehicle Checks", "De-duplication Check", "Digital Signature", "Part-A / Part-B Assembly"],
  },
  govt: {
    lane: "NIC Layer",
    title: "NIC – EWB",
    caption: "EWB Registration",
    icon: Landmark,
    checks: ["EWB Number Generation", "Validity Window Applied", "Part-B Vehicle Updates"],
  },
  receiver: {
    lane: "Transporter",
    title: "Transporter",
    caption: "EWB Received",
    icon: Truck,
    checks: ["EWB Available for Transit", "Print & Carry Copy", "Part-B Updates Enabled"],
  },
  ret: { title: "EWB + Validity", caption: (erp) => `Posted back to ${erp}` },
};

function docConfig(slug: string): DocConfig {
  if (slug.includes("way-bill")) return EWB;
  if (slug.includes("gst")) return { ...EINVOICE, docTitle: "GST" };
  return EINVOICE;
}

/* ── Hexagon node: two-tone hex tile + title + caption. Renders a lucide icon,
   or a real logo where one exists (platform mark, WhiteBooks favicon). Wide
   wordmark logos sit on a white tile so they stay legible in dark theme. ──── */
function HexNode({
  icon: Icon,
  logo,
  logoAlt,
  title,
  caption,
}: {
  icon?: LucideIcon;
  logo?: string;
  logoAlt?: string;
  title: string;
  caption?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2.5 text-center">
      <span
        className="grid h-[96px] w-[86px] place-items-center"
        style={{ clipPath: HEX_CLIP, background: "color-mix(in srgb, var(--brand) 9%, transparent)" }}
      >
        {logo ? (
          logo === WB_LOGO ? (
            <img src={logo} alt={logoAlt ?? title} className="h-10 w-10 rounded-[10px] object-contain" />
          ) : (
            <span className="grid h-11 w-14 place-items-center rounded-xl bg-white px-1.5">
              <img src={logo} alt={logoAlt ?? title} className="max-h-[22px] w-auto max-w-full object-contain" />
            </span>
          )
        ) : (
          <span
            className="grid h-11 w-11 place-items-center rounded-xl"
            style={{ background: "color-mix(in srgb, var(--brand) 14%, transparent)" }}
          >
            {Icon && <Icon size={22} style={{ color: ACCENT }} />}
          </span>
        )}
      </span>
      <div>
        <div className="text-[13.5px] font-semibold leading-snug text-[var(--fg-primary)]">{title}</div>
        {caption && <div className="mt-0.5 text-[11.5px] leading-snug text-[var(--fg-tertiary)]">{caption}</div>}
      </div>
    </div>
  );
}

/* ── Checklist card under a node, with its drop connector ─────────────────── */
function CheckCard({ checks }: { checks: string[] }) {
  return (
    <div className="mt-1 flex w-full flex-col items-center">
      <span aria-hidden className="h-6 w-px bg-[var(--hairline-bright)]" />
      <div className="w-full rounded-[14px] border border-solid border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_3%,transparent)] p-4">
        <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
          {checks.map((c) => (
            <li key={c} className="flex items-center gap-2.5 text-[12.5px] leading-snug text-[var(--fg-secondary)]">
              <CheckCircle2 size={15} className="shrink-0" style={{ fill: ACCENT, color: "#fff" }} />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Lane-to-lane arrow, riding the divider at hexagon height ─────────────── */
function LaneArrow() {
  return (
    <span
      aria-hidden
      className="absolute -left-7 z-10 hidden w-14 -translate-y-1/2 items-center lg:flex"
      style={{ top: HEX_CENTER_Y }}
    >
      <span className="h-px flex-1 bg-[var(--fg-tertiary)] opacity-60" />
      <ChevronRight size={14} className="-ml-1.5 shrink-0 text-[var(--fg-tertiary)]" />
    </span>
  );
}

/* ── Section ──────────────────────────────────────────────────────────────── */
export function IntegrationFlowSection({ data }: { data: Pick<ConnectorData, "platform" | "slug" | "logo"> }) {
  const erp = PLATFORM_LANES[data.platform];
  const doc = docConfig(data.slug);
  const GovtIcon = doc.govt.icon;
  const ReceiverIcon = doc.receiver.icon;

  return (
    <Section>
      {/* Header — pill · headline with brand accent · sub */}
      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
        <span className="inline-flex w-fit items-center gap-2.5 rounded-full border border-solid border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_5%,transparent)] px-3.5 py-1.5">
          <span className="inline-flex h-4 items-center">
            <img src={data.logo} alt={erp.name} className="h-[13px] w-auto object-contain" />
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--fg-secondary)]">
            {erp.name} {doc.docTitle} Connector
          </span>
        </span>
        <h2 className="m-0 font-display text-[clamp(26px,3.8vw,44px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--fg-primary)] text-balance">
          {erp.name} {doc.docTitle}, powered by <span className="text-[var(--brand)]">WhiteBooks</span>
        </h2>
        <p className="m-0 max-w-[560px] text-[15px] leading-[1.6] text-[var(--fg-secondary)] sm:text-[16px]">
          {doc.sub(erp.name)}
        </p>
      </div>

      {/* Canvas */}
      <div className="mx-auto mt-12 overflow-hidden rounded-[24px] border border-solid border-[var(--hairline-strong)] bg-[var(--bg-card)]">
        <div className="grid grid-cols-1 divide-y divide-solid divide-[var(--hairline)] lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {/* Lane 1 — ERP */}
          <div className="relative flex flex-col items-center p-6">
            <h3 className="m-0 mb-7 font-display text-[15px] font-semibold leading-[22px] text-[var(--brand)]">
              {erp.name}
            </h3>
            <div className="flex w-full flex-1 flex-col items-center rounded-[18px] border border-dashed border-[var(--brand-border)] p-4 pb-7">
              <HexNode logo={data.logo} logoAlt={erp.name} title={erp.modules} caption={doc.erpCaption} />
              <span aria-hidden className="mt-4 flex flex-col items-center">
                <span className="h-7 w-px bg-[var(--hairline-bright)]" />
                <ChevronDown size={13} className="-mt-1.5 text-[var(--fg-tertiary)]" />
              </span>
              <div className="mt-3">
                <HexNode icon={FileText} title={doc.cockpit} />
              </div>
            </div>
          </div>

          {/* Lane 2 — GSP Layer */}
          <div className="relative flex flex-col items-center p-6">
            <LaneArrow />
            <h3 className="m-0 mb-7 font-display text-[15px] font-semibold leading-[22px] text-[var(--brand)]">
              GSP Layer
            </h3>
            <div className="mt-[17px]">
              <HexNode logo={WB_LOGO} logoAlt="WhiteBooks" title="WhiteBooks GSP" caption={doc.gsp.caption} />
            </div>
            <CheckCard checks={doc.gsp.checks} />
          </div>

          {/* Lane 3 — IRP / NIC Layer */}
          <div className="relative flex flex-col items-center p-6">
            <LaneArrow />
            <h3 className="m-0 mb-7 font-display text-[15px] font-semibold leading-[22px] text-[var(--brand)]">
              {doc.govt.lane}
            </h3>
            <div className="mt-[17px]">
              <HexNode icon={GovtIcon} title={doc.govt.title} caption={doc.govt.caption} />
            </div>
            <CheckCard checks={doc.govt.checks} />
          </div>

          {/* Lane 4 — Buyer / Transporter */}
          <div className="relative flex flex-col items-center p-6">
            <LaneArrow />
            <h3 className="m-0 mb-7 font-display text-[15px] font-semibold leading-[22px] text-[var(--brand)]">
              {doc.receiver.lane}
            </h3>
            <div className="mt-[17px]">
              <HexNode icon={ReceiverIcon} title={doc.receiver.title} caption={doc.receiver.caption} />
            </div>
            <CheckCard checks={doc.receiver.checks} />
          </div>
        </div>

        {/* Return elbow — Buyer ↓ · chip · ↑ back into the ERP add-on box */}
        <div className="relative hidden h-[96px] lg:block" aria-label={`${doc.ret.title} ${doc.ret.caption(erp.name)}`}>
          <span aria-hidden className="absolute left-[87.5%] top-0 h-[44px] w-px bg-[var(--hairline-bright)]" />
          <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[44px] h-px bg-[var(--hairline-bright)]" />
          <span aria-hidden className="absolute left-[12.5%] top-0 h-[44px] w-px bg-[var(--hairline-bright)]" />
          <ChevronUp
            aria-hidden
            size={14}
            className="absolute left-[12.5%] -top-1.5 -translate-x-1/2 text-[var(--fg-tertiary)]"
          />
          <div className="absolute left-1/2 top-[44px] -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center gap-3 rounded-[14px] border border-solid border-[var(--hairline-strong)] bg-[var(--bg-card)] px-4 py-2.5 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.4)]">
              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full"
                style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
              >
                <Undo2 size={14} style={{ color: ACCENT }} />
              </span>
              <div className="text-left">
                <div className="text-[13px] font-semibold leading-tight text-[var(--fg-primary)]">{doc.ret.title}</div>
                <div className="text-[11.5px] leading-tight text-[var(--fg-tertiary)]">{doc.ret.caption(erp.name)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stacked return chip */}
        <div className="flex justify-center px-6 pb-6 pt-2 lg:hidden">
          <div className="flex items-center gap-3 rounded-[14px] border border-solid border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_3%,transparent)] px-4 py-2.5">
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full"
              style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
            >
              <Undo2 size={14} style={{ color: ACCENT }} />
            </span>
            <div className="text-left">
              <div className="text-[13px] font-semibold leading-tight text-[var(--fg-primary)]">{doc.ret.title}</div>
              <div className="text-[11.5px] leading-tight text-[var(--fg-tertiary)]">{doc.ret.caption(erp.name)}</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
