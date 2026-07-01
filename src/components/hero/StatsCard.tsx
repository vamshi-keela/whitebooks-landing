"use client";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { GlassCard } from "./GlassCard";

interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
}

interface StatsCardProps {
  stats: StatItem[];
  className?: string;
}

export function StatsCard({ stats, className = "" }: StatsCardProps) {
  return (
    <GlassCard noHover className={`p-5 ${className}`}>
      {/* Header row */}
      <div className="mb-4 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#d33568] animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
          Trusted by India
        </span>
      </div>

      {/* Stat rows */}
      <div className="space-y-3.5">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 + idx * 0.1 }}
            className={`flex items-center gap-3 ${idx < stats.length - 1 ? "border-b border-white/[0.06] pb-3.5" : ""
              }`}
          >
            {/* Icon */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#d33568]/12 ring-1 ring-[#d33568]/20">
              <stat.icon size={16} className="text-[#ff4f87]" />
            </div>

            {/* Label + Value */}
            <div className="flex flex-1 items-center justify-between gap-2 min-w-0">
              <span className="truncate text-[12px] text-white/55">{stat.label}</span>
              <span className="shrink-0 text-base font-extrabold tracking-tight text-[#ff4f87]">
                {stat.value}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
