/**
 * ConnectorHero — shared hero for every connector landing page (SAP, Oracle,
 * Dynamics, Tally × e-Invoicing / e-Way Bill / GST). Stripe-grade enterprise
 * minimalism: neutral token canvas, dot-grid backdrop, copy stack on the left
 * and the animated ConnectorPipeline on the right. Fully token-driven — no
 * hardcoded colors — so it reads native in both themes.
 *
 * Node labels, packet stages and receipt copy are derived from the connector's
 * platform + document type (inferred from the slug), so one component serves
 * all eleven pages.
 */
import { motion, useReducedMotion } from "framer-motion";
import { SeoBreadcrumb } from "@/seo/components/SeoBreadcrumb";
import type { ConnectorData, Cta } from "./connectors.data";
import { BrandHighlight, CtaButton, EASE } from "./_sections";
import { ConnectorPipeline, type PipelineConfig } from "./ConnectorPipeline";

/* ── Platform / document-type registries ──────────────────────────────────── */

type DocType = "e-invoice" | "e-way-bill" | "gst";

function docTypeOf(slug: string): DocType {
  if (slug.includes("way-bill")) return "e-way-bill";
  if (slug.includes("gst")) return "gst";
  return "e-invoice";
}

const PLATFORM: Record<
  ConnectorData["platform"],
  { label: string; format: string; trustLine: string }
> = {
  sap: { label: "SAP", format: "IDOC", trustLine: "SAP B1 · S/4HANA · ECC · ByDesign" },
  oracle: { label: "Oracle", format: "REST", trustLine: "Fusion Cloud · EBS · NetSuite" },
  dynamics: { label: "Dynamics 365", format: "OData", trustLine: "D365 F&O · Business Central · NAV" },
  tally: { label: "Tally", format: "XML", trustLine: "TallyPrime · Tally ERP 9" },
};

const DOC: Record<
  DocType,
  {
    sourceKind: string;
    target: { label: string; sub: string };
    finalPacket: string;
    receipt: PipelineConfig["receipt"];
  }
> = {
  "e-invoice": {
    sourceKind: "Billing Document",
    target: { label: "NIC IRP", sub: "IRN + Signed QR" },
    finalPacket: "IRN ✓",
    receipt: { title: "IRN generated", meta: "0.8s · ACK 112510144782611", qr: true },
  },
  "e-way-bill": {
    sourceKind: "Despatch Document",
    target: { label: "NIC EWB", sub: "EWB No. + Part-B" },
    finalPacket: "EWB ✓",
    receipt: { title: "e-Way Bill generated", meta: "0.9s · EWB 4813 0042 7719" },
  },
  gst: {
    sourceKind: "Return Data",
    target: { label: "GSTN", sub: "GSTR-1 · 3B · IMS" },
    finalPacket: "FILED ✓",
    receipt: { title: "GSTR-1 filed", meta: "ARN AA2707260012345" },
  },
};

function buildPipelineConfig(platform: ConnectorData["platform"], doc: DocType): PipelineConfig {
  const p = PLATFORM[platform];
  const d = DOC[doc];
  return {
    source: { label: p.label, sub: `${d.sourceKind} · ${p.format}` },
    hub: { label: "WhiteBooks", sub: "Validate · Transform · Sign" },
    target: d.target,
    packets: [p.format.toUpperCase(), "JSON", d.finalPacket],
    receipt: d.receipt,
  };
}

/* ── Entrance stagger ─────────────────────────────────────────────────────── */

const stack = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/* ── Hero ─────────────────────────────────────────────────────────────────── */

export function ConnectorHero({ data }: { data: ConnectorData }) {
  const { hero, logo, platform, slug } = data;
  const reduced = useReducedMotion();
  const doc = docTypeOf(slug);
  const pipeline = buildPipelineConfig(platform, doc);
  const secondary = (hero as { secondary?: Cta }).secondary;
  const trustLine = PLATFORM[platform].trustLine;

  return (
    <section className="relative overflow-hidden  bg-[var(--bg)] pb-14 pt-[104px] sm:pt-[120px] lg:pb-0">
      {/* Dot grid, dissolving at the edges. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          // backgroundImage:
          //   "radial-gradient(circle at 1px 1px, var(--hairline-bright) 1px, transparent 0)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse 75% 70% at 50% 38%, #000 25%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 70% at 50% 38%, #000 25%, transparent 78%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col px-4 sm:px-6 md:px-8 lg:min-h-[calc(88vh-64px)] lg:px-10 xl:px-16">
        <div className="mb-4">
          <SeoBreadcrumb items={data.breadcrumb} />
        </div>

        <div className="grid flex-1 grid-cols-1 items-center gap-12 pb-2 lg:grid-cols-12 lg:gap-8 lg:pb-14">
          {/* ── Copy stack ─────────────────────────────────────────── */}
          <motion.div
            variants={stack}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6 lg:col-span-6"
          >
            <motion.span
              variants={item}
              className="inline-flex w-fit items-center gap-2.5 rounded-full border border-solid border-[var(--hairline-strong)] bg-[var(--bg-card)] px-3.5 py-1.5"
            >
              {/* <motion.span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]"
                animate={reduced ? undefined : { opacity: [1, 0.35, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              /> */}
              <span className="inline-flex h-4 items-center">
                <img src={logo} alt={PLATFORM[platform].label} className="h-[13px] w-auto object-contain" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-secondary)]">
                {hero.tag} · GSP-Certified
              </span>
            </motion.span>

            <motion.h1
              variants={item}
              className="m-0 font-display text-[clamp(34px,4.6vw,58px)] font-semibold leading-[1.06] tracking-[-0.025em] text-[var(--fg-primary)] text-balance"
            >
              {hero.titleAccent ? (
                <BrandHighlight text={hero.title} phrases={[hero.titleAccent]} />
              ) : (
                hero.title
              )}
            </motion.h1>

            <motion.p
              variants={item}
              className="m-0 max-w-xl text-[16px] leading-[1.6] text-[var(--fg-secondary)] sm:text-[18px]"
            >
              {hero.sub}
            </motion.p>

            <motion.div variants={item} className="mt-1 flex flex-wrap gap-3">
              <CtaButton cta={hero.primary} />
              {secondary && <CtaButton cta={secondary} variant="ghost" />}
            </motion.div>

            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] text-[var(--fg-tertiary)]"
            >
              <span>{trustLine}</span>
              <span aria-hidden className="opacity-40">·</span>
              <span>ISO 27001:2022</span>
              <span aria-hidden className="opacity-40">·</span>
              <span>Direct GSTN license</span>
            </motion.div>
          </motion.div>

          {/* ── Pipeline visual ────────────────────────────────────── */}
          <div className="mx-auto w-full max-w-[420px] lg:col-span-6 lg:max-w-none">
            <ConnectorPipeline config={pipeline} />
          </div>
        </div>
      </div>
    </section>
  );
}
