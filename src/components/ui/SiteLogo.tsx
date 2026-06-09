import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import wbLogo from '@/assets/logo-white-books.svg';

interface SiteLogoProps {
  href?: string;
  className?: string;
}

export function SiteLogo({ href = '/', className }: SiteLogoProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <Link
      to={href}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`flex items-center gap-2.5 font-display font-bold text-[17px] tracking-[-0.01em] text-[var(--text)] shrink-0 ${className ?? ''}`}
      aria-label="Whitebooks"
    >
      <img
        src={wbLogo}
        alt="whitebooks logo"
        className="w-[90px] h-auto sm:w-[117px] transition-[filter] duration-200"
        style={{ filter: isDark ? 'none' : 'invert(1)' }}
      />
    </Link>
  );
}
