"use client";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface SoftwareCardProps {
  icon: LucideIcon;
  title: string;
  badge: string;
  points: string[];
  floatDelay?: number;
  enterDelay?: number;
  className?: string;
}

const glassBase: React.CSSProperties = {
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow:
    "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
};

const cardVariants = {
  float: (d: number) => ({
    y: [0, -10, 0],
    transition: {
      duration: 6 + d * 0.8,
      delay: d * 0.9,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  }),
  hover: {
    y: -12,
    scale: 1.04,
    transition: { type: "spring" as const, stiffness: 260, damping: 18 },
  },
};

export function SoftwareCard({
  icon: Icon,
  title,
  badge,
  points,
  floatDelay = 0,
  enterDelay = 0,
  className = "",
}: SoftwareCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: enterDelay, ease: "easeOut" }}
      className={className}
    >
      <motion.div
        custom={floatDelay}
        animate="float"
        whileHover="hover"
        variants={cardVariants}
        style={glassBase}
        className="group relative cursor-default rounded-2xl p-5 will-change-transform"
      >
        {/* Animated gradient border on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(220,47,101,0.15), rgba(139,92,246,0.08), transparent 60%)",
          }}
        />

        {/* Icon */}
        <div className="relative mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#dc2f65]/12 ring-1 ring-[#dc2f65]/25 transition-all duration-300 group-hover:bg-[#dc2f65]/22 group-hover:ring-[#dc2f65]/45 group-hover:shadow-[0_0_16px_rgba(220,47,101,0.3)]">
          <Icon size={20} className="text-[#ff4f87]" />
        </div>

        {/* Title */}
        <h3 className="relative text-[15px] font-bold tracking-tight text-white">{title}</h3>

        {/* Feature points */}
        <ul className="relative mt-3 space-y-1.5">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-2 text-[13px] leading-snug text-white/60">
              <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[#dc2f65]/60" />
              {point}
            </li>
          ))}
        </ul>

        {/* Badge */}
        <div className="relative mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#dc2f65]/10 px-3 py-1 ring-1 ring-[#dc2f65]/18 transition-all duration-300 group-hover:bg-[#dc2f65]/18 group-hover:ring-[#dc2f65]/35">
          <span className="h-1.5 w-1.5 rounded-full bg-[#dc2f65] animate-pulse" />
          <span className="text-[11px] font-semibold tracking-wide text-[#ff4f87]">{badge}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
