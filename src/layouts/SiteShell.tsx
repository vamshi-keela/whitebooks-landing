import React from 'react';
import { Link } from 'react-router-dom';
import type { BreadcrumbItem } from '@/types/components';

// Re-exports for backward compat — consumers import from '@/layouts/SiteShell'
export { Header } from './Header';
export { Footer } from './Footer';
export { SiteLogo } from '@/components/ui/SiteLogo';

// ── FluidBackground ──────────────────────────────────────────────────────────

interface FluidBackgroundProps {
  variant?: 'right' | 'center' | 'left';
  gradientOpacity?: number;
  /** When true, all background animations are paused (e.g. hero scrolled off-screen). */
  paused?: boolean;
}

export function HeroFluidBackground({ variant = 'right', gradientOpacity = 1, paused = false }: FluidBackgroundProps) {
  const variantClass = variant === 'center' ? 'wb-fluid-center' : variant === 'left' ? 'wb-fluid-left' : '';
  return (
    <React.Fragment>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="wb-liquid" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves={2} seed={5} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={70} xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation={10} />
          </filter>
          <linearGradient id="wb-stream-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8aa8" stopOpacity={0} />
            <stop offset="50%" stopColor="#ff5a8d" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#d33568" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="wb-stream-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffb786" stopOpacity={0} />
            <stop offset="50%" stopColor="#ff7a9d" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#d33568" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>

      <div
        className={`wb-fluid ${variantClass}${paused ? ' is-paused' : ''}`}
        style={{ opacity: gradientOpacity }}
        aria-hidden="true"
      >
        {/* L1: Ultra-faint ambient wash across the full center */}
        <div className="wb-layer wb-layer-ambient" />
        {/* L2: Left orb — primary brand light source, slow float */}
        <div className="wb-layer wb-layer-orb-left" />
        {/* L3: Right orb — secondary counterpoint, offset float timing */}
        <div className="wb-layer wb-layer-orb-right" />
        {/* L4: Center stage light — breathing glow behind hero subject */}
        <div className="wb-layer wb-layer-orb-center" />
        {/* L5: Center wide echo — ultra-soft, cross-fades with L4 */}
        <div className="wb-layer wb-layer-orb-center-echo" />
        {/* L6: SVG-turbulence distort — organic micro-texture overlay */}
        <div className="wb-layer wb-layer-distort" />
        {/* Neural dot grid (position via variant CSS) */}
        <div className="wb-neural" />
        {/* Animated stream lines (position via variant CSS) */}
        <svg
          className="wb-stream-svg"
          viewBox="0 0 800 800"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="wb-stream-path"
            stroke="url(#wb-stream-grad)"
            d="M 100,40 C 260,180 360,300 380,460 C 400,620 520,720 700,780"
          />
          <path
            className="wb-stream-path"
            stroke="url(#wb-stream-grad-2)"
            style={{ animationDelay: '-4s', animationDuration: '18s' }}
            d="M 60,180 C 220,280 340,400 400,560 C 460,720 580,760 760,780"
          />
          <path
            className="wb-stream-path"
            stroke="url(#wb-stream-grad)"
            style={{ animationDelay: '-7s', animationDuration: '16s', strokeDasharray: '4 22' }}
            d="M 200,20 C 320,160 420,320 440,500 C 460,680 580,740 780,800"
          />
        </svg>
        {/* L9: Cinematic vignette — pulls eye inward, darkens corners */}
        <div className="wb-layer wb-layer-vignette" />
        {/* L10: Film grain — prevents banding, adds tactile depth */}
        <div className="wb-layer wb-layer-grain" />
      </div>
      <div className="wb-grid-bg" aria-hidden="true" />
    </React.Fragment>
  );
}



// ── FluidBackground ──────────────────────────────────────────────────────────

interface FluidBackgroundProps {
  variant?: 'right' | 'center' | 'left';
  gradientOpacity?: number;
}

export function FluidBackground({ variant = 'right', gradientOpacity = 1 }: FluidBackgroundProps) {
  return (
    <React.Fragment>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="wb-liquid" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.012"
              numOctaves={2}
              seed={3}
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="22s"
                values="0.008 0.012; 0.014 0.020; 0.008 0.012"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={120} xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation={14} />
          </filter>
          <linearGradient id="wb-stream-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8aa8" stopOpacity={0} />
            <stop offset="50%" stopColor="#ff5a8d" stopOpacity={0.9 * gradientOpacity} />
            <stop offset="100%" stopColor="#d33568" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="wb-stream-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffb786" stopOpacity={0} />
            <stop offset="50%" stopColor="#ff7a9d" stopOpacity={0.7 * gradientOpacity} />
            <stop offset="100%" stopColor="#d33568" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>

      <div
        className={`wb-fluid ${variant === 'center' ? 'wb-fluid-center' : variant === 'left' ? 'wb-fluid-left' : ''}`}
        style={{ opacity: gradientOpacity }}
        aria-hidden="true"
      >
        <div className="wb-fluid-mesh echo"></div>
        <div className="wb-fluid-mesh"></div>
        <div className="wb-fluid-distort"></div>
        <div className="wb-neural"></div>
        <svg
          className="wb-stream-svg"
          viewBox="0 0 800 800"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="wb-stream-path"
            stroke="url(#wb-stream-grad)"
            d="M 100,40 C 260,180 360,300 380,460 C 400,620 520,720 700,780"
          />
          <path
            className="wb-stream-path"
            stroke="url(#wb-stream-grad-2)"
            style={{ animationDelay: '-4s', animationDuration: '18s' }}
            d="M 60,180 C 220,280 340,400 400,560 C 460,720 580,760 760,780"
          />
          <path
            className="wb-stream-path"
            stroke="url(#wb-stream-grad)"
            style={{ animationDelay: '-7s', animationDuration: '16s', strokeDasharray: '4 22' }}
            d="M 200,20 C 320,160 420,320 440,500 C 460,680 580,740 780,800"
          />
        </svg>
      </div>
      <div className="wb-grid-bg" aria-hidden="true"></div>
    </React.Fragment>
  );
}

// ── Eyebrow ──────────────────────────────────────────────────────────────────

interface EyebrowProps {
  children: React.ReactNode;
}

export function Eyebrow({ children }: EyebrowProps) {
  return (
    <span className="wb-eyebrow">
      <span className="wb-eyebrow-dot" aria-hidden="true"></span>
      {children}
    </span>
  );
}

// ── Breadcrumb ───────────────────────────────────────────────────────────────

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="wb-crumbs" aria-label="Breadcrumb">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="wb-crumb-sep">›</span>}
          {it.href ? (
            it.href.startsWith('/') ? (
              <Link to={it.href}>{it.label}</Link>
            ) : (
              <a href={it.href}>{it.label}</a>
            )
          ) : (
            <span>{it.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

