import React, { useState, useRef, useEffect } from 'react';
import {
  Plug,
  Boxes,
  FileText,
  Truck,
  FileCheck2,
  Headset,
  Code2,
  UserRound,
  Building2,
  MapPin,
  Clock,
  ShieldCheck,
  Handshake,
  Rocket,
  CreditCard,
  LifeBuoy,
  Network,
} from 'lucide-react';
import { ButtonLink, Button } from '@/components/ui/Button';
import { Header, Footer, FluidBackground, Breadcrumb } from '@/layouts/SiteShell';
import { PlainSection, SubClose, FaqList } from '@/layouts/SubpageShell';
import { useReveal } from '@/hooks/useReveal';
import EyebrowPill from '@/components/ui/EyebrowPill';
import { ProofSection } from '@/sections/WbProof';
import { AnimationPlaceholder, type FlowStep } from '@/components/ui/SectionKit';
import { BookDemoModal } from '@/components/modals/BookDemoModal';
import { cn } from '@/lib/cn';
import { usePhoneInput, defaultCountries, parseCountry, FlagImage } from 'react-international-phone';

const wrap = "max-w-[1240px] mx-auto px-8 max-sm:px-5";

// Routing cards can pre-fill the qualification form, so we keep a tiny shared
// "preset" contract between the routing section and the form.
type FormPreset = { role?: string; product?: string; message?: string; nonce: number };

// ── Hero integration flow ─────────────────────────────────────────────────────

const HERO_FLOW: FlowStep[] = [
  { icon: <Plug size={16} />, label: 'GST API', sublabel: 'One integration layer' },
  { icon: <Boxes size={16} />, label: 'ERP / SAP', sublabel: 'SAP · Tally · Oracle · custom' },
  { icon: <FileText size={16} />, label: 'e-Invoice', sublabel: 'IRN + QR in milliseconds' },
  { icon: <Truck size={16} />, label: 'e-Way Bill', sublabel: 'Auto Part-A / Part-B' },
  { icon: <FileCheck2 size={16} />, label: 'GST Filing', sublabel: 'GSTR-1 & 3B reconciled' },
];

// ── Trust strip ────────────────────────────────────────────────────────────────

const TRUST_METRICS = [
  { val: '25,000+', lbl: 'Businesses on WhiteBooks' },
  { val: '10M+', lbl: 'API transactions / month' },
  { val: '99.9%', lbl: 'Platform uptime' },
  { val: '24×7', lbl: 'Enterprise support' },
];

const TRUST_LOGOS = ['P&G', 'IBM', 'KIA', 'HUL', 'KPMG', 'Razorpay'];

function TrustStrip() {
  return (
    <section className="relative border-y border-[var(--line)] bg-[var(--bg-2)] py-[60px]" data-reveal>
      <div className={wrap}>
        <div className="grid grid-cols-4 max-[760px]:grid-cols-2 gap-x-6 gap-y-10">
          {TRUST_METRICS.map((m) => (
            <div key={m.lbl} className="flex flex-col gap-2">
              <span
                className="[font-family:var(--font-display)] font-semibold text-[clamp(28px,4vw,40px)] leading-none tracking-[-0.02em] bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, var(--text) 30%, var(--brand) 130%)' }}
              >
                {m.val}
              </span>
              <span className="text-[13px] text-[var(--muted-2)] leading-snug">{m.lbl}</span>
            </div>
          ))}
        </div>
        {/* 
        <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-[var(--line)] pt-8">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Trusted by
          </span>
          <div className="flex flex-wrap items-center gap-x-9 gap-y-3">
            {TRUST_LOGOS.map((logo) => (
              <span
                key={logo}
                className="[font-family:var(--font-display)] text-[18px] font-semibold text-[var(--muted-2)] opacity-70 transition-opacity hover:opacity-100"
              >
                {logo}
              </span>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}

// ── Intent routing ──────────────────────────────────────────────────────────────

type RouteCard = {
  icon: React.ReactNode;
  title: string;
  body: string;
  cta: string;
} & ({ href: string; preset?: never } | { href?: never; preset: Omit<FormPreset, 'nonce'> });

const ROUTE_CARDS: RouteCard[] = [
  {
    icon: <CreditCard size={20} />,
    title: 'Sales & Pricing',
    body: 'Understand plans, implementation timelines and the right fit for your volume.',
    cta: 'Talk to sales',
    preset: { role: 'Finance Team', product: 'GST Filing', message: "I'd like to understand pricing and plans for " },
  },
  {
    icon: <Code2 size={20} />,
    title: 'GST API Integration',
    body: 'Speak with solution architects about GST, e-Invoice and e-Way Bill APIs.',
    cta: 'Get API access',
    href: '/developer/gst-api',
  },
  {
    icon: <Boxes size={20} />,
    title: 'ERP / SAP Integration',
    body: 'Book an integration assessment for SAP, Tally, Oracle or a custom ERP.',
    cta: 'Request assessment',
    preset: { role: 'ERP Partner', product: 'e-Invoice API', message: 'We want to integrate WhiteBooks with our ERP: ' },
  },
  {
    icon: <LifeBuoy size={20} />,
    title: 'Customer Support',
    body: 'Existing customer? Reach our round-the-clock support team for assistance.',
    cta: 'Get support',
    preset: { role: 'Finance Team', message: "I'm an existing customer and need help with " },
  },
  {
    icon: <Handshake size={20} />,
    title: 'Partnerships',
    body: 'For CA firms, ERP partners, GSPs and resellers looking to build with us.',
    cta: 'Become a partner',
    preset: { role: 'CA Firm', message: "We'd like to explore a partnership: " },
  },
  {
    icon: <Rocket size={20} />,
    title: 'Enterprise Solutions',
    body: 'Custom compliance, high-volume invoicing and dedicated SLAs for enterprises.',
    cta: 'Talk to an expert',
    preset: { role: 'CTO', product: 'e-Invoice API', message: 'We have enterprise / high-volume requirements: ' },
  },
];

function IntentRouting({ onSelect }: { onSelect: (preset: Omit<FormPreset, 'nonce'>) => void }) {
  return (
    <PlainSection
      label="How can we help?"
      heading={<>Route your request to the <span className="text-[var(--brand)]">right team.</span></>}
      sub="Tell us what you're working on and we'll connect you with the person who can actually move it forward."
    >
      <div className="grid grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 gap-4 mt-10">
        {ROUTE_CARDS.map((card) => {
          const inner = (
            <>
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-[12px] bg-[var(--brand-soft)] border border-[var(--brand-border)] flex items-center justify-center text-[var(--brand)]">
                  {card.icon}
                </div>
                <svg
                  className="text-[var(--muted)] -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-[var(--brand)]"
                  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
              <h3 className="[font-family:var(--font-display)] font-medium text-[18px] tracking-[-0.005em] mt-5 mb-2 text-[var(--text)]">
                {card.title}
              </h3>
              <p className="text-[14px] text-[var(--muted-2)] leading-[1.6] flex-1">{card.body}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--brand)]">
                {card.cta}
              </span>
            </>
          );

          const cls =
            'group flex flex-col text-left h-full p-6 rounded-[16px] bg-[var(--bg-2)] border border-[var(--line)] hover:border-[var(--brand-border)] hover:-translate-y-0.5 transition-[border-color,transform] duration-200';

          return card.href ? (
            <a key={card.title} href={card.href} className={cls}>
              {inner}
            </a>
          ) : (
            <button key={card.title} type="button" onClick={() => onSelect(card.preset!)} className={cls}>
              {inner}
            </button>
          );
        })}
      </div>
    </PlainSection>
  );
}

// ── Meet the team ────────────────────────────────────────────────────────────────

const TEAM = [
  {
    icon: <UserRound size={22} />,
    role: 'Sales Consultation',
    body: 'Helping businesses evaluate WhiteBooks, map plans to volume and plan rollout.',
  },
  {
    icon: <Network size={22} />,
    role: 'Solution Architecture',
    body: 'API integrations, ERP connectors and compliance workflows designed with you.',
  },
  {
    icon: <Headset size={22} />,
    role: 'Customer Success',
    body: 'Implementation, onboarding and ongoing support so you go live with confidence.',
  },
];

function TeamSection() {
  return (
    <PlainSection
      label="People, not tickets"
      heading={<>Meet the team you'll <span className="text-[var(--brand)]">actually speak to.</span></>}
    >
      <div className="grid grid-cols-3 max-[800px]:grid-cols-1 gap-5 mt-10">
        {TEAM.map((member) => (
          <article
            key={member.role}
            data-reveal
            className="flex flex-col items-start p-7 rounded-[16px] bg-[var(--bg-2)] border border-[var(--line)]"
          >
            {/* TODO: replace gradient placeholder with a real team photo */}
            <div
              className="relative w-16 h-16 rounded-full flex items-center justify-center text-[var(--brand)] mb-5 overflow-hidden"
              style={{ background: 'radial-gradient(120% 120% at 30% 20%, var(--brand-soft), var(--bg-3) 75%)' }}
            >
              <div className="absolute inset-0 rounded-full border border-[var(--brand-border)]" aria-hidden="true" />
              {member.icon}
            </div>
            <h3 className="[font-family:var(--font-display)] font-medium text-[18px] tracking-[-0.005em] mb-2 text-[var(--text)]">
              {member.role}
            </h3>
            <p className="text-[14px] text-[var(--muted-2)] leading-[1.6]">{member.body}</p>
          </article>
        ))}
      </div>
    </PlainSection>
  );
}

// ── Contact cards ────────────────────────────────────────────────────────────────

function ContactCard({
  icon,
  label,
  value,
  sub,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="flex items-start gap-4 p-5 rounded-xl bg-[var(--bg-2)] border border-[var(--line)] hover:border-[var(--brand-border)] transition-colors group"
    >
      <div className="w-10 h-10 rounded-[10px] bg-[var(--brand-soft)] border border-[var(--brand-border)] flex items-center justify-center shrink-0 mt-0.5 text-[var(--brand)]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-[var(--muted)] uppercase tracking-widest mb-1">{label}</p>
        <p className="text-[var(--text)] font-medium group-hover:text-[var(--brand)] transition-colors truncate">
          {value}
        </p>
        {sub && <p className="text-[12.5px] text-[var(--muted-2)] mt-0.5">{sub}</p>}
      </div>
    </a>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.86 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function ContactMethods() {
  return (
    <PlainSection
      label=""
      heading={<>Reach our team <span className="text-[var(--brand)]">directly.</span></>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <ContactCard icon={<PhoneIcon />} label="Sales" value="+91 90321 11788" sub="Plans, pricing & demos" href="tel:+919032111788" />
        {/* <ContactCard icon={<Code2 size={16} />} label="Technical" value="developers@whitebooks.in" sub="API & integration help" href="mailto:developers@whitebooks.in" /> */}
        <ContactCard icon={<LifeBuoy size={16} />} label="Support" value="+91 90321 11388" sub="Existing customers · 24×7" href="tel:+919032111388" />
        {/* <ContactCard icon={<Handshake size={16} />} label="Partnerships" value="partners@whitebooks.in" sub="CA firms & resellers" href="mailto:partners@whitebooks.in" /> */}
      </div>
    </PlainSection>
  );
}

// ── Phone field (country picker) ────────────────────────────────────────────────

function PhoneField({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (phone: string) => void;
  disabled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { inputValue, country, setCountry, handlePhoneValueChange, inputRef } = usePhoneInput({
    defaultCountry: 'in',
    value,
    disableDialCodeAndPrefix: true,
    onChange: data => onChange(data.phone),
  });

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center gap-2 border-b border-[var(--line)] focus-within:border-[var(--brand)] transition-colors"
    >
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        disabled={disabled}
        aria-label="Select country code"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1 shrink-0 py-2.5 bg-transparent disabled:opacity-50"
      >
        <FlagImage iso2={country.iso2} size="20px" className="rounded-[2px]" />
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <input
        ref={inputRef}
        id="cf-phone"
        type="tel"
        placeholder="081234 56789"
        value={inputValue}
        onChange={handlePhoneValueChange}
        disabled={disabled}
        autoComplete="tel"
        className="w-full bg-transparent border-0 outline-none py-2.5 text-[15px] text-[var(--text)] placeholder:text-[var(--muted)] disabled:opacity-50"
      />
      {open && (
        <ul
          role="listbox"
          aria-label="Country codes"
          className="absolute z-30 top-full left-0 mt-1 max-h-64 w-72 overflow-y-auto rounded-lg border border-[var(--line-2)] bg-[var(--bg-elev)] shadow-2xl py-1 list-none"
        >
          {defaultCountries.map(c => {
            const option = parseCountry(c);
            const selected = option.iso2 === country.iso2;
            return (
              <li key={option.iso2}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => { setCountry(option.iso2); setOpen(false); }}
                  className={cn(
                    'flex items-center gap-2.5 w-full px-3 py-1.5 text-sm text-left text-[var(--text)] bg-transparent hover:bg-[var(--brand-soft)] transition-colors',
                    selected && 'bg-[var(--brand-soft)]'
                  )}
                >
                  <FlagImage iso2={option.iso2} size="18px" className="rounded-[2px] shrink-0" />
                  <span className="flex-1 truncate">{option.name}</span>
                  <span className="text-[var(--muted-2)]">+{option.dialCode}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ── Qualification chips ─────────────────────────────────────────────────────────

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'px-4 py-2 rounded-full border text-[13px] font-medium cursor-pointer transition-all duration-150 active:translate-y-px',
        active
          ? 'border-[var(--brand)] bg-[var(--brand)] text-white shadow-[0_6px_16px_-8px_var(--brand-glow)]'
          : 'border-[var(--line-2)] bg-[var(--bg-elev)] text-[var(--text)] shadow-[0_1px_2px_rgba(0,0,0,0.06)] hover:-translate-y-px hover:border-[var(--brand-border)] hover:bg-[var(--brand-soft)] hover:text-[var(--brand)] hover:shadow-[0_4px_12px_-6px_var(--brand-glow)]'
      )}
    >
      {children}
    </button>
  );
}

const ROLE_OPTIONS = ['CFO', 'CTO', 'Finance Team', 'Developer', 'ERP Partner', 'CA Firm'];
const PRODUCT_OPTIONS = ['GST API', 'e-Invoice API', 'e-Way Bill API', 'GST Filing', 'Accounting Software'];
const VOLUME_OPTIONS = ['< 10K', '10K – 100K', '100K – 1M', '1M+'];

// ── Smart contact form ─────────────────────────────────────────────────────────

type ContactFormData = {
  message: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  products: string[];
  volume: string;
};
const EMPTY_CONTACT_FORM: ContactFormData = {
  message: '', name: '', email: '', phone: '', company: '', role: '', products: [], volume: '',
};

function ContactFormSection({ preset }: { preset: FormPreset | null }) {
  const [form, setForm] = useState<ContactFormData>(EMPTY_CONTACT_FORM);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Apply presets pushed from the routing cards.
  useEffect(() => {
    if (!preset) return;
    setForm(prev => ({
      ...prev,
      role: preset.role ?? prev.role,
      products: preset.product && !prev.products.includes(preset.product)
        ? [...prev.products, preset.product]
        : prev.products,
      message: preset.message ?? prev.message,
    }));
    setStatus('idle');
  }, [preset]);

  const change = (field: 'message' | 'name' | 'email' | 'company') =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }));
      if (status !== 'idle') setStatus('idle');
    };

  const toggleProduct = (p: string) =>
    setForm(prev => ({
      ...prev,
      products: prev.products.includes(p) ? prev.products.filter(x => x !== p) : [...prev.products, p],
    }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    try {
      const body = new URLSearchParams({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        role: form.role,
        products: form.products.join(', '),
        volume: form.volume,
        message: form.message.trim(),
      });
      const res = await fetch('https://whitebooks.in/sendmessage.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm(EMPTY_CONTACT_FORM);
    } catch {
      setStatus('error');
    }
  }

  const isLoading = status === 'loading';
  const inputCls = "w-full bg-transparent border-0 border-b border-[var(--line)] focus:border-[var(--brand)] outline-none py-2.5 text-[15px] text-[var(--text)] placeholder:text-[var(--muted)] transition-colors disabled:opacity-50";
  const labelCls = "block text-[15px] text-[var(--muted-2)] mb-3";
  const groupLabelCls = "block text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)] mb-3";

  return (
    <section id="contact-form" className="relative py-[80px] max-[700px]:py-[56px] scroll-mt-24" data-reveal>
      <div className={wrap}>
        <div className="max-w-[640px] mb-10">
          <h2 className="[font-family:var(--font-display)] font-medium text-[clamp(28px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] text-[var(--text)] mb-3">
            Tell us about your requirements
          </h2>
          <p className="text-[16px] text-[var(--muted-2)] leading-[1.6]">
            A few details help us route you to the right expert and come prepared. We respond within
            2 business hours.
          </p>
        </div>

        <form onSubmit={submit} noValidate className="flex flex-col gap-10">
          <div className="grid grid-cols-2 max-[700px]:grid-cols-1 gap-x-16 gap-y-10">
            <div>
              <label className={labelCls} htmlFor="cf-name">Name</label>
              <input id="cf-name" type="text" placeholder="Full Name" value={form.name} onChange={change('name')} disabled={isLoading} autoComplete="name" className={inputCls} />
            </div>
            <div>
              <label className={labelCls} htmlFor="cf-company">Company</label>
              <input id="cf-company" type="text" placeholder="Company Name" value={form.company} onChange={change('company')} disabled={isLoading} autoComplete="organization" className={inputCls} />
            </div>
            <div>
              <label className={labelCls} htmlFor="cf-email">Work Email</label>
              <input id="cf-email" type="email" placeholder="you@company.com" value={form.email} onChange={change('email')} disabled={isLoading} autoComplete="email" className={inputCls} />
            </div>
            <div>
              <label className={labelCls} htmlFor="cf-phone">Phone</label>
              <PhoneField
                value={form.phone}
                onChange={phone => {
                  setForm(prev => ({ ...prev, phone }));
                  if (status !== 'idle') setStatus('idle');
                }}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <span className={groupLabelCls}>What best describes you?</span>
            <div className="flex flex-wrap gap-2.5">
              {ROLE_OPTIONS.map(r => (
                <Chip key={r} active={form.role === r} onClick={() => setForm(prev => ({ ...prev, role: prev.role === r ? '' : r }))}>
                  {r}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <span className={groupLabelCls}>Products you're interested in</span>
            <div className="flex flex-wrap gap-2.5">
              {PRODUCT_OPTIONS.map(p => (
                <Chip key={p} active={form.products.includes(p)} onClick={() => toggleProduct(p)}>
                  {p}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <span className={groupLabelCls}>Expected monthly volume</span>
            <div className="flex flex-wrap gap-2.5">
              {VOLUME_OPTIONS.map(v => (
                <Chip key={v} active={form.volume === v} onClick={() => setForm(prev => ({ ...prev, volume: prev.volume === v ? '' : v }))}>
                  {v}
                </Chip>
              ))}
            </div>
          </div>

          {/* <div>
            <label className={labelCls} htmlFor="cf-message">Anything else we should know?</label>
            <textarea
              id="cf-message"
              rows={2}
              placeholder="Tell us about your use case, current stack or timelines…"
              value={form.message}
              onChange={change('message')}
              disabled={isLoading}
              className={cn(inputCls, 'resize-none font-sans')}
            />
          </div> */}

          {status === 'success' && (
            <p className="text-sm text-emerald-400">Thanks for reaching out — we'll get back to you within 2 business hours.</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-400">Something went wrong. Please try again or email sales@whitebooks.in.</p>
          )}

          <div className="flex items-center justify-between gap-6 max-[600px]:flex-col max-[600px]:items-stretch">
            <p className="text-[13px] text-[var(--muted)] flex items-center gap-2">
              <ShieldCheck size={15} className="text-[var(--brand)] shrink-0" />
              Your details are kept private and never shared.
            </p>
            <Button type="submit" size="lg" disabled={isLoading} className="rounded-full px-10">
              {isLoading ? 'Sending…' : 'Submit request'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

// ── Consultation CTA ────────────────────────────────────────────────────────────

function ConsultationCTA({ onSchedule }: { onSchedule: () => void }) {
  return (
    <section className="relative py-[88px] max-[700px]:py-[60px] overflow-hidden" data-reveal>
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 80% at 15% 0%, rgba(220,47,101,0.16), transparent 60%),' +
            'radial-gradient(50% 70% at 100% 100%, rgba(220,47,101,0.10), transparent 60%),' +
            'linear-gradient(180deg, var(--bg-3), var(--bg-2))',
        }}
      />
      <div className={cn(wrap, 'relative')}>
        <div className="rounded-[24px] border border-[var(--line-2)] bg-[color-mix(in_srgb,var(--bg-elev)_70%,transparent)] backdrop-blur-xl p-12 max-[700px]:p-7 flex items-center justify-between gap-10 max-[800px]:flex-col max-[800px]:items-start">
          <div className="max-w-[560px]">
            <EyebrowPill label="Enterprise Consultation" />
            <h2 className="[font-family:var(--font-display)] font-medium text-[clamp(26px,3.4vw,40px)] leading-[1.12] tracking-[-0.02em] text-[var(--text)] mt-4 mb-3">
              Planning a GST, e-Invoice or ERP integration?
            </h2>
            <p className="text-[16px] text-[var(--muted-2)] leading-[1.6]">
              Book a free 30-minute architecture consultation with our solution experts. Bring your
              stack, volumes and timelines — leave with a clear integration plan.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0 max-[800px]:w-full">
            <Button size="lg" arrow onClick={onSchedule} className="rounded-full">
              Schedule consultation
            </Button>
            <ButtonLink href="mailto:sales@whitebooks.in" variant="ghost" size="lg" className="rounded-full justify-center">
              Email an expert
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Office + map ────────────────────────────────────────────────────────────────

const OFFICE_FACTS = [
  { icon: <Clock size={16} />, label: 'Office hours', value: 'Mon–Sat · 9:30 AM – 6:30 PM IST' },
  { icon: <Headset size={16} />, label: 'Support hours', value: '24×7 for enterprise customers' },
  { icon: <ShieldCheck size={16} />, label: 'Response SLA', value: 'Within 2 business hours' },
];

function OfficeSection() {
  return (
    <section className="relative pb-[120px] max-[700px]:pb-[72px]" data-reveal>
      <div className={wrap}>
        <h2 className="[font-family:var(--font-display)] font-medium text-[clamp(28px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] text-[var(--text)] mb-8">
          Visit our office.
        </h2>

        <div className="grid grid-cols-[1.1fr_0.9fr] max-[860px]:grid-cols-1 gap-6">
          {/* Map */}
          <div className="relative rounded-[16px] overflow-hidden border border-[var(--line)] min-h-[360px] max-[860px]:min-h-[300px]">
            <iframe
              title="WhiteBooks office location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.113988020204!2d78.37378437462844!3d17.45425750087641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9327c02dc9e3%3A0x6d7d0334969526f1!2sWhiteBooks%20%E2%80%93%20Accounting%2C%20E-Invoice%2C%20E-Way%20Bill%20%26%20GST%20Software%20Solutions%20in%20India!5e0!3m2!1sen!2sin!4v1761570262888!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full grayscale-[0.2] contrast-[1.05]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Address + facts */}
          <div className="flex flex-col gap-5">
            <div className="p-7 max-[700px]:p-5 bg-[var(--bg-2)] border border-[var(--line)] rounded-[16px]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-[10px] bg-[var(--brand-soft)] border border-[var(--brand-border)] flex items-center justify-center text-[var(--brand)]">
                  <MapPin size={18} />
                </div>
                <h3 className="[font-family:var(--font-display)] font-medium text-[18px] tracking-[-0.005em] m-0 text-[var(--text)]">
                  Hyderabad, India
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 size={15} className="text-[var(--muted)] mt-1 shrink-0" />
                  <p className="m-0 text-[13.5px] text-[var(--muted-2)] leading-[1.6]">
                    <span className="text-[var(--text)] font-medium">Corporate Office</span><br />
                    Flat No: 303, Gayathri Heights, Jubilee Enclave, HITECH City, Hyderabad, Telangana 500081
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 size={15} className="text-[var(--muted)] mt-1 shrink-0" />
                  <p className="m-0 text-[13.5px] text-[var(--muted-2)] leading-[1.6]">
                    <span className="text-[var(--text)] font-medium">Registered Office</span><br />
                    8-2-682/3/A/24, Road No 12, Banjara Hills, Hyderabad, Telangana 500034
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {OFFICE_FACTS.map(f => (
                <div key={f.label} className="flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-2)] border border-[var(--line)]">
                  <div className="w-9 h-9 rounded-[9px] bg-[var(--brand-soft)] border border-[var(--brand-border)] flex items-center justify-center shrink-0 text-[var(--brand)]">
                    {f.icon}
                  </div>
                  <div>
                    <p className="text-[11px] text-[var(--muted)] uppercase tracking-widest mb-0.5">{f.label}</p>
                    <p className="text-[14px] text-[var(--text)] font-medium m-0">{f.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ────────────────────────────────────────────────────────────────────────

const CONTACT_FAQS = [
  { q: 'How quickly will I hear back?', a: 'Within 2 business hours for sales and integration enquiries. Enterprise support is available 24×7.' },
  { q: 'Do you support SAP and other ERP integrations?', a: 'Yes. We offer connectors for SAP, Tally, Oracle and custom ERPs, plus a single-click SAP connector for e-Invoice and e-Way Bill.' },
  { q: 'Can I get a sandbox environment?', a: 'Absolutely. Developers get instant access to a sandbox with test credentials to evaluate the GST, e-Invoice and e-Way Bill APIs before going live.' },
  { q: 'Do you offer implementation support?', a: 'Yes. Our Customer Success team handles onboarding, implementation and go-live support so your team is never left guessing.' },
  { q: 'Are the APIs production-ready?', a: 'Our APIs are GSP-certified, run at 99.9% uptime and power 10M+ transactions a month for enterprises across India.' },
  { q: 'Can WhiteBooks handle high-volume invoicing?', a: 'Yes. The platform is built for scale — from a few hundred to millions of invoices a month — with dedicated SLAs for enterprise volumes.' },
];

// ── Page ─────────────────────────────────────────────────────────────────────────

export function ContactUs() {
  useReveal();
  const [demoOpen, setDemoOpen] = useState(false);
  const [preset, setPreset] = useState<FormPreset | null>(null);

  const routeToForm = (p: Omit<FormPreset, 'nonce'>) => {
    setPreset({ ...p, nonce: Date.now() });
    requestAnimationFrame(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header mode="resources" />
      <main>

        {/* Hero */}
        <section className="pt-[70px] pb-[72px] relative overflow-hidden">
          <FluidBackground />
          <section className="pt-[100px] pb-0">
            <div className={wrap}>
              <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]} />
            </div>
          </section>
          <div className={wrap}>
            <div className="grid grid-cols-[1.05fr_0.95fr] max-[960px]:grid-cols-1 gap-14 max-[960px]:gap-10 items-center mt-2">
              <div>
                <EyebrowPill label="Company | Contact Us" />
                <h1
                  className="[font-family:var(--font-display)] font-medium leading-[1.06] tracking-[-0.025em] mt-[18px] [text-wrap:balance] text-[var(--text)]"
                  style={{ fontSize: 'clamp(34px, 4.4vw, 56px)' }}
                >
                  Let's build your GST &{' '}
                  <span className="text-[var(--brand)]">compliance stack.</span>
                </h1>
                <p className="mt-[22px] max-w-[560px] text-[17px] text-[var(--muted-2)] leading-[1.55]">
                  Whether you're building a fintech platform, integrating SAP, automating GST
                  compliance or scaling invoice volumes — talk to our GST, e-Invoicing and ERP
                  integration experts.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button size="lg" arrow onClick={() => setDemoOpen(true)}>
                    Schedule Demo
                  </Button>
                  <ButtonLink href="tel:+919032111788" variant="ghost" size="lg">
                    Talk to Sales
                  </ButtonLink>
                  <ButtonLink href="/developer/gst-api" variant="ghost" size="lg">
                    Get API Access
                  </ButtonLink>
                </div>
              </div>

              {/* Integration architecture visual */}
              <div className="max-[960px]:max-w-[420px] max-[960px]:mx-auto w-full">
                <AnimationPlaceholder
                  steps={HERO_FLOW}
                  badge="Integration flow"
                  aspect="3/4"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <TrustStrip />

        {/* Smart form */}
        <ContactFormSection preset={preset} />

        {/* Route by intent */}
        <IntentRouting onSelect={routeToForm} />

        {/* Contact methods */}
        <ContactMethods />

        {/* Meet the team */}
        <TeamSection />

        {/* Enterprise consultation */}
        <ConsultationCTA onSchedule={() => setDemoOpen(true)} />

        {/* Office + map */}
        <OfficeSection />

        {/* FAQ */}
        <PlainSection label="FAQ" heading={<>Questions, <span className="text-[var(--brand)]">answered.</span></>}>
          <div className="mt-8">
            <FaqList items={CONTACT_FAQS} />
          </div>
        </PlainSection>

        {/* Proof */}
        <ProofSection />

        {/* Closing */}
        <SubClose
          h2="Let's talk."
          body="Tell us about your business and we'll get back to you within 2 business hours. Email us at sales@whitebooks.in or call +91 90321 11788."
          primaryCta={{ label: 'Email Us', href: 'mailto:sales@whitebooks.in' }}
          secondaryCta={{ label: 'Call Sales: +91 90321 11788', href: 'tel:+919032111788' }}
        />

      </main>
      <Footer />

      {demoOpen && <BookDemoModal onClose={() => setDemoOpen(false)} />}
    </div>
  );
}
