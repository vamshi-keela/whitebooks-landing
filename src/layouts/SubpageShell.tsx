import React, { useState } from 'react';
import Icon from '@/components/icons/Icon';
import { ButtonLink } from '@/components/ui/Button';
import { Header, Footer, FluidBackground, Eyebrow, Breadcrumb } from '@/layouts/SiteShell';
import { useReveal } from '@/hooks/useReveal';
import type { HeaderMode, BreadcrumbItem, FaqItem } from '@/types/components';
import type {
  HeroDef,
  ProblemDef,
  FeaturesDef,
  FeatureItem,
  IntegrationsDef,
  AiDef,
  PricingDef,
  PricingTier,
  FaqDef,
  ClosingDef,
} from '@/types/page-registry';

// ── SubHero ──────────────────────────────────────────────────────────────────

export function SubHero({
  eyebrow,
  title,
  sub,
  primaryCta,
  secondaryCta,
  micro,
  visual,
}: HeroDef) {
  return (
    <section className="wb-subhero">
      <FluidBackground />
      <div className="wb-wrap wb-hero-inner">
        <div className="wb-subhero-grid">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="wb-display">{title}</h1>
            <p className="wb-subhero-sub">{sub}</p>
            <div className="wb-subhero-cta">
              {primaryCta && (
                <ButtonLink href={primaryCta.href ?? '#'} size="lg" arrow>
                  {primaryCta.label}
                </ButtonLink>
              )}
              {secondaryCta && (
                <ButtonLink href={secondaryCta.href ?? '#'} variant="ghost" size="lg">
                  {secondaryCta.label}
                </ButtonLink>
              )}
            </div>
            {micro && (
              <p
                className="wb-subhero-micro"
                dangerouslySetInnerHTML={{ __html: micro }}
              />
            )}
          </div>
          {visual && <div className="wb-subhero-visual">{visual}</div>}
        </div>
      </div>
    </section>
  );
}

// ── PlainSection ─────────────────────────────────────────────────────────────

interface PlainSectionProps {
  label?: string;
  heading?: React.ReactNode;
  sub?: React.ReactNode;
  children?: React.ReactNode;
}

export function PlainSection({ label, heading, sub, children }: PlainSectionProps) {
  return (
    <section className="wb-section wb-reveal" data-reveal>
      <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
        {label && <p className="wb-section-label">{label}</p>}
        {heading && <h2 className="wb-h2">{heading}</h2>}
        {sub && <p className="wb-section-sub">{sub}</p>}
        {children}
      </div>
    </section>
  );
}

// ── ColumnGrid ───────────────────────────────────────────────────────────────

interface ColumnItem {
  title: string;
  body: React.ReactNode;
}

interface ColumnGridProps {
  items: ColumnItem[];
  cols?: 2 | 3;
}

export function ColumnGrid({ items, cols = 3 }: ColumnGridProps) {
  const cls = cols === 2 ? 'wb-col-2' : 'wb-col-3';
  return (
    <div className={cls}>
      {items.map((it, i) => (
        <article key={i} className="wb-block">
          <h3>{it.title}</h3>
          <p>{it.body}</p>
        </article>
      ))}
    </div>
  );
}

// ── FeatureGrid ──────────────────────────────────────────────────────────────

interface FeatureGridProps {
  items: FeatureItem[];
}

export function FeatureGrid({ items }: FeatureGridProps) {
  return (
    <div className="wb-col-2">
      {items.map((it, i) => (
        <article key={i} className="wb-block">
          <h3>
            {it.endpoint ? (
              <span className="endpoint">{it.endpoint}</span>
            ) : (
              it.title
            )}
          </h3>
          {it.endpoint && it.title && (
            <p
              style={{
                marginTop: 6,
                fontFamily: 'var(--font-display)',
                fontSize: 14,
                color: 'var(--text)',
              }}
            >
              {it.title}
            </p>
          )}
          <p>{it.body}</p>
        </article>
      ))}
    </div>
  );
}

// ── IntegrationStrip ─────────────────────────────────────────────────────────

interface IntegrationStripProps {
  logos: string[];
}

export function IntegrationStrip({ logos }: IntegrationStripProps) {
  return (
    <div className="wb-int-logos">
      {logos.map((l, i) => (
        <span key={i} className="wb-int-chip">
          {l}
        </span>
      ))}
    </div>
  );
}

// ── PricingTiers ─────────────────────────────────────────────────────────────

interface PricingTiersProps {
  tiers: PricingTier[];
  note?: string;
}

export function PricingTiers({ tiers, note }: PricingTiersProps) {
  return (
    <React.Fragment>
      <div className="wb-tier-grid">
        {tiers.map((t, i) => (
          <div key={i} className={`wb-tier ${t.featured ? 'featured' : ''}`}>
            <span className="wb-tier-name">{t.name}</span>
            <div className="wb-tier-price">
              {t.price}
              {t.cycle && <span className="wb-tier-cycle">{t.cycle}</span>}
            </div>
            <ul className="wb-tier-points">
              {t.points.map((p, j) => (
                <li key={j}>{p}</li>
              ))}
            </ul>
            <div className="wb-tier-cta">
              <ButtonLink href="#" variant={t.featured ? 'primary' : 'ghost'} arrow>
                {t.cta || 'Get started'}
              </ButtonLink>
            </div>
          </div>
        ))}
      </div>
      {note && <p className="wb-tier-note">{note}</p>}
    </React.Fragment>
  );
}

// ── FaqList ──────────────────────────────────────────────────────────────────

interface FaqListProps {
  items: FaqItem[];
}

export function FaqList({ items }: FaqListProps) {
  const [open, setOpen] = useState(0);
  return (
    <div className="wb-faq">
      {items.map((it, i) => (
        <div key={i} className={`wb-faq-item ${open === i ? 'is-open' : ''}`}>
          <button
            className="wb-faq-q"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
          >
            <span>{it.q}</span>
            <span className="wb-faq-icon">+</span>
          </button>
          <div className="wb-faq-a">{it.a}</div>
        </div>
      ))}
    </div>
  );
}

// ── SubClose ─────────────────────────────────────────────────────────────────

export function SubClose({ h2, body, primaryCta, secondaryCta }: ClosingDef) {
  return (
    <section className="wb-subclose wb-reveal" data-reveal id="book-demo">
      <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4 wb-subclose-inner">
        <h2 className="wb-display">{h2}</h2>
        <p className="wb-subclose-body">{body}</p>
        <div className="wb-subclose-cta">
          {primaryCta && (
            <ButtonLink href={primaryCta.href ?? '#'} size="lg" arrow>
              {primaryCta.label}
            </ButtonLink>
          )}
          {secondaryCta && (
            <ButtonLink href={secondaryCta.href ?? '#'} variant="ghost" size="lg">
              {secondaryCta.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}

// ── SubPage ──────────────────────────────────────────────────────────────────

interface SubPageProps {
  headerMode: HeaderMode;
  breadcrumb?: BreadcrumbItem[];
  hero: HeroDef;
  problem?: ProblemDef;
  features?: FeaturesDef;
  integrations?: IntegrationsDef;
  ai?: AiDef;
  pricing?: PricingDef;
  faq?: FaqDef;
  closing?: ClosingDef;
  extra?: React.ReactNode;
}

export function SubPage({
  headerMode,
  breadcrumb,
  hero,
  problem,
  features,
  integrations,
  ai,
  pricing,
  faq,
  closing,
  extra,
}: SubPageProps) {
  useReveal();

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header mode={headerMode} />
      <main>
        <section style={{ paddingTop: 100, paddingBottom: 0 }}>
          <div className="wb-wrap">
            {breadcrumb && <Breadcrumb items={breadcrumb} />}
          </div>
        </section>

        <SubHero {...hero} />

        {problem && (
          <PlainSection label="The problem" heading={problem.heading}>
            <ColumnGrid
              items={problem.items}
              cols={problem.items.length === 2 ? 2 : 3}
            />
          </PlainSection>
        )}

        {features && (
          <PlainSection label={features.label ?? 'What it does'} heading={features.heading}>
            <FeatureGrid items={features.items} />
          </PlainSection>
        )}

        {extra}

        {integrations && (
          <PlainSection
            label="Integrations"
            heading={integrations.heading}
            sub={integrations.body}
          >
            <IntegrationStrip logos={integrations.logos} />
            <div className="mt-7 flex flex-wrap gap-4">
              {integrations.cta && (
                <ButtonLink href={integrations.cta.href ?? '#'} variant="ghost" arrow>
                  {integrations.cta.label}
                </ButtonLink>
              )}
              {integrations.secondaryCta && (
                <ButtonLink href={integrations.secondaryCta.href ?? '#'} variant="ghost" arrow>
                  {integrations.secondaryCta.label}
                </ButtonLink>
              )}
            </div>
          </PlainSection>
        )}

        {ai && (
          <section className="wb-ai-section wb-section wb-reveal" data-reveal>
            <div className="wb-dot-bg" aria-hidden="true"></div>
            <div className="wb-wrap" style={{ position: 'relative', zIndex: 1 }}>
              <p className="wb-section-label">The AI layer</p>
              <h2 className="wb-h2">{ai.heading}</h2>
              <div className={ai.items.length === 3 ? 'wb-col-3' : 'wb-col-2'}>
                {ai.items.map((it, i) => (
                  <article key={i} className="wb-ai-card">
                    <div className="wb-ai-card-num">
                      {String(i + 1).padStart(2, '0')} · AI
                    </div>
                    <h3 className="wb-ai-title">{it.title}</h3>
                    <p className="wb-ai-body">{it.body}</p>
                  </article>
                ))}
              </div>
              {ai.note && <div className="wb-ai-footnote">{ai.note}</div>}
            </div>
          </section>
        )}

        {pricing && (
          <PlainSection
            label="Pricing"
            heading={pricing.heading ?? 'Pricing'}
            sub={pricing.body}
          >
            <PricingTiers tiers={pricing.tiers} note={pricing.note} />
            {pricing.cta && (
              <div className="mt-7">
                <ButtonLink href={pricing.cta.href ?? '#'} variant="ghost" arrow>
                  {pricing.cta.label}
                </ButtonLink>
              </div>
            )}
          </PlainSection>
        )}

        {faq && (
          <PlainSection
            label="FAQ"
            heading={faq.heading ?? 'Frequently asked questions.'}
          >
            <FaqList items={faq.items} />
          </PlainSection>
        )}

        {closing && <SubClose {...closing} />}
      </main>
      <Footer />
    </div>
  );
}
