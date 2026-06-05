import { SiteLogo } from '@/components/ui/SiteLogo';
import { Link } from 'react-router-dom';

interface FooterColItem {
  label: string;
  href?: string;
}

interface FooterColProps {
  title: string;
  items: FooterColItem[];
}

function FooterCol({ title, items }: FooterColProps) {
  return (
    <div className="wb-footer-col">
      <h4>{title}</h4>
      <ul>
        {items.map((it, i) => (
          <li key={i}>
            {it.href?.startsWith('/') ? (
              <Link to={it.href}>{it.label}</Link>
            ) : (
              <a href={it.href ?? '#'}>{it.label}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="wb-footer">
      <div className="wb-wrap">
        <div className="wb-footer-grid">
          <div className="wb-footer-col">
            <SiteLogo />
            <p className="wb-footer-brand-blurb">
              A GST Suvidha Provider licensed by GSTN, building India's AI-native compliance
              infrastructure.
            </p>
          </div>

          <FooterCol
            title="Softwares"
            items={[
              { label: 'Accounting', href: '/softwares/accounting' },
              { label: 'GST', href: '/softwares/gst' },
              { label: 'e-Invoice', href: '/softwares/e-invoice' },
              { label: 'e-Way Bill', href: '/softwares/e-way-bill' },
              { label: 'KSA e-Invoicing', href: '/softwares/ksa' },
            ]}
          />

          <FooterCol
            title="APIs"
            items={[
              { label: 'GST API', href: '/apis/gst' },
              { label: 'e-Invoice API', href: '/apis/e-invoice' },
              { label: 'e-Way Bill API', href: '/apis/e-way-bill' },
              { label: 'KSA e-Invoice API', href: '/apis/ksa' },
            ]}
          />

          <FooterCol
            title="Company"
            items={[
              { label: 'About' },
              { label: 'Customers' },
              { label: 'Partners' },
              { label: 'Careers' },
              { label: 'Contact' },
            ]}
          />

          <FooterCol
            title="Resources"
            items={[
              { label: 'Pricing' },
              { label: 'Blog' },
              { label: 'Migration guide' },
              { label: 'Compliance calendar' },
              { label: 'API status' },
            ]}
          />
        </div>

        <div className="wb-footer-legal">
          <span>
            Whitebooks is a product of BVM IT Consulting Services India Pvt. Ltd. GSP licensed
            by GSTN, Government of India.
          </span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}
