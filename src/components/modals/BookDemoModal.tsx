import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/Button';
import { Close } from '../icons/Icon';

/* ─── Types ──────────────────────────────────────────────────────────────── */

type FormData = { name: string; email: string; phone: string; message: string };
type Touched = Record<keyof FormData, boolean>;
type FieldErrors = Record<keyof FormData, string>;
type Status = 'idle' | 'loading' | 'success' | 'error';

const EMPTY_FORM: FormData = { name: '', email: '', phone: '', message: '' };
const EMPTY_TOUCHED: Touched = { name: false, email: false, phone: false, message: false };

/* ─── Validation ─────────────────────────────────────────────────────────── */

function validate(f: FormData): FieldErrors {
  return {
    name: f.name.trim().length < 2
      ? 'Please enter your full name'
      : '',
    email: !f.email.trim()
      ? 'Email address is required'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())
        ? 'Enter a valid email address'
        : '',
    phone: !f.phone.trim()
      ? 'Phone number is required'
      : !/^\+?\d{7,12}$/.test(f.phone.trim())
        ? 'Enter a valid phone number (max 12 digits)'
        : '',
    message: '',
  };
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function Spinner() {
  return (
    <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.25" strokeWidth="2.5" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function inputCls(hasErr: boolean, isOk: boolean) {
  return cn(
    'w-full rounded-xl border px-4 py-[11px] text-sm text-[var(--text)]',
    'placeholder:text-[var(--muted)] bg-white/[0.03] outline-none',
    'transition-all duration-200 ease-out',
    isOk && 'pr-10',
    hasErr
      ? 'border-red-500/40 focus:border-red-500/55 focus:ring-2 focus:ring-red-500/[0.07]'
      : isOk
        ? 'border-emerald-500/35 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/[0.07]'
        : 'border-white/[0.09] hover:border-white/[0.18] focus:border-[var(--brand)]/50 focus:ring-2 focus:ring-[var(--brand)]/[0.08] focus:bg-white/[0.05]'
  );
}

interface FieldProps {
  label: string;
  required?: boolean;
  error: string;
  touched: boolean;
  children: React.ReactNode;
}

function Field({ label, required, error, touched, children }: FieldProps) {
  const showErr = touched && !!error;
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--muted-2)] select-none">
        {label}
        {required && <span className="text-[var(--brand)] ml-1">*</span>}
      </label>
      {children}
      {showErr && (
        <p
          role="alert"
          className="flex items-center gap-1.5 text-[11px] text-red-400"
          style={{ animation: 'wb-fade-in-down 0.18s ease' }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="8" x2="12" y2="13" />
            <circle cx="12" cy="16.5" r="0.7" fill="currentColor" stroke="none" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── Success screen ─────────────────────────────────────────────────────── */

function SuccessScreen({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center flex-1 py-14 px-10 text-center"
      style={{ animation: 'wb-fade-in-up 0.4s ease' }}
    >
      {/* animated checkmark */}
      <div className="relative mb-6">
        <svg width="76" height="76" viewBox="0 0 52 52" aria-hidden="true">
          <circle
            cx="26" cy="26" r="24"
            fill="none" stroke="#22c55e" strokeWidth="1.8"
            strokeDasharray="150.8" strokeDashoffset="150.8"
            style={{ animation: 'wb-check-circle 0.55s ease-out forwards' }}
          />
          <path
            d="M14 26.5l8 8 16-16"
            fill="none" stroke="#22c55e" strokeWidth="3"
            strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="38" strokeDashoffset="38"
            style={{ animation: 'wb-check-draw 0.38s 0.5s ease-out forwards' }}
          />
        </svg>
        <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-2xl scale-150 pointer-events-none" />
      </div>

      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-[10px] font-bold text-emerald-400 tracking-widest uppercase mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        Request Sent
      </span>

      <h3 className="text-[22px] font-semibold text-[var(--text)] leading-tight mb-2">
        We'll be in touch!
      </h3>
      <p className="text-sm text-[var(--muted-2)] max-w-[260px] leading-relaxed">
        Thank you for reaching out. Our team will contact you within{' '}
        <span className="font-semibold text-[var(--text)]">24 hours</span>{' '}
        to schedule your demo.
      </p>

      <button
        onClick={onClose}
        className="mt-8 px-5 py-2.5 rounded-lg border border-white/10 text-sm font-medium text-[var(--muted-2)] hover:text-[var(--text)] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-150"
      >
        Close
      </button>
    </div>
  );
}

/* ─── Contact links helper ───────────────────────────────────────────────── */

const PhoneIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.86 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

/* ─── Main export ────────────────────────────────────────────────────────── */

export function BookDemoModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [touched, setTouched] = useState<Touched>(EMPTY_TOUCHED);
  const [status, setStatus] = useState<Status>('idle');
  const [apiError, setApiError] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const errors = validate(form);
  const isFormValid = !errors.name && !errors.email && !errors.phone;
  const isLoading = status === 'loading';

  /* auto-focus first input */
  useEffect(() => {
    const t = setTimeout(() => nameRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, []);

  /* ESC key + focus trap */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [href]'
        )
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) { last.focus(); e.preventDefault(); }
      } else {
        if (document.activeElement === last) { first.focus(); e.preventDefault(); }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const change = useCallback(
    (field: keyof FormData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
        if (status === 'error') setApiError('');
      },
    [status]
  );

  const blur = useCallback(
    (field: keyof Touched) => () =>
      setTouched(prev => ({ ...prev, [field]: true })),
    []
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, message: true });
    if (!isFormValid || isLoading) return;

    setStatus('loading');
    setApiError('');

    try {
      const res = await fetch('https://whitebooks.in/form_submit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
        }),
      });
      if (!res.ok) throw new Error(`Submission failed (${res.status}). Please try again.`);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setApiError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  }

  const isOk = (f: keyof FormData) => touched[f] && !errors[f] && !!form[f];
  const hasErr = (f: keyof FormData) => touched[f] && !!errors[f];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a 20-min Demo"
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-5"
      style={{ animation: 'wb-modal-backdrop-in 0.22s ease forwards' }}
      onClick={onClose}
    >
      {/* backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(0,0,0,0.72)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
      />

      {/* modal card */}
      <div
        ref={modalRef}
        className="relative z-10 w-full sm:max-w-lg flex flex-col rounded-t-[28px] sm:rounded-2xl overflow-hidden max-h-[92vh] sm:max-h-[88vh]"
        style={{
          background: '#0d0d16',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 48px 120px -24px rgba(0,0,0,0.95), 0 0 80px -24px rgba(220,47,101,0.08)',
          animation: 'wb-modal-in 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Single panel ── */}
        <div className="flex-1 flex flex-col overflow-y-auto overscroll-contain">

          {/* top bar */}
          <div
            className="flex items-center justify-between px-6 sm:px-8 pt-6 sm:pt-7 pb-5 flex-shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div>
              <p className="text-[15px] font-semibold text-[var(--text)]">Request a Demo</p>
              <p className="text-xs text-[var(--muted)] mt-0.5">We'll reach out within 24 hours</p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-150"
            >
              <Close />
            </button>
          </div>

          {/* success or form */}
          {status === 'success' ? (
            <SuccessScreen onClose={onClose} />
          ) : (
            <form
              onSubmit={submit}
              noValidate
              className="flex flex-col gap-5 px-6 sm:px-8 py-6 sm:py-7"
            >
              {/* Name */}
              <Field label="Full Name" required error={errors.name} touched={touched.name}>
                <div className="relative">
                  <input
                    ref={nameRef}
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={change('name')}
                    onBlur={blur('name')}
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={hasErr('name')}
                    aria-describedby={hasErr('name') ? 'err-name' : undefined}
                    disabled={isLoading}
                    className={inputCls(hasErr('name'), isOk('name'))}
                  />
                  {isOk('name') && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <CheckIcon />
                    </span>
                  )}
                </div>
              </Field>

              {/* Email */}
              <Field label="Email Address" required error={errors.email} touched={touched.email}>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={change('email')}
                    onBlur={blur('email')}
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={hasErr('email')}
                    disabled={isLoading}
                    className={inputCls(hasErr('email'), isOk('email'))}
                  />
                  {isOk('email') && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <CheckIcon />
                    </span>
                  )}
                </div>
              </Field>

              {/* Phone */}
              <Field label="Phone Number" required error={errors.phone} touched={touched.phone}>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={change('phone')}
                    onBlur={blur('phone')}
                    autoComplete="tel"
                    aria-required="true"
                    aria-invalid={hasErr('phone')}
                    disabled={isLoading}
                    className={inputCls(hasErr('phone'), isOk('phone'))}
                  />
                  {isOk('phone') && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <CheckIcon />
                    </span>
                  )}
                </div>
              </Field>

              {/* Message */}
              <Field label="Additional Message" error={errors.message} touched={touched.message}>
                <textarea
                  rows={3}
                  placeholder="Tell us about your business needs or what you'd like to see..."
                  value={form.message}
                  onChange={change('message')}
                  onBlur={blur('message')}
                  disabled={isLoading}
                  className={cn(inputCls(false, false), 'resize-none')}
                  style={{ minHeight: 80 }}
                />
              </Field>

              {/* API error banner */}
              {status === 'error' && apiError && (
                <div
                  role="alert"
                  className="flex items-start gap-3 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/[0.05]"
                  style={{ animation: 'wb-fade-in-down 0.2s ease' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171"
                    strokeWidth="2" strokeLinecap="round" className="mt-0.5 shrink-0" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <circle cx="12" cy="16" r="0.8" fill="#f87171" stroke="none" />
                  </svg>
                  <p className="text-xs text-red-400 leading-relaxed">{apiError}</p>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                aria-busy={isLoading}
                className={cn(
                  'w-full flex items-center justify-center gap-2.5 rounded-xl py-[13px] mt-1',
                  'text-sm font-semibold text-white tracking-[0.01em]',
                  'transition-all duration-200 ease-out',
                  isLoading
                    ? 'bg-[var(--brand)] opacity-70 cursor-not-allowed'
                    : 'bg-[var(--brand)] hover:bg-[#e8447a] hover:shadow-[0_10px_32px_-8px_rgba(220,47,101,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 active:shadow-none'
                )}
              >
                {isLoading ? (
                  <><Spinner /><span>Sending request…</span></>
                ) : (
                  <>
                    <span>Request a Demo</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </Button>

              {/* reach us directly */}
              <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-widest mb-2.5">
                  Or reach us directly
                </p>
                <div className="flex flex-col gap-2">
                  {([
                    { href: 'mailto:sales@whitebooks.in', label: 'sales@whitebooks.in', Icon: MailIcon },
                    { href: 'tel:+919032111788', label: '+91-9032111788', Icon: PhoneIcon },
                  ] as const).map(c => (
                    <a
                      key={c.href}
                      href={c.href}
                      className="flex items-center gap-2.5 text-[14px] text-[var(--muted-2)] hover:text-[var(--text)] no-underline transition-colors duration-150"
                    >
                      <span
                        className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-[var(--muted-2)]"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
                      >
                        <c.Icon />
                      </span>
                      {c.label}
                    </a>
                  ))}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
