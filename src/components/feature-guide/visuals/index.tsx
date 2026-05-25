import type { ComponentType } from "react";

/* 1. Automated journal posting */
function AutoJournalVisual() {
  const rows: [string, string, string, string][] = [
    ["10:14:02", "Sales A/c · Acme", "+ ₹48,200", "INV-2847"],
    ["10:14:02", "GST Output @18%", "+ ₹8,676", "INV-2847"],
    ["10:14:02", "AR · Acme Ltd", "− ₹56,876", "INV-2847"],
    ["10:18:44", "Bank · HDFC #1240", "+ ₹56,876", "NEFT"],
    ["10:22:11", "Purchase · Vidocity", "− ₹12,400", "BILL-902"],
  ];
  return (
    <div className="wb-fg-mock wb-fg-mock-table">
      <div className="wb-fg-mock-bar">
        <span className="wb-mock-dot r" />
        <span className="wb-mock-dot y" />
        <span className="wb-mock-dot g" />
        <span className="wb-fg-mock-title">journal · today</span>
      </div>
      <div className="wb-fg-table">
        <div className="wb-fg-trow head">
          <span>time</span><span>account</span><span className="r">amount</span><span>src</span>
        </div>
        {rows.map((r, i) => (
          <div key={i} className="wb-fg-trow">
            <span className="m">{r[0]}</span>
            <span>{r[1]}</span>
            <span className={`r ${r[2].startsWith("+") ? "pos" : "neg"}`}>{r[2]}</span>
            <span className="auto">AUTO</span>
          </div>
        ))}
      </div>
      <div className="wb-fg-mock-foot">
        <span className="wb-fg-pill ok">247 auto-posted</span>
        <span className="wb-fg-pill warn">3 exceptions</span>
      </div>
    </div>
  );
}

/* 2. Multi-entity consolidation */
function MultiEntityVisual() {
  const names = ["Acme Industries", "Acme Logistics", "Acme Retail"];
  const gstins = ["29ABCDE", "27ABCDE", "07ABCDE"];
  const revs = ["12.4", "8.1", "3.9"];
  return (
    <div className="wb-fg-mock wb-fg-mock-tree">
      <div className="wb-fg-tree-row">
        {names.map((n, i) => (
          <div key={i} className="wb-fg-entity">
            <div className="wb-fg-entity-name">{n}</div>
            <div className="wb-fg-entity-meta">GSTIN&nbsp;·&nbsp;{gstins[i]}</div>
            <div className="wb-fg-entity-rev">₹ {revs[i]} Cr</div>
          </div>
        ))}
      </div>
      <svg className="wb-fg-tree-svg" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
        <line x1="16.66" y1="0" x2="16.66" y2="14" stroke="rgba(220,47,101,0.6)" strokeWidth="0.5" />
        <line x1="50" y1="0" x2="50" y2="14" stroke="rgba(220,47,101,0.6)" strokeWidth="0.5" />
        <line x1="83.33" y1="0" x2="83.33" y2="14" stroke="rgba(220,47,101,0.6)" strokeWidth="0.5" />
        <line x1="16.66" y1="14" x2="83.33" y2="14" stroke="rgba(220,47,101,0.4)" strokeWidth="0.5" />
        <line x1="50" y1="14" x2="50" y2="28" stroke="rgba(220,47,101,0.7)" strokeWidth="0.7" />
      </svg>
      <div className="wb-fg-group">
        <div className="wb-fg-group-label">Consolidated Group</div>
        <div className="wb-fg-group-rev">₹ 24.4 Cr <span>· post inter-co elims</span></div>
      </div>
    </div>
  );
}

/* 3. GST-aware chart of accounts */
function GstChartVisual() {
  return (
    <div className="wb-fg-mock wb-fg-mock-ledger">
      <div className="wb-fg-ledger-head">CHART OF ACCOUNTS · LEDGER TREE</div>
      <ul className="wb-fg-ledger-tree">
        <li>
          <span className="wb-fg-led-name">Sales</span>
          <ul>
            <li><span className="wb-fg-led-name">Interstate</span><span className="wb-fg-led-tag">IGST&nbsp;18%</span></li>
            <li><span className="wb-fg-led-name">Intrastate</span><span className="wb-fg-led-tag">CGST&nbsp;9% + SGST&nbsp;9%</span></li>
            <li><span className="wb-fg-led-name">Export · Zero-rated</span><span className="wb-fg-led-tag">LUT</span></li>
          </ul>
        </li>
        <li>
          <span className="wb-fg-led-name">Purchases</span>
          <ul>
            <li><span className="wb-fg-led-name">RCM Imports</span><span className="wb-fg-led-tag">RCM&nbsp;18%</span></li>
            <li><span className="wb-fg-led-name">Capital Goods</span><span className="wb-fg-led-tag">ITC&nbsp;tracked</span></li>
          </ul>
        </li>
        <li>
          <span className="wb-fg-led-name">Indirect Taxes</span>
          <ul>
            <li><span className="wb-fg-led-name">Input Tax Credit</span><span className="wb-fg-led-tag">ISD&nbsp;routing</span></li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

/* 4. Bank reconciliation */
function BankReconVisual() {
  const rows: [string, string, string, string, "match" | "unmatched"][] = [
    ["NEFT Acme Ltd", "₹ 56,876", "HDFC: NEFT/RP/INV2847", "₹ 56,876", "match"],
    ["UPI Vidocity", "₹ 12,400", "UPI@yblr/qcom29", "₹ 12,400", "match"],
    ["Razorpay payout", "₹ 1,02,440", "RAZORX SETTLEMENT", "₹ 1,02,440", "match"],
    ["Vendor — TBD", "—", "IMPS: ABC TRADERS", "₹ 7,800", "unmatched"],
  ];
  return (
    <div className="wb-fg-mock wb-fg-mock-recon">
      <div className="wb-fg-recon-head">
        <div>BOOKS</div>
        <div className="wb-fg-recon-vs">↔</div>
        <div>HDFC&nbsp;·&nbsp;7240</div>
      </div>
      {rows.map((r, i) => (
        <div key={i} className={`wb-fg-recon-row ${r[4]}`}>
          <div className="wb-fg-recon-l">
            <div className="wb-fg-recon-name">{r[0]}</div>
            <div className="wb-fg-recon-amt">{r[1]}</div>
          </div>
          <div className="wb-fg-recon-link">{r[4] === "match" ? "✓" : "?"}</div>
          <div className="wb-fg-recon-r">
            <div className="wb-fg-recon-name">{r[2]}</div>
            <div className="wb-fg-recon-amt">{r[3]}</div>
          </div>
        </div>
      ))}
      <div className="wb-fg-mock-foot">
        <span className="wb-fg-pill ok">98.3% auto-matched</span>
        <span className="wb-fg-pill warn">1 to review</span>
      </div>
    </div>
  );
}

/* 5. Audit-ready reports */
function AuditReportsVisual() {
  const bars = [68, 82, 91, 77, 88, 95];
  return (
    <div className="wb-fg-mock wb-fg-mock-report">
      <div className="wb-fg-report-head">
        <div>
          <div className="wb-fg-report-title">Profit &amp; Loss · FY 25–26</div>
          <div className="wb-fg-report-sub">Schedule III · INR · all entities</div>
        </div>
        <span className="wb-fg-pill ok">audit-ready</span>
      </div>
      <div className="wb-fg-bars">
        {bars.map((h, i) => (
          <div key={i} className="wb-fg-bar"><span style={{ height: `${h}%` }} /></div>
        ))}
      </div>
      <div className="wb-fg-report-rows">
        <div><span>Revenue from operations</span><span className="r">₹ 12.4 Cr</span></div>
        <div><span>EBITDA</span><span className="r">₹ 2.8 Cr</span></div>
        <div><span>Profit before tax</span><span className="r">₹ 2.1 Cr</span></div>
      </div>
      <div className="wb-fg-export">
        <span>EXPORT</span>
        <button>PDF</button>
        <button>Excel</button>
        <button>Auditor portal</button>
      </div>
    </div>
  );
}

/* 6. Role-based access */
function RolesVisual() {
  const rows: [string, string[]][] = [
    ["Junior Accountant", ["●", "○", "○", "○"]],
    ["Senior Accountant", ["●", "●", "●", "○"]],
    ["CFO", ["○", "●", "●", "●"]],
    ["External Auditor", ["○", "○", "●", "●"]],
  ];
  return (
    <div className="wb-fg-mock wb-fg-mock-roles">
      <div className="wb-fg-roles-head">
        <span />
        <span>Enter</span>
        <span>Approve</span>
        <span>Reports</span>
        <span>Audit log</span>
      </div>
      {rows.map((row, i) => (
        <div key={i} className="wb-fg-roles-row">
          <span className="wb-fg-roles-name">{row[0]}</span>
          {row[1].map((v, j) => (
            <span key={j} className={`wb-fg-roles-cell ${v === "●" ? "on" : "off"}`}>{v}</span>
          ))}
        </div>
      ))}
      <div className="wb-fg-mock-foot">
        <span className="wb-fg-pill">granular · not admin/non-admin</span>
      </div>
    </div>
  );
}

/* 7. Continuous close */
function ContinuousCloseVisual() {
  return (
    <div className="wb-fg-mock wb-fg-mock-calendar">
      <div className="wb-fg-cal-head">
        <span>NOVEMBER 2026 · daily close</span>
        <span className="wb-fg-pill ok">on track</span>
      </div>
      <div className="wb-fg-cal-grid">
        {Array.from({ length: 30 }).map((_, i) => {
          const day = i + 1;
          const isPast = day <= 18;
          const isToday = day === 18;
          const isFuture = day > 18;
          return (
            <div
              key={i}
              className={`wb-fg-cal-day ${isPast ? "done" : ""} ${isToday ? "today" : ""} ${isFuture ? "pending" : ""}`}
            >
              <span className="wb-fg-cal-num">{day}</span>
              {isPast && <span className="wb-fg-cal-tick">✓</span>}
            </div>
          );
        })}
      </div>
      <div className="wb-fg-cal-foot">
        <div><span className="wb-fg-cal-legend done">✓</span> reconciled</div>
        <div><span className="wb-fg-cal-legend today" /> today</div>
        <div><span className="wb-fg-cal-legend pending" /> pending</div>
      </div>
    </div>
  );
}

/* 8. Native integration */
function NativeIntegrationVisual() {
  return (
    <div className="wb-fg-mock wb-fg-mock-pipe">
      <div className="wb-fg-pipe-row">
        <div className="wb-fg-pipe-node">
          <div className="wb-fg-pipe-name">e-Invoice</div>
          <div className="wb-fg-pipe-meta">IRN&nbsp;·&nbsp;4F2A···</div>
        </div>
        <div className="wb-fg-pipe-link"><span className="dot" /> auto-pushed</div>
        <div className="wb-fg-pipe-node accent">
          <div className="wb-fg-pipe-name">Accounting</div>
          <div className="wb-fg-pipe-meta">Sales journal · auto</div>
        </div>
        <div className="wb-fg-pipe-link"><span className="dot" /> auto-reflected</div>
        <div className="wb-fg-pipe-node">
          <div className="wb-fg-pipe-name">GST</div>
          <div className="wb-fg-pipe-meta">GSTR-2B · matched</div>
        </div>
      </div>
      <div className="wb-fg-pipe-evidence">
        <div className="wb-fg-pipe-row2">
          <span>2 minutes ago</span>
          <span className="wb-fg-pipe-arrow">→</span>
          <span>journal line 1,248 created automatically</span>
        </div>
        <div className="wb-fg-pipe-row2">
          <span>Today 09:14</span>
          <span className="wb-fg-pipe-arrow">→</span>
          <span>GSTR-2B credit ₹8,676 mirrored to purchase ledger</span>
        </div>
      </div>
      <div className="wb-fg-mock-foot">
        <span className="wb-fg-pill">no CSV · no double entry</span>
      </div>
    </div>
  );
}

export const VISUALS: Record<string, ComponentType> = {
  "auto-journal": AutoJournalVisual,
  "multi-entity": MultiEntityVisual,
  "gst-chart": GstChartVisual,
  "bank-recon": BankReconVisual,
  "audit-reports": AuditReportsVisual,
  roles: RolesVisual,
  "continuous-close": ContinuousCloseVisual,
  "native-integration": NativeIntegrationVisual,
};

export function DefaultVisual({ title }: { title: string }) {
  return (
    <div className="wb-fg-mock wb-fg-mock-default">
      <div className="wb-fg-mock-bar">
        <span className="wb-mock-dot r" />
        <span className="wb-mock-dot y" />
        <span className="wb-mock-dot g" />
        <span className="wb-fg-mock-title">preview</span>
      </div>
      <div className="wb-fg-mock-default-body">
        <div className="wb-fg-mock-default-title">{title}</div>
        <div className="wb-fg-mock-default-sub">UI preview · drop a screenshot here</div>
      </div>
    </div>
  );
}
