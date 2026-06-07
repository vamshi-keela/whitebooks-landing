import { useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

/**
 * 'dark'  — logo has black/near-black fills (invisible on dark backgrounds)
 * 'light' — logo has white/near-white fills (invisible on light backgrounds)
 * 'color' — logo uses brand colors that survive grayscale treatment on both themes
 */
type LogoVariant = 'dark' | 'light' | 'color';

interface LogoEntry {
  name: string;
  key: string;
  variant?: LogoVariant;
}

// ─── Asset resolver ───────────────────────────────────────────────────────────

const SUPPORTED_EXTS = ['svg', 'png', 'jpg', 'webp', 'jpeg', 'avif'] as const;

const logoFiles = import.meta.glob('/src/assets/logos/*', { eager: true }) as Record<
  string,
  { default: string }
>;

function getLogoSrc(key: string): string | null {
  for (const ext of SUPPORTED_EXTS) {
    const path = `/src/assets/logos/${key}.${ext}`;
    if (logoFiles[path]) return logoFiles[path].default;
  }
  return null;
}

// ─── Logo registry ────────────────────────────────────────────────────────────
//
// variant classification:
//   dark  → logo has dominant black/dark fills → needs inversion in dark mode
//   light → logo has dominant white fills      → needs inversion in light mode
//   color → logo uses brand colors             → survives grayscale in both modes

const LOGOS: LogoEntry[] = [
  { name: 'P&G', key: 'pg', variant: 'color' },
  { name: 'IBM', key: 'ibm', variant: 'color' },
  { name: 'Hindustan Unilever', key: 'hul', variant: 'color' },
  { name: 'KPMG', key: 'kpmg', variant: 'color' },
  { name: 'Coca-Cola', key: 'coca-cola', variant: 'color' },
  { name: 'Razorpay', key: 'razorpay', variant: 'color' },
  { name: 'SBI', key: 'sbi', variant: 'color' },
  { name: 'Aditya Birla', key: 'aditya-birla', variant: 'color' },
  { name: 'Accenture', key: 'accenture', variant: 'dark' }, // implicit black text paths
  { name: 'KIA', key: 'kia', variant: 'dark' }, // black/dark brand mark
  { name: 'Philips', key: 'philips', variant: 'color' },
  { name: 'Yamaha', key: 'yamaha', variant: 'color' },
  { name: 'TVS', key: 'tvs', variant: 'color' },
  { name: 'PepsiCo', key: 'pepsico', variant: 'color' },
  { name: 'Pharmeasy', key: 'pharmeasy', variant: 'color' },
  { name: 'Cars24', key: 'cars24', variant: 'color' },
  { name: 'INOX', key: 'inox', variant: 'color' },
  { name: 'Grant Thornton', key: 'grant-thornton', variant: 'color' },
  { name: 'EaseMyTrip', key: 'easemytrip', variant: 'color' },
  { name: 'Pigeon', key: 'pigeon', variant: 'color' },
  { name: 'Landmark', key: 'landmark', variant: 'color' },
  { name: 'NCC', key: 'ncc', variant: 'color' },
  { name: 'Odoo', key: 'odoo', variant: 'color' },
  { name: 'Protiviti', key: 'protiviti', variant: 'color' },
  { name: 'IIT Hyderabad', key: 'iit-hyderabad', variant: 'color' },
  { name: 'NHDC', key: 'nhdc', variant: 'color' },
  { name: 'OPGC', key: 'opgc', variant: 'color' },
  { name: 'WheelsEye', key: 'wheelseye', variant: 'dark' }, // fill="black" on all text paths
  { name: 'Jyothy Labs', key: 'jyothy-labs', variant: 'color' },
  { name: 'NTC Group', key: 'ntc-group', variant: 'color' },
  { name: 'KJL Group', key: 'kjl-group', variant: 'color' },
  { name: 'Techno Paints', key: 'techno-paints', variant: 'color' },
  { name: 'J-Ark Logistics', key: 'j-ark-logistics', variant: 'color' },
  { name: 'Poorvika', key: 'poorvika', variant: 'light' }, // fill:#FFFFFF throughout
  { name: 'Vikran', key: 'vikran', variant: 'color' },
];

// ─── BrandLogo component ──────────────────────────────────────────────────────

interface BrandLogoProps {
  logo: LogoEntry;
  className?: string;
}

/**
 * Renders a single brand logo with theme-aware visibility treatment.
 *
 * The outer wrapper carries the variant class (wb-logo-v-dark/light/color)
 * so CSS can apply the correct filter for each theme without any JS theme
 * detection — the right filter fires automatically via [data-theme] selectors.
 */
export function BrandLogo({ logo, className }: BrandLogoProps) {
  const [imgError, setImgError] = useState(false);
  const src = getLogoSrc(logo.key);
  const variant = logo.variant ?? 'color';
  const cls = ['wb-logo', `wb-logo-v-${variant}`, className].filter(Boolean).join(' ');

  if (src && !imgError) {
    return (
      <div className={cls} role="img" aria-label={logo.name}>
        <img
          src={src}
          alt={logo.name}
          loading="lazy"
          decoding="async"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Text fallback when image is missing or broken
  return (
    <span className={cls} aria-label={logo.name}>
      {logo.name}
      <span className="wb-logo-sep" aria-hidden="true">·</span>
    </span>
  );
}

// ─── LogoWallCarousel ─────────────────────────────────────────────────────────

export function LogoWallCarousel() {
  return (
    <div className="wb-logos-wrap">
      {/* Two identical copies so translateX(-50%) loops seamlessly */}
      <div className="wb-ticker" aria-label="Our clients" role="list">
        {LOGOS.map((l) => (
          <BrandLogo key={`a-${l.key}`} logo={l} />
        ))}
        {LOGOS.map((l) => (
          <BrandLogo key={`b-${l.key}`} logo={l} />
        ))}
      </div>
    </div>
  );
}

export default LogoWallCarousel;
