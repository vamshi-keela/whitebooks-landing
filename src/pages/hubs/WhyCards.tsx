import { useRef, useEffect } from 'react'

function DataFlowVisual() {
  const nodes = [
    { label: 'e-Invoice', meta: 'IRN · 4F2A9···3D02', time: '14:31:08' },
    { label: 'GST Return', meta: 'GSTR-1 · line 1,248', time: '14:31:08' },
    { label: 'e-Way Bill', meta: 'EWB-9023 · valid 48h', time: '14:31:09' },
  ]
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 p-5">
      {nodes.map((node, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3 p-3 bg-[var(--bg-elev)] border border-[var(--line-2)] rounded-xl">
            <span className="w-2 h-2 rounded-full bg-[var(--brand)] shadow-[0_0_6px_rgba(220,47,101,0.6)] shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-display font-semibold text-[13px] text-[var(--text)]">{node.label}</div>
              <div className="font-mono text-[10.5px] text-[var(--muted)] mt-0.5">{node.meta}</div>
            </div>
            <span className="font-mono text-[10px] text-[var(--muted)] shrink-0">{node.time}</span>
          </div>
          {i < nodes.length - 1 && (
            <div className="flex items-center gap-2 pl-4">
              <div className="w-px h-3 bg-[var(--brand-border)]" />
              <span className="font-mono text-[10px] text-[var(--brand)]">auto·{i === 0 ? 'pushed' : 'triggered'}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function OneContractVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center p-5">
      <div className="w-full max-w-[280px] bg-[var(--bg-elev)] border border-[var(--line-2)] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--line)] bg-[var(--bg-3)]">
          <span className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-[var(--brand)]">Master Services Agreement</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-4 h-4 text-[var(--brand)]">
            <circle cx="12" cy="12" r="9" />
            <path d="M8.5 12.5l2.5 2.5L15.5 9.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="px-4 py-3 border-b border-[var(--line)]">
          <div className="font-display font-medium text-[12.5px] text-[var(--text)]">WhiteBooks & Acme Industries Pvt Ltd</div>
        </div>
        <ul className="px-4 py-2.5 flex flex-col gap-1.5">
          {['Accounting', 'GST', 'e-Invoice', 'e-Way Bill', 'KSA e-Invoicing'].map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-[12.5px] text-[var(--muted-2)]">
              <span className="text-[#22c55e] font-bold text-[11px]">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--line)] bg-[var(--bg-3)]">
          <div>
            <div className="font-display font-semibold text-[13px] text-[var(--brand)]">1 contract</div>
            <div className="font-mono text-[10px] text-[var(--muted)]">1 login · 1 SLA · 1 support</div>
          </div>
          <svg viewBox="0 0 80 22" preserveAspectRatio="none" className="w-16 h-5 text-[var(--muted-2)]" aria-hidden="true">
            <path d="M2 16 C 8 4, 14 22, 22 10 S 36 18, 44 8 S 58 18, 78 12"
              fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function AuditTruthVisual() {
  return (
    <div className="w-full h-full flex flex-col justify-center gap-3 p-5">
      <div className="p-3.5 bg-[var(--bg-elev)] border border-[var(--line-2)] rounded-xl">
        <div className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-[var(--muted)] mb-2">Auditor Query</div>
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[var(--muted-2)] shrink-0">
            <circle cx="11" cy="11" r="6.5" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" />
          </svg>
          <span className="font-body text-[13px] text-[var(--text)]">
            What was ITC position on <em className="text-[var(--brand)] not-italic">Aug 12 · 14:30</em>?
          </span>
        </div>
      </div>
      <div className="p-3.5 bg-[var(--brand-softer)] border border-[var(--brand-border)] rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
          <span className="font-mono text-[9.5px] tracking-[0.1em] uppercase text-[#22c55e]">Live · One System</span>
        </div>
        <div className="font-display font-semibold text-[24px] text-[var(--brand)] tracking-[-0.02em]">₹4,82,310</div>
        <div className="flex flex-wrap gap-x-2 mt-1.5 font-mono text-[10.5px] text-[var(--muted)]">
          <span>1,247 invoices</span>
          <span>·</span>
          <span>12 GSTINs</span>
          <span>·</span>
          <span>3 entities</span>
        </div>
        <div className="mt-2 font-mono text-[11px] text-[var(--brand)] hover:underline cursor-pointer">
          View 1,247 source rows →
        </div>
      </div>
    </div>
  )
}

const CARDS = [
  {
    eyebrow: 'Unified data layer',
    title: 'Data flows between products, not around them.',
    body: 'An e-invoice generated in the e-Invoice software automatically becomes a line in the GST return and triggers an e-way bill if needed. Without integration, you copy-paste between tools and reconcile the gaps manually.',
    Visual: DataFlowVisual,
  },
  {
    eyebrow: 'Procurement & ops',
    title: 'One contract, one login, one support team.',
    body: "Procurement, security review, and SLA negotiation happen once — not five times. Your finance team uses one login. Your IT team manages one vendor.",
    Visual: OneContractVisual,
  },
  {
    eyebrow: 'Audit defensibility',
    title: 'One source of truth at audit.',
    body: 'When an auditor asks "what was your ITC position on August 12 at 14:30?" — there is one answer, drawn from one system. Multi-vendor stacks generate multi-vendor audit findings.',
    Visual: AuditTruthVisual,
  },
]

export default function WhyCards() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('in'); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} data-reveal className="max-sm:py-[64px]">
      <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
        <h2 className="font-display font-semibold text-[clamp(32px,3.8vw,44px)] tracking-[-0.02em] leading-[1.1] max-w-[760px] text-[var(--text)]">
          The case for buying compliance{' '}
          <span className="text-[var(--brand)]">from one company.</span>
        </h2>
        {/* <h2 className="font-[var(--font-display)] font-semibold text-[clamp(26px,3.5vw,40px)] tracking-[-0.02em] leading-[1.1] max-w-[760px] text-[#e8e8f0]">
          The case for buying compliance{' '}
          <span className="text-[#d33568]">from one company.</span>
        </h2> */}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {CARDS.map((card, i) => (
            <article key={i} className="flex flex-col bg-[var(--bg-2)] border border-[var(--line)] rounded-2xl overflow-hidden">
              <div className="relative h-[220px] bg-[var(--bg-2)] border-b border-[var(--line)] overflow-hidden">
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 50% 100%, rgba(220,47,101,0.3) 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
                <card.Visual />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-[var(--brand)] mb-2">{card.eyebrow}</p>
                <h3 className="font-display font-semibold text-[17px] tracking-[-0.01em] text-[var(--text)] mb-3 leading-[1.3]">
                  {card.title}
                </h3>
                <p className="text-sm text-[var(--muted-2)] leading-[1.65]">{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
