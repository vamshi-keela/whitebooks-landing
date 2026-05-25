import { Icon } from "../icons/Icon";

export type ProductMapKey = "accounting" | "gst" | "e-invoice" | "e-way-bill" | "ksa";

interface ProductMapProps {
  active?: ProductMapKey;
}

const PRODUCTS: { id: ProductMapKey; label: string; href: string; Icon: typeof Icon.Accounting }[] = [
  { id: "accounting", label: "Accounting", href: "Software - Accounting.html", Icon: Icon.Accounting },
  { id: "gst", label: "GST", href: "Software - GST.html", Icon: Icon.GST },
  { id: "e-invoice", label: "e-Invoice", href: "Software - e-Invoice.html", Icon: Icon.EInvoice },
  { id: "e-way-bill", label: "e-Way Bill", href: "Software - e-Way Bill.html", Icon: Icon.EWayBill },
  { id: "ksa", label: "KSA e-Invoice", href: "Software - KSA e-Invoicing.html", Icon: Icon.KSA },
];

const COLUMN_X = ["10%", "30%", "50%", "70%", "90%"];

export function ProductMap({ active }: ProductMapProps) {
  return (
    <section className="wb-section wb-pmap-section wb-reveal" data-reveal>
      <div className="wb-wrap">
        <div className="wb-pmap-head">
          <h2 className="wb-h2 wb-pmap-h2">
            Your end-to-end compliance lifecycle <span className="accent">in one place.</span>
          </h2>
          <p className="wb-section-sub wb-pmap-sub">
            Five products. One core platform. One contract, one workspace, one ledger of record — so every workflow from book-keeping to dispatch sees the same data.
          </p>
        </div>

        <div className="wb-pmap">
          <div className="wb-pmap-row">
            {PRODUCTS.map((p) => {
              const isActive = p.id === active;
              const I = p.Icon;
              return (
                <div key={p.id} className="wb-pmap-cell">
                  <a
                    href={p.href}
                    className={`wb-pmap-card ${isActive ? "is-active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <div className="wb-pmap-card-inner">
                      <div className="wb-pmap-icon-wrap">
                        <div className="wb-pmap-icon-bg" aria-hidden="true" />
                        <I width="40" height="40" />
                      </div>
                      <div className="wb-pmap-label">{p.label}</div>
                    </div>
                    {isActive && <span className="wb-pmap-active-pulse" aria-hidden="true" />}
                  </a>
                </div>
              );
            })}
          </div>

          <svg className="wb-pmap-svg" width="100%" height="72" preserveAspectRatio="none" aria-hidden="true">
            {COLUMN_X.map((x, i) => {
              const ids: ProductMapKey[] = ["accounting", "gst", "e-invoice", "e-way-bill", "ksa"];
              const isActive = ids[i] === active;
              return (
                <line
                  key={`v-${i}`}
                  x1={x}
                  y1="0"
                  x2={x}
                  y2="36"
                  stroke={isActive ? "rgba(220,47,101,0.95)" : "rgba(220,47,101,0.55)"}
                  strokeWidth={isActive ? "1.5" : "1"}
                />
              );
            })}
            <line x1="10%" y1="36" x2="90%" y2="36" stroke="rgba(220,47,101,0.45)" strokeWidth="1" />
            <line x1="50%" y1="36" x2="50%" y2="72" stroke="rgba(220,47,101,0.75)" strokeWidth="1.5" />
            {COLUMN_X.map((x, i) => (
              <circle key={`d-${i}`} cx={x} cy="36" r="2.5" fill="rgba(220,47,101,0.85)" />
            ))}
          </svg>

          <div className="wb-pmap-core-row">
            <div className="wb-pmap-core">
              <span className="wb-pmap-core-dot" aria-hidden="true" />
              <div className="wb-pmap-core-text">
                <div className="wb-pmap-core-title">Core Platform</div>
                <div className="wb-pmap-core-sub">GSP pipe · IRP gateway · Identity · Audit log</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
