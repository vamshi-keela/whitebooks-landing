import "../../styles/hero.css";
import { GlowOrb } from "./GlowOrb";
import { FloatingParticles } from "./FloatingParticles";

interface RingConfig {
  size: number;
  border: string;
  /* CSS animation class — empty string means no rotation */
  anim: string;
}

const RINGS: RingConfig[] = [
  { size: 620, border: "1px dashed rgba(220,47,101,0.18)", anim: "animate-orbit-cw" },
  { size: 900, border: "1px dashed rgba(220,47,101,0.10)", anim: "animate-orbit-ccw" },
  { size: 1180, border: "1px dashed rgba(139,92,246,0.07)", anim: "" },
  { size: 1500, border: "1px dashed rgba(59,130,246,0.05)", anim: "" },
];

export function BackgroundEffects() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Layered radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_0%,rgba(220,47,101,0.14),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_80%_65%,rgba(139,92,246,0.11),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_30%_at_15%_80%,rgba(59,130,246,0.08),transparent)]" />

      {/* Orbital dashed rings — all centered at 50% / 44% */}
      {RINGS.map(({ size, border, anim }) => (
        <div
          key={size}
          className={`absolute rounded-full ${anim}`}
          style={{
            width: size,
            height: size,
            left: "50%",
            top: "44%",
            /* Rotating rings: animation starts with translate(-50%,-50%) rotate(0deg)   */
            /* Static rings: use transform directly                                       */
            transform: anim ? undefined : "translate(-50%, -50%)",
            border,
          }}
        />
      ))}

      {/* Ambient glow blobs */}
      <GlowOrb
        size={700}
        color="#d33568"
        opacity={0.07}
        blur={140}
        className="left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
        pulse
      />
      <GlowOrb
        size={450}
        color="#8b5cf6"
        opacity={0.09}
        blur={110}
        className="-left-24 bottom-1/4"
        pulse
      />
      <GlowOrb
        size={380}
        color="#3b82f6"
        opacity={0.07}
        blur={90}
        className="-right-20 top-1/3"
      />

      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <FloatingParticles count={30} />
    </div>
  );
}
