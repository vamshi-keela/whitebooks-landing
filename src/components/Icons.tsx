import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base: IconProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const ArrowRight = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="2" {...base} {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

export const ArrowDown = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="2" {...base} {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
)

export const Send = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="2" {...base} {...props}>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none" />
  </svg>
)

export const Box = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="1.6" className="w-3.5 h-3.5 opacity-90" {...base} {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
    <line x1="3.5" y1="9" x2="20.5" y2="9" />
    <circle cx="7" cy="6.25" r="0.6" fill="currentColor" />
  </svg>
)

export const Code = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="1.6" className="w-3.5 h-3.5 opacity-90" {...base} {...props}>
    <polyline points="8 7 3 12 8 17" />
    <polyline points="16 7 21 12 16 17" />
    <line x1="14" y1="5" x2="10" y2="19" />
  </svg>
)

export const Accounting = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="1.5" className="w-[22px] h-[22px]" {...base} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="9" x2="9" y2="21" />
    <line x1="13" y1="13" x2="17" y2="13" />
    <line x1="13" y1="17" x2="17" y2="17" />
  </svg>
)

export const GST = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="1.5" className="w-[22px] h-[22px]" {...base} {...props}>
    <path d="M5 4h11l3 3v13H5z" />
    <polyline points="16 4 16 7 19 7" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="8" y1="16" x2="13" y2="16" />
  </svg>
)

export const EInvoice = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="1.5" className="w-[22px] h-[22px]" {...base} {...props}>
    <path d="M6 3h9l4 4v14H6z" />
    <path d="M9 13l2.2 2.2L16 10.5" />
  </svg>
)

export const EWayBill = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="1.5" className="w-[22px] h-[22px]" {...base} {...props}>
    <rect x="2" y="8" width="13" height="9" rx="1" />
    <path d="M15 11h4l2 3v3h-6z" />
    <circle cx="6.5" cy="18" r="1.6" />
    <circle cx="17.5" cy="18" r="1.6" />
  </svg>
)

export const KSA = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="1.5" className="w-[22px] h-[22px]" {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a13 13 0 010 18M12 3a13 13 0 000 18" />
    <circle cx="12" cy="9" r="0.8" fill="currentColor" stroke="none" />
  </svg>
)

export const GstApi = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="1.5" className="w-[22px] h-[22px]" {...base} {...props}>
    <path d="M4 6h16M4 12h16M4 18h10" />
    <circle cx="19" cy="18" r="2" />
  </svg>
)

export const Seal = (props: IconProps) => (
  <svg viewBox="0 0 32 32" strokeWidth="1.4" className="w-full h-full" {...base} {...props}>
    <path d="M16 3l3.2 2.1 3.8-.6 1.5 3.6 3.4 1.9-1 3.8 1 3.8-3.4 1.9-1.5 3.6-3.8-.6L16 25l-3.2-2.1-3.8.6-1.5-3.6L4.1 18l1-3.8-1-3.8 3.4-1.9 1.5-3.6 3.8.6z" />
    <path d="M11.5 15.5l3 3 6-6" />
  </svg>
)

export const Brain = (props: IconProps) => (
  <svg viewBox="0 0 32 32" strokeWidth="1.4" className="w-full h-full" {...base} {...props}>
    <circle cx="9" cy="9" r="2" />
    <circle cx="23" cy="9" r="2" />
    <circle cx="9" cy="23" r="2" />
    <circle cx="23" cy="23" r="2" />
    <circle cx="16" cy="16" r="3" />
    <line x1="11" y1="9" x2="13.5" y2="14" />
    <line x1="21" y1="9" x2="18.5" y2="14" />
    <line x1="11" y1="23" x2="13.5" y2="18" />
    <line x1="21" y1="23" x2="18.5" y2="18" />
  </svg>
)

export const Globe = (props: IconProps) => (
  <svg viewBox="0 0 32 32" strokeWidth="1.4" className="w-full h-full" {...base} {...props}>
    <circle cx="16" cy="16" r="12" />
    <path d="M4 16h24" />
    <path d="M16 4c4 4 6 8 6 12s-2 8-6 12c-4-4-6-8-6-12s2-8 6-12z" />
    <circle cx="10" cy="11" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="22" cy="20" r="1.5" fill="currentColor" stroke="none" />
  </svg>
)
