import React, { useState } from 'react';
import sahilJain from '@/assets/testimonials/Sahil-Jain.webp';
import bvSrinivasababu from '@/assets/testimonials/b-v-srinivasa-babu.webp';
import atulGarg from '@/assets/testimonials/atul-garg.webp';

const testimonials = [
  {
    quote:
      "I just wanted to share a quick note and let you know that you guys do a really good job. I'm glad I decided to do business with you. You guys have made integration so quick and smooth which has not been there with other GSPs. When it comes to support, you guys have always been there round the clock. Thanks, guys!",
    name: 'Sahil Jain',
    role: 'Director - Smartbiz Technologies Pvt. Ltd.',
    photo: sahilJain,
  },
  {
    quote:
      'WhiteBooks helped me to Generate the e-Invoices and e-Way Bills from my SAP in a single click. Their SAP connector is efficient, simple and cost effective.',
    name: 'B V Srinivasababu',
    role: 'Sr Manager - IT Applications, NSL',
    photo: bvSrinivasababu,
  },
  {
    quote:
      'WhiteBooks is solving GST complex problems like e-Invoicing and e-Way Bill with Ease and Simple APIs. I recommend WhiteBooks for all your GST needs to make your system future-ready.',
    name: 'CA Atul Garg',
    role: 'Finance Controller - WheelsEye',
    photo: atulGarg,
  },
];

const CARD_STYLE: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: 24,
  padding: '40px',
  backdropFilter: 'blur(12px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

function TestimonialCard({ quote, name, role, photo }: (typeof testimonials)[0]) {
  return (
    <div style={CARD_STYLE}>
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 18,
          lineHeight: 1.65,
          color: 'var(--fg-primary)',
          fontStyle: 'italic',
          marginBottom: 32,
        }}
      >
        "{quote}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <img
          src={photo}
          alt={name}
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            objectFit: 'cover',
            flexShrink: 0,
            border: '2px solid rgba(255,255,255,0.15)',
          }}
        />
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg-primary)', marginBottom: 3 }}>
            {name}
          </div>
          <div style={{ fontSize: 15, color: 'var(--fg-tertiary)', fontFamily: 'var(--font-mono)' }}>
            {role}
          </div>
        </div>
      </div>
    </div>
  );
}

const NAV_BTN_STYLE: React.CSSProperties = {
  width: 48,
  height: 48,
  borderRadius: '50%',
  border: '1px solid rgba(255,255,255,0.15)',
  background: 'transparent',
  color: 'var(--fg-primary)',
  fontSize: 18,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.2s',
};

export function ProofSection() {
  const [startIndex, setStartIndex] = useState(0);
  const total = testimonials.length;

  const prev = () => setStartIndex((i) => (i - 1 + total) % total);
  const next = () => setStartIndex((i) => (i + 1) % total);

  const visible = [testimonials[startIndex], testimonials[(startIndex + 1) % total]];

  return (
    <section style={{ background: 'var(--bg-2)', padding: '96px 0' }}>
      <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
        <div className="flex items-end justify-between mb-16 max-sm:flex-col max-sm:items-start max-sm:gap-6">
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 3vw, 42px)',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                color: 'var(--fg-primary)',
                marginBottom: 16,
              }}
            >
              What Our Customers Say
            </h2>
            <p style={{ fontSize: 16, color: 'var(--fg-secondary)', maxWidth: 400, lineHeight: 1.6 }}>
              Trusted by finance controllers and IT heads across the country.
            </p>
          </div>

          <div className="flex gap-3 flex-shrink-0">
            <button
              style={NAV_BTN_STYLE}
              onClick={prev}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button
              style={NAV_BTN_STYLE}
              onClick={next}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visible.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setStartIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width: i === startIndex ? 24 : 8,
                height: 8,
                borderRadius: 4,
                border: 'none',
                background:
                  i === startIndex
                    ? 'linear-gradient(90deg, var(--gradient-1), var(--gradient-2))'
                    : 'rgba(255,255,255,0.2)',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.25s, background 0.25s',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
