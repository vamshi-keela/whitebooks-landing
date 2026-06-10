import React from 'react';
import { Header, Footer, Breadcrumb } from '@/layouts/SiteShell';
import { useReveal } from '@/hooks/useReveal';
import EyebrowPill from '@/components/ui/EyebrowPill';

const wrap = "w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4";

export interface LegalSectionDef {
  heading: string;
  body: React.ReactNode;
}

interface LegalLayoutProps {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  updated?: string;
  sections: LegalSectionDef[];
  breadcrumbLabel: string;
}

export function LegalLayout({ eyebrow, title, intro, updated, sections, breadcrumbLabel }: LegalLayoutProps) {
  useReveal();

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header mode="resources" />
      <main>
        {/* Breadcrumb */}
        <section className="pt-[100px] pb-0">
          <div className={wrap}>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: breadcrumbLabel }]} />
          </div>
        </section>

        {/* Hero */}
        <section className="pt-[40px] pb-[48px]">
          <div className={wrap}>
            <EyebrowPill label={eyebrow} />
            <h1
              className="[font-family:var(--font-display)] font-medium leading-[1.08] tracking-[-0.02em] mt-[18px] max-w-[820px] text-[var(--text)]"
              style={{ fontSize: 'clamp(34px, 4.6vw, 54px)' }}
            >
              {title}
            </h1>
            {intro && (
              <p className="mt-[18px] max-w-[700px] text-[16px] text-[var(--muted-2)] leading-[1.6]">
                {intro}
              </p>
            )}
            {updated && (
              <p className="mt-3 text-xs text-[var(--muted)] uppercase tracking-widest">{updated}</p>
            )}
          </div>
        </section>

        {/* Content */}
        <section className="pb-[100px] max-sm:pb-[64px]">
          <div className={`${wrap} max-w-[880px]`}>
            {sections.map((s, i) => (
              <div
                key={i}
                data-reveal
                className="pt-8 pb-8 border-t border-[var(--line)] first:border-t-0 first:pt-0"
              >
                <h2 className="[font-family:var(--font-display)] font-medium text-[22px] max-sm:text-[19px] tracking-[-0.01em] text-[var(--text)] mb-3">
                  {s.heading}
                </h2>
                <div className="text-[15px] text-[var(--muted-2)] leading-[1.7] [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_li]:mb-1.5">
                  {s.body}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
