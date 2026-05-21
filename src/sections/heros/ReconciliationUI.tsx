// ReconciliationUI.tsx — Animated GSTR-2B reconciliation mock widget.

import React, { useState, useEffect } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface ReconRow {
  gstin: string;
  vendor: string;
  inv: string;
  amt: number;
  state: 'match' | 'mismatch';
  reason?: string;
}

interface ReconciliationUIProps {
  motion?: boolean;
  compact?: boolean;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const RECON_ROWS_BASE: ReconRow[] = [
  { gstin: '29AAACR5055K1Z5', vendor: 'Rajesh Enterprises Pvt Ltd', inv: 'RE/2026/01821',    amt: 184250,  state: 'match' },
  { gstin: '27AAFCD5862R000', vendor: 'Mahalakshmi Logistics',      inv: 'ML-26-0091',        amt: 56780,   state: 'match' },
  { gstin: '07AAACI1681G1Z2', vendor: 'IBM India Pvt Ltd',          inv: 'IBM/IN/26/9921',    amt: 1240000, state: 'match' },
  { gstin: '36AABCS8577L1ZQ', vendor: 'Suresh Trading Co',          inv: 'ST-2026-04',        amt: 22400,   state: 'mismatch', reason: 'Rate mismatch · 18% vs 5%' },
  { gstin: '24AANCA7521C1ZS', vendor: 'Coca-Cola Beverages',        inv: 'CCB-IND-2210',      amt: 894500,  state: 'match' },
  { gstin: '06AAACP9568L1ZR', vendor: 'P&G India Distribution',     inv: 'PG-D-2026-1144',   amt: 2150000, state: 'match' },
  { gstin: '19AAACT2727Q1ZX', vendor: 'TVS Auto Components',        inv: 'TVS/AC/26/8821',   amt: 412800,  state: 'match' },
  { gstin: '33AAACN5530L1Z7', vendor: 'Nilkamal Industries',        inv: 'NK-2026-0922',      amt: 78200,   state: 'mismatch', reason: 'Vendor unfiled · 2A only' },
  { gstin: '09AABCH3119L1Z4', vendor: 'Hindustan Unilever Ltd',     inv: 'HUL/26/IN-0712',   amt: 3284500, state: 'match' },
  { gstin: '32AAACA6724D1ZX', vendor: 'Aditya Birla Chemicals',     inv: 'AB-C-26-04471',    amt: 521800,  state: 'match' },
  { gstin: '21AAGCA1234B1Z6', vendor: 'Accenture Solutions India',  inv: 'ACN/IND/26/1882',  amt: 1640500, state: 'match' },
  { gstin: '08AAACK1234M1Z1', vendor: 'Kia Motors India',           inv: 'KIA-2026-IN-22',   amt: 924000,  state: 'match' },
];

// ─── Style helpers ────────────────────────────────────────────────────────────

function th(): React.CSSProperties {
  return {
    textAlign: 'left',
    padding: '9px 10px',
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: 'var(--fg-quaternary)',
    fontWeight: 500,
    borderBottom: '1px solid var(--hairline)',
    background: 'rgba(255,255,255,0.01)',
  };
}

function td(mono?: string, color?: string): React.CSSProperties {
  return {
    padding: '10px',
    color: color || 'var(--fg-secondary)',
    fontFamily: mono === 'mono' ? 'var(--font-mono)' : 'var(--font-sans)',
    fontSize: mono === 'mono' ? 11 : 12.5,
    verticalAlign: 'top',
  };
}

function statusPill(tone: 'ok' | 'amber'): React.CSSProperties {
  const isOk = tone === 'ok';
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    padding: '3px 8px',
    borderRadius: 4,
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: isOk ? 'var(--ok)' : 'var(--warn)',
    background: isOk ? 'rgba(34,197,94,0.08)' : 'rgba(245,158,11,0.08)',
    border: `1px solid ${isOk ? 'rgba(34,197,94,0.25)' : 'rgba(245,158,11,0.25)'}`,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ReconciliationUI({ motion = true, compact = false }: ReconciliationUIProps) {
  const [tick, setTick] = useState(0);
  const [matched, setMatched] = useState(motion ? 0 : 4128);
  const [mismatched, setMismatched] = useState(motion ? 0 : 17);
  const [progressing, setProgressing] = useState(motion);

  const visibleCount = motion ? Math.min(RECON_ROWS_BASE.length, tick) : RECON_ROWS_BASE.length;
  const rows = RECON_ROWS_BASE.slice(0, visibleCount);

  // Stream in rows + tick totals while progressing.
  useEffect(() => {
    if (!motion) return;
    let raf: number;
    let last = performance.now();
    const tickFn = (now: number) => {
      const dt = now - last;
      if (dt > 380) {
        last = now;
        setTick((t) => {
          const next = t + 1;
          if (next > RECON_ROWS_BASE.length) {
            // Done streaming; continue ticking totals up.
            setMatched((m) => Math.min(4128, m + 280 + Math.floor(Math.random() * 80)));
            setMismatched((m) => Math.min(17, m + 1));
            if (matched >= 4128 && mismatched >= 17) setProgressing(false);
            return next;
          }
          // Per-row, bump counters slightly.
          const r = RECON_ROWS_BASE[t];
          if (r && r.state === 'match') setMatched((m) => Math.min(4128, m + 340));
          if (r && r.state === 'mismatch') setMismatched((m) => Math.min(17, m + 1));
          return next;
        });
      }
      raf = requestAnimationFrame(tickFn);
    };
    raf = requestAnimationFrame(tickFn);
    return () => cancelAnimationFrame(raf);
  }, [motion, matched, mismatched]);

  // Loop: after a few seconds, restart.
  useEffect(() => {
    if (!motion) return;
    if (tick >= RECON_ROWS_BASE.length + 8) {
      const t = setTimeout(() => {
        setTick(0);
        setMatched(0);
        setMismatched(0);
        setProgressing(true);
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [tick, motion]);

  const totalRows = motion ? matched + mismatched : 4145;
  const pct = Math.min(100, (totalRows / 4145) * 100);

  return (
    <div className="product-ui">
      <div className="product-ui-hd">
        <div className="dots">
          <span></span><span></span><span></span>
        </div>
        <span className="breadcrumb" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}>
          whitebooks ▸ Oct ▸ GSTR-2B
        </span>
        <span style={{ marginLeft: 'auto', color: 'var(--ok)', display: 'flex', alignItems: 'center', gap: 6 } as React.CSSProperties}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ok)', boxShadow: '0 0 8px rgba(34,197,94,0.5)' } as React.CSSProperties}></span>
          {progressing ? 'pulling' : 'live'}
        </span>
      </div>

      {/* Summary strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        borderBottom: '1px solid var(--hairline)',
      } as React.CSSProperties}>
        {[
          { lbl: '2B invoices', val: motion ? Math.round(totalRows).toLocaleString('en-IN') : '4,145', sub: 'October FY26' },
          { lbl: 'Matched',     val: motion ? matched.toLocaleString('en-IN') : '4,128',               sub: '99.6%', tone: 'ok' },
          { lbl: 'Mismatches',  val: motion ? mismatched.toString() : '17',                            sub: 'review', tone: 'amber' },
          { lbl: 'ITC at risk', val: '₹2.4L',                                                          sub: 'Rule 37A' },
        ].map((s, i) => (
          <div key={i} style={{
            padding: '12px 14px',
            borderRight: i < 3 ? '1px solid var(--hairline)' : 'none',
          } as React.CSSProperties}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9.5,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--fg-tertiary)',
            } as React.CSSProperties}>{s.lbl}</div>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 22,
              letterSpacing: '-0.015em',
              color: s.tone === 'ok' ? 'var(--ok)' : s.tone === 'amber' ? 'var(--warn)' : 'var(--fg-primary)',
              marginTop: 5,
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1.1,
            } as React.CSSProperties}>{s.val}</div>
            <div style={{ marginTop: 3, fontSize: 10.5, color: 'var(--fg-tertiary)', fontFamily: 'var(--font-mono)' } as React.CSSProperties}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: 'rgba(255,255,255,0.04)', position: 'relative' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: 'linear-gradient(90deg, var(--gradient-1), var(--gradient-2))',
          boxShadow: '0 0 10px var(--accent-glow)',
          transition: 'width 280ms ease',
        } as React.CSSProperties}></div>
      </div>

      {/* Table */}
      <div style={{ height: compact ? 340 : 380, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, tableLayout: 'fixed' }}>
          <colgroup>
            <col />
            <col style={{ width: '36%' }} />
            <col style={{ width: '22%' }} />
            <col style={{ width: '110px' }} />
          </colgroup>
          <thead>
            <tr>
              <th style={th()}>Vendor</th>
              <th style={th()}>Invoice</th>
              <th style={{ ...th(), textAlign: 'right' }}>Amount</th>
              <th style={th()}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={i + '-' + r.inv}
                style={{ borderBottom: '1px solid var(--hairline)' } as React.CSSProperties}
              >
                <td style={td()}>
                  <div style={{ color: 'var(--fg-primary)', fontSize: 12.5 } as React.CSSProperties}>{r.vendor}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-quaternary)', marginTop: 2, letterSpacing: '0.02em' } as React.CSSProperties}>
                    {r.gstin}
                  </div>
                  {r.state === 'mismatch' && (
                    <div style={{ marginTop: 4, fontSize: 10.5, color: 'var(--warn)', fontFamily: 'var(--font-mono)' } as React.CSSProperties}>
                      {r.reason}
                    </div>
                  )}
                </td>
                <td style={td('mono')}>{r.inv}</td>
                <td style={{ ...td('mono'), textAlign: 'right', color: 'var(--fg-primary)' } as React.CSSProperties}>
                  ₹{r.amt.toLocaleString('en-IN')}
                </td>
                <td style={td()}>
                  {r.state === 'match' ? (
                    <span style={statusPill('ok')}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--ok)' } as React.CSSProperties}></span>
                      Matched
                    </span>
                  ) : (
                    <span style={statusPill('amber')} className={motion ? 'amber-pulse' : ''}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--warn)' } as React.CSSProperties}></span>
                      Review
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Fade-out bottom */}
        <div style={{ position: 'relative', height: 0, marginTop: -56, pointerEvents: 'none' }}>
          <div style={{ height: 56, background: 'linear-gradient(to bottom, transparent, var(--bg-card))' } as React.CSSProperties}></div>
        </div>
      </div>

      {/* Footer status */}
      <div style={{
        padding: '12px 18px',
        borderTop: '1px solid var(--hairline)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--fg-tertiary)',
        background: 'rgba(255,255,255,0.015)',
      } as React.CSSProperties}>
        <div style={{ display: 'flex', gap: 16 }}>
          <span><span style={{ color: 'var(--ok)' } as React.CSSProperties}>●</span> matching engine v3.2</span>
          <span>6,420 inv/min</span>
        </div>
        <div>
          <span style={{ color: 'var(--accent-bright)' } as React.CSSProperties}>file 3B →</span>
        </div>
      </div>
    </div>
  );
}

export default ReconciliationUI;
