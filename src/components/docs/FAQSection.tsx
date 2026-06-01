import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { faqs } from '../../data/faqs';

export default function FAQSection(): React.ReactElement {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ padding: '0 0 64px' }}>
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--dp-accent-soft)',
            border: '1px solid var(--dp-accent-line)',
            borderRadius: 999,
            padding: '4px 14px 4px 10px',
            marginBottom: 14,
          }}
        >
          <HelpCircle size={13} color="var(--dp-accent-2)" />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--dp-accent-2)', fontFamily: 'var(--dp-font-mono)' }}>
            FAQ
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--dp-font-display)',
            fontSize: 24,
            fontWeight: 700,
            color: 'var(--dp-fg)',
            margin: 0,
          }}
        >
          Frequently Asked Questions
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 860 }}>
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              style={{
                background: 'var(--dp-surface)',
                border: `1px solid ${isOpen ? 'var(--dp-accent-line)' : 'var(--dp-border)'}`,
                borderRadius: 12,
                overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  padding: '18px 20px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: 'var(--dp-fg)',
                  fontFamily: 'var(--dp-font-body)',
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                <span>{faq.question}</span>
                {isOpen
                  ? <ChevronUp size={16} color="var(--dp-accent-2)" style={{ flexShrink: 0 }} />
                  : <ChevronDown size={16} color="var(--dp-fg-dim)" style={{ flexShrink: 0 }} />
                }
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: '0 20px 18px',
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: 'var(--dp-fg-muted)',
                    borderTop: '1px solid var(--dp-border)',
                    paddingTop: 14,
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
