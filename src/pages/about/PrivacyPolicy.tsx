import { LegalLayout } from './LegalLayout';

export function PrivacyPolicy() {
  return (
    <LegalLayout
      eyebrow="Company | Privacy"
      breadcrumbLabel="Privacy Policy"
      title={<>Privacy <span className="text-[var(--brand)]">Policy.</span></>}
      intro="WhiteBooks, a product of BVM IT Consulting Services India Pvt Ltd, helps businesses with GST compliance, accounting, e-invoicing, and e-way bill management. Our relationship with you is our most important asset, and we are committed to protecting your privacy and the security of your tax and financial information."
      sections={[
        {
          heading: '1. Scope of This Policy',
          body: (
            <p>
              This policy covers the terms under which you access and use WhiteBooks applications.
              WhiteBooks reserves the right to reject data transmissions that pose a security risk or
              otherwise violate this policy.
            </p>
          ),
        },
        {
          heading: '2. Information We Collect',
          body: (
            <ul>
              <li>Account details — name, address, and phone number.</li>
              <li>User credentials — username, password, and email address.</li>
              <li>GST return data — purchases, sales, input/output credits, debits, and turnover.</li>
              <li>Website browsing information — IP address, browser type, and pages visited.</li>
            </ul>
          ),
        },
        {
          heading: '3. How We Use Your Information',
          body: (
            <p>
              We use the information we collect to manage your account, operate and improve our services,
              and process payments. <strong className="text-[var(--text)]">WhiteBooks does not sell or
              rent your personal or tax return information to anyone</strong>, and we do not share your
              tax data internally for marketing purposes.
            </p>
          ),
        },
        {
          heading: '4. Security Measures',
          body: (
            <p>
              We employ industry-recognised security safeguards, including encryption for sensitive
              information in transit, and require all employees with access to customer data to follow
              strict data-protection practices.
            </p>
          ),
        },
        {
          heading: '5. Changes to This Policy',
          body: (
            <p>
              We may update this Privacy Policy from time to time. If we make significant changes, we
              will provide prominent notice on our website or notify you by email.
            </p>
          ),
        },
        {
          heading: '6. Legal Compliance',
          body: (
            <p>
              This policy is framed in accordance with the Information Technology (Reasonable Security
              Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011. In the
              event of a data breach, affected users will be notified within 72 hours.
            </p>
          ),
        },
        {
          heading: '7. Contact Us',
          body: (
            <p>
              For privacy-related questions, write to us at{' '}
              <a href="mailto:sales@whitebooks.in" className="text-[var(--brand)] underline underline-offset-2">
                sales@whitebooks.in
              </a>{' '}
              or call +91 90321 11788.
            </p>
          ),
        },
      ]}
    />
  );
}
