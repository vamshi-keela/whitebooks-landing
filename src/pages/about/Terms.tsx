import { LegalLayout } from './LegalLayout';

export function Terms() {
  return (
    <LegalLayout
      eyebrow="Company | Terms"
      breadcrumbLabel="Terms & Conditions"
      title={<>Terms & <span className="text-[var(--brand)]">Conditions.</span></>}
      intro="WhiteBooks, a product of BVM IT Consulting Services India Pvt Ltd, operates India's GSP-certified cloud platform for accounting, GST compliance, e-invoicing, and e-way bill management, serving 25,000+ active clients. Please read these terms carefully before using our services."
      sections={[
        {
          heading: '1. Accepting the Terms',
          body: (
            <p>
              By accessing or using WhiteBooks, you agree to be bound by these Terms & Conditions. You
              must be of legal age, capable of forming a binding contract, and an Indian resident to use
              our services. WhiteBooks reserves the right to modify, suspend, or discontinue any part of
              the services at any time, with or without notice.
            </p>
          ),
        },
        {
          heading: '2. Service Provision',
          body: (
            <p>
              WhiteBooks may alter the form, features, and functionality of its services, disable user
              accounts, and set limits on data transmission or storage at its sole discretion. By using
              our GST filing services, you authorise WhiteBooks to add you as a registered client on the
              GST Network (GSTN) for the purpose of filing returns on your behalf.
            </p>
          ),
        },
        {
          heading: '3. User Obligations',
          body: (
            <ul>
              <li>Provide accurate and complete information for GST filing and account setup.</li>
              <li>Use the services only through the official interfaces provided by WhiteBooks.</li>
              <li>Do not attempt automated access, scraping, or unauthorised use of the platform.</li>
              <li>Do not disrupt, overload, or interfere with the operation of the platform.</li>
              <li>Do not resell or sublicense the services without WhiteBooks' explicit written agreement.</li>
            </ul>
          ),
        },
        {
          heading: '4. Account Security',
          body: (
            <p>
              You are solely responsible for maintaining the confidentiality of your account credentials
              and for all activity that occurs under your account. WhiteBooks is not liable for any loss
              arising from unauthorised access resulting from your failure to safeguard your login details.
            </p>
          ),
        },
        {
          heading: '5. GST Filing & Warranties',
          body: (
            <p>
              While WhiteBooks applies quality checks to all GST filings processed through the platform,
              it does not warrant that filings will be free of errors caused by inaccurate or incomplete
              data supplied by the user, or by changes to GSTN systems beyond our control. Your use of the
              services is at your sole risk, and WhiteBooks makes no guarantee regarding uninterrupted or
              error-free access.
            </p>
          ),
        },
        {
          heading: '6. Limitation of Liability',
          body: (
            <p>
              To the maximum extent permitted by law, WhiteBooks excludes liability for any indirect,
              incidental, special, or consequential damages — including loss of profits, loss of data, or
              business interruption — arising from your use of, or inability to use, the services.
            </p>
          ),
        },
        {
          heading: '7. Refunds & Cancellation',
          body: (
            <p>
              Subscribers to Assisted Plans may request a refund within 30 days of purchase, provided the
              expert assigned to their account has not yet commenced work. See our{' '}
              <a href="/about/refund-cancellation" className="text-[var(--brand)] underline underline-offset-2">
                Refund & Cancellation Policy
              </a>{' '}
              for full details.
            </p>
          ),
        },
        {
          heading: '8. Contact',
          body: (
            <p>
              For any questions regarding these Terms & Conditions, write to us at{' '}
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
