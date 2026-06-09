import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/icons/Icon';
import { Button } from '@/components/ui/Button';
import { SiteLogo } from '@/components/ui/SiteLogo';
import { NavDropdown } from '@/components/nav/NavDropdown';
import { MobileNavGroup } from '@/components/nav/MobileNavGroup';
import { SOFT_ITEMS, API_ITEMS, SERVICES_ITEMS, RESOURCES_ITEMS, TOOLS_ITEMS } from '@/components/nav/navConfig';
import type { HeaderMode } from '@/types/components';
import homeIcon from '@/assets/home.svg';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { BookDemoModal } from '@/components/modals/BookDemoModal';

interface HeaderProps {
  mode?: HeaderMode;
}

function AccountDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Account"
        className="flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--line-2)] bg-[var(--bg-elev)] text-[var(--muted-2)] hover:text-[var(--text)] hover:bg-[var(--bg-3)] hover:border-[var(--line-2)] transition-all duration-150"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-44 rounded-xl border border-[var(--line-2)] bg-[var(--bg-3)] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] overflow-hidden z-50">
          <div className="px-1.5 pb-1.5 pl-1.5 flex flex-col gap-0.5">
            <a
              href="https://accounts.whitebooks.in/signupall"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[var(--text)] hover:bg-[var(--bg-2)] transition-colors duration-100 no-underline"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--muted-2)]">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
              <span className="font-medium">Sign up</span>
            </a>
            <a
              href="https://accounts.whitebooks.in/login"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[var(--text)] hover:bg-[var(--bg-2)] transition-colors duration-100 no-underline"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--muted-2)]">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              <span className="font-medium">Sign in</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function ContactUsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <Button variant='primary'
        onClick={() => setOpen(v => !v)}
        className="hidden min-[1100px]:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-medium text-[var(--muted-2)] hover:text-[var(--text)] hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all duration-150"
      >
        <Icon.Phone />
        Contact Us
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </Button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-60 rounded-xl border border-[var(--line-2)] bg-[var(--bg-3)] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] overflow-hidden z-50">
          <div className="px-3 border-b border-[var(--line)]">
            <p className="text-[10px] font-medium text-[var(--muted)] tracking-wider uppercase">Get in touch</p>
          </div>
          <div className="px-3 flex flex-col gap-0">
            <div className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[var(--bg-2)] transition-colors duration-100">
              <div className="mt-0.5 w-7 h-7 rounded-md bg-[var(--brand-soft)] border border-[var(--brand-border)] flex items-center justify-center shrink-0">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.86 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-medium text-[var(--muted)] mb-0.5">Support Team</p>
                <a href="tel:+919032111388" className="text-sm font-semibold text-[var(--text)] hover:text-[var(--brand)] transition-colors duration-100 no-underline">
                  +91 90321 11388
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[var(--bg-2)] transition-colors duration-100">
              <div className="mt-0.5 w-7 h-7 rounded-md bg-[rgba(99,102,241,0.12)] border border-[rgba(99,102,241,0.25)] flex items-center justify-center shrink-0">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-medium text-[var(--muted)] mb-0.5">Sales Team</p>
                <a href="tel:+919032111788" className="text-sm font-semibold text-[var(--text)] hover:text-[var(--brand)] transition-colors duration-100 no-underline">
                  +91 90321 11788
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export function Header({ mode = 'home' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (demoOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [demoOpen]);

  const isSoft = mode === 'softwares';
  const isApi = mode === 'apis';
  const isHome = mode === 'home';
  const isServices = mode === 'services';
  const isResources = mode === 'resources';

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[var(--header-bg)] [backdrop-filter:blur(14px)_saturate(140%)] [-webkit-backdrop-filter:blur(14px)_saturate(140%)] border-b border-[var(--line)]"
        style={scrolled ? { boxShadow: '0 1px 0 rgba(255,255,255,0.04), 0 10px 30px -20px rgba(0,0,0,0.8)' } : undefined}
      >
        <div className="w-full mx-auto px-2 sm:px-3 md:px-5 lg:px-8 grid grid-cols-[1fr_auto_1fr] items-center h-16 max-[760px]:gap-x-[10px]">
          <SiteLogo />

          <div>
            <div className="hidden min-[1100px]:inline-flex border-solid border-1 border-[var(--line-2)] rounded-full p-1 gap-1 mx-2">
              <Link
                role="tab"
                to="/"
                className={`group py-[7px] px-[18px] rounded-full text-[13.5px] font-medium tracking-[0.005em] transition-all duration-[180ms] inline-flex items-center gap-2 cursor-pointer max-[760px]:py-[6px] max-[760px]:px-3 max-[760px]:text-[12.5px] ${isHome
                  ? 'bg-[var(--brand)] text-white shadow-[0_6px_18px_-6px_rgba(220,47,101,0.55)] hover:bg-[var(--brand)]'
                  : 'text-[var(--muted-2)] hover:text-[var(--text)] hover:bg-[rgba(220,47,101,0.08)]'
                  }`}
              >
                <img
                  src={homeIcon}
                  className={`w-4 h-4 transition-[filter] duration-[180ms] ${isHome
                    ? '[filter:brightness(0)_invert(1)]'
                    : '[filter:brightness(0)_saturate(100%)_invert(67%)_sepia(8%)_saturate(453%)_hue-rotate(199deg)_brightness(87%)_contrast(92%)] group-hover:[filter:brightness(0)_invert(1)_opacity(0.85)]'
                    }`}
                  alt="home"
                />
              </Link>
            </div>

            <div className="hidden min-[1100px]:inline-flex border-solid border-1 border-[var(--line-2)] rounded-full p-1 gap-0.5">
              <NavDropdown
                label="Softwares"
                triggerIcon={<Icon.Box />}
                hubHref="/softwares"
                items={SOFT_ITEMS}
                isActive={isSoft}
              />
              <NavDropdown
                label="APIs"
                triggerIcon={<Icon.Code />}
                hubHref="/apis"
                items={API_ITEMS}
                isActive={isApi}
              />
              <NavDropdown
                label="Services"
                triggerIcon={<Icon.Box />}
                hubHref="/services"
                items={SERVICES_ITEMS}
                isActive={isServices}
              />
              <NavDropdown
                label="Resources"
                triggerIcon={<Icon.Code />}
                hubHref="/resources/partners"
                items={RESOURCES_ITEMS}
                isActive={isResources}
                secondaryGroup={{ label: 'Tools', items: TOOLS_ITEMS }}
              />
            </div>
          </div>

          <div className="flex items-center gap-[14px] justify-self-end pl-10">
            <ThemeToggle size={32} />
            <AccountDropdown />
            <ContactUsDropdown />
            {/* <Button
              onClick={() => setDemoOpen(true)}
              className="hidden sm:inline-flex"
            >
              Book a 20-min Demo
            </Button> */}

            <button
              className="min-[1100px]:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] bg-transparent border-none outline-none"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-[var(--text)] transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block w-5 h-0.5 bg-[var(--text)] transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-[var(--text)] transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="min-[1100px]:hidden border-t border-[var(--line)] bg-[var(--bg)] px-5 py-4 flex flex-col gap-3 overflow-y-auto max-h-[calc(100svh-4rem)]">
            <MobileNavGroup label="Softwares" icon={<Icon.Box />} items={SOFT_ITEMS} onNavigate={() => setMenuOpen(false)} />
            <MobileNavGroup label="APIs" icon={<Icon.Code />} items={API_ITEMS} onNavigate={() => setMenuOpen(false)} />
            <MobileNavGroup label="Services" icon={<Icon.Box />} items={SERVICES_ITEMS} onNavigate={() => setMenuOpen(false)} />
            <MobileNavGroup label="Resources" icon={<Icon.Code />} items={RESOURCES_ITEMS} onNavigate={() => setMenuOpen(false)} secondaryGroup={{ label: 'Tools', items: TOOLS_ITEMS }} />
            <div className="flex flex-col gap-1.5 pt-1 border-t border-[var(--line)]">
              <p className="text-[10px] font-medium text-[var(--muted)] tracking-wider uppercase px-1 pt-1">Contact Us</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[var(--bg-elev)] border border-[var(--line)]">
                  <div className="w-7 h-7 rounded-md bg-[var(--brand-soft)] border border-[var(--brand-border)] flex items-center justify-center shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.86 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-[var(--muted)] mb-0.5">Support Team</p>
                    <a href="tel:+919032111388" className="text-sm font-semibold text-[var(--text)] no-underline">+91 90321 11388</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[var(--bg-elev)] border border-[var(--line)]">
                  <div className="w-7 h-7 rounded-md bg-[rgba(99,102,241,0.12)] border border-[rgba(99,102,241,0.25)] flex items-center justify-center shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-[var(--muted)] mb-0.5">Sales Team</p>
                    <a href="tel:+919032111788" className="text-sm font-semibold text-[var(--text)] no-underline">+91 90321 11788</a>
                  </div>
                </div>
              </div>
            </div>
            <Button onClick={() => { setMenuOpen(false); setDemoOpen(true); }} className="mt-1 w-full">
              Book a 20-min Demo
            </Button>
            <div className="flex flex-col gap-2 pt-2 border-t border-[var(--line)]">
              <a href="https://accounts.whitebooks.in/signupall" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-[var(--text)] bg-[var(--bg-elev)] border border-[var(--line)] no-underline font-medium">
                Sign up
              </a>
              <a href="https://accounts.whitebooks.in/login" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-[var(--muted-2)] no-underline">
                Sign in
              </a>
            </div>
          </div>
        )}
      </header>

      {demoOpen && <BookDemoModal onClose={() => setDemoOpen(false)} />}
    </>
  );
}
