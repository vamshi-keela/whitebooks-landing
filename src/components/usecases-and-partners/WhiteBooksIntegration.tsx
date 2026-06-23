import React from "react";
import "./WhiteBooksIntegration.css";

const pink = "#de336a";

type IconName = "arrow" | "badge" | "book" | "calculator" | "code" | "file" | "gauge" | "branch" | "headphones" | "lock" | "refresh" | "shield";

function Icon({ name, size = 24, strokeWidth = 2, fill = "none", color = "currentColor" }: { name: IconName; size?: number; strokeWidth?: number; fill?: string; color?: string }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill,
    stroke: color,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  } as const;

  const paths = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    badge: (
      <>
        <path d="M12 3.8 15.6 5l3.1 2.2-.1 3.8.1 3.8-3.1 2.2L12 18.2 8.4 17l-3.1-2.2.1-3.8-.1-3.8L8.4 5z" />
        <path d="m9.2 12 1.8 1.8 3.8-4.2" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.4c0-1 .8-1.7 1.8-1.5 2 .3 3.7 1 5.2 2.1v14c-1.5-1.1-3.2-1.8-5.2-2.1-1-.2-1.8.6-1.8 1.5z" />
        <path d="M20 5.4c0-1-.8-1.7-1.8-1.5-2 .3-3.7 1-5.2 2.1v14c1.5-1.1 3.2-1.8 5.2-2.1 1-.2 1.8.6 1.8 1.5z" />
      </>
    ),
    calculator: (
      <>
        <rect x="5" y="3.5" width="14" height="17" rx="1.6" />
        <path d="M8.4 7h7.2" />
        <path d="M8.5 11h.1M12 11h.1M15.5 11h.1M8.5 14.5h.1M12 14.5h.1M15.5 14.5h.1M8.5 18h.1M12 18h.1M15.5 18h.1" />
      </>
    ),
    code: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1.4" />
        <path d="M7.7 13.5 5.5 12l2.2-1.5" />
        <path d="m16.3 10.5 2.2 1.5-2.2 1.5" />
        <path d="m13.5 8.4-3 7.2" />
      </>
    ),
    file: (
      <>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v5h5" />
        <path d="M9 11h5M9 15h6M9 19h3" />
      </>
    ),
    gauge: (
      <>
        <path d="M4 15a8 8 0 0 1 16 0" />
        <path d="M12 15l4-5" />
        <path d="M6.3 10.3 8 12M17.7 10.3 16 12M12 7v2" />
        <circle cx="12" cy="15" r="1.4" />
      </>
    ),
    branch: (
      <>
        <circle cx="12" cy="5.2" r="2.2" />
        <circle cx="6.2" cy="18.2" r="2.2" />
        <circle cx="17.8" cy="18.2" r="2.2" />
        <path d="M12 7.4v3.2M12 10.6c-3.8 0-5.8 2.1-5.8 5.4M12 10.6c3.8 0 5.8 2.1 5.8 5.4" />
      </>
    ),
    headphones: (
      <>
        <path d="M4.5 14.5v-2.2a7.5 7.5 0 0 1 15 0v2.2" />
        <path d="M4.5 14.5c0-1 .8-1.8 1.8-1.8H8v5H6.3c-1 0-1.8-.8-1.8-1.8z" />
        <path d="M19.5 14.5c0-1-.8-1.8-1.8-1.8H16v5h1.7c1 0 1.8-.8 1.8-1.8z" />
        <path d="M16 19c-1 .8-2.3 1.2-4 1.2" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="10" rx="1.3" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        <path d="M12 14.3v2.5" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 7v5h-5" />
        <path d="M4 17v-5h5" />
        <path d="M18.2 11A6.4 6.4 0 0 0 7 7.2L4 10" />
        <path d="M5.8 13A6.4 6.4 0 0 0 17 16.8l3-2.8" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3.5 19 6v5.3c0 4.4-2.8 7.5-7 9.2-4.2-1.7-7-4.8-7-9.2V6z" />
        <path d="m8.7 12 2.1 2.1 4.5-5" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

const partnerLogos = [
  { type: "sap" },
  { type: "oracle" },
  { type: "dynamics" },
  { type: "marg" },
  { type: "tally" },
  { type: "odoo" },
];

const apiCards: { className: string; label?: string; icon: IconName; text: React.ReactNode }[] = [
  {
    className: "invoice",
    label: "e-Invoice API",
    icon: "file",
    text: (
      <>
        POS, ASP solutions
        <br />
        and Other Integrations
      </>
    ),
  },
  {
    className: "eway",
    label: "e-Way Bill API",
    icon: "refresh",
    text: (
      <>
        Integration with
        <br />
        All ERPs
      </>
    ),
  },
  {
    className: "gst",
    label: "GST API",
    icon: "calculator",
    text: (
      <>
        All Accounting
        <br />
        Software and
        <br />
        platforms
      </>
    ),
  },
  {
    className: "partners",
    icon: "branch",
    text: (
      <>
        All technology Partners,
        <br />
        Businesses &amp; Domains
      </>
    ),
  },
];

const features: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "shield",
    title: "Seamless Integrations",
    body: "APIs designed to fit into your existing workflows effortlessly.",
  },
  {
    icon: "gauge",
    title: "Built for Scale",
    body: "Handle high volumes with reliability and speed.",
  },
  {
    icon: "lock",
    title: "Secure & Compliant",
    body: "Enterprise-grade security with compliance at the core.",
  },
  {
    icon: "code",
    title: "Developer Friendly",
    body: "Well documented APIs with SDKs and easy implementation.",
  },
];

function LogoCard({ logo }: { logo: { type: string } }) {
  return (
    <div className="partner-card">
      {logo.type === "sap" && (
        <div className="logo-sap">
          <span>SAP</span>
        </div>
      )}
      {logo.type === "oracle" && <div className="logo-oracle">ORACLE</div>}
      {logo.type === "dynamics" && (
        <div className="logo-dynamics">
          <span className="dynamics-mark" />
          <span>Dynamics 365</span>
        </div>
      )}
      {logo.type === "marg" && (
        <div className="logo-marg">
          <span>Marg</span>
          <small>The Business Backbone</small>
        </div>
      )}
      {logo.type === "tally" && <div className="logo-tally">Tally</div>}
      {logo.type === "odoo" && <div className="logo-odoo">odoo</div>}
    </div>
  );
}

function OrbitScene() {
  return (
    <section className="orbit-scene" aria-label="WhiteBooks API platform integrations">
      <svg className="orbit-lines" viewBox="0 0 875 430" aria-hidden="true">
        <path
          d="M93 322C132 103 284 40 438 40C607 40 756 123 796 322"
          fill="none"
          stroke="#c8d7ee"
          strokeWidth="1.2"
          strokeDasharray="5 9"
        />
        <g fill="#fff" stroke="#ffd7e5" strokeWidth="6">
          <circle cx="95" cy="324" r="7" />
          <circle cx="292" cy="96" r="7" />
          <circle cx="610" cy="80" r="4.5" />
          <circle cx="792" cy="324" r="7" />
        </g>
        <g fill={pink} opacity=".75">
          <circle cx="95" cy="324" r="2.4" />
          <circle cx="292" cy="96" r="2.4" />
          <circle cx="792" cy="324" r="2.4" />
        </g>
        <g stroke="#ff8bb2" strokeWidth="2" opacity=".65">
          <path d="M346 72l16-5" />
          <path d="M646 95l18 9" />
          <path d="M241 84l-16 9" />
        </g>
        <g filter="url(#glow)">
          <circle cx="501" cy="71" r="3.5" fill="#5c6cf2" opacity=".45" />
          <circle cx="357" cy="69" r="2.5" fill="#ff6f9d" opacity=".6" />
        </g>
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div className="platform">
        <div className="floor-rings" />
        <div className="disc">
          <div className="disc-top">
            <span className="top-light left" />
            <span className="top-light center" />
            <span className="top-light right" />
          </div>
          <div className="disc-front">
            <span className="brand-left">WhiteBooks</span>
            <span className="brand-right">Platform</span>
          </div>
          <div className="wb-cube" aria-hidden="true">
            <span>W</span>
          </div>
        </div>
      </div>

      {apiCards.map((item) => {
        return (
          <div className={`api-node ${item.className}`} key={item.className}>
            {item.label && (
              <>
                <span className="node-arrow" />
                <div className="api-pill">{item.label}</div>
              </>
            )}
            <div className="bubble">
              <Icon name={item.icon} size={48} strokeWidth={2.1} />
              <p>{item.text}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default function WhiteBooksIntegration() {
  return (
    <main className="wb-integration">
      <section className="hero-copy">
        <div className="eyebrow">
          <Icon name="badge" size={17} fill={pink} color="#fff" strokeWidth={2.5} />
          <span>Use Cases &amp; Integration Partners</span>
        </div>

        <h1>
          Powering Businesses.
          <span>Integrated Everywhere.</span>
        </h1>

        <p className="intro">
          WhiteBooks APIs are trusted by platforms, ERPs, fintechs, and domains across India and
          beyond. Easily integrate and automate critical workflows with our production-grade APIs.
        </p>

        <div className="partners-heading">
          <span>Trusted Integration Partners</span>
        </div>

        <div className="partners-grid">
          {partnerLogos.map((logo, index) => (
            <LogoCard logo={logo} key={`${logo.type}-${index}`} />
          ))}
        </div>

        <div className="hero-actions">
          <a className="btn btn-primary" href="#erp-integrations">
            Other ERP Integrations
            <Icon name="arrow" size={22} />
          </a>
          <a className="btn btn-outline" href="#expert">
            <Icon name="headphones" size={21} />
            Talk to an Integration Expert
          </a>
        </div>
      </section>

      <OrbitScene />

      <section className="feature-bar">
        {features.map((feature) => {
          return (
            <article className="feature" key={feature.title}>
              <Icon name={feature.icon} size={54} strokeWidth={1.8} />
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </div>
            </article>
          );
        })}
      </section>

      <aside className="bottom-actions">
        <a className="btn btn-primary" href="#try">
          Try Our WhiteBooks APIs
          <Icon name="arrow" size={21} />
        </a>
        <a className="btn btn-doc" href="#docs">
          <Icon name="book" size={22} />
          API Documentation
        </a>
      </aside>
    </main>
  );
}
