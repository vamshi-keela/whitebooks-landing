import React, { useState } from 'react';
import { ExternalLink, Copy, Check, ChevronRight } from 'lucide-react';

const STEPS = [
  {
    num: 1,
    title: 'Create GSTIN Sandbox',
    description:
      'Before connecting to WhiteBooks, you must register a test GSTIN on the official developer portal provided by BVM IT Consulting.',
    cta: { label: 'Register Sandbox GSTIN', href: 'https://api.sandbox.whitebooks.in', external: true, variant: 'link' as const },
  },
  {
    num: 2,
    title: 'Sign-up with WhiteBooks',
    description:
      'Create your developer account to manage API keys, monitor usage, and access production credentials.',
    cta: { label: 'Create Developer Account', href: 'https://app.whitebooks.in/register', external: false, variant: 'button' as const },
  },
  {
    num: 3,
    title: 'Buy Sandbox Access',
    description:
      'Log in to your newly created dashboard and subscribe to the Sandbox tier to provision your integration endpoints.',
    badge: { label: 'Sandbox Tier', sub: 'Unlimited test requests', tag: 'Free' },
    cta: null,
  },
  {
    num: 4,
    title: 'Use Credentials',
    description:
      'Once subscribed, navigate to the Credentials tab to retrieve your Client ID and Secret. You are now ready to authenticate.',
    cta: null,
  },
];

const AUTH_CODE = `POST /v1/authenticate
Headers:
  x-client-id: <your_id>
  x-client-secret: <your_secret>
Body:
{
  "action": "GET_OTP",
  "username": "sandbox_user"
}`;

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    void navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="p-1 rounded text-[var(--dp-fg-faint)] hover:text-[var(--dp-fg-muted)] transition-colors cursor-pointer"
      style={{ background: 'none', border: 'none' }}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
}

function TerminalCard() {
  return (
    <div
      className="rounded-[14px] overflow-hidden sticky top-6"
      style={{
        background: '#0d0d15',
        border: '1px solid rgba(255,255,255,0.08)',
        fontFamily: 'var(--dp-font-mono)',
        fontSize: 12,
      }}
    >
      {/* Card header */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
        </div>
        <span className="ml-1 text-[11px] text-[var(--dp-fg-faint)] tracking-wide">Sandbox Quick-Start</span>
      </div>

      <div className="p-5 space-y-5">
        {/* Base URL */}
        <div>
          <div className="text-[10px] tracking-[0.1em] uppercase mb-2" style={{ color: '#5b5b70' }}>
            Base URL
          </div>
          <div
            className="flex items-center justify-between rounded-[8px] px-3 py-2"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span style={{ color: '#7dd3fc' }}>https://apisandbox.whitebooks.in/gst</span>
            <CopyBtn text="https://apisandbox.whitebooks.in/gst" />
          </div>
        </div>

        {/* OTP */}
        <div>
          <div className="text-[10px] tracking-[0.1em] uppercase mb-2" style={{ color: '#5b5b70' }}>
            Default Testing OTP
          </div>
          <div className="flex items-center gap-3">
            <div
              className="rounded-[8px] px-4 py-2 text-[20px] font-bold tracking-[0.15em]"
              style={{ background: 'rgba(245,201,134,0.1)', border: '1px solid rgba(245,201,134,0.2)', color: '#f5c986' }}
            >
              575757
            </div>
            <span className="text-[11px]" style={{ color: '#5b5b70' }}>
              Use for all sandbox auth flows
            </span>
          </div>
        </div>

        {/* Auth code */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] tracking-[0.1em] uppercase" style={{ color: '#5b5b70' }}>
              Initial Auth Call
            </div>
            <CopyBtn text={AUTH_CODE} />
          </div>
          <pre
            className="rounded-[8px] px-3 py-3 text-[11.5px] leading-relaxed overflow-x-auto"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span style={{ color: '#c084fc' }}>POST</span>
            <span style={{ color: '#d4d4dc' }}> /v1/authenticate{'\n'}</span>
            <span style={{ color: '#5b5b70' }}>Headers:{'\n'}</span>
            <span style={{ color: '#5b5b70' }}>{'  '}x-client-id: </span>
            <span style={{ color: '#a5e3a1' }}>&lt;your_id&gt;</span>
            <span style={{ color: '#d4d4dc' }}>{'\n'}</span>
            <span style={{ color: '#5b5b70' }}>{'  '}x-client-secret: </span>
            <span style={{ color: '#a5e3a1' }}>&lt;your_secret&gt;</span>
            <span style={{ color: '#d4d4dc' }}>{'\n'}</span>
            <span style={{ color: '#5b5b70' }}>Body:{'\n'}</span>
            <span style={{ color: '#8a8aa0' }}>{'{'}{'\n'}</span>
            <span style={{ color: '#ff7aa8' }}>{'  '}"action"</span>
            <span style={{ color: '#8a8aa0' }}>: </span>
            <span style={{ color: '#a5e3a1' }}>"GET_OTP"</span>
            <span style={{ color: '#8a8aa0' }}>,{'\n'}</span>
            <span style={{ color: '#ff7aa8' }}>{'  '}"username"</span>
            <span style={{ color: '#8a8aa0' }}>: </span>
            <span style={{ color: '#a5e3a1' }}>"sandbox_user"</span>
            <span style={{ color: '#8a8aa0' }}>{'\n'}{'}'}</span>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function GstGetStarted(): React.ReactElement {
  return (
    <div className="px-6 py-10 max-w-[960px] mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="text-[11px] font-semibold tracking-[0.08em] uppercase mb-3" style={{ color: 'var(--dp-accent-2)' }}>
          Quick Start
        </div>
        <h1
          className="text-[2rem] font-bold leading-tight mb-3"
          style={{ fontFamily: 'var(--dp-font-display)', color: 'var(--dp-fg)' }}
        >
          Getting Started with GST API
        </h1>
        <p className="text-[14px] leading-relaxed max-w-[480px]" style={{ color: 'var(--dp-fg-muted)' }}>
          Follow this roadmap to provision your sandbox environment, retrieve your authentication
          keys, and make your first API call to the WhiteBooks network.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
        {/* Steps */}
        <div className="space-y-4">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="relative rounded-[12px] p-5"
              style={{
                background: 'var(--dp-surface-2)',
                border: '1px solid var(--dp-border)',
              }}
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div
                  className="absolute left-[30px] bottom-0 translate-y-full w-px"
                  style={{ height: 16, background: 'var(--dp-border)', zIndex: 0 }}
                />
              )}

              <div className="flex items-start gap-4">
                {/* Step number */}
                <div
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold"
                  style={{
                    background: step.num === 1 ? 'rgba(220,47,101,0.15)' : 'rgba(255,255,255,0.06)',
                    border: step.num === 1 ? '1.5px solid rgba(220,47,101,0.4)' : '1.5px solid rgba(255,255,255,0.1)',
                    color: step.num === 1 ? 'var(--dp-accent-2)' : 'var(--dp-fg-dim)',
                    fontFamily: 'var(--dp-font-mono)',
                  }}
                >
                  {step.num}
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className="font-semibold text-[14px] mb-1.5"
                    style={{ color: 'var(--dp-fg)', fontFamily: 'var(--dp-font-display)' }}
                  >
                    {step.title}
                  </div>
                  <p className="text-[13px] leading-relaxed mb-3" style={{ color: 'var(--dp-fg-muted)' }}>
                    {step.description}
                  </p>

                  {/* CTA */}
                  {step.cta?.variant === 'link' && (
                    <a
                      href={step.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold transition-colors"
                      style={{ color: 'var(--dp-accent-2)', textDecoration: 'none' }}
                    >
                      {step.cta.label}
                      <ExternalLink size={11} />
                    </a>
                  )}
                  {step.cta?.variant === 'button' && (
                    <a
                      href={step.cta.href}
                      target={step.cta.external ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[7px] text-[12px] font-semibold transition-opacity hover:opacity-80"
                      style={{
                        background: 'rgba(220,47,101,0.12)',
                        border: '1px solid rgba(220,47,101,0.3)',
                        color: 'var(--dp-accent-2)',
                        textDecoration: 'none',
                      }}
                    >
                      {step.cta.label}
                      <ChevronRight size={13} />
                    </a>
                  )}

                  {/* Badge (Sandbox Tier) */}
                  {'badge' in step && step.badge && (
                    <div
                      className="inline-flex items-center justify-between rounded-[8px] px-3 py-2 w-full max-w-[280px]"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <div>
                        <div className="text-[12px] font-semibold" style={{ color: 'var(--dp-fg)' }}>
                          {step.badge.label}
                        </div>
                        <div className="text-[11px]" style={{ color: 'var(--dp-fg-faint)' }}>
                          {step.badge.sub}
                        </div>
                      </div>
                      <span
                        className="text-[11px] font-bold px-2 py-0.5 rounded-[5px]"
                        style={{
                          background: 'rgba(160,230,150,0.12)',
                          border: '1px solid rgba(160,230,150,0.25)',
                          color: '#a5e3a1',
                        }}
                      >
                        {step.badge.tag}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Terminal card */}
        <TerminalCard />
      </div>
    </div>
  );
}
