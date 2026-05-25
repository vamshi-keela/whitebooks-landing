import React, { useState, useEffect, ReactNode } from 'react';
import { Icon, Box, Code } from '@/components/icons/Icon';
import type { HeaderMode, BreadcrumbItem } from '@/types/components';
import wbLogo from "@/assets/logo-white-books.svg"
import homeIcon from "@/assets/home.svg"
// ── Header ──────────────────────────────────────────────────────────────────

interface HeaderProps {
  mode?: HeaderMode;
}

interface MobileNavProps {
  href: string
  icon: ReactNode
  children: ReactNode
}

export function Header({ mode = 'home' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isSoft = mode === 'softwares';
  const isApi = mode === 'apis';
  const isHome = mode === 'home';

  return (
    <header
      className="wb-header"
      style={
        scrolled
          ? {
            boxShadow:
              '0 1px 0 rgba(255,255,255,0.04), 0 10px 30px -20px rgba(0,0,0,0.8)',
          }
          : undefined
      }
    >
      <div className="wb-wrap wb-header-row">
        <a href="Whitebooks Homepage.html" className="flex items-center gap-2.5 font-display font-bold text-[17px] tracking-[-0.01em] text-[#e8e8f0] shrink-0" aria-label="Whitebooks">
          <img
            src={wbLogo}
            alt="whitebooks logo"
            className="w-[90px] h-auto sm:w-[117px]"
          />
        </a>
        <div>

          <div className="hidden sm:inline-flex border-solid border-1 border-white/10 rounded-full p-1 gap-1 mx-2">
            <a
              role="tab"
              href="Whitebooks Homepage.html"
              className={`wb-toggle-btn ${isHome ? 'is-active' : ''}`}
            >
              <img src={homeIcon} className={'w-4 h-4 home-icon'} alt="home" />
            </a>
          </div>
          <div className="hidden sm:inline-flex border-solid border-1 border-white/10 rounded-full p-1 gap-0.5">
            <a
              role="tab"
              aria-selected={isSoft}
              href="Softwares.html"
              className={`wb-toggle-btn ${isSoft ? 'is-active' : ''}`}
            >
              <Icon.Box /> Softwares
            </a>
            <a
              role="tab"
              aria-selected={isApi}
              href="APIs.html"
              className={`wb-toggle-btn ${isApi ? 'is-active' : ''}`}
            >
              <Icon.Code /> APIs
            </a>
          </div>
        </div>

        <div className="wb-header-right">
          <a className="wb-btn wb-btn-outline hidden sm:inline-flex" href="#book-demo">
            Book a demo
          </a>


          {/* Hamburger — mobile only */}
          <button
            className="sm:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] bg-transparent border-none outline-none"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-[#e8e8f0] transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#e8e8f0] transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#e8e8f0] transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-white/[0.06] bg-[rgba(10,10,15,0.95)] px-5 py-4 flex flex-col gap-3">
          <MobileNav href="Softwares.html" icon={<Box />}>Softwares · 5 products</MobileNav>
          <MobileNav href="APIs.html" icon={<Code />}>APIs · 4 products</MobileNav>
          <a
            href="#book-demo"
            className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm bg-[#dc2f65] text-white"
            onClick={() => setMenuOpen(false)}
          >
            Book a demo
          </a>
        </div>
      )}
    </header>
  );
}

function MobileNav({ href, icon, children }: MobileNavProps) {
  return (
    <a
      href={href}
      className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-[#9a9ab0] hover:text-[#e8e8f0] hover:bg-white/[0.04] transition-colors"
    >
      <span className="text-[#dc2f65]">{icon}</span>
      {children}
    </a>
  )
}
// ── Footer ───────────────────────────────────────────────────────────────────

interface FooterColItem {
  label: string;
  href?: string;
}

function FooterCol({ title, items }: { title: string; items: FooterColItem[] }) {
  return (
    <div className="wb-footer-col">
      <h4>{title}</h4>
      <ul>
        {items.map((it, i) => (
          <li key={i}>
            <a href={it.href ?? '#'}>{it.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="wb-footer">
      <div className="wb-wrap">
        <div className="wb-footer-grid">
          <div className="wb-footer-col">
            <a href="Whitebooks Homepage.html" className="wb-brand" aria-label="Whitebooks">
              <span className="wb-brand-mark" aria-hidden="true"></span>
              <span>Whitebooks</span>
            </a>
            <p className="wb-footer-brand-blurb">
              A GST Suvidha Provider licensed by GSTN, building India's AI-native compliance
              infrastructure.
            </p>
          </div>

          <FooterCol
            title="Softwares"
            items={[
              { label: 'Accounting', href: 'Software - Accounting.html' },
              { label: 'GST', href: 'Software - GST.html' },
              { label: 'e-Invoice', href: 'Software - e-Invoice.html' },
              { label: 'e-Way Bill', href: 'Software - e-Way Bill.html' },
              { label: 'KSA e-Invoicing', href: 'Software - KSA e-Invoicing.html' },
            ]}
          />

          <FooterCol
            title="APIs"
            items={[
              { label: 'GST API', href: 'API - GST.html' },
              { label: 'e-Invoice API', href: 'API - e-Invoice.html' },
              { label: 'e-Way Bill API', href: 'API - e-Way Bill.html' },
              { label: 'KSA e-Invoice API', href: 'API - KSA e-Invoice.html' },
            ]}
          />

          <FooterCol
            title="Company"
            items={[
              { label: 'About' },
              { label: 'Customers' },
              { label: 'Partners' },
              { label: 'Careers' },
              { label: 'Contact' },
            ]}
          />

          <FooterCol
            title="Resources"
            items={[
              { label: 'Pricing' },
              { label: 'Blog' },
              { label: 'Migration guide' },
              { label: 'Compliance calendar' },
              { label: 'API status' },
            ]}
          />
        </div>

        <div className="wb-footer-legal">
          <span>
            Whitebooks is a product of BVM IT Consulting Services India Pvt. Ltd. — a GSP licensed
            by GSTN, Government of India.
          </span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
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
      <svg
        width="0"
        height="0"
        style={{ position: 'absolute' }}
        aria-hidden="true"
      >
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
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={120}
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feGaussianBlur stdDeviation={14} />
          </filter>
          <linearGradient id="wb-stream-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8aa8" stopOpacity={0} />
            <stop offset="50%" stopColor="#ff5a8d" stopOpacity={0.9 * gradientOpacity} />
            <stop offset="100%" stopColor="#dc2f65" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="wb-stream-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffb786" stopOpacity={0} />
            <stop offset="50%" stopColor="#ff7a9d" stopOpacity={0.7 * gradientOpacity} />
            <stop offset="100%" stopColor="#dc2f65" stopOpacity={0} />
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
            style={{
              animationDelay: '-7s',
              animationDuration: '16s',
              strokeDasharray: '4 22',
            }}
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
          {it.href ? <a href={it.href}>{it.label}</a> : <span>{it.label}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}
