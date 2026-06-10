import { useState, useEffect } from 'react';
import { SiteLogo } from '@/components/ui/SiteLogo';
import { Link } from 'react-router-dom';
import { BookDemoModal } from '@/components/modals/BookDemoModal';

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface FooterColItem {
  label: string;
  href?: string;
}

interface FooterColProps {
  title: string;
  items: FooterColItem[];
}

/* ─── Social icons ───────────────────────────────────────────────────────── */

const SOCIAL_LINKS = [
  {
    href: 'https://www.facebook.com/whitebooksindia',
    label: 'Facebook',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/whitebooksofficial/',
    label: 'Instagram',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/company/whitebooksindia',
    label: 'LinkedIn',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    href: 'https://x.com/whitebooksindia',
    label: 'X (Twitter)',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: 'https://www.youtube.com/@whitebooks207',
    label: 'YouTube',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20.06 12 20.06 12 20.06s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon fill="var(--bg, #0d0f14)" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
  {
    href: 'https://in.pinterest.com/whitebooksofficial/',
    label: 'Pinterest',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
] as const;

/* ─── Newsletter status types ────────────────────────────────────────────── */

type SubStatus = 'idle' | 'loading' | 'success' | 'error';

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function FooterCol({ title, items }: FooterColProps) {
  return (
    <div className="wb-footer-col">
      <h4>{title}</h4>
      <ul>
        {items.map((it, i) => (
          <li key={i}>
            {it.href?.startsWith('/') ? (
              <Link to={it.href}>{it.label}</Link>
            ) : (
              <a href={it.href ?? '#'}>{it.label}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */

export function Footer() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<SubStatus>('idle');

  useEffect(() => {
    if (demoOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [demoOpen]);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || subStatus === 'loading') return;
    setSubStatus('loading');
    try {
      const res = await fetch('https://whitebooks.in/newsletter_subscribe.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      if (!res.ok) throw new Error();
      setSubStatus('success');
      setEmail('');
    } catch {
      setSubStatus('error');
    }
  }

  return (
    <>
      <footer className="wb-footer">
        <div className="wb-wrap">
          {/* ── Nav columns ───────────────────────────────────────────── */}
          <div className="wb-footer-grid">
            <div className="wb-footer-col">
              <SiteLogo />
              <p className="wb-footer-brand-blurb">
                A GST Suvidha Provider licensed by GSTN, building India's AI-native compliance
                infrastructure.
              </p>
            </div>

            <FooterCol
              title="Softwares"
              items={[
                { label: 'Accounting', href: '/softwares/accounting' },
                { label: 'GST', href: '/softwares/gst' },
                { label: 'e-Invoice', href: '/softwares/e-invoice' },
                { label: 'e-Way Bill', href: '/softwares/e-way-bill' },
                { label: 'KSA e-Invoicing', href: '/softwares/ksa' },
              ]}
            />

            <FooterCol
              title="APIs"
              items={[
                { label: 'GST API', href: '/apis/gst' },
                { label: 'e-Invoice API', href: '/apis/e-invoice' },
                { label: 'e-Way Bill API', href: '/apis/e-way-bill' },
                { label: 'KSA e-Invoice API', href: '/apis/ksa' },
              ]}
            />

            <FooterCol
              title="Company"
              items={[
                { label: 'About Us', href: '/about/about-us' },
                { label: 'Contact Us', href: '/about/contact-us' },
                { label: 'Pricing', href: '/about/pricing' },
                { label: 'Terms & Conditions', href: '/about/terms' },
                { label: 'Privacy Policy', href: '/about/privacy-policy' },
                { label: 'Refund & Cancellation', href: '/about/refund-cancellation' },
              ]}
            />

            <FooterCol
              title="Resources"
              items={[
                { label: 'Partners', href: '/resources/partners' },
                { label: 'Support', href: '/resources/support' },
                { label: 'Videos', href: '/resources/videos' },
                { label: 'Blog', href: '/resources/blog' },
              ]}
            />
          </div>

          {/* ── Demo + Newsletter bar ──────────────────────────────────── */}
          <div className="py-7" style={{ borderBottom: '1px solid var(--line)' }}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">

              {/* Schedule Demo */}
              <button
                onClick={() => setDemoOpen(true)}
                className="w-full sm:w-auto shrink-0 px-6 py-3 rounded-full text-sm font-medium text-[var(--muted-2)] hover:text-[var(--text)] transition-colors duration-150 cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.09)' }}
              >
                Schedule Demo
              </button>

              {/* Mobile divider */}
              <div className="sm:hidden h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

              {/* Newsletter form */}
              <form
                onSubmit={handleSubscribe}
                className="flex-1 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3"
              >
                <p className="text-[13px] text-[var(--muted-2)] shrink-0 sm:whitespace-nowrap">
                  Sign up for our monthly newsletter
                </p>
                <div className="flex gap-2 flex-1 min-w-0">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => { setEmail(e.target.value); if (subStatus !== 'idle') setSubStatus('idle'); }}
                    placeholder="Enter your Email"
                    disabled={subStatus === 'loading' || subStatus === 'success'}
                    className="flex-1 min-w-0 px-4 py-2.5 rounded-xl text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none transition-colors duration-150 disabled:opacity-50"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}
                  />
                  <button
                    type="submit"
                    disabled={subStatus === 'loading' || subStatus === 'success'}
                    className="shrink-0 px-5 py-2.5 rounded-full text-sm font-medium text-[var(--muted-2)] hover:text-[var(--text)] transition-colors duration-150 disabled:opacity-50 cursor-pointer"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}
                  >
                    {subStatus === 'loading' ? 'Subscribing…' : subStatus === 'success' ? 'Subscribed!' : 'Subscribe'}
                  </button>
                </div>
              </form>
            </div>

            {/* Status messages */}
            {subStatus === 'error' && (
              <p className="text-[11px] text-red-400 mt-2.5">Something went wrong. Try again.</p>
            )}
            {subStatus === 'success' && (
              <p className="text-[11px] text-emerald-400 mt-2.5">You're subscribed!</p>
            )}
          </div>

          {/* ── Social + contact row ───────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6">
            {/* Social icons */}
            <div className="flex flex-wrap gap-2.5">
              {SOCIAL_LINKS.map(({ href, label, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-150"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Contact — inline on mobile, right-aligned column on desktop */}
            <div className="flex flex-row flex-wrap gap-x-5 gap-y-1 sm:flex-col sm:items-end sm:gap-1.5">
              <a
                href="mailto:sales@whitebooks.in"
                className="text-[13px] text-[var(--muted-2)] hover:text-[var(--text)] transition-colors duration-150 no-underline"
              >
                sales@whitebooks.in
              </a>
              <a
                href="tel:+919032111788"
                className="text-[13px] text-[var(--muted-2)] hover:text-[var(--text)] transition-colors duration-150 no-underline"
              >
                +91 9032111788
              </a>
            </div>
          </div>

          {/* ── Legal ─────────────────────────────────────────────────── */}
          <div className="wb-footer-legal">
            <span>
              WhiteBooks is the product of{' '}
              <a
                href="https://www.bvmcs.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[var(--text)] transition-colors duration-150"
              >
                BVM IT Consulting Services India Pvt Ltd
              </a>
              , A GSP (GST Suvidha Provider) License holder from GSTIN (Govt.).
            </span>
            <span>© 2026</span>
          </div>
        </div>
      </footer>

      {demoOpen && <BookDemoModal onClose={() => setDemoOpen(false)} />}
    </>
  );
}
