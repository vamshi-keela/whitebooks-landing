interface GlowOrbProps {
  size?: number;
  color?: string;
  opacity?: number;
  blur?: number;
  className?: string;
  pulse?: boolean;
}

export function GlowOrb({
  size = 400,
  color = "#dc2f65",
  opacity = 0.15,
  blur = 80,
  className = "",
  pulse = false,
}: GlowOrbProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${pulse ? "animate-pulse-glow" : ""} ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        opacity,
        filter: `blur(${blur}px)`,
        willChange: "opacity, transform",
      }}
    />
  );
}
