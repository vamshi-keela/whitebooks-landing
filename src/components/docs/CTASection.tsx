import React from 'react';
import { ArrowRight, Mail, Phone } from 'lucide-react';

export default function CTASection(): React.ReactElement {
  return (
    <section style={{ padding: '0 0 80px' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(220,47,101,0.08) 0%, rgba(220,47,101,0.03) 100%)',
          border: '1px solid var(--dp-accent-line)',
          borderRadius: 20,
          padding: '56px 48px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 400,
            height: 200,
            background: 'radial-gradient(ellipse, rgba(220,47,101,0.2), transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <h2
          style={{
            fontFamily: 'var(--dp-font-display)',
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 700,
            color: 'var(--dp-fg)',
            margin: '0 0 16px',
            letterSpacing: '-0.02em',
            position: 'relative',
          }}
        >
          Start building with WhiteBooks APIs
        </h2>
        <p
          style={{
            fontSize: 16,
            color: 'var(--dp-fg-muted)',
            margin: '0 0 40px',
            maxWidth: 500,
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'relative',
          }}
        >
          Get sandbox credentials in minutes. No contracts, no commitments. Just working APIs.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 40, position: 'relative' }}>
          <button
            style={{
              background: 'var(--dp-accent)',
              border: 'none',
              borderRadius: 10,
              padding: '12px 28px',
              fontSize: 15,
              fontWeight: 600,
              fontFamily: 'var(--dp-font-body)',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            Get Sandbox Access <ArrowRight size={16} />
          </button>
          <button
            style={{
              background: 'transparent',
              border: '1px solid var(--dp-border-strong)',
              borderRadius: 10,
              padding: '12px 28px',
              fontSize: 15,
              fontWeight: 600,
              fontFamily: 'var(--dp-font-body)',
              color: 'var(--dp-fg)',
              cursor: 'pointer',
            }}
          >
            Contact Sales
          </button>
        </div>

        {/* Contact info */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 24,
            position: 'relative',
          }}
        >
          <a
            href="mailto:sales@whitebooks.in"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              color: 'var(--dp-fg-muted)',
              textDecoration: 'none',
            }}
          >
            <Mail size={14} color="var(--dp-accent-2)" />
            sales@whitebooks.in
          </a>
          <a
            href="tel:+919032111788"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              color: 'var(--dp-fg-muted)',
              textDecoration: 'none',
            }}
          >
            <Phone size={14} color="var(--dp-accent-2)" />
            +91 9032111788
          </a>
        </div>
      </div>
    </section>
  );
}
