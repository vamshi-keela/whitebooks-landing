import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/icons/Icon';
import { Plug, ArrowRight, Bug } from 'lucide-react';
import { Button, ButtonLink } from '@/shared/ui/Button';
import { SiteLogo } from '@/shared/ui/SiteLogo';
import { NavDropdown } from '@/components/nav/NavDropdown';
import { MobileNavGroup } from '@/components/nav/MobileNavGroup';
import { SOFT_ITEMS, API_ITEMS, SERVICES_ITEMS, RESOURCES_ITEMS, TOOLS_ITEMS, API_DEVELOPER_ITEMS, CONNECTOR_GROUPS } from '@/components/nav/navConfig';
import type { HeaderMode } from '@/shared/types/components';
import homeIcon from '@/assets/home.svg';
import { ThemeToggle } from '@/shared/ui/ThemeToggle';
import { BookDemoModal } from '@/components/modals/BookDemoModal';
import { DEV_SIGNUP_URL, SIGNUP_ALL_URL, LOGIN_URL } from '@/utils/contants';

interface HeaderProps {
  mode?: HeaderMode;
}

export function AuthButtons({ cardType = 'All', className = '' }: { className?: string, cardType?: ContactCardType }) {
  return (
    <div className={`flex items-center gap-2 ${className}`.trim()}>
      <ButtonLink
        href="https://accounts.whitebooks.in/login"
        rel="noopener noreferrer"
        variant="secondary"
        size="sm"
      >
        Sign in
      </ButtonLink>
      <ButtonLink
        href={cardType === 'API Team' ? DEV_SIGNUP_URL : SIGNUP_ALL_URL}
        rel="noopener noreferrer"
        variant="primary"
        size="sm"
      >
        Sign up
      </ButtonLink>
    </div>
  );
}

type ContactRole = 'Sales' | 'Support';

interface ContactTeam {
  name: string;
  accent: 'brand' | 'indigo';
  icon: 'code' | 'desktop';
  contacts: { role: ContactRole; label: string; tel: string }[];
}

const CONTACT_TEAMS: ContactTeam[] = [
  {
    name: 'API Team',
    accent: 'brand',
    icon: 'code',
    contacts: [
      { role: 'Sales', label: '+91 81064 33737', tel: '+918106433737' },
      { role: 'Support', label: '+91 90321 11388', tel: '+919032111388' },
    ],
  },
  {
    name: 'Software Team',
    accent: 'indigo',
    icon: 'desktop',
    contacts: [
      { role: 'Sales', label: '+91 81065 31717', tel: '+918106531717' },
      { role: 'Support', label: '+91 90321 11788', tel: '+919032111788' },
    ],
  },
];

const ACCENT = {
  brand: { bg: 'bg-[var(--brand-soft)]', border: 'border-[var(--brand-border)]', stroke: 'var(--brand)' },
  indigo: { bg: 'bg-[rgba(99,102,241,0.12)]', border: 'border-[rgba(99,102,241,0.25)]', stroke: '#818cf8' },
} as const;

function TeamIcon({ icon, stroke }: { icon: ContactTeam['icon']; stroke: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icon === 'code' ? (
        <polyline points="16 18 22 12 16 6 8 18 2 12 8 6" />
      ) : (
        <>
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </>
      )}
    </svg>
  );
}

function RoleIcon({ role }: { role: ContactRole }) {
  return role === 'Support' ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.86 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function TeamCard({ team }: { team: ContactTeam }) {
  const accent = ACCENT[team.accent];
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2.5 px-2 pb-1">
        <div className={`w-8 h-8 rounded-lg ${accent.bg} border ${accent.border} flex items-center justify-center shrink-0`}>
          <TeamIcon icon={team.icon} stroke={accent.stroke} />
        </div>
        <p className="text-[15px] font-semibold text-[var(--text)]">{team.name}</p>
      </div>
      <div className="flex flex-col gap-0.5">
        {team.contacts.map((c) => (
          <a
            key={c.role}
            href={`tel:${c.tel}`}
            className="group flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[var(--bg-2)] transition-colors duration-100 no-underline"
          >
            <span className="w-7 h-7 rounded-md bg-[var(--bg-2)] text-[var(--muted-2)] group-hover:text-[var(--brand)] flex items-center justify-center shrink-0 transition-colors duration-100">
              <RoleIcon role={c.role} />
            </span>
            <span className="flex flex-col gap-0.5 leading-tight">
              <span className="text-[11px] font-semibold text-[var(--muted-2)] tracking-wide uppercase">{c.role}</span>
              <span className="text-[15px] font-semibold text-[var(--text)] group-hover:text-[var(--brand)] transition-colors duration-100">{c.label}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

type ContactCardType = 'API Team' | 'Software Team' | 'All';

export function ContactUsDropdown({ cardType = 'All' }: { cardType?: ContactCardType } = {}) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const show = () => { clearTimeout(timer.current); setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 150); };

  const teams = cardType === 'All'
    ? CONTACT_TEAMS
    : CONTACT_TEAMS.filter((team) => team.name === cardType);
  const single = teams.length === 1;

  return (
    <div className="hidden min-[1100px]:block relative" onMouseEnter={show} onMouseLeave={hide}>
      <Button variant='secondary' size='sm' type='button'>
        <Icon.Phone />
        Contact Us
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </Button>

      <div
        className={`absolute right-0 top-full pt-[6px] z-50 transition-all duration-150 ease-out
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className={`relative ${single ? 'w-[240px]' : 'w-[420px]'} rounded-xl border border-[var(--line-2)] bg-[var(--bg-3)] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] overflow-hidden transition-transform duration-150 ease-out ${open ? 'translate-y-0' : '-translate-y-1'}`}>
          {/* Column rule is drawn per-card, not with divide-x: preflight is off,
              so divide-x renders nothing without divide-solid, and divide-solid
              then styles all four sides at the UA default `medium` width. */}
          <div className={`grid ${single ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {teams.map((team, i) => (
              <div
                key={team.name}
                className={`p-3 ${i > 0 ? 'border-0 border-l border-solid border-[var(--line-2)]' : ''}`}
              >
                <TeamCard team={team} />
              </div>
            ))}
          </div>
          {/* Single (narrow) card stacks the footer so the helper text stays
              fully visible; the wide two-team card keeps it on one row. */}
          <div className={`flex px-4 py-3 border-t border-[var(--line)] bg-[var(--bg-2)] ${single ? 'flex-col items-stretch gap-2.5' : 'items-center justify-between gap-3'}`}>
            <div className="flex items-center gap-2 min-w-0">
              <Bug className="w-4 h-4 shrink-0 text-[var(--muted-2)]" strokeWidth={1.75} />
              <p className="text-[12.5px] font-medium text-[var(--muted-2)] whitespace-nowrap">Have an issue?</p>
            </div>
            <a
              href={LOGIN_URL}
              className={`group inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold text-[var(--brand)] bg-[rgba(220,47,101,0.10)] hover:bg-[var(--brand)] hover:text-white transition-colors duration-150 cursor-pointer ${single ? 'w-full justify-center' : ''}`}
            >
              Raise a ticket
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={2.25} />
            </a>
          </div>
        </div>
      </div>
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
            <div className="hidden min-[1100px]:inline-flex border-solid border-[1px] border-[var(--line-2)] rounded-full p-1 gap-0.5 mx-2">
              <Link
                role="tab"
                to="/"
                className={`group py-[7px] px-[18px] rounded-full text-[13.5px] font-medium tracking-[0.005em] transition-all duration-[180ms] inline-flex items-center gap-2 cursor-pointer max-[760px]:py-[6px] max-[760px]:px-3 max-[760px]:text-[12.5px] ${isHome
                  ? 'bg-[var(--brand)] text-[var(--text)] shadow-[0_6px_18px_-6px_rgba(220,47,101,0.55)] hover:bg-[var(--brand)]'
                  : 'text-[var(--muted-2)] hover:text-[var(--text)] hover:bg-[rgba(220,47,101,0.08)]'
                  }`}
              >
                <img
                  src={homeIcon}
                  className={`w-4 h-4 transition-[filter] duration-[180ms] ${isHome
                    ? '[filter:brightness(0)_invert(1)]'
                    : '[filter:brightness(0)_saturate(100%)_invert(67%)_sepia(8%)_saturate(453%)_hue-rotate(199deg)_brightness(87%)_contrast(92%)] '
                    }`}
                  alt="home"
                />
              </Link>
            </div>

            <div className="hidden min-[1100px]:inline-flex border-solid border-[1px] border-[var(--line-2)] rounded-full p-1 gap-0.5">
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
                secondaryGroup={{ label: 'API Guides', items: API_DEVELOPER_ITEMS }}
              />
              <NavDropdown
                label="Connectors"
                triggerIcon={<Plug size={15} strokeWidth={1.6} />}
                hubHref="/connectors/sap-e-invoicing"
                items={[]}
                isActive={false}
                groups={CONNECTOR_GROUPS}
              />
              <NavDropdown
                label="Resources"
                triggerIcon={<Icon.Resources />}
                hubHref="/resources/partners"
                items={RESOURCES_ITEMS}
                isActive={isResources}
                secondaryGroup={{ label: 'Tools', items: TOOLS_ITEMS }}
              />
            </div>
            <div className="hidden min-[1100px]:inline-flex border-solid border-[1px] border-[var(--line-2)] rounded-full p-1 gap-0.5 mx-2">
              <NavDropdown
                label="Services"
                triggerIcon={<Icon.Services />}
                hubHref="/services"
                items={[]}//{SERVICES_ITEMS}
                isActive={isServices}
              />
            </div>
          </div>

          <div className="flex items-center gap-[14px] justify-self-end pl-10">
            <ThemeToggle className='hidden min-[1100px]:inline-flex' size={32} />
            <AuthButtons />
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
            <MobileNavGroup label="Connectors" icon={<Icon.Code />} items={[]} onNavigate={() => setMenuOpen(false)} groups={CONNECTOR_GROUPS} />
            <MobileNavGroup label="Services" icon={<Icon.Services />} items={SERVICES_ITEMS} onNavigate={() => setMenuOpen(false)} />
            <MobileNavGroup label="Resources" icon={<Icon.Resources />} items={RESOURCES_ITEMS} onNavigate={() => setMenuOpen(false)} secondaryGroup={{ label: 'Tools', items: TOOLS_ITEMS }} />
            <div className="flex flex-col gap-2 pt-1 border-t border-[var(--line)]">
              <p className="text-[10px] font-medium text-[var(--muted)] tracking-wider uppercase px-1 pt-1">Contact Us</p>
              {CONTACT_TEAMS.map((team) => {
                const accent = ACCENT[team.accent];
                return (
                  <div key={team.name} className="rounded-lg bg-[var(--bg-elev)] border border-[var(--line)] p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-6 h-6 rounded-md ${accent.bg} border ${accent.border} flex items-center justify-center shrink-0`}>
                        <TeamIcon icon={team.icon} stroke={accent.stroke} />
                      </div>
                      <p className="text-[12px] font-semibold text-[var(--text)]">{team.name}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {team.contacts.map((c) => (
                        <a key={c.role} href={`tel:${c.tel}`} className="flex flex-col leading-tight no-underline">
                          <span className="text-[10px] font-medium text-[var(--muted)]">{c.role}</span>
                          <span className="text-[13px] font-semibold text-[var(--text)]">{c.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
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
