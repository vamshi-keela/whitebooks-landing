import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardCheck,
  Code2,
  Download,
  FileJson,
  FilePlus2,
  Gauge,
  History,
  Image as ImageIcon,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  PieChart,
  PlayCircle,
  Plug,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Upload,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { BookDemoModal } from "@/components/modals/BookDemoModal";
import { Header, Footer, Breadcrumb } from "@/layouts/SiteShell";
import {
  EXPLORE_SIGNUP_URL,
  type ExploreFeature,
  type ExploreIcon,
  type MoreFeaturesPageData,
} from "@/data/more-features-explore.data";

/* ──────────────────────────────────────────────────────────────────────────
 * MoreFeaturesExplore
 * Deep-dive page behind every showcase card's "More features" CTA.
 * IA: hero → sticky category nav (Features · Pricing · Solution · Partner ·
 * Resources · FAQ) → sections → closing CTA. Fully token-driven so it adapts
 * to both dark and light themes; all imagery renders as premium placeholders
 * until real screenshots are dropped into the data module.
 * ──────────────────────────────────────────────────────────────────────── */

const EASE = [0.22, 0.7, 0.2, 1] as const;
const wrap = "mx-auto w-full max-w-[1240px] px-16 max-lg:px-10 max-md:px-6 max-sm:px-4";

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-[14px] font-semibold text-white shadow-[0_10px_30px_-10px_var(--brand)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_var(--brand)] active:translate-y-0";
const btnGhost =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-solid border-[var(--line-2)] bg-[var(--bg-elev)] px-6 py-3 text-[14px] font-medium text-[var(--text)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--brand-border)] active:translate-y-0";

const ICONS: Record<ExploreIcon, LucideIcon> = {
  "shield-check": ShieldCheck,
  activity: Activity,
  calendar: CalendarDays,
  "pie-chart": PieChart,
  history: History,
  "layout-dashboard": LayoutDashboard,
  search: Search,
  upload: Upload,
  "file-plus": FilePlus2,
  zap: Zap,
  download: Download,
  "clipboard-check": ClipboardCheck,
  users: Users,
  briefcase: Briefcase,
  building: Building2,
  plug: Plug,
  store: Store,
  "book-open": BookOpen,
  code: Code2,
  "file-json": FileJson,
  "life-buoy": LifeBuoy,
  play: PlayCircle,
  gauge: Gauge,
  layers: Layers,
  "badge-check": BadgeCheck,
  wrench: Wrench,
  sparkles: Sparkles,
};

/* Posters are authored as "@assets/product-images/…" — map onto the real
   module keys Vite produces from this file's location. */
const POSTER_URLS = import.meta.glob<string>("../../assets/product-images/**/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
  query: "?url",
  import: "default",
});

const resolvePoster = (poster?: string): string | undefined =>
  poster ? POSTER_URLS[poster.replace(/^@assets\//, "../../assets/")] : undefined;

const isExternal = (href: string) => /^https?:/.test(href);

/* ── Shared primitives ────────────────────────────────────────────────────── */

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: EASE },
} as const;

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="m-0 font-mono text-[11px] uppercase tracking-[0.18em] text-brand">{children}</p>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      {...fadeUp}
      className={align === "center" ? "mx-auto max-w-[720px] text-center" : "max-w-[720px]"}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 font-display text-[clamp(26px,3.2vw,40px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text)] [text-wrap:balance]">
        {title}
      </h2>
      {text && <p className="mt-4 text-[15px] leading-[1.65] text-secondary">{text}</p>}
    </motion.div>
  );
}

/** Smart link: react-router for internal paths, <a> for external URLs. */
function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (isExternal(href)) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

/** Premium screenshot placeholder — renders the real poster when it exists. */
function MediaPlaceholder({ label, poster, className = "" }: { label: string; poster?: string; className?: string }) {
  const url = resolvePoster(poster);
  if (url) {
    return (
      <img
        src={url}
        alt={label}
        loading="lazy"
        decoding="async"
        className={`block h-auto w-full rounded-2xl border border-[var(--line)] ${className}`}
      />
    );
  }
  return (
    <div
      className={`relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-dashed border-[var(--brand-border)] bg-[var(--brand-softer)] p-6 text-center ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 30%, var(--brand-glow), transparent 65%)" }}
      />
      <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-[var(--brand-soft)] text-brand">
        <ImageIcon size={22} />
      </span>
      <span className="relative font-mono text-[10.5px] uppercase tracking-[0.14em] text-brand">
        Screenshot placeholder
      </span>
      <span className="relative max-w-[300px] text-[12.5px] leading-[1.5] text-muted">{label}</span>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */

function HeroSection({ data, onDemo }: { data: MoreFeaturesPageData; onDemo: () => void }) {
  const chips = data.features.items[0]?.capabilities.slice(0, 3) ?? [];
  return (
    <section className="relative overflow-hidden pt-[70px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 420px at 80% -10%, var(--brand-glow), transparent 60%), radial-gradient(700px 380px at 8% 110%, var(--brand-softer), transparent 60%)",
        }}
      />
      <div className={`${wrap} relative pt-8`}>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: data.productLabel, href: data.productHref },
            { label: data.badge },
          ]}
        />
      </div>
      <div className={`${wrap} relative grid grid-cols-[1.05fr_0.95fr] items-center gap-14 pb-16 pt-8 max-lg:grid-cols-1`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-border)] bg-[var(--brand-soft)] px-3.5 py-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-brand">
            <Sparkles size={12} />
            {data.productLabel} · {data.badge}
          </span>
          <h1 className="mt-5 max-w-[640px] font-display text-[clamp(32px,4.6vw,54px)] font-semibold leading-[1.06] tracking-[-0.025em] text-[var(--text)] [text-wrap:balance]">
            {data.title}
          </h1>
          <p className="mt-5 max-w-[560px] text-[16.5px] leading-[1.65] text-secondary">
            {data.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={EXPLORE_SIGNUP_URL} className={btnPrimary}>
              Start free <ArrowRight size={16} />
            </a>
            <button type="button" onClick={onDemo} className={btnGhost}>
              Book a 20-min demo
            </button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[var(--line)] pt-6">
            {data.heroStats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-[20px] font-semibold tracking-[-0.01em] text-[var(--text)]">
                  {s.value}
                </div>
                <div className="mt-0.5 text-[12px] text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hero visual — placeholder frame with floating capability chips */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
          className="relative max-lg:mx-auto max-lg:w-full max-lg:max-w-[560px]"
        >
          <div className="rounded-[28px] border border-[var(--line)] bg-[var(--bg-elev)] p-4 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.45)]">
            <MediaPlaceholder label={`${data.badge} — hero product screenshot`} poster={data.heroPoster} />
          </div>
          {chips.map((chip, i) => (
            <motion.span
              key={chip}
              className={[
                "absolute z-10 hidden items-center gap-2 rounded-full border border-[var(--line-2)] bg-[var(--bg-elev)] px-4 py-2 text-[12px] font-semibold text-[var(--text)] shadow-[0_14px_36px_-12px_rgba(0,0,0,0.5)] backdrop-blur lg:inline-flex",
                i === 0 ? "-left-8 top-8" : i === 1 ? "-right-6 top-1/2" : "-left-5 bottom-10",
              ].join(" ")}
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4.5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
            >
              <span className="grid h-4 w-4 place-items-center rounded-full bg-[var(--brand-soft)] text-brand">
                <Check size={10} strokeWidth={3} />
              </span>
              {chip}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Sticky category nav (Features · Pricing · Solution · Partner · Resources) ── */

const NAV_SECTIONS = [
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "solution", label: "Solution" },
  { id: "partner", label: "Partner" },
  { id: "resources", label: "Resources" },
  { id: "faq", label: "FAQ" },
];

function SectionNav() {
  const [active, setActive] = useState(NAV_SECTIONS[0].id);

  useEffect(() => {
    const onScroll = () => {
      let current = NAV_SECTIONS[0].id;
      for (const s of NAV_SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 190) current = s.id;
      }
      setActive((prev) => (prev === current ? prev : current));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="sticky top-[70px] z-30 border-y border-[var(--line)] bg-[var(--header-bg)] backdrop-blur-xl">
      <div className={`${wrap} flex items-center justify-between gap-4`}>
        <nav
          aria-label="Page sections"
          className="-mx-1 flex gap-1 overflow-x-auto px-1 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {NAV_SECTIONS.map((s) => {
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => go(s.id)}
                aria-current={isActive ? "true" : undefined}
                className={[
                  "relative shrink-0 cursor-pointer whitespace-nowrap rounded-full border-0 bg-transparent px-4 py-2 text-[13px] font-medium transition-colors duration-200",
                  isActive ? "text-brand" : "text-secondary hover:text-[var(--text)]",
                ].join(" ")}
              >
                {isActive && (
                  <motion.span
                    layoutId="explore-nav-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-[var(--brand-border)] bg-[var(--brand-soft)]"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative z-[1]">{s.label}</span>
              </button>
            );
          })}
        </nav>
        <a
          href={EXPLORE_SIGNUP_URL}
          className="hidden shrink-0 items-center gap-1.5 rounded-full bg-brand px-4 py-1.5 text-[12.5px] font-semibold text-white transition-transform hover:-translate-y-0.5 md:inline-flex"
        >
          Start free <ArrowRight size={13} />
        </a>
      </div>
    </div>
  );
}

/* ── Features — spotlight rows + capability grid ──────────────────────────── */

function CapabilityItem({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-2.5 text-[13.5px] leading-[1.5] text-secondary">
      <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-[var(--brand-soft)] text-brand">
        <Check size={11} strokeWidth={3} />
      </span>
      {children}
    </li>
  );
}

function FeatureSpotlight({ feature, index, flip }: { feature: ExploreFeature; index: number; flip: boolean }) {
  const Icon = ICONS[feature.icon];
  return (
    <motion.div
      {...fadeUp}
      className={`grid grid-cols-2 items-center gap-14 max-lg:grid-cols-1 ${flip ? "" : ""}`}
    >
      <div className={flip ? "lg:order-2" : ""}>
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--brand-soft)] text-brand">
            <Icon size={21} />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            {String(index + 1).padStart(2, "0")} — {feature.tagline}
          </span>
        </div>
        <h3 className="mt-5 font-display text-[clamp(22px,2.4vw,30px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text)] [text-wrap:balance]">
          {feature.title}
        </h3>
        <p className="mt-3 max-w-[520px] text-[15px] leading-[1.65] text-secondary">
          {feature.description}
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-3 p-0 max-sm:grid-cols-1">
          {feature.capabilities.map((c) => (
            <CapabilityItem key={c}>{c}</CapabilityItem>
          ))}
        </ul>
      </div>
      <div className={flip ? "lg:order-1" : ""}>
        <div className="rounded-[28px] border border-[var(--line)] bg-[var(--bg-elev)] p-4 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.4)]">
          <MediaPlaceholder label={feature.media?.label ?? feature.title} poster={feature.media?.poster} />
        </div>
      </div>
    </motion.div>
  );
}

/* App-peek media window: the screenshot sits inset on a soft brand wash and
   bleeds off the bottom-right — crops the busy browser chrome and reads as a
   deliberate product glimpse instead of a pasted screenshot. */
function CardMedia({ feature }: { feature: ExploreFeature }) {
  const url = resolvePoster(feature.media?.poster);
  return (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--line)] bg-[var(--bg-3)] [background-image:linear-gradient(135deg,var(--brand-softer),transparent_75%)]">
      {url ? (
        <img
          src={url}
          alt={feature.media?.label ?? feature.title}
          loading="lazy"
          decoding="async"
          className="absolute left-[8%] top-[12%] w-[104%] max-w-none rounded-tl-lg border border-[var(--line)] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--brand-soft)] text-brand">
            <ImageIcon size={18} />
          </span>
          <span className="max-w-[260px] text-[11.5px] leading-[1.5] text-muted">
            {feature.media?.label ?? feature.title}
          </span>
        </div>
      )}
    </div>
  );
}

function FeatureCard({ feature, index, delay }: { feature: ExploreFeature; index: number; delay: number }) {
  const Icon = ICONS[feature.icon];
  return (
    <motion.article
      {...fadeUp}
      transition={{ ...fadeUp.transition, delay }}
      className="group relative flex flex-col overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--bg-elev)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--brand-border)] hover:shadow-[0_32px_80px_-44px_var(--brand)]"
    >
      <CardMedia feature={feature} />
      <div className="flex flex-1 flex-col p-7 max-sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--brand-soft)] text-brand">
              <Icon size={17} />
            </span>
            <h3 className="font-display text-[17px] font-semibold leading-[1.3] tracking-[-0.01em] text-[var(--text)]">
              {feature.title}
            </h3>
          </div>
          <span className="pt-1.5 font-mono text-[10.5px] tracking-[0.14em] text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="mb-6 mt-4 text-[13.5px] leading-[1.65] text-muted">{feature.description}</p>
        <div className="mt-auto flex flex-wrap gap-2 border-t border-[var(--line)] pt-5">
          {feature.capabilities.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--brand-softer)] px-3 py-1.5 text-[12px] font-medium text-secondary"
            >
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand" />
              {c}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

type FeatureBlock =
  | { type: "spotlight"; item: ExploreFeature; index: number; flip: boolean }
  | { type: "grid"; items: { item: ExploreFeature; index: number }[] };

function FeaturesSection({ data }: { data: MoreFeaturesPageData["features"] }) {
  const blocks = useMemo<FeatureBlock[]>(() => {
    const out: FeatureBlock[] = [];
    let spotlights = 0;
    data.items.forEach((item, index) => {
      if (item.spotlight) {
        out.push({ type: "spotlight", item, index, flip: spotlights % 2 === 1 });
        spotlights += 1;
      } else {
        const last = out[out.length - 1];
        if (last?.type === "grid") last.items.push({ item, index });
        else out.push({ type: "grid", items: [{ item, index }] });
      }
    });
    return out;
  }, [data.items]);

  return (
    <section id="features" className="scroll-mt-[132px] py-24 max-md:py-16">
      <div className={wrap}>
        <SectionHeading eyebrow="Features" title={data.heading} text={data.subheading} />
        <div className="mt-20 flex flex-col gap-24 max-md:mt-14 max-md:gap-16">
          {blocks.map((block, bi) =>
            block.type === "spotlight" ? (
              <FeatureSpotlight key={block.item.id} feature={block.item} index={block.index} flip={block.flip} />
            ) : (
              /* 2-up for batches of 2 or 4 so no card sits orphaned on its own row */
              <div
                key={`grid-${bi}`}
                className={
                  block.items.length % 3 !== 0 && block.items.length <= 4
                    ? "grid grid-cols-2 gap-8 max-md:gap-6 max-sm:grid-cols-1"
                    : "grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-lg:gap-6 max-sm:grid-cols-1"
                }
              >
                {block.items.map(({ item, index }, i) => (
                  <FeatureCard key={item.id} feature={item} index={index} delay={(i % 3) * 0.07} />
                ))}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Pricing ──────────────────────────────────────────────────────────────── */

function PricingSection({ data }: { data: MoreFeaturesPageData["pricing"] }) {
  return (
    <section
      id="pricing"
      className="scroll-mt-[132px] border-t border-[var(--line)] bg-[linear-gradient(180deg,transparent,var(--brand-softer)_50%,transparent)] py-24 max-md:py-16"
    >
      <div className={wrap}>
        <SectionHeading eyebrow="Pricing" title={data.heading} text={data.subheading} />

        {/* What the quote is sized on */}
        <motion.div {...fadeUp} className="mx-auto mt-10 grid max-w-[880px] grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {data.dimensions.map((d) => (
            <div key={d.label} className="rounded-2xl border border-[var(--line)] bg-[var(--bg-elev)] px-4 py-3.5 text-center">
              <div className="text-[13px] font-semibold text-[var(--text)]">{d.label}</div>
              <div className="mt-1 text-[11.5px] leading-[1.4] text-muted">{d.note}</div>
            </div>
          ))}
        </motion.div>

        <div className="mt-12 grid grid-cols-3 gap-5 max-lg:grid-cols-1 max-lg:mx-auto max-lg:max-w-[440px]">
          {data.plans.map((plan, i) => (
            <motion.article
              key={plan.id}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className={[
                "relative flex flex-col rounded-[28px] border p-7 transition-all duration-200",
                plan.featured
                  ? "border-[var(--brand-border)] bg-[var(--bg-elev)] shadow-[0_36px_90px_-40px_var(--brand)]"
                  : "border-[var(--line)] bg-[var(--bg-elev)] hover:border-[var(--line-2)]",
              ].join(" ")}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-brand px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-white">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-[18px] font-semibold text-[var(--text)]">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-[34px] font-semibold tracking-[-0.02em] text-[var(--text)]">
                  {plan.price}
                </span>
                <span className="text-[12px] text-muted">{plan.priceNote}</span>
              </div>
              <p className="mt-3 text-[13.5px] leading-[1.6] text-secondary">{plan.tagline}</p>
              <ul className="mt-6 grid flex-1 gap-3 border-t border-[var(--line)] p-0 pt-6">
                {plan.bullets.map((b) => (
                  <CapabilityItem key={b}>{b}</CapabilityItem>
                ))}
              </ul>
              <SmartLink href={plan.cta.href} className={`mt-7 w-full ${plan.featured ? btnPrimary : btnGhost}`}>
                {plan.cta.label} <ArrowRight size={15} />
              </SmartLink>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Solution — personas ──────────────────────────────────────────────────── */

function SolutionSection({ data }: { data: MoreFeaturesPageData["solution"] }) {
  return (
    <section id="solution" className="scroll-mt-[132px] border-t border-[var(--line)] py-24 max-md:py-16">
      <div className={wrap}>
        <SectionHeading eyebrow="Solution" title={data.heading} text={data.subheading} />
        <div className="mt-14 grid grid-cols-3 gap-5 max-lg:grid-cols-1">
          {data.personas.map((persona, i) => {
            const Icon = ICONS[persona.icon];
            return (
              <motion.article
                key={persona.id}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className="group rounded-[28px] border border-[var(--line)] bg-[var(--bg-elev)] p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--brand-border)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--brand-soft)] text-brand">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-[19px] font-semibold tracking-[-0.01em] text-[var(--text)]">
                  {persona.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-[1.65] text-secondary">{persona.description}</p>
                <ul className="mt-5 grid gap-2.5 border-t border-[var(--line)] p-0 pt-5">
                  {persona.points.map((p) => (
                    <CapabilityItem key={p}>{p}</CapabilityItem>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Partner tracks ───────────────────────────────────────────────────────── */

function PartnerSection({ data }: { data: MoreFeaturesPageData["partner"] }) {
  return (
    <section
      id="partner"
      className="scroll-mt-[132px] border-t border-[var(--line)] bg-[linear-gradient(180deg,transparent,var(--brand-softer)_55%,transparent)] py-24 max-md:py-16"
    >
      <div className={wrap}>
        <SectionHeading eyebrow="Partner" title={data.heading} text={data.subheading} />
        <div className="mt-14 grid grid-cols-3 gap-5 max-lg:grid-cols-1">
          {data.tracks.map((track, i) => {
            const Icon = ICONS[track.icon];
            return (
              <motion.article
                key={track.id}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className="flex flex-col rounded-[28px] border border-[var(--line)] bg-[var(--bg-elev)] p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--brand-border)]"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--brand-soft)] text-brand">
                    <Icon size={20} />
                  </span>
                  <h3 className="font-display text-[17px] font-semibold tracking-[-0.01em] text-[var(--text)]">
                    {track.title}
                  </h3>
                </div>
                <p className="mt-4 flex-1 text-[13.5px] leading-[1.65] text-secondary">{track.description}</p>
                <ul className="mt-5 grid gap-2.5 border-t border-[var(--line)] p-0 pt-5">
                  {track.points.map((p) => (
                    <CapabilityItem key={p}>{p}</CapabilityItem>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
        <motion.div {...fadeUp} className="mt-10 text-center">
          <Link
            to="/resources/partners"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-brand transition-transform hover:translate-x-0.5"
          >
            Explore the partner program <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Resources ────────────────────────────────────────────────────────────── */

function ResourcesSection({ data }: { data: MoreFeaturesPageData["resources"] }) {
  return (
    <section id="resources" className="scroll-mt-[132px] border-t border-[var(--line)] py-24 max-md:py-16">
      <div className={wrap}>
        <SectionHeading eyebrow="Resources" title={data.heading} text={data.subheading} />
        <div className="mt-14 grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {data.links.map((link, i) => {
            const Icon = ICONS[link.icon];
            return (
              <motion.div key={link.id} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i % 3) * 0.07 }}>
                <SmartLink
                  href={link.href}
                  className="group flex h-full flex-col rounded-3xl border border-[var(--line)] bg-[var(--bg-elev)] p-6 no-underline transition-all duration-200 hover:-translate-y-1 hover:border-[var(--brand-border)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--brand-soft)] text-brand">
                      <Icon size={20} />
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
                    />
                  </div>
                  <h3 className="mt-5 font-display text-[16px] font-semibold tracking-[-0.01em] text-[var(--text)]">
                    {link.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.6] text-muted">{link.description}</p>
                </SmartLink>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────────────── */

function FaqSection({ faqs }: { faqs: MoreFeaturesPageData["faqs"] }) {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="scroll-mt-[132px] border-t border-[var(--line)] py-24 max-md:py-16">
      <div className="mx-auto max-w-[820px] px-8 max-sm:px-4">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          text="Everything teams usually ask before moving their filing to WhiteBooks."
        />
        <div className="mt-12 grid gap-3">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <motion.div
                key={faq.question}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.04 }}
                className={[
                  "overflow-hidden rounded-2xl border bg-[var(--bg-elev)] transition-colors duration-200",
                  isOpen ? "border-[var(--brand-border)]" : "border-[var(--line)]",
                ].join(" ")}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-6 py-5 text-left text-[15px] font-semibold text-[var(--text)]"
                >
                  {faq.question}
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-brand transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-[var(--line)] px-6 py-5 text-[14px] leading-[1.7] text-secondary">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Closing CTA ──────────────────────────────────────────────────────────── */

function ClosingSection({ data, onDemo }: { data: MoreFeaturesPageData; onDemo: () => void }) {
  return (
    <section className="px-6 pb-24 pt-4 max-md:pb-16">
      <motion.div
        {...fadeUp}
        className="relative mx-auto max-w-[1120px] overflow-hidden rounded-[32px] p-12 text-center max-sm:p-8"
        style={{ background: "linear-gradient(135deg, var(--brand), #8f1b46)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(600px 300px at 85% 0%, rgba(255,255,255,0.14), transparent 60%)" }}
        />
        <p className="relative m-0 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
          {data.productLabel}
        </p>
        <h2 className="relative mx-auto mt-3 max-w-[700px] font-display text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] tracking-[-0.02em] text-white [text-wrap:balance]">
          {data.closing.title}
        </h2>
        <p className="relative mx-auto mt-4 max-w-[560px] text-[16px] leading-[1.65] text-white/85">
          {data.closing.body}
        </p>
        <div className="relative mt-9 flex flex-wrap justify-center gap-3">
          <a
            href={EXPLORE_SIGNUP_URL}
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-[14px] font-semibold text-[#8f1b46] transition-transform hover:-translate-y-0.5"
          >
            Start free <ArrowRight size={16} />
          </a>
          <button
            type="button"
            onClick={onDemo}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-solid border-white/40 bg-white/10 px-7 py-3 text-[14px] font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:border-white/70"
          >
            Talk to sales
          </button>
        </div>
      </motion.div>
    </section>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export function MoreFeaturesExplore({ data }: { data: MoreFeaturesPageData }) {
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    document.title = `${data.badge} — ${data.productLabel} | WhiteBooks`;
  }, [data.badge, data.productLabel]);

  useEffect(() => {
    document.body.style.overflow = demoOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [demoOpen]);

  const openDemo = () => setDemoOpen(true);

  return (
    <div className="min-h-screen bg-[var(--bg)] font-body text-[var(--text)]">
      <Header mode="softwares" />
      <main>
        <HeroSection data={data} onDemo={openDemo} />
        <SectionNav />
        <FeaturesSection data={data.features} />
        <PricingSection data={data.pricing} />
        <SolutionSection data={data.solution} />
        <PartnerSection data={data.partner} />
        <ResourcesSection data={data.resources} />
        <FaqSection faqs={data.faqs} />
        <ClosingSection data={data} onDemo={openDemo} />
      </main>
      <Footer />
      {demoOpen && <BookDemoModal onClose={() => setDemoOpen(false)} />}
    </div>
  );
}

export default MoreFeaturesExplore;
