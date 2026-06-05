import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/icons/Icon';
import { ButtonLink } from '@/components/ui/Button';
import { SiteLogo } from '@/components/ui/SiteLogo';
import { NavDropdown } from '@/components/nav/NavDropdown';
import { MobileNavGroup } from '@/components/nav/MobileNavGroup';
import { SOFT_ITEMS, API_ITEMS } from '@/components/nav/navConfig';
import type { HeaderMode } from '@/types/components';
import homeIcon from '@/assets/home.svg';

interface HeaderProps {
  mode?: HeaderMode;
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
      style={scrolled ? { boxShadow: '0 1px 0 rgba(255,255,255,0.04), 0 10px 30px -20px rgba(0,0,0,0.8)' } : undefined}
    >
      <div className="wb-wrap wb-header-row">
        <SiteLogo />

        <div>
          <div className="hidden sm:inline-flex border-solid border-1 border-white/10 rounded-full p-1 gap-1 mx-2">
            <Link role="tab" to="/" className={`wb-toggle-btn ${isHome ? 'is-active' : ''}`}>
              <img src={homeIcon} className="w-4 h-4 home-icon" alt="home" />
            </Link>
          </div>

          <div className="hidden sm:inline-flex border-solid border-1 border-white/10 rounded-full p-1 gap-0.5">
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
          </div>
        </div>

        <div className="wb-header-right">
          <ButtonLink href="#book-demo" variant="outline" className="hidden sm:inline-flex">
            Book a demo
          </ButtonLink>

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

      {menuOpen && (
        <div className="sm:hidden border-t border-white/[0.06] bg-[rgba(10,10,15,0.95)] px-5 py-4 flex flex-col gap-3">
          <MobileNavGroup label="Softwares" icon={<Icon.Box />} items={SOFT_ITEMS} onNavigate={() => setMenuOpen(false)} />
          <MobileNavGroup label="APIs" icon={<Icon.Code />} items={API_ITEMS} onNavigate={() => setMenuOpen(false)} />
          <ButtonLink href="#book-demo" className="mt-1" onClick={() => setMenuOpen(false)}>
            Book a demo
          </ButtonLink>
        </div>
      )}
    </header>
  );
}
