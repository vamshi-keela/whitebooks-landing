import { motion } from "framer-motion";
import {
  FileText,
  Wallet,
  QrCode,
  Truck,
  Users,
  Building2,
  MapPin,
  FileSpreadsheet,
  Braces,
  ShieldCheck,
  Headphones,
  Server,
} from "lucide-react";

const softwareCards = [
  {
    title: "GST Software",
    icon: FileText,
    badge: "Accurate • Fast • Hassle-Free",
    points: [
      "All 12 GST Return Types",
      "Auto 2A/2B Reconciliation",
      "One-Click Filing",
      "Multi-GSTIN Management",
    ],
  },
  {
    title: "Accounting Software",
    icon: Wallet,
    badge: "Simple • Automated • Powerful",
    points: [
      "Smart Invoicing & Billing",
      "Bank Reconciliation",
      "Inventory & AR/AP",
      "Financial Reports",
    ],
  },
  {
    title: "e-Invoice Software",
    icon: QrCode,
    badge: "Instant • Secure • Compliant",
    points: [
      "IRN Generation",
      "Bulk e-Invoice Support",
      "Signed JSON & QR Code",
      "ERP/Tally Auto Sync",
    ],
  },
  {
    title: "e-Way Bill Software",
    icon: Truck,
    badge: "Fast • Reliable • Compliant",
    points: [
      "Generate & Extend",
      "NIC API Integration",
      "Real-time Tracking",
      "Bulk Operations",
    ],
  },
];

const stats = [
  { icon: Users, label: "CAs & Tax Professionals", value: "5,000+" },
  { icon: Building2, label: "Businesses", value: "3,000+" },
  { icon: MapPin, label: "Cities & Towns", value: "8,000+" },
  { icon: FileSpreadsheet, label: "Invoices Created", value: "10 Crore+" },
];

const apis = [
  "GST API",
  "e-Invoice API",
  "e-Way Bill API",
  "KSA API",
  "SAP Connector",
  "Tally Connector",
];

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={`backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl shadow-pink-500/10 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function WhiteBooksHero() {
  return (
    <section className="relative overflow-hidden bg-[#050816] text-white min-h-screen px-6 py-16 lg:px-12">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,47,101,0.25),transparent_35%)]" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-pink-500/20" />
        <div className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-pink-500/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d33568] text-2xl font-bold">
              W
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold">WhiteBooks</div>
              <div className="text-sm text-white/60">Elevate Your Business</div>
            </div>
          </div>

          <h1 className="mt-10 text-balance text-5xl font-black leading-tight md:text-7xl">
            <span className="bg-gradient-to-r from-pink-400 to-[#d33568] bg-clip-text text-transparent">
              All-in-One Cloud Software
            </span>
            <br />
            for Indian Businesses
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Automate compliance. Simplify finance. Grow with confidence.
          </p>
        </div>

        {/* Main Grid */}
        <div className="mt-20 grid gap-8 lg:grid-cols-[280px_1fr_280px]">
          {/* Left Stats */}
          <div className="space-y-6">
            <GlassCard className="p-6">
              <div className="space-y-6">
                {stats.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-none"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d33568]/20">
                      <item.icon className="text-[#ff5b8d]" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-[#ff5b8d]">
                        {item.value}
                      </div>
                      <div className="text-sm text-white/70">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-5">
              <div className="flex items-center gap-4">
                <ShieldCheck className="text-[#ff5b8d]" />
                <div>
                  <div className="font-semibold">99.99% Uptime SLA</div>
                  <div className="text-sm text-white/60">
                    Enterprise-grade reliability
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Center */}
          <div className="relative">
            <div className="grid gap-6 lg:grid-cols-2">
              {softwareCards.slice(0, 2).map((card, idx) => (
                <GlassCard key={idx} className="p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d33568]/20">
                    <card.icon className="text-[#ff5b8d]" />
                  </div>
                  <h3 className="text-2xl font-bold">{card.title}</h3>
                  <ul className="mt-4 space-y-2 text-white/75">
                    {card.points.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                  <div className="mt-5 inline-flex rounded-full bg-[#d33568]/15 px-4 py-2 text-sm text-[#ff5b8d]">
                    {card.badge}
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Center Image */}
            <div className="relative mx-auto my-10 flex w-full max-w-md justify-center">
              <div className="absolute inset-0 rounded-full bg-[#d33568]/30 blur-3xl" />
              <img
                src="/hero-woman.webp"
                alt="Business professional"
                className="relative z-10 object-contain"
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {softwareCards.slice(2).map((card, idx) => (
                <GlassCard key={idx} className="p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d33568]/20">
                    <card.icon className="text-[#ff5b8d]" />
                  </div>
                  <h3 className="text-2xl font-bold">{card.title}</h3>
                  <ul className="mt-4 space-y-2 text-white/75">
                    {card.points.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                  <div className="mt-5 inline-flex rounded-full bg-[#d33568]/15 px-4 py-2 text-sm text-[#ff5b8d]">
                    {card.badge}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            <GlassCard className="p-6">
              <div className="text-2xl font-bold">Developer APIs</div>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {apis.map((api) => (
                  <motion.div
                    key={api}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <Braces className="mb-3 text-[#ff5b8d]" />
                    <div className="font-semibold">{api}</div>
                    <div className="mt-1 text-xs text-white/60">
                      Secure • Fast • Scalable
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-5">
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <Server className="text-[#ff5b8d]" />
                  <div>
                    <div className="font-semibold">Scalable Infrastructure</div>
                    <div className="text-sm text-white/60">
                      Multi-region deployment
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Headphones className="text-[#ff5b8d]" />
                  <div>
                    <div className="font-semibold">Dedicated Support</div>
                    <div className="text-sm text-white/60">
                      Enterprise assistance
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
