import React from "react";

import {
  FileText,
  Wallet,
  QrCode,
  Truck,
  Braces,
  Users,
  Building2,
  MapPin,
  ShieldCheck,
  Headphones,
  Database,
  Cloud,
  Server,
  Layers3,
} from "lucide-react";

import { motion, type Variants } from "framer-motion";
import clsx from "clsx";

// import womanImage from "../../assets/hero-woman.webp";

const softwareCards = [
  {
    title: "GST Software",
    icon: FileText,
    accent: "from-pink-500/30 to-pink-500/5",
    badge: "Accurate • Fast • Hassle-Free",
    items: [
      "All 12 GST Return Types",
      "Auto 2A/2B Reconciliation",
      "One-Click GST Filing",
      "Multi GSTIN Management",
    ],
  },
  {
    title: "Accounting Software",
    icon: Wallet,
    accent: "from-fuchsia-500/30 to-fuchsia-500/5",
    badge: "Simple • Automated • Powerful",
    items: [
      "Smart Invoicing & Billing",
      "Auto Bank Reconciliation",
      "Inventory + AR/AP",
      "Financial Reports & Ledger",
    ],
  },
  {
    title: "e-Way Bill Software",
    icon: Truck,
    accent: "from-violet-500/30 to-violet-500/5",
    badge: "Fast • Reliable • Compliant",
    items: [
      "Generate & Extend Bills",
      "NIC API Integration",
      "Real-Time Tracking",
      "Bulk Dispatch Operations",
    ],
  },
  {
    title: "e-Invoice Software",
    icon: QrCode,
    accent: "from-rose-500/30 to-rose-500/5",
    badge: "Instant • Secure • Compliant",
    items: [
      "IRN Generation",
      "Bulk IRN Support",
      "Signed JSON + QR",
      "ERP/Tally Auto Sync",
    ],
  },
];

const stats = [
  {
    icon: Users,
    value: "5,000+",
    label: "CAs & Tax Professionals",
  },
  {
    icon: Building2,
    value: "3,000+",
    label: "Businesses",
  },
  {
    icon: MapPin,
    value: "8,000+",
    label: "Cities & Towns",
  },
  {
    icon: Database,
    value: "10 Crore+",
    label: "Invoices Created",
  },
];

const apiCards = [
  "GST API",
  "e-Invoice API",
  "e-Way Bill API",
  "KSA API",
  "SAP Connector",
  "Tally Connector",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.035,
        y: -6,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
      className={clsx(
        "relative overflow-hidden rounded-[28px] border border-white/10",
        "bg-white/[0.04] backdrop-blur-[20px]",
        "shadow-[0_10px_40px_rgba(0,0,0,0.45)]",
        "before:absolute before:inset-0",
        "before:bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.12),transparent_35%)]",
        "before:pointer-events-none",
        className
      )}
    >
      <div className="absolute inset-0 rounded-[28px] border border-white/5" />
      {children}
    </motion.div>
  );
}

function GlowOrb({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "absolute rounded-full blur-[120px] opacity-40",
        "bg-[#dc2f65]",
        className
      )}
    />
  );
}

function SoftwareCard({ card }: any) {
  const Icon = card.icon;

  return (
    <GlassCard className="group p-6 lg:p-7">
      <div
        className={clsx(
          "absolute inset-0 opacity-30 bg-gradient-to-br",
          card.accent
        )}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dc2f65]/15 border border-[#dc2f65]/20 shadow-[0_0_30px_rgba(220,47,101,0.35)]">
            <Icon className="h-7 w-7 text-[#ff5a8e]" />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">
              {card.title}
            </h3>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {card.items.map((item: string) => (
            <div
              key={item}
              className="flex items-center gap-3 text-[15px] text-white/72"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-[#ff5a8e]" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 inline-flex rounded-full border border-[#dc2f65]/20 bg-[#dc2f65]/10 px-4 py-2 text-sm text-[#ff6f9d] backdrop-blur-xl">
          {card.badge}
        </div>
      </div>
    </GlassCard>
  );
}

function ApiCard({ title }: { title: string }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -4,
      }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 18,
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-2xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#dc2f65]/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#dc2f65]/15 border border-[#dc2f65]/20">
          <Braces className="h-5 w-5 text-[#ff5a8e]" />
        </div>

        <div>
          <div className="font-medium text-white">{title}</div>
          <div className="mt-1 text-xs text-white/55">
            Secure • Scalable • Enterprise Ready
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatsCard() {
  return (
    <GlassCard className="p-6 lg:p-7">
      <div className="space-y-5">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-center gap-4 border-b border-white/8 pb-5 last:border-none last:pb-0"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#dc2f65]/20 bg-[#dc2f65]/12 shadow-[0_0_30px_rgba(220,47,101,0.25)]">
                <Icon className="h-6 w-6 text-[#ff5a8e]" />
              </div>

              <div>
                <div className="text-3xl font-bold tracking-tight text-[#ff5a8e]">
                  {item.value}
                </div>
                <div className="text-sm text-white/65">{item.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

export default function WhiteBooksHero() {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-20 text-white lg:min-h-screen lg:py-28">
      {/* Background Effects */}
      <GlowOrb className="left-[10%] top-[10%] h-[320px] w-[320px]" />
      <GlowOrb className="bottom-[15%] right-[10%] h-[380px] w-[380px] opacity-25" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,47,101,0.18),transparent_35%)]" />

      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#dc2f65]/10" />

      <div className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#dc2f65]/5" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <div className="inline-flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff5a8e] to-[#dc2f65] shadow-[0_0_40px_rgba(220,47,101,0.45)]">
              <span className="text-3xl font-black">W</span>
            </div>

            <div className="text-left">
              <div className="text-3xl font-bold">WhiteBooks</div>
              <div className="text-sm text-white/55">
                Elevate Your Business
              </div>
            </div>
          </div>

          <h1 className="mx-auto mt-10 max-w-5xl text-balance text-[42px] font-black leading-[1.02] sm:text-[56px] lg:text-[86px]">
            <span className="bg-gradient-to-r from-[#ff78a5] via-[#ff4e87] to-[#dc2f65] bg-clip-text text-transparent">
              All-in-One Cloud Software
            </span>
            <br />
            <span className="text-white">for Indian Businesses</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl">
            Automate compliance. Simplify finance. Grow with confidence.
          </p>
        </motion.div>

        {/* Main Layout */}
        <div className="relative mt-16 grid gap-8 xl:grid-cols-[320px_1fr_320px]">
          {/* LEFT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="space-y-7"
          >
            <StatsCard />

            <GlassCard className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#dc2f65]/20 bg-[#dc2f65]/10">
                  <ShieldCheck className="text-[#ff5a8e]" />
                </div>

                <div>
                  <div className="font-semibold text-white">
                    99.99% Uptime SLA
                  </div>
                  <div className="mt-1 text-sm text-white/55">
                    Enterprise-grade infrastructure with multi-region deployment
                  </div>
                </div>
              </div>
            </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#dc2f65]/20 bg-[#dc2f65]/10">
                <Headphones className="text-[#ff5a8e]" />
              </div>

              <div>
                <div className="font-semibold text-white">
                  Dedicated Enterprise Support
                </div>
                <div className="mt-1 text-sm text-white/55">
                  Onboarding, migration & compliance assistance
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* CENTER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="relative"
        >
          {/* TOP SOFTWARE CARDS */}
          <div className="grid gap-7 lg:grid-cols-2">
            <SoftwareCard card={softwareCards[0]} />
            <SoftwareCard card={softwareCards[1]} />
          </div>

          {/* CENTER IMAGE */}
          <div className="relative mx-auto my-10 flex max-w-[420px] items-center justify-center">
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-[#dc2f65]/25 blur-[120px]" />

            {/* Floating Ring */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute h-[500px] w-[500px] rounded-full border border-dashed border-[#dc2f65]/15"
            />

            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <img
                // src={womanImage}
                alt="WhiteBooks Hero"
                className="relative z-10 w-full object-contain drop-shadow-[0_25px_60px_rgba(220,47,101,0.35)]"
              />
            </motion.div>
          </div>

          {/* BOTTOM SOFTWARE CARDS */}
          <div className="grid gap-7 lg:grid-cols-2">
            <SoftwareCard card={softwareCards[2]} />
            <SoftwareCard card={softwareCards[3]} />
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
          className="space-y-7"
        >
          {/* APIs */}
          <GlassCard className="p-6 lg:p-7">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#dc2f65]/20 bg-[#dc2f65]/10">
                <Cloud className="text-[#ff5a8e]" />
              </div>

              <div>
                <div className="text-2xl font-semibold text-white">
                  Developer APIs
                </div>

                <div className="mt-1 text-sm text-white/55">
                  Plug WhiteBooks into your ERP or SaaS
                </div>
              </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {apiCards.map((api) => (
                <ApiCard key={api} title={api} />
              ))}
            </div>
          </GlassCard>

          {/* ENTERPRISE FEATURES */}
          <GlassCard className="p-6 lg:p-7">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#dc2f65]/20 bg-[#dc2f65]/10">
                  <Server className="text-[#ff5a8e]" />
                </div>

                <div>
                  <div className="font-semibold text-white">
                    Multi-region Infrastructure
                  </div>

                  <div className="mt-1 text-sm leading-relaxed text-white/55">
                    Highly scalable deployment with auto-scaling cloud systems
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#dc2f65]/20 bg-[#dc2f65]/10">
                  <Layers3 className="text-[#ff5a8e]" />
                </div>

                <div>
                  <div className="font-semibold text-white">
                    ERP Integrations
                  </div>

                  <div className="mt-1 text-sm leading-relaxed text-white/55">
                    SAP, Tally, Oracle, Odoo & enterprise accounting systems
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#dc2f65]/20 bg-[#dc2f65]/10">
                  <ShieldCheck className="text-[#ff5a8e]" />
                </div>

                <div>
                  <div className="font-semibold text-white">
                    Secure & Audit Ready
                  </div>

                  <div className="mt-1 text-sm leading-relaxed text-white/55">
                    OAuth2, TLS 1.2+, detailed logs and enterprise security
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* ENTERPRISE LOGOS */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="mt-16 overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] py-6 backdrop-blur-2xl"
      >
        <div className="mb-5 text-center text-sm uppercase tracking-[0.3em] text-white/35">
          Trusted by Leading Enterprises
        </div>

        <div className="flex animate-[marquee_28s_linear_infinite] gap-16 whitespace-nowrap px-8 text-lg font-medium text-white/40">
          <span>P&G</span>
          <span>IBM</span>
          <span>KPMG</span>
          <span>PepsiCo</span>
          <span>Razorpay</span>
          <span>TVS</span>
          <span>Cars24</span>
          <span>Accenture</span>
          <span>Coca-Cola</span>
          <span>Philips</span>
          <span>KIA</span>
          <span>SBI</span>
          <span>Grant Thornton</span>
        </div>
      </motion.div>
    </div>
  </section>
);
}  