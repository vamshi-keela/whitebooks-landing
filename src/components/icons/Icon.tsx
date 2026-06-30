import React, { SVGProps } from 'react';

type SvgProps = React.SVGProps<SVGSVGElement>;
type IconProps = SVGProps<SVGSVGElement>

export const Chevron = (p: SvgProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const ArrowRight = (p: SvgProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const ArrowDown = (p: SvgProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

export const Send = (p: SvgProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none" />
  </svg>
);

export const Phone = (p: SvgProps) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.86 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
export const Box = (p: SvgProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="wb-toggle-icon" {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
    <line x1="3.5" y1="9" x2="20.5" y2="9" />
    <circle cx="7" cy="6.25" r="0.6" fill="currentColor" />
  </svg>
);
export const Code = (p: SvgProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="wb-toggle-icon" {...p}>
    <polyline points="8 7 3 12 8 17" />
    <polyline points="16 7 21 12 16 17" />
    <line x1="14" y1="5" x2="10" y2="19" />
  </svg>
);

export const Accounting = (p: SvgProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="9" x2="9" y2="21" />
    <line x1="13" y1="13" x2="17" y2="13" />
    <line x1="13" y1="17" x2="17" y2="17" />
  </svg>
);

export const GST = (p: SvgProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 4h11l3 3v13H5z" />
    <polyline points="16 4 16 7 19 7" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="8" y1="16" x2="13" y2="16" />
  </svg>
);

export const EInvoice = (p: SvgProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M6 3h9l4 4v14H6z" />
    <path d="M9 13l2.2 2.2L16 10.5" />
  </svg>
);

export const EWayBill = (p: SvgProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2" y="8" width="13" height="9" rx="1" />
    <path d="M15 11h4l2 3v3h-6z" />
    <circle cx="6.5" cy="18" r="1.6" />
    <circle cx="17.5" cy="18" r="1.6" />
  </svg>
);

export const NoticeManagement = (p: SvgProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a13 13 0 010 18M12 3a13 13 0 000 18" />
    <circle cx="12" cy="9" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

export const GstApi = (p: SvgProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M4 6h16M4 12h16M4 18h10" />
    <circle cx="19" cy="18" r="2" />
  </svg>
);

export const Seal = (p: SvgProps) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M16 3l3.2 2.1 3.8-.6 1.5 3.6 3.4 1.9-1 3.8 1 3.8-3.4 1.9-1.5 3.6-3.8-.6L16 25l-3.2-2.1-3.8.6-1.5-3.6L4.1 18l1-3.8-1-3.8 3.4-1.9 1.5-3.6 3.8.6z" />
    <path d="M11.5 15.5l3 3 6-6" />
  </svg>
);

export const Brain = (p: SvgProps) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
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
);

export const Globe = (p: SvgProps) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="16" cy="16" r="12" />
    <path d="M4 16h24" />
    <path d="M16 4c4 4 6 8 6 12s-2 8-6 12c-4-4-6-8-6-12s2-8 6-12z" />
    <circle cx="10" cy="11" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="22" cy="20" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

export const Resources = (p: SvgProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="wb-toggle-icon" {...p}>
    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z" />
    <path d="M4 4.5v17" />
    <line x1="9" y1="7" x2="15" y2="7" />
  </svg>
);

export const Services = (p: SvgProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="wb-toggle-icon" {...p}>
    <rect x="2.5" y="7.5" width="19" height="13" rx="2" />
    <path d="M8 7.5V5.5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="2.5" y1="13" x2="21.5" y2="13" />
  </svg>
);

export const Close = (p: SvgProps) => (

  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
export const SupportAgent = (p: SvgProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9.09 9.26a3 3 0 0 0 5.83 1l.01-.02a3 3 0 0 0-2.5-2.75 3.5 3.5 0 0 0-3.32 2.73z" />
  </svg>
)

export const Icon = {
  Chevron,
  ArrowRight,
  ArrowDown,
  Send,
  Phone,
  SupportAgent,
  Box,
  Code,
  Accounting,
  GST,
  EInvoice,
  EWayBill,
  KSA: NoticeManagement,
  GstApi,
  Seal,
  Brain,
  Globe,
  Resources,
  Services,
  Close
};

export default Icon;
