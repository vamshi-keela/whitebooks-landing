import React from 'react';
import type { RouteKey } from '@/hooks/useHashRoute';

interface SiteFooterProps {
  navigate: (r: RouteKey) => void;
}

export function SiteFooter({ navigate }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr',
            gap: 48,
          }}
        >
          {/* Brand column */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                color: 'var(--fg-primary)',
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, var(--gradient-1), var(--gradient-2))',
                }}
              ></span>
              whitebooks
            </div>
            <p
              style={{
                color: 'var(--fg-tertiary)',
                fontSize: 13,
                lineHeight: 1.6,
                maxWidth: 280,
                margin: 0,
              }}
            >
              India's AI-native compliance infrastructure. A GST Suvidha Provider licensed by GSTN.
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 8 }}>
              <span className="mono-tag accent">
                <span className="dot"></span> GSP licensed
              </span>
              <span className="mono-tag">
                <span className="dot"></span> SOC 2 in progress
              </span>
            </div>
          </div>

          {/* Products column */}
          <div>
            <h5>Products</h5>
            <ul>
              <li>
                <a
                  href="#/gst-software"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('gst-soft');
                  }}
                >
                  GST Software
                </a>
              </li>
              <li><a href="#">e-Invoicing</a></li>
              <li><a href="#">e-Way Bills</a></li>
              <li><a href="#">Accounting</a></li>
              <li><a href="#">KSA e-Invoicing</a></li>
            </ul>
          </div>

          {/* Developers column */}
          <div>
            <h5>Developers</h5>
            <ul>
              <li>
                <a
                  href="#/gst-api"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('gst-api');
                  }}
                >
                  GST API
                </a>
              </li>
              <li><a href="#">e-Invoice API</a></li>
              <li><a href="#">e-Way Bill API</a></li>
              <li><a href="#">API Status</a></li>
              <li><a href="#">Documentation</a></li>
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h5>Resources</h5>
            <ul>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Free Tools</a></li>
              <li><a href="#">ClearTax Migration</a></li>
              <li><a href="#">Compliance Calendar</a></li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h5>Company</h5>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Customers</a></li>
              <li><a href="#">Partners</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="legal">
          WhiteBooks is a product of BVM IT Consulting Services India Pvt. Ltd. — a GST Suvidha
          Provider licensed by GSTN, Government of India. © 2026.
        </div>
      </div>
    </footer>
  );
}
