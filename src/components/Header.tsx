import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Box, Code } from '@/components/icons/Icon'
import { ButtonLink } from '@/shared/ui/Button'

type HeaderMode = 'home' | 'softwares' | 'apis'

interface HeaderProps {
  mode?: HeaderMode
}

interface ToggleBtnProps {
  href: string
  active: boolean
  icon: ReactNode
  children?: ReactNode
}

interface MobileNavProps {
  href: string
  icon: ReactNode
  children: ReactNode
}

export default function Header({ mode = 'home' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isSoft = mode === 'softwares'
  const isApi = mode === 'apis'
  const isHome = mode === 'home'

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50',
        'bg-[rgba(10,10,15,0.78)] backdrop-blur-[14px]',
        'border-b border-white/[0.15]',
        scrolled ? 'shadow-[0_1px_0_rgba(255,255,255,0.04),0_10px_30px_-20px_rgba(0,0,0,0.8)]' : '',
      ].join(' ')}
    >
      <div className="max-w-[1240px] mx-auto px-8 max-sm:px-5 flex items-center justify-between h-16 gap-6">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-[17px] tracking-[-0.01em] text-[#e8e8f0] shrink-0">
          <span
            className="relative w-[22px] h-[22px] rounded-[5px] bg-[#d33568] shadow-[0_0_0_1px_rgba(220,47,101,0.4),0_0_20px_rgba(220,47,101,0.3)] after:absolute after:inset-1 after:border-[1.5px] after:border-white/85 after:rounded-[2px]"
            aria-hidden="true"
          />
          WhiteBooks
        </Link>
        <div>

          {/* Desktop toggle */}
          <nav
            role="tablist"
            aria-label="Product stack"
            className="hidden sm:inline-flex items-center bg-white/[0.03] border border-white/10 rounded-full p-1 gap-[63px]"
          >
            <ToggleBtn href="/" active={isHome} icon={<Box />}></ToggleBtn>
          </nav>
          {/* Desktop toggle */}
          <nav
            role="tablist"
            aria-label="Product stack"
            className="hidden sm:inline-flex items-center bg-white/[0.03] border border-white/10 rounded-full p-1 gap-0.5"
          >
            <ToggleBtn href="/softwares" active={isSoft} icon={<Box />}>Softwares</ToggleBtn>
            <ToggleBtn href="/apis" active={isApi} icon={<Code />}>APIs</ToggleBtn>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3.5">
          <ButtonLink href="#book-demo"
            onClick={() => setMenuOpen(false)} variant="outline" className="hidden xs:inline-flex">
            Book a 20-min Demo
          </ButtonLink>

          {/* Hamburger — mobile only */}
          <button
            className="sm:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px]"
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
          <MobileNav href="/softwares" icon={<Box />}>Softwares · 5 products</MobileNav>
          <MobileNav href="/apis" icon={<Code />}>APIs · 4 products</MobileNav>
          <ButtonLink
            href="#book-demo"
            className="mt-1"
            onClick={() => setMenuOpen(false)}
          >
            Book a 20-min Demo
          </ButtonLink>
        </div>
      )}
    </header>
  )
}

function ToggleBtn({ href, active, icon, children }: ToggleBtnProps) {
  return (
    <Link
      to={href}
      role="tab"
      aria-selected={active}
      className={[
        'inline-flex items-center gap-2 px-[18px] py-[7px] rounded-full text-[13.5px] font-medium transition-all duration-[180ms]',
        active
          ? 'bg-[#d33568] text-white shadow-[0_6px_18px_-6px_rgba(220,47,101,0.55)]'
          : 'text-[#9a9ab0] hover:text-[#e8e8f0] hover:bg-[rgba(220,47,101,0.08)]',
      ].join(' ')}
    >
      {icon}{children}
    </Link>
  )
}

function MobileNav({ href, icon, children }: MobileNavProps) {
  return (
    <Link
      to={href}
      className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-[#9a9ab0] hover:text-[#e8e8f0] hover:bg-white/[0.04] transition-colors"
    >
      <span className="text-[#d33568]">{icon}</span>
      {children}
    </Link>
  )
}
