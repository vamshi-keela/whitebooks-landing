// src/pages/gst-api/PageGSTAPI.tsx — Whitebooks GST API (developer page)

import React from "react";
import type { RouteKey } from "@/hooks/useHashRoute";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FAQ } from "@/components/ui/FAQ";
import { ClosingCTA } from "@/components/ui/ClosingCTA";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { StatStrip } from "@/components/ui/StatStrip";
import { TerminalUI } from "@/sections/heros/Heros";
import { QuoteCard } from "@/components/ui/QuoteCard";
import { TickMark } from "@/components/ui/TickMark";

interface PageGSTAPIProps {
  motion: boolean;
  intensity: number;
  navigate: (r: RouteKey) => void;
}

export function PageGSTAPI({ motion, intensity, navigate }: PageGSTAPIProps) {
  const CODE_SAMPLES = {
    node: `<span class="com">// Node.js — generate an IRN</span>
<span class="kw">import</span> { Whitebooks } <span class="kw">from</span> <span class="str">'@whitebooks/sdk'</span>;
<span class="kw">const</span> wb = <span class="kw">new</span> <span class="fn">Whitebooks</span>(process.env.WHITEBOOKS_KEY);

<span class="kw">const</span> { irn, qr_code, ack_no } = <span class="kw">await</span> wb.einvoice.<span class="fn">create</span>({
  supplier_gstin: <span class="str">'29AAACR5055K1Z5'</span>,
  buyer_gstin:    <span class="str">'27AAFCD5862R000'</span>,
  invoice_no:     <span class="str">'INV-2026-00421'</span>,
  invoice_date:   <span class="str">'2026-05-16'</span>,
  items:          [<span class="com">/* line items */</span>]
});

<span class="com">// 200 OK · 180ms (p50, production, last 30 days)</span>`,
    python: `<span class="com"># Python — generate an IRN</span>
<span class="kw">from</span> whitebooks <span class="kw">import</span> Whitebooks
wb = <span class="fn">Whitebooks</span>(api_key=os.environ[<span class="str">'WHITEBOOKS_KEY'</span>])

response = wb.einvoice.<span class="fn">create</span>(
    supplier_gstin=<span class="str">'29AAACR5055K1Z5'</span>,
    buyer_gstin=<span class="str">'27AAFCD5862R000'</span>,
    invoice_no=<span class="str">'INV-2026-00421'</span>,
    invoice_date=<span class="str">'2026-05-16'</span>,
    items=[...]
)`,
    curl: `<span class="com"># cURL</span>
<span class="kw">curl</span> https://api.whitebooks.in/v1/einvoice \\
  -H <span class="str">"Authorization: Bearer $WHITEBOOKS_KEY"</span> \\
  -H <span class="str">"Content-Type: application/json"</span> \\
  -d '{
    <span class="str">"supplier_gstin"</span>: <span class="str">"29AAACR5055K1Z5"</span>,
    <span class="str">"buyer_gstin"</span>:    <span class="str">"27AAFCD5862R000"</span>,
    <span class="str">"invoice_no"</span>:     <span class="str">"INV-2026-00421"</span>,
    <span class="str">"invoice_date"</span>:   <span class="str">"2026-05-16"</span>,
    <span class="str">"items"</span>:          [...]
  }'`,
    php: `<span class="com">// PHP — generate an IRN</span>
<span class="kw">use</span> Whitebooks\\Client;
$wb = <span class="kw">new</span> <span class="fn">Client</span>(getenv(<span class="str">'WHITEBOOKS_KEY'</span>));

$response = $wb->einvoice-><span class="fn">create</span>([
  <span class="str">'supplier_gstin'</span> => <span class="str">'29AAACR5055K1Z5'</span>,
  <span class="str">'buyer_gstin'</span>    => <span class="str">'27AAFCD5862R000'</span>,
  <span class="str">'invoice_no'</span>     => <span class="str">'INV-2026-00421'</span>,
  <span class="str">'invoice_date'</span>   => <span class="str">'2026-05-16'</span>,
  <span class="str">'items'</span>          => [...]
]);`,
  };

  return (
    <>
      {/* ── Hero (Terminal variant, always — this page IS the dev story) ── */}
      <section
        className="section relative"
        style={{ overflow: "hidden", paddingTop: 100, paddingBottom: 100 }}
      >
        <HeroBackdrop intensity={intensity} />
        <div
          className="container relative"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
              gap: 56,
              alignItems: "center",
            }}
          >
            <div>
              <div className="eyebrow eyebrow-accent">
                <TickMark width={12} height={12} />
                GST API | Direct GSP pipe to GSTN
              </div>
              <h1 className="h-display" style={{ marginTop: 22 }}>
                The compliance API that{" "}
                <em>doesn't make you build the compliance.</em>
              </h1>
              <p className="lede" style={{ marginTop: 26 }}>
                File returns, generate IRNs, validate GSTINs, and pull
                GSTR-2A/2B — over a REST API built by a GSTN-licensed GSP. No
                resold endpoints. No mystery downtime. SDKs in Node, Python,
                PHP, Java, and Go.
              </p>
              <div
                style={{
                  marginTop: 32,
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="#"
                  className="btn btn-accent btn-arrow"
                  onClick={(e) => e.preventDefault()}
                >
                  Get sandbox keys
                </a>
                <a
                  href="#"
                  className="btn btn-ghost"
                  onClick={(e) => e.preventDefault()}
                >
                  Read the docs
                </a>
              </div>
              <div
                style={{
                  marginTop: 22,
                  fontSize: 13,
                  color: "var(--fg-tertiary)",
                }}
              >
                Used in production by{" "}
                <span style={{ color: "var(--fg-secondary)" }}>Razorpay</span>,{" "}
                <span style={{ color: "var(--fg-secondary)" }}>Pharmeasy</span>,{" "}
                <span style={{ color: "var(--fg-secondary)" }}>Cars24</span>,{" "}
                <span style={{ color: "var(--fg-secondary)" }}>WheelsEye</span>,
                and 200+ developer teams.
              </div>
              <div
                style={{
                  marginTop: 36,
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 14,
                }}
              >
                {[
                  { k: "<200ms", v: "IRN p50" },
                  { k: "99.95%", v: "uptime" },
                  { k: "5 min", v: "sandbox" },
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      paddingLeft: 14,
                      borderLeft: "1px solid var(--hairline-strong)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: 28,
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {s.k}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--fg-tertiary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginTop: 4,
                      }}
                    >
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <TerminalUI motion={motion} />
          </div>
        </div>
      </section>

      {/* ── Five lines to your first IRN ── */}
      <section className="section hairline">
        <div className="container">
          <SectionLabel num="01">First contact</SectionLabel>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)",
              gap: 64,
              alignItems: "start",
            }}
          >
            <div>
              <h2 className="h1">
                Five lines to <em>your first IRN.</em>
              </h2>
              <p className="lede" style={{ marginTop: 22 }}>
                Developers evaluate APIs by reading code. So we put it where you
                land.
              </p>
              <div
                style={{
                  marginTop: 32,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {[
                  "No XML. No SOAP.",
                  "Idempotency keys on every write.",
                  "SDKs in Node, Python, PHP, Java, Go.",
                  "Sandbox parity with production.",
                ].map((p, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      fontSize: 14,
                      color: "var(--fg-secondary)",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--accent)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {p}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 36 }}>
                <a
                  href="#"
                  className="link-arrow link-arrow-accent"
                  onClick={(e) => e.preventDefault()}
                >
                  Full API reference
                </a>
              </div>
            </div>
            <div>
              <CodeBlock samples={CODE_SAMPLES} defaultLang="node" />
              <div
                style={{
                  marginTop: 16,
                  padding: "12px 16px",
                  border: "1px solid var(--hairline)",
                  borderRadius: 8,
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--fg-tertiary)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  <span style={{ color: "var(--ok)" }}>● 200 OK</span> ·
                  response in 180ms (p50, last 30 days)
                </span>
                <span style={{ color: "var(--fg-quaternary)" }}>
                  req_a4f2c91e8b7d3
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Six endpoints ── */}
      <section className="section section-light hairline">
        <div className="container">
          <SectionLabel num="02">Endpoints</SectionLabel>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "end",
              marginBottom: 56,
            }}
          >
            <h2 className="h2">
              Six endpoints.
              <br />
              <em>Every compliance operation in India.</em>
            </h2>
            <p
              className="body"
              style={{
                maxWidth: 440,
                justifySelf: "end",
                color: "var(--light-fg-sec)",
              }}
            >
              JSON in, JSON out. Versioned URLs. Standard HTTP. The boring parts
              done right so you don't have to.
            </p>
          </div>
          <div
            className="grid-3"
            style={{
              gap: 0,
              border: "1px solid var(--light-hairline)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
            }}
          >
            {[
              {
                path: "/einvoice",
                tag: "POST",
                title: "IRN + QR for B2B invoices",
                body: "Direct IRP integration. Sub-200ms p50 latency. Handles credit notes, debit notes, and e-invoice cancellation.",
              },
              {
                path: "/ewaybill",
                tag: "POST",
                title: "Generate, extend, cancel",
                body: "Auto-populate from existing IRN. Real-time validity check. Extension and cancellation included.",
              },
              {
                path: "/gstr/*",
                tag: "POST",
                title: "File and pull returns",
                body: "File GSTR-1, 1A, 3B, 9, 9C. Pull GSTR-2A, 2B, and IMS data. JSON in, JSON out — no XML, no SOAP.",
              },
              {
                path: "/gstin/validate",
                tag: "GET",
                title: "Validate any GSTIN",
                body: "Returns legal name, trade name, registration status, and last filing date — straight from the GSTN registry.",
              },
              {
                path: "/hsn",
                tag: "GET",
                title: "Search HSN and SAC",
                body: "Description, current GST 2.0 slab, and last revision date. Your code stops hard-coding rates.",
              },
              {
                path: "/webhooks",
                tag: "POST",
                title: "Subscribe to events",
                body: "IRN generated, e-way bill expired, return filed, notice received. Signed payloads. Retry with exponential backoff.",
              },
            ].map((e, i) => (
              <div
                key={i}
                style={{
                  padding: 28,
                  background: "var(--light-elev)",
                  borderRight:
                    (i + 1) % 3 !== 0
                      ? "1px solid var(--light-hairline)"
                      : "none",
                  borderBottom:
                    i < 3 ? "1px solid var(--light-hairline)" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      padding: "2px 7px",
                      background:
                        e.tag === "POST"
                          ? "rgba(220,47,101,0.1)"
                          : "rgba(0,0,0,0.05)",
                      color:
                        e.tag === "POST"
                          ? "var(--accent)"
                          : "var(--light-fg-sec)",
                      borderRadius: 4,
                      letterSpacing: "0.04em",
                      fontWeight: 600,
                    }}
                  >
                    {e.tag}
                  </span>
                  <code
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 14,
                      color: "var(--light-fg)",
                    }}
                  >
                    {e.path}
                  </code>
                </div>
                <h3
                  className="h3"
                  style={{
                    marginTop: 16,
                    fontSize: 17,
                    color: "var(--light-fg)",
                  }}
                >
                  {e.title}
                </h3>
                <p
                  className="body"
                  style={{
                    marginTop: 10,
                    fontSize: 13.5,
                    color: "var(--light-fg-sec)",
                  }}
                >
                  {e.body}
                </p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <a
              href="#"
              className="link-arrow"
              style={{ color: "var(--light-fg)" }}
              onClick={(e) => e.preventDefault()}
            >
              Full API reference
            </a>
          </div>
        </div>
      </section>

      {/* ── Why this API ── */}
      <section className="section hairline">
        <div className="container">
          <SectionLabel num="03">Compared</SectionLabel>
          <h2 className="h1" style={{ marginBottom: 48, maxWidth: 920 }}>
            What "<em>directly licensed GSP</em>" actually buys you.
          </h2>
          <div
            style={{
              border: "1px solid var(--hairline)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
            }}
          >
            <table className="tbl">
              <thead>
                <tr>
                  <th style={{ width: "32%" }}></th>
                  <th style={{ color: "var(--accent-bright)" }}>Whitebooks</th>
                  <th>Resold GSP APIs</th>
                  <th>Build-your-own</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "GSP license held",
                    "Direct (BVM IT Consulting)",
                    "Resold from a licensee",
                    "None — go through a GSP",
                  ],
                  ["Median IRN latency", "<200ms", "400–800ms", "1–3s"],
                  ["Sandbox setup", "5 minutes", "1–3 days", "4–6 weeks"],
                  ["Uptime SLA", "99.95%", "99.5% typical", "Your problem"],
                  [
                    "GST 2.0 rate update lag",
                    "72 hours",
                    "2–4 weeks",
                    "Build it",
                  ],
                  [
                    "IMS support (Oct 2025)",
                    "Day-one",
                    "Most: still building",
                    "Build it",
                  ],
                  [
                    "Support response time",
                    "<2 hours, 24/7",
                    "Email queue",
                    "n/a",
                  ],
                ].map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => {
                      const winner = j === 1;
                      return (
                        <td
                          key={j}
                          style={{
                            color: winner
                              ? "var(--fg-primary)"
                              : j === 0
                                ? "var(--fg-primary)"
                                : "var(--fg-tertiary)",
                            fontWeight: winner ? 500 : 400,
                            fontFamily:
                              j === 0 ? "var(--font-sans)" : "var(--font-mono)",
                            fontSize: j === 0 ? 14 : 13,
                          }}
                        >
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 11.5,
              color: "var(--fg-quaternary)",
              fontFamily: "var(--font-mono)",
            }}
          >
            ⤷ Comparison reflects publicly available data and Whitebooks
            production metrics for FY 2024–25. Numbers update quarterly.
          </div>
        </div>
      </section>

      {/* ── Production stories ── */}
      <section className="section hairline">
        <div className="container">
          <SectionLabel num="04">Production stories</SectionLabel>
          <h2 className="h1" style={{ marginBottom: 48 }}>
            What developers have <em>shipped</em> on Whitebooks.
          </h2>
          <div className="grid-3">
            {[
              {
                co: "Razorpay",
                mono: "einvoice · merchants",
                body: "Embedded GST e-invoicing in Razorpay's payment-and-invoice product. Generates IRNs for 100,000+ merchants without operating its own GSP relationship.",
              },
              {
                co: "Pharmeasy",
                mono: "ewaybill · 14 wh",
                body: "Generates e-way bills for every dispatch from 14 warehouses, in real time, inside its own OMS. Single API integration. Zero portal logins.",
              },
              {
                co: "WheelsEye",
                mono: "gstin · 50k/mo",
                body: "Validates 50,000+ GSTINs per month for fleet onboarding and reconciles transporter invoices against GSTR-2B via the Whitebooks API.",
              },
            ].map((c, i) => (
              <div key={i} className="card" style={{ padding: 32 }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 24,
                    letterSpacing: "0.02em",
                    color: "var(--fg-primary)",
                    fontWeight: 500,
                  }}
                >
                  {c.co}
                </div>
                <div className="mono-tag" style={{ marginTop: 14 }}>
                  <span className="dot"></span>
                  {c.mono}
                </div>
                <p className="body" style={{ marginTop: 18, fontSize: 14 }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48 }}>
            <QuoteCard
              big
              quote="Whitebooks is solving GST complex problems like e-Invoicing and e-way bills with simple APIs. I'd recommend incorporating Whitebooks for any team that wants its system future-ready."
              name="CA Atul Garg"
              role="Finance Controller · WheelsEye"
            />
          </div>
        </div>
      </section>

      {/* ── Built for engineers ── */}
      <section className="section hairline">
        <div className="container">
          <SectionLabel num="05">2am-friendly</SectionLabel>
          <h2 className="h1" style={{ marginBottom: 48, maxWidth: 920 }}>
            The things that matter to <em>the person on call at 2am.</em>
          </h2>
          <div className="grid-3">
            {[
              {
                mono: "POST /v1/einvoice",
                title: "Idempotency keys",
                body: "Every write endpoint accepts an Idempotency-Key header. Retry safely. No duplicate IRNs from a flaky network.",
              },
              {
                mono: "X-Webhook-Sig",
                title: "Webhook signatures",
                body: "HMAC-SHA256 signed payloads. Verify with your secret. Replay protection with timestamp validation. Standard, not invented-here.",
              },
              {
                mono: "status.whitebooks",
                title: "Public status page",
                body: "status.whitebooks.in — public, real-time, with incident history. We post within 5 minutes of detecting a partial outage.",
              },
              {
                mono: "X-RateLimit",
                title: "Rate limits, in plain English",
                body: "Sandbox: 100 req/min. Production: 1,000 req/sec default, lifts on request, no hidden cap. Headers tell you exactly how many you have left.",
              },
              {
                mono: "/v1/ → /v2/",
                title: "Versioning that won't break you",
                body: "URL-versioned (/v1/, /v2/). Breaking changes only on major versions. Minimum 12-month deprecation window with email notifications and migration guides.",
              },
              {
                mono: "sandbox = prod",
                title: "Sandbox parity",
                body: "Sandbox returns the same response shapes, the same error codes, and the same rate-limit behavior as production. What works in dev works in prod.",
              },
            ].map((f, i) => (
              <div key={i}>
                <div className="mono-tag">
                  <span className="dot"></span>
                  {f.mono}
                </div>
                <h3 className="h3" style={{ marginTop: 18, fontSize: 20 }}>
                  {f.title}
                </h3>
                <p className="body" style={{ marginTop: 10, fontSize: 14 }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Get started ── */}
      <section className="section section-light hairline">
        <div className="container">
          <SectionLabel num="06">Get started</SectionLabel>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "end",
              marginBottom: 56,
            }}
          >
            <h2 className="h2">
              Sandbox keys in 5 minutes.
              <br />
              <em>Production in 5 days.</em>
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0,
              border: "1px solid var(--light-hairline)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
            }}
          >
            {[
              {
                n: "01",
                title: "Sign up free",
                body: "Email + verify. No card required.",
                mono: "t+0",
              },
              {
                n: "02",
                title: "Get sandbox keys",
                body: "Visible in dashboard immediately. Test against full sandbox environment.",
                mono: "t+5min",
              },
              {
                n: "03",
                title: "Run the quickstart",
                body: "30-minute tutorial: generate an IRN, file a GSTR-1, pull a 2B.",
                mono: "t+35min",
              },
              {
                n: "04",
                title: "Move to production",
                body: "KYC verification, signed agreement, production keys. Median 5 business days.",
                mono: "t+5d",
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: 32,
                  background: "var(--light-elev)",
                  borderRight:
                    i < 3 ? "1px solid var(--light-hairline)" : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    color: "var(--accent)",
                    letterSpacing: "0.04em",
                  }}
                >
                  STEP {s.n}
                </div>
                <h3
                  className="h3"
                  style={{
                    marginTop: 18,
                    fontSize: 19,
                    color: "var(--light-fg)",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="body"
                  style={{
                    marginTop: 10,
                    fontSize: 13,
                    color: "var(--light-fg-sec)",
                  }}
                >
                  {s.body}
                </p>
                <div className="mono-tag" style={{ marginTop: 18 }}>
                  <span
                    className="dot"
                    style={{ background: "var(--accent)" }}
                  ></span>
                  {s.mono}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, display: "flex", gap: 14 }}>
            <a
              href="#"
              className="btn btn-accent btn-arrow"
              onClick={(e) => e.preventDefault()}
            >
              Sign up — get sandbox keys
            </a>
            <a
              href="#"
              className="btn btn-ghost"
              onClick={(e) => e.preventDefault()}
            >
              Talk to a solutions engineer
            </a>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="section hairline">
        <div className="container">
          <SectionLabel num="07">Pricing</SectionLabel>
          <h2 className="h2" style={{ marginBottom: 48 }}>
            API pricing — pay for calls, not seats.
          </h2>
          <div className="grid-3">
            {[
              {
                name: "Developer",
                price: "Free",
                unit: "",
                perks: [
                  "10,000 sandbox calls/month",
                  "Community Slack",
                  "No production access",
                ],
              },
              {
                name: "Startup",
                price: "14,999",
                unit: "/ month · from",
                perks: [
                  "50,000 production calls/month",
                  "Email support, <8hr",
                  "Standard SLA",
                ],
                featured: true,
              },
              {
                name: "Scale",
                price: "Custom",
                unit: "",
                perks: [
                  "Unlimited production calls",
                  "Dedicated infrastructure",
                  "<2hr support",
                  "99.95% SLA",
                  "Account manager",
                ],
              },
            ].map((t, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: 32,
                  borderColor: t.featured
                    ? "rgba(220,47,101,0.4)"
                    : "var(--hairline)",
                  background: t.featured
                    ? "linear-gradient(180deg, rgba(220,47,101,0.04), var(--bg-card) 60%)"
                    : "var(--bg-card)",
                }}
              >
                <div className="h3" style={{ fontSize: 20 }}>
                  {t.name}
                </div>
                <div
                  style={{
                    marginTop: 24,
                    display: "flex",
                    alignItems: "baseline",
                    gap: 4,
                  }}
                >
                  {t.price !== "Custom" && t.price !== "Free" && (
                    <span style={{ fontSize: 18, color: "var(--fg-tertiary)" }}>
                      ₹
                    </span>
                  )}
                  <span
                    className="num"
                    style={{
                      fontSize: 44,
                      letterSpacing: "-0.02em",
                      color: "var(--fg-primary)",
                      fontFamily: "var(--font-serif)",
                    }}
                  >
                    {t.price}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--fg-quaternary)",
                    fontFamily: "var(--font-mono)",
                    marginTop: 4,
                  }}
                >
                  {t.unit}
                </div>
                <ul
                  style={{
                    marginTop: 24,
                    padding: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {t.perks.map((p, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: 13.5,
                        color: "var(--fg-secondary)",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                      }}
                    >
                      <span style={{ color: "var(--accent)", marginTop: 2 }}>
                        ✓
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className={`btn ${t.featured ? "btn-accent" : "btn-ghost"
                    } btn-arrow`}
                  style={{
                    marginTop: 28,
                    width: "100%",
                    justifyContent: "center",
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  {t.price === "Custom" ? "Talk to sales" : "Sign up free"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Resources strip ── */}
      <section className="section hairline">
        <div className="container">
          <SectionLabel num="08">Resources</SectionLabel>
          <h2 className="h2" style={{ marginBottom: 48 }}>
            Everything you need, in the places you look.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 0,
              border: "1px solid var(--hairline)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
            }}
          >
            {[
              {
                mono: "docs.whitebooks.in",
                title: "API Reference",
                body: "Every endpoint, every parameter, with live examples.",
              },
              {
                mono: "github.com/whitebooks",
                title: "SDK Repos",
                body: "Node · Python · PHP · Java · Go. Permissive open-source.",
              },
              {
                mono: "whitebooks.postman.com",
                title: "Postman Collection",
                body: "Import & test in 30 seconds. Pre-filled examples.",
              },
              {
                mono: "status.whitebooks.in",
                title: "Status Page",
                body: "Public, real-time, with incident history.",
              },
              {
                mono: "/changelog",
                title: "Changelog",
                body: "Every API change, dated and signed. RSS feed.",
              },
              {
                mono: "wb-dev.slack.com",
                title: "Developer Slack",
                body: "1,200+ engineers building on Whitebooks. Engineering team in-channel.",
              },
            ].map((r, i) => (
              <div
                key={i}
                style={{
                  padding: 28,
                  borderRight:
                    (i + 1) % 3 !== 0 ? "1px solid var(--hairline)" : "none",
                  borderBottom: i < 3 ? "1px solid var(--hairline)" : "none",
                  cursor: "pointer",
                  transition: "background 160ms",
                }}
                onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.background =
                  "rgba(255,255,255,0.015)")
                }
                onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.background =
                  "transparent")
                }
              >
                <div className="mono-tag accent">
                  <span className="dot"></span>
                  {r.mono}
                </div>
                <h3 className="h3" style={{ marginTop: 18, fontSize: 18 }}>
                  {r.title}
                </h3>
                <p className="body" style={{ marginTop: 8, fontSize: 13 }}>
                  {r.body}
                </p>
                <span
                  className="link-arrow"
                  style={{
                    marginTop: 18,
                    fontSize: 12,
                    color: "var(--accent-bright)",
                  }}
                >
                  Open
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section hairline">
        <div className="container container-narrow" style={{ maxWidth: 980 }}>
          <SectionLabel num="09">FAQ</SectionLabel>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "0.7fr 1.3fr",
              gap: 64,
              alignItems: "start",
            }}
          >
            <h2 className="h2">
              Developer
              <br />
              questions.
            </h2>
            <FAQ
              items={[
                {
                  q: "Is Whitebooks a GSP or do you resell another GSP's API?",
                  a: "Whitebooks holds a direct GSP license from GSTN, held by BVM IT Consulting Services India Private Limited. We do not resell another GSP's pipe. This is the reason for the latency and uptime difference versus most other API providers.",
                },
                {
                  q: "How fast can I get production access?",
                  a: "Sandbox is immediate. Production requires KYC verification and a signed agreement — median 5 business days from sandbox signup to production keys. Enterprise customers with existing compliance reviews can get same-week production.",
                },
                {
                  q: "Does the API support the new IMS (Invoice Management System)?",
                  a: "Yes. IMS endpoints went live within 72 hours of the GSTN advisory in October 2025. The /ims endpoint lets you pull inward invoices, accept/reject/hold them in bulk, and track rejected credit note liability.",
                },
                {
                  q: "What's the SLA?",
                  a: "99.95% monthly uptime on production. SLA credits issued automatically — no need to file a ticket. Status page at status.whitebooks.in is public and real-time.",
                },
                {
                  q: "How do I handle GST 2.0 rate changes (5%/18%/40%) in my integration?",
                  a: "The HSN endpoint returns the current applicable rate as of the request date. Your code doesn't hard-code rates — you query for them. When the government changes rates again, your integration doesn't break.",
                },
                {
                  q: "Can I use the API to file returns for my clients (as a CA firm)?",
                  a: "Yes. The API supports multi-GSTIN operation with delegated authentication. Each client GSTIN's credentials are stored encrypted with explicit consent. White-label CA firm products built on the Whitebooks API include several tax-tech startups.",
                },
                {
                  q: "What languages and frameworks have SDKs?",
                  a: "Official SDKs in Node.js, Python, PHP, Java, and Go. Community SDKs in Ruby, .NET, and Elixir. All published under permissive open-source licenses on github.com/whitebooks.",
                },
                {
                  q: "How does pricing scale at high volume?",
                  a: "Linear at startup tier, custom volume pricing above 500K calls/month. We don't price-gouge on the only legal path to the GSTN — we make it back on the developer ecosystem you build.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <ClosingCTA
        eyebrow="GST API"
        eyebrowSubTitle="Whitebooks"
        title="Build your India compliance once."
        body="Whitebooks gives developer teams what they wish ClearTax and the others had built: a real API, real docs, real SLAs, and a real GSP license sitting underneath. Five minutes to your first sandbox call."
        primary="Get sandbox keys"
        secondary="Talk to a solutions engineer"
      />
    </>
  );
}
