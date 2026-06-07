const logoFiles = import.meta.glob('/src/assets/logos/*', { eager: true }) as Record<string, { default: string }>;

function getLogoSrc(key: string): string | null {
  for (const ext of ['svg', 'png', 'jpg']) {
    const path = `/src/assets/logos/${key}.${ext}`;
    if (logoFiles[path]) return (logoFiles[path] as { default: string }).default;
  }
  return null;
}

const LOGOS = [
  { name: 'P&G', key: 'pg' },
  { name: 'IBM', key: 'ibm' },
  { name: 'Hindustan Unilever', key: 'hul' },
  { name: 'KPMG', key: 'kpmg' },
  { name: 'Coca-Cola', key: 'coca-cola' },
  { name: 'Razorpay', key: 'razorpay' },
  { name: 'SBI', key: 'sbi' },
  { name: 'Aditya Birla', key: 'aditya-birla' },
  { name: 'Accenture', key: 'accenture' },
  { name: 'Philips', key: 'philips' },
  { name: 'Yamaha', key: 'yamaha' },
  { name: 'TVS', key: 'tvs' },
  { name: 'PepsiCo', key: 'pepsico' },
  { name: 'Pharmeasy', key: 'pharmeasy' },
  { name: 'Cars24', key: 'cars24' },
  { name: 'KIA', key: 'kia' },
  { name: 'INOX', key: 'inox' },
  { name: 'Grant Thornton', key: 'grant-thornton' },
  { name: 'EaseMyTrip', key: 'easemytrip' },
  { name: 'Pigeon', key: 'pigeon' },
  { name: 'Landmark', key: 'landmark' },
  { name: 'NCC', key: 'ncc' },
  { name: 'Odoo', key: 'odoo' },
  { name: 'Protiviti', key: 'protiviti' },
  { name: 'IIT Hyderabad', key: 'iit-hyderabad' },
  { name: 'NHDC', key: 'nhdc' },
  { name: 'OPGC', key: 'opgc' },
  { name: 'WheelsEye', key: 'wheelseye' },
  { name: 'Jyothy Labs', key: 'jyothy-labs' },
  { name: 'Poorvika', key: 'poorvika' },
];

function LogoItem({ l }: { l: { name: string; key: string } }) {
  const src = getLogoSrc(l.key);
  if (src) {
    return <img className="wb-logo" height={60} src={src} alt={l.name} loading="lazy" decoding="async" />;
  }
  return (
    <span className="wb-logo">
      {l.name}
      <span className="wb-logo-sep">·</span>
    </span>
  );
}

export function LogoWallCarousel() {
  return (
    <div className="wb-logos-wrap">
      {/* Two identical copies so translateX(-50%) loops seamlessly with the CSS keyframe */}
      <div className="wb-ticker" aria-label="Client logos">
        {LOGOS.map((l) => <LogoItem key={`a-${l.key}`} l={l} />)}
        {LOGOS.map((l) => <LogoItem key={`b-${l.key}`} l={l} />)}
      </div>
    </div>
  );
}

export default LogoWallCarousel;
