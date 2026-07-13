import { useState, useEffect } from 'react';
import { SiteLogo } from '@/shared/ui/SiteLogo';
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
  {
    href: 'https://whatsapp.com/channel/0029Vb8BOmWD38COCF7miy1B',
    label: 'WhatsApp Channel',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.017-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    ),
  },
] as const;

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

  useEffect(() => {
    if (demoOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [demoOpen]);

  return (
    <>
      <footer className="wb-footer border-t border-solid border-hairline">
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
                { label: 'Shipping', href: '/about/shipping' },
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

              {/* Schedule Demo */}
              <button
                onClick={() => setDemoOpen(true)}
                aria-label="Schedule a product demo with our team"
                className="wb-footer-cta group flex items-center justify-between gap-4 px-4 py-3 text-left cursor-pointer"
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[var(--brand)]"
                    style={{ background: 'var(--brand-soft)', border: '1px solid var(--brand-border)' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </span>
                  <span className="flex flex-col min-w-0 leading-tight">
                    <span className="text-sm font-medium text-[var(--text)]">Schedule a demo</span>
                    <span className="text-[12px] text-[var(--muted)] truncate">See WhiteBooks in action</span>
                  </span>
                </span>
                <span className="shrink-0 inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--muted-2)] group-hover:text-[var(--text)] transition-colors duration-150">
                  Book
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="-translate-x-0.5 transition-transform duration-200 group-hover:translate-x-0 group-hover:text-[var(--brand)]"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </button>

              {/* Newsletter — a clear link to the contact page (no fake input) */}
              <Link
                to="/about/contact-us"
                aria-label="Get monthly GST & product updates — go to contact page"
                className="wb-footer-cta group flex items-center justify-between gap-4 px-4 py-3"
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[var(--brand)]"
                    style={{ background: 'var(--brand-soft)', border: '1px solid var(--brand-border)' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <span className="flex flex-col min-w-0 leading-tight">
                    <span className="text-sm font-medium text-[var(--text)]">Stay in the loop</span>
                    <span className="text-[12px] text-[var(--muted)] truncate">Monthly GST updates &amp; product news</span>
                  </span>
                </span>
                <span className="shrink-0 inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--muted-2)] group-hover:text-[var(--text)] transition-colors duration-150">
                  Subscribe
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="-translate-x-0.5 transition-transform duration-200 group-hover:translate-x-0 group-hover:text-[var(--brand)]"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>
            </div>
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
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--brand-border)] transition-colors duration-150"
                  style={{ background: 'var(--bg-2)', border: '1px solid var(--line)' }}
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
