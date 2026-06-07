import { Link } from 'react-router-dom';
import wbLogo from '@/assets/logo-white-books.svg';

interface SiteLogoProps {
  href?: string;
  className?: string;
}

export function SiteLogo({ href = '/', className }: SiteLogoProps) {
  return (
    <Link
      to={href}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`flex items-center gap-2.5 font-display font-bold text-[17px] tracking-[-0.01em] text-[#e8e8f0] shrink-0 ${className ?? ''}`}
      aria-label="Whitebooks"
    >
      <img src={wbLogo} alt="whitebooks logo" className="w-[90px] h-auto sm:w-[117px]" />
    </Link>
  );
}
