import { LegalLayout } from './LegalLayout';

export function RefundCancellation() {
  return (
    <LegalLayout
      eyebrow="Company | Refunds"
      breadcrumbLabel="Refund & Cancellation"
      title={<>Refund & <span className="text-[var(--brand)]">Cancellation Policy.</span></>}
      sections={[
        {
          heading: 'Assisted Plans',
          body: (
            <p>
              For Assisted Plans, you may cancel your payment or request a refund within 30 days of
              purchase, provided the expert assigned to your account has not yet commenced work. Once work
              has begun, the payment becomes non-refundable.
            </p>
          ),
        },
        {
          heading: 'Refund Window',
          body: (
            <p>
              Refund requests must be raised within <strong className="text-[var(--text)]">30 days</strong> of
              the original purchase date. Approved refunds are processed within{' '}
              <strong className="text-[var(--text)]">7 to 15 working days</strong>.
            </p>
          ),
        },
        {
          heading: 'How to Request a Refund or Cancellation',
          body: (
            <p>
              For any questions or to raise a refund or cancellation request, please write to us at{' '}
              <a href="mailto:info@whitebooks.in" className="text-[var(--brand)] underline underline-offset-2">
                info@whitebooks.in
              </a>
              . Our team will review your request and confirm the outcome by email.
            </p>
          ),
        },
      ]}
    />
  );
}
