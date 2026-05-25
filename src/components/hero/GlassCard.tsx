"use client";
import { type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import "../../styles/hero.css";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children?: ReactNode;
  className?: string;
  noHover?: boolean;
}

const glassStyle: React.CSSProperties = {
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow:
    "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
};

export function GlassCard({
  children,
  className = "",
  noHover = false,
  style,
  ...rest
}: GlassCardProps) {
  return (
    <motion.div
      style={{ ...glassStyle, ...style }}
      whileHover={noHover ? undefined : { scale: 1.035, y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      /* glass-hover applies CSS-transition-based background/border/shadow on :hover */
      className={`rounded-2xl ${noHover ? "" : "glass-hover"} ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
