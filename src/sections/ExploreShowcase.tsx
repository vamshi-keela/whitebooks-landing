// ExploreShowcase.tsx — premium "Explore WhiteBooks" platform showcase.
//
// Complete redesign of the legacy beige browser-mockup tab section into a
// modern fintech showcase (Stripe / Brex / Mercury / Ramp language):
//   • centered header with eyebrow + large display heading
//   • pill-chip feature navigation (active = inverted fill)
//   • 40 / 60 asymmetric split — copy left, dominant visual canvas right
//   • video placeholders (16:10, glow, play overlay) ready for real mp4s
//   • glassmorphism metric cards floating over the canvas
//   • framer-motion fade + translateY transitions between features
// Theme-aware via the shared design tokens; no browser chrome, no heavy cards.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Play, ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/shared/lib/cn';
import { PillButton } from '@/shared/ui/PillButton';
import { ButtonLink } from '@/shared/ui/Button';
import { ExploreShowCase, MetricCard, } from '@/shared/types/pages';
import EyebrowPill from '@/shared/ui/EyebrowPill';

const SIGNUP_URL = 'https://accounts.whitebooks.in/signupall';
const DEMO_URL = '/about/contact-us';


const SOCIAL_PROOF = ['25,000+ businesses', '500+ CA firms', '99.95% uptime'];

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── FeaturePills ─────────────────────────────────────────────────────────────

function FeaturePills({
  active,
  onChange,
  features
}: {
  active: string;
  onChange: (id: string) => void;
  features: ExploreShowCase[];
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
      {features.map((f) => (
        <PillButton
          key={f.id}
          isActive={f.id === active}
          onClick={() => onChange(f.id)}
          layoutId="explore-pill"
        >
          {f.label}
        </PillButton>
      ))}
    </div>
  );
}

// ─── SocialProofBadge ─────────────────────────────────────────────────────────

function SocialProofBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium text-[var(--fg-secondary)]"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--hairline)' }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" style={{ boxShadow: '0 0 8px rgba(220,47,101,0.7)' }} />
      {children}
    </span>
  );
}

// ─── CTAButtons ───────────────────────────────────────────────────────────────

function CTAButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <ButtonLink
        href={SIGNUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        variant="primary"
        size="lg"
        className="group cursor-pointer rounded-full px-6 py-3"
      >
        Start free
        <ArrowRight size={17} strokeWidth={2.4} className="transition-transform duration-300 group-hover:translate-x-1" />
      </ButtonLink>
      <ButtonLink
        href={DEMO_URL}
        variant="secondary"
        size="lg"
        className="group cursor-pointer rounded-full px-6 py-3"
      >
        See live demo
        <ArrowRight size={17} strokeWidth={2.4} className="transition-transform duration-300 group-hover:translate-x-1" />
      </ButtonLink>
    </div>
  );
}

// ─── FeatureContent (left column) ─────────────────────────────────────────────

function FeatureContent({ feature }: { feature: ExploreShowCase }) {
  return (
    <motion.div
      key={feature.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="flex flex-col gap-6"
    >
      {/* <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--accent-bright)]">
        {feature.label}
      </span> */}

      <h3 className="m-0 font-serif text-[clamp(26px,3vw,38px)] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--fg-primary)] text-balance">
        {feature.heading}{' '}
        <span style={{ color: 'var(--accent)' }}>{feature.accent}</span>
      </h3>

      <p className="m-0 max-w-[46ch] text-[15.5px] leading-[1.6] text-[var(--fg-secondary)]">{feature.desc}</p>

      <ul className="grid grid-cols-1 gap-x-5 gap-y-2.5 p-0 sm:grid-cols-2" style={{ listStyle: 'none', margin: 0 }}>
        {feature.benefits.map((b) => (
          <li key={b} className="flex items-center gap-2.5 text-[13.5px] text-[var(--fg-secondary)]">
            <span
              className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
              style={{ background: 'rgba(220,47,101,0.12)', color: 'var(--accent-bright)' }}
            >
              <Check size={11} strokeWidth={3.2} />
            </span>
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-1 flex flex-col gap-5">
        <CTAButtons />
        <div className="flex flex-wrap gap-2">
          {SOCIAL_PROOF.map((s) => (
            <SocialProofBadge key={s}>{s}</SocialProofBadge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── MetricCardFloat ──────────────────────────────────────────────────────────

const METRIC_POS: Record<MetricCard['pos'], string> = {
  tr: 'top-4 right-4 sm:top-6 sm:-right-3 lg:-right-6',
  bl: 'bottom-4 left-4 sm:bottom-8 sm:-left-3 lg:-left-7',
  br: 'bottom-4 right-4 sm:bottom-6 sm:right-6',
};

const MetricCardFloat = React.forwardRef<
  HTMLDivElement,
  { metric: MetricCard; isDark: boolean; index: number }
>(function MetricCardFloat({ metric, isDark, index }, ref) {
  return (
    <motion.div
      ref={ref}
      key={`${metric.label}-${metric.value}`}
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        opacity: { duration: 0.4, ease: EASE, delay: 0.12 + index * 0.08 },
        scale: { duration: 0.4, ease: EASE, delay: 0.12 + index * 0.08 },
        y: { duration: 5 + index, ease: 'easeInOut', repeat: Infinity, delay: index * 0.6 },
      }}
      className={cn('absolute z-[2] rounded-2xl px-3.5 py-2.5', METRIC_POS[metric.pos])}
      style={{
        background: isDark ? 'rgba(20,20,28,0.72)' : 'rgba(255,255,255,0.78)',
        border: '1px solid var(--hairline-strong)',
        backdropFilter: 'blur(16px) saturate(140%)',
        WebkitBackdropFilter: 'blur(16px) saturate(140%)',
        boxShadow: isDark
          ? '0 18px 40px -18px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)'
          : '0 18px 40px -20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.9)',
      }}
    >
      <div className="flex items-center gap-2">
        <span className="font-serif text-[16px] font-semibold leading-none tracking-[-0.01em] text-[var(--fg-primary)] tabular-nums">
          {metric.value}
        </span>
        {metric.delta && (
          <span
            className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
            style={{ background: 'rgba(34,197,94,0.14)', color: 'var(--ok)' }}
          >
            {metric.delta}
          </span>
        )}
      </div>
      <div className="mt-1 font-mono text-[10px] tracking-[0.04em] text-[var(--fg-tertiary)]">{metric.label}</div>
    </motion.div>
  );
});

// ─── VideoPlaceholder + canvas (right column) ─────────────────────────────────

function VideoCanvas({ feature, isDark }: { feature: ExploreShowCase; isDark: boolean }) {
  return (
    <div className="relative">
      {/* radial brand glow behind the canvas */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-[1]"
        style={{
          background: `radial-gradient(60% 55% at 60% 40%, rgba(220,47,101,${isDark ? 0.18 : 0.1}) 0%, transparent 70%)`,
          filter: 'blur(8px)',
        }}
      />

      {/* floating canvas — large radius, soft shadow, no browser chrome */}
      <div
        className="relative overflow-visible rounded-[32px] p-2.5 sm:p-3"
        style={{
          background: isDark
            ? 'linear-gradient(155deg, rgba(24,24,33,0.9) 0%, rgba(12,12,18,0.96) 100%)'
            : 'linear-gradient(155deg, #ffffff 0%, #fdf3f8 100%)',
          border: '1px solid var(--hairline-strong)',
          boxShadow: isDark
            ? '0 40px 90px -45px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 40px 90px -45px rgba(129,49,75,0.35), inset 0 1px 0 rgba(255,255,255,0.9)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {/* 16:10 canvas — shows feature image or gradient fallback */}
            <div
              className="relative aspect-[16/10] w-full overflow-hidden rounded-[24px]"
              style={{
                background: isDark
                  ? 'radial-gradient(120% 100% at 50% 0%, rgba(220,47,101,0.16) 0%, rgba(18,18,26,0.4) 55%), linear-gradient(160deg, rgba(40,18,30,0.6), rgba(14,14,20,0.9))'
                  : 'radial-gradient(120% 100% at 50% 0%, rgba(255,138,180,0.35) 0%, rgba(255,255,255,0) 55%), linear-gradient(160deg, #fff4f9, #f3f3fb)',
                border: '1px solid var(--hairline)',
              }}
            >
              {feature.image ? (
                <>
                  {/* hero image — object-cover so it always fills the 16:10 box */}
                  <img
                    src={feature.image}
                    alt={`${feature.label} preview`}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                </>
              ) : (
                <>
                  {/* subtle grid texture (fallback when no image) */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.5]"
                    style={{
                      backgroundImage: isDark
                        ? 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)'
                        : 'linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                      maskImage: 'radial-gradient(ellipse 80% 80% at 50% 45%, #000 30%, transparent 80%)',
                      WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 45%, #000 30%, transparent 80%)',
                    }}
                  />
                  {/* play overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <button
                      aria-label={`Play ${feature.label} walkthrough`}
                      className="group flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #ff5a8e 0%, #d33568 100%)',
                        boxShadow: '0 14px 36px -10px rgba(220,47,101,0.65), 0 0 0 8px rgba(220,47,101,0.12)',
                      }}
                    >
                      <Play size={22} className="ml-0.5 text-white" fill="white" strokeWidth={0} />
                    </button>
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--fg-tertiary)]">
                      Video coming soon
                    </span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* metric cards float over the canvas, re-keyed per feature */}
        <AnimatePresence mode="popLayout">
          {feature.metrics.map((m, i) => (
            <MetricCardFloat key={`${feature.id}-${m.pos}`} metric={m} isDark={isDark} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── ExploreShowcase ──────────────────────────────────────────────────────────

export function ExploreShowcase({ features }: { features: ExploreShowCase[] }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [activeId, setActiveId] = useState(features[0].id);
  const feature = features.find((f) => f.id === activeId) ?? features[0];

  return (
    <section className="relative overflow-hidden border-b border-[var(--hairline)] py-16 sm:py-20 md:py-24 lg:py-28">
      {/* subtle vertical gradient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, var(--bg) 0%, rgba(30,12,22,0.35) 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #fff8fc 100%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">
        {/* Header */}
        <div className="mx-auto mb-10 flex max-w-[800px] flex-col items-center gap-5 text-center sm:mb-12 lg:mb-14">
          <EyebrowPill label={'Platform overview'} textSize='text-[0.75rem]'>
          </EyebrowPill>
          {/* <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent-bright)]"
            style={{ background: 'rgba(220,47,101,0.10)', border: '1px solid rgba(220,47,101,0.22)' }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" style={{ boxShadow: '0 0 8px rgba(220,47,101,0.7)' }} />
            Platform overview
          </span> */}
          <h2 className="m-0 font-serif text-[clamp(32px,5vw,52px)] font-semibold leading-[1.08] tracking-[-0.025em] text-[var(--fg-primary)] text-balance">
            Explore how WhiteBooks powers your business
          </h2>
          <p className="m-0 max-w-[660px] text-[16px] leading-[1.6] text-[var(--fg-secondary)] sm:text-[17px]">
            From invoicing and GST filing to purchases, expenses and bank reconciliation — everything stays connected in one place.
          </p>
        </div>

        {/* Pills */}
        <div className="mb-12 sm:mb-14 lg:mb-16">
          <FeaturePills features={features} active={activeId} onChange={setActiveId} />
        </div>

        {/* Asymmetric split — content 40 / canvas 60. On mobile the canvas
            comes first (order-1) so users see the visual before the copy. */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14 xl:gap-20">
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <FeatureContent key={feature.id} feature={feature} />
            </AnimatePresence>
          </div>
          <div className="order-1 lg:order-2">
            <VideoCanvas feature={feature} isDark={isDark} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExploreShowcase;
