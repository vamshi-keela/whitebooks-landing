"use client";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface ApiCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  enterDelay?: number;
}

export function ApiCard({ icon: Icon, title, subtitle, enterDelay = 0 }: ApiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        duration: 0.5, delay: enterDelay, ease: "easeOut",
        type: "spring", stiffness: 260, damping: 18
      }}
      className="group relative flex cursor-pointer flex-col items-center gap-2 rounded-xl p-4 text-center"
      style={{
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(220,47,101,0.1), transparent 70%)" }}
      />

      {/* Icon */}
      <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-[#d33568]/[0.12] ring-1 ring-[#d33568]/[0.22] transition-all duration-300 group-hover:bg-[#d33568]/[0.22] group-hover:ring-[#d33568]/[0.45] group-hover:shadow-[0_0_14px_rgba(220,47,101,0.28)]">
        <Icon size={17} className="text-[#ff4f87]" />
      </div>

      {/* Text */}
      <div className="relative">
        <p className="text-[13px] font-semibold leading-tight text-white">{title}</p>
        <p className="mt-0.5 text-[11px] leading-tight text-white/[0.45]">{subtitle}</p>
      </div>
    </motion.div>
  );
}
