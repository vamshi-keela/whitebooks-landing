import React from 'react';
import Icon from '@/components/icons/Icon';
import { ButtonLink } from '@/components/ui/Button';
import { Header, Footer, FluidBackground, Eyebrow, Breadcrumb } from '@/layouts/SiteShell';
import { PlainSection, ColumnGrid, SubClose } from '@/layouts/SubpageShell';
import { useReveal } from '@/hooks/useReveal';
import EyebrowPill from '@/components/ui/EyebrowPill';

interface ApiProduct {
  icon: React.ReactNode;
  name: string;
  oneliner: string;
  endpoints: string[];
  bestFor: string;
  href: string;
}

const API_PRODUCTS: ApiProduct[] = [
  {
    icon: <Icon.GstApi />,
    name: "GST API",
    oneliner: "File GSTR returns, pull 2A/2B, validate GSTINs, search HSN — all over REST.",
    endpoints: ["/gstr/file", "/gstin/validate", "/hsn/search"],
    bestFor: "Fintechs, ERPs, tax-tech startups embedding GST capability.",
    href: "/apis/gst",
  },
  {
    icon: <Icon.EInvoice />,
    name: "e-Invoice API",
    oneliner: "Generate IRNs, cancel invoices, issue credit notes — direct IRP pipe.",
    endpoints: ["/einvoice/create", "/einvoice/cancel", "/einvoice/credit-note"],
    bestFor: "Billing systems, ERPs, B2B marketplaces with AATO-above-₹5cr customers.",
    href: "/apis/e-invoice",
  },
  {
    icon: <Icon.EWayBill />,
    name: "e-Way Bill API",
    oneliner: "Generate, extend, cancel e-way bills — auto-populate from IRN or invoice.",
    endpoints: ["/ewaybill/create", "/ewaybill/extend", "/ewaybill/cancel"],
    bestFor: "Logistics platforms, WMS providers, TMS systems, freight brokers.",
    href: "/apis/e-way-bill",
  },
  {
    icon: <Icon.KSA />,
    name: "KSA e-Invoice API",
    oneliner: "Generate ZATCA Phase 2 e-invoices — FATOORAH submission, signing, QR generation.",
    endpoints: ["/ksa/einvoice/create", "/ksa/einvoice/clear", "/ksa/einvoice/csid"],
    bestFor: "SaaS products operating in Saudi Arabia or serving KSA businesses.",
    href: "/apis/ksa",
  },
];

interface ApiCardProps {
  p: ApiProduct;
}

function ApiCard({ p }: ApiCardProps) {
  return (
    <article className="wb-api-card" data-reveal>
      <div className="wb-api-card-head">
        <span className="wb-api-card-icon">{p.icon}</span>
        <h3 className="wb-api-card-name">{p.name}</h3>
      </div>
      <p className="wb-api-card-oneliner">{p.oneliner}</p>
      <div className="wb-api-endpoints">
        {p.endpoints.map((e, i) => (
          <code key={i} className="wb-endpoint-chip">
            <span className="wb-endpoint-method">POST</span>{e}
          </code>
        ))}
      </div>
      <p className="wb-api-best"><span>Best for —</span> {p.bestFor}</p>
      <ButtonLink href={p.href} variant="outline">
        Explore {p.name} <Icon.ArrowRight width="13" height="13" />
      </ButtonLink>
    </article>
  );
}

function CodeSample() {
  return (
    <div className="wb-card wb-terminal" style={{ marginTop: 8 }}>
      <div className="wb-terminal-bar">
        <span className="wb-term-dot r"></span>
        <span className="wb-term-dot y"></span>
        <span className="wb-term-dot g"></span>
        <span className="wb-term-title">node · whitebooks-sdk</span>
      </div>
      <div className="wb-term-body" style={{ minHeight: 200 }}>
        <div><span className="wb-term-comment"># 5 lines from zero to a signed IRN</span></div>
        <div><span className="wb-term-key">import</span> {`{ Whitebooks }`} <span className="wb-term-key">from</span> <span className="wb-term-str">"@whitebooks/sdk"</span>;</div>
        <div><span className="wb-term-key">const</span> wb = <span className="wb-term-key">new</span> Whitebooks({`{`} apiKey: process.env.WB_KEY {`}`});</div>
        <div style={{ height: 6 }}></div>
        <div><span className="wb-term-key">const</span> irn = <span className="wb-term-key">await</span> wb.einvoice.create({`{`}</div>
        <div>{"  "}<span className="wb-term-key">seller_gstin</span>: <span className="wb-term-str">"29AABCT1332L1ZA"</span>,</div>
        <div>{"  "}<span className="wb-term-key">buyer_gstin</span>: <span className="wb-term-str">"07AABCK9988R1ZK"</span>,</div>
        <div>{"  "}<span className="wb-term-key">items</span>: [{`{`} <span className="wb-term-key">hsn</span>: <span className="wb-term-num">8517</span>, <span className="wb-term-key">qty</span>: <span className="wb-term-num">12</span>, <span className="wb-term-key">rate</span>: <span className="wb-term-num">2480</span> {`}`}],</div>
        <div>{`}`});</div>
        <div style={{ height: 6 }}></div>
        <div><span className="wb-term-comment">// irn.irn → "a4f8c91e2b67d0e3..." · 178ms p50</span></div>
      </div>
    </div>
  );
}

export function HubAPIs() {
  useReveal();

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header mode="apis" />
      <main>
        <section style={{ paddingTop: 100, paddingBottom: 0 }}>
          <div className="wb-wrap">
            <Breadcrumb items={[
              { label: "Home", href: "/" },
              { label: "APIs" },
            ]} />
          </div>
        </section>

        {/* Hero */}
        <section className="wb-subhero">
          <FluidBackground />
          <div className="wb-wrap wb-hero-inner">
            <div className="wb-subhero-grid">
              <div>
                <EyebrowPill label={'Whitebooks APIs | v1'} />
                <h1 className="wb-display" style={{ fontSize: "clamp(38px, 5.4vw, 68px)" }}>
                  Compliance APIs that <span className="accent">don't make you build the compliance.</span>
                </h1>
                <p className="wb-subhero-sub" style={{ maxWidth: 660 }}>
                  Four REST APIs for India and KSA — GST, e-Invoice, e-Way Bill, and KSA e-Invoice. Built by a directly licensed GSP, used in production by Razorpay, Pharmeasy, and 200+ teams.
                </p>
                <div className="wb-subhero-cta">
                  <ButtonLink href="#" size="lg" arrow>Get sandbox keys</ButtonLink>
                  <ButtonLink href="#" variant="ghost" size="lg">Read API docs</ButtonLink>
                </div>
              </div>
              <div className="wb-subhero-visual">
                <CodeSample />
              </div>
            </div>
          </div>
        </section>

        {/* Four APIs */}
        <section className="wb-section wb-reveal" data-reveal>
          <div className="wb-wrap">
            <p className="wb-section-label">The four APIs</p>
            <h2 className="wb-h2">
              Four endpoints. <span className="accent">Every compliance operation in India and KSA.</span>
            </h2>
            <div className="wb-api-grid">
              {API_PRODUCTS.map((p, i) => <ApiCard key={i} p={p} />)}
            </div>
          </div>
        </section>

        {/* Why */}
        <PlainSection
          label="Why Whitebooks APIs"
          heading={<><span>What </span><span className="accent">"directly licensed GSP"</span><span> actually buys you.</span></>}
        >
          <ColumnGrid items={[
            {
              title: "Direct pipe, not resold capacity",
              body: "Whitebooks holds its GSP license directly from GSTN. Most API providers in India resell capacity from a licensee. The difference shows up in latency (we're faster), uptime (we're more reliable), and roadmap (we ship on day one of every GSTN release).",
            },
            {
              title: "Production-grade from sandbox onwards",
              body: "Sandbox returns the same response shapes, same error codes, and same rate-limit behavior as production. What works in dev works in prod. No surprise schema differences on launch day.",
            },
            {
              title: "Built for engineers, not procurement",
              body: "Idempotency keys on every write endpoint. HMAC-signed webhooks with replay protection. Public status page. URL-versioned APIs with 12-month deprecation windows.",
            },
          ]} />
        </PlainSection>

        {/* Shared infrastructure */}
        <section className="wb-ai-section wb-section wb-reveal" data-reveal>
          <div className="wb-dot-bg" aria-hidden="true"></div>
          <div className="wb-wrap" style={{ position: "relative", zIndex: 1 }}>
            <p className="wb-section-label">Shared infrastructure</p>
            <h2 className="wb-h2">
              The things that matter to <span className="accent">the person on call at 2am.</span>
            </h2>
            <div className="wb-col-3">
              <div className="wb-block">
                <h3>99.95% uptime SLA</h3>
                <p>Monthly uptime SLA with automatic credit issuance. Public status page at status.whitebooks.in updated within 5 minutes of any detected issue.</p>
              </div>
              <div className="wb-block">
                <h3>Sub-200ms p50 latency</h3>
                <p>Median IRN generation and GSTN response latency under 200ms — measured in production, last 30 days.</p>
              </div>
              <div className="wb-block">
                <h3>SDKs in 5 languages</h3>
                <p>Official SDKs in Node.js, Python, PHP, Java, and Go. Community SDKs in Ruby, .NET, and Elixir. All under permissive open-source licenses on github.com/whitebooks.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <PlainSection
          label="Pricing"
          heading="Pay for calls, not for seats."
          sub="Whitebooks API pricing scales with your call volume, not your team size. Free sandbox for unlimited testing. Production starts at the Startup tier."
        >
          <div style={{ marginTop: 28 }}>
            <ButtonLink href="#" variant="ghost" arrow>See full API pricing</ButtonLink>
          </div>
        </PlainSection>

        {/* Closing */}
        <SubClose
          h2="Sandbox in 5 minutes. Production in 5 days."
          body="Sign up, get sandbox keys immediately, run the quickstart in 30 minutes, move to production within 5 business days after KYC."
          primaryCta={{ label: "Get sandbox keys", href: "#" }}
          secondaryCta={{ label: "Read API Docs", href: "#" }}
        />
      </main>
      <Footer />
    </div>
  );
}
