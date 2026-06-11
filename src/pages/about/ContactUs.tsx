import React, { useState, useRef, useEffect } from 'react';
import { ButtonLink, Button } from '@/components/ui/Button';
import { Header, Footer, FluidBackground, Breadcrumb } from '@/layouts/SiteShell';
import { PlainSection, SubClose } from '@/layouts/SubpageShell';
import { useReveal } from '@/hooks/useReveal';
import EyebrowPill from '@/components/ui/EyebrowPill';
import { ProofSection } from '@/sections/WbProof';
import { BookDemoModal } from '@/components/modals/BookDemoModal';
import { cn } from '@/lib/cn';
import { usePhoneInput, defaultCountries, parseCountry, FlagImage } from 'react-international-phone';

const wrap = "max-w-[1240px] mx-auto px-8 max-sm:px-5";

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="flex items-start gap-4 p-5 rounded-xl bg-[var(--bg-2)] border border-[var(--line)] hover:border-[var(--brand-border)] transition-colors group"
    >
      <div className="w-10 h-10 rounded-[10px] bg-[var(--brand-soft)] border border-[var(--brand-border)] flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-xs text-[var(--muted)] uppercase tracking-widest mb-1">{label}</p>
        <p className="text-[var(--text)] font-medium group-hover:text-[var(--brand)] transition-colors">
          {value}
        </p>
      </div>
    </a>
  );
}

function OfficeCard({ title, address }: { title: string; address: string }) {
  return (
    <article
      data-reveal
      className="p-7 max-[700px]:p-5 bg-[var(--bg-2)] border border-[var(--line)] rounded-[14px]"
    >
      <div className="w-10 h-10 rounded-[10px] bg-[var(--brand-soft)] border border-[var(--brand-border)] flex items-center justify-center mb-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V7l8-4v18" />
          <path d="M19 21V11l-6-4" />
        </svg>
      </div>
      <h3 className="[font-family:var(--font-display)] font-medium text-[18px] tracking-[-0.005em] m-0 mb-2 text-[var(--text)]">
        {title}
      </h3>
      <p className="m-0 text-sm text-[var(--muted-2)] leading-[1.6]">{address}</p>
    </article>
  );
}

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

type ContactFormData = { message: string; name: string; email: string; phone: string; company: string };
const EMPTY_CONTACT_FORM: ContactFormData = { message: '', name: '', email: '', phone: '', company: '' };

function ContactFormSection() {
  const [form, setForm] = useState<ContactFormData>(EMPTY_CONTACT_FORM);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const change = (field: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }));
      if (status !== 'idle') setStatus('idle');
    };

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

  return (
    <section className="relative py-[80px] max-[700px]:py-[56px]" data-reveal>
      <div className={wrap}>
        <h2 className="[font-family:var(--font-display)] font-medium text-[clamp(28px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] text-[var(--text)] mb-10">
          Write To Us
        </h2>
        <form onSubmit={submit} noValidate className="flex flex-col gap-10">
          <div>
            <label className={labelCls} htmlFor="cf-message">How can we help you?</label>
            <textarea
              id="cf-message"
              rows={2}
              placeholder="Your message here..."
              value={form.message}
              onChange={change('message')}
              disabled={isLoading}
              className={cn(inputCls, 'resize-none font-sans')}
            />
          </div>

          <div className="grid grid-cols-2 max-[700px]:grid-cols-1 gap-x-16 gap-y-10">
            <div>
              <label className={labelCls} htmlFor="cf-name">Name</label>
              <input
                id="cf-name"
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={change('name')}
                disabled={isLoading}
                autoComplete="name"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="cf-email">Email</label>
              <input
                id="cf-email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={change('email')}
                disabled={isLoading}
                autoComplete="email"
                className={inputCls}
              />
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
            <div>
              <label className={labelCls} htmlFor="cf-company">Company</label>
              <input
                id="cf-company"
                type="text"
                placeholder="Company Name"
                value={form.company}
                onChange={change('company')}
                disabled={isLoading}
                autoComplete="organization"
                className={inputCls}
              />
            </div>
          </div>

          {status === 'success' && (
            <p className="text-sm text-emerald-400">Thanks for reaching out — we'll get back to you within 24 hours.</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
          )}

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isLoading} className="rounded-full px-10">
              {isLoading ? 'Sending…' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export function ContactUs() {
  useReveal();
  const [demoOpen, setDemoOpen] = useState(false);

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
            <div className="max-w-[820px]">
              <EyebrowPill label="Company | Contact Us" />
              <h1
                className="[font-family:var(--font-display)] font-medium leading-[1.06] tracking-[-0.025em] mt-[18px] [text-wrap:balance] text-[var(--text)]"
                style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
              >
                We're a global technology company, ready to support you{' '}
                <span className="text-[var(--brand)]">at any stage of your business journey.</span>
              </h1>
              <p className="mt-[22px] max-w-[620px] text-[17px] text-[var(--muted-2)] leading-[1.55]">
                WhiteBooks is India's GSP-certified, cloud-first platform for GST compliance,
                accounting, e-invoicing, and e-way bills — trusted by 25,000+ active clients. Reach
                out and our team will get back to you.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" arrow onClick={() => setDemoOpen(true)}>
                  Schedule Demo
                </Button>
                <ButtonLink href="tel:+919032111788" variant="ghost" size="lg">
                  Talk to Sales: +91 90321 11788
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        {/* Contact info */}
        <PlainSection
          label=""
          heading={<>Reach our team <span className="text-[var(--brand)]">directly.</span></>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            <ContactCard
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.86 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              }
              label="Sales Line"
              value="+91 90321 11788"
              href="tel:+919032111788"
            />
            <ContactCard
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.86 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              }
              label="Support Line"
              value="+91 90321 11388"
              href="tel:+919032111388"
            />
            <ContactCard
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              }
              label="Email Sales"
              value="sales@whitebooks.in"
              href="mailto:sales@whitebooks.in"
            />
          </div>
        </PlainSection>

        {/* Write to us */}
        <ContactFormSection />

        {/* Offices */}
        <section className="relative pb-[120px] max-[700px]:pb-[72px]" data-reveal>
          <div className={wrap}>
            <h2 className="[font-family:var(--font-display)] font-medium text-[clamp(28px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] text-[var(--text)] mb-8">
              Our offices.
            </h2>
            <div className="grid grid-cols-2 max-[800px]:grid-cols-1 gap-[22px] max-[800px]:gap-[14px]">
              <OfficeCard
                title="Registered Office"
                address="8-2-682/3/A/24, Road No 12, Banjara Hills, Hyderabad, Telangana 500034, India"
              />
              <OfficeCard
                title="Corporate Office"
                address="Flat No: 303, Gayathri Heights, Jubilee Enclave, HITECH City, Hyderabad, Telangana 500081, India"
              />
            </div>
          </div>
        </section>

        <ProofSection />

        {/* Closing */}
        <SubClose
          h2="Let's talk."
          body="Tell us about your business and we'll get back to you within 24 hours. Email us at sales@whitebooks.in or call +91 90321 11788."
          primaryCta={{ label: 'Email Us', href: 'mailto:sales@whitebooks.in' }}
          secondaryCta={{ label: 'Call Sales: +91 90321 11788', href: 'tel:+919032111788' }}
        />

      </main>
      <Footer />

      {demoOpen && <BookDemoModal onClose={() => setDemoOpen(false)} />}
    </div>
  );
}
