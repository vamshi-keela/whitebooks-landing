import React from 'react';
import { SeoHead } from '../../../seo/components/SeoHead';
import { SITE } from '../../../seo/config/site';
import {
  DocArticle, DocEyebrow, DocTitle, DocLead, DocH2, DocP, InlineCode,
  Callout, CodeSample, DocTable, DocPager,
} from './DocKit';

const ERROR_SHAPE = `{
  "code": "GSTIN_INVALID",
  "message": "The supplied GSTIN failed checksum validation.",
  "transaction_id": "b1f4c2a0-9d3e-4f21-8c77-2a1e9f0b3d44",
  "timestamp": "2026-06-14T09:42:11Z"
}`;

export default function Errors(): React.ReactElement {
  return (
    <DocArticle>
      <SeoHead
        title="Errors & Status Codes — Whitebooks Developer Portal"
        description="HTTP status codes, the standard error envelope, and common error codes returned by the Whitebooks APIs."
        canonical={`${SITE.baseUrl}/developer/errors`}
        robots={SITE.defaultRobots}
      />

      <DocEyebrow>Essentials</DocEyebrow>
      <DocTitle>Errors &amp; Status Codes</DocTitle>
      <DocLead>
        The APIs use conventional HTTP status codes and return a consistent JSON error envelope, so
        you can handle failures the same way across every endpoint.
      </DocLead>

      <DocH2 id="envelope">Error envelope</DocH2>
      <DocP>
        Every error response shares the same shape. Always log the{' '}
        <InlineCode>transaction_id</InlineCode> — it’s what support needs to trace a request.
      </DocP>
      <CodeSample tabs={[{ label: 'JSON', code: ERROR_SHAPE }]} />

      <DocH2 id="status-codes">HTTP status codes</DocH2>
      <DocTable
        head={['Code', 'Meaning', 'When it happens']}
        rows={[
          [<InlineCode key="200">200</InlineCode>, 'OK', 'The request succeeded.'],
          [<InlineCode key="400">400</InlineCode>, 'Bad Request', 'Malformed JSON or a missing required field.'],
          [<InlineCode key="401">401</InlineCode>, 'Unauthorized', 'Token missing, invalid, or expired.'],
          [<InlineCode key="403">403</InlineCode>, 'Forbidden', 'Key lacks permission or IP is not allow-listed.'],
          [<InlineCode key="404">404</InlineCode>, 'Not Found', 'The resource or entity does not exist.'],
          [<InlineCode key="422">422</InlineCode>, 'Unprocessable Entity', 'Validation failed (e.g. invalid GSTIN or IFSC).'],
          [<InlineCode key="429">429</InlineCode>, 'Too Many Requests', 'You exceeded your rate limit.'],
          [<InlineCode key="503">503</InlineCode>, 'Service Unavailable', 'Upstream GSTN/NIC system is temporarily down.'],
        ]}
      />

      <DocH2 id="common-codes">Common error codes</DocH2>
      <DocTable
        head={['Code', 'Description']}
        rows={[
          [<InlineCode key="1">GSTIN_INVALID</InlineCode>, 'GSTIN failed format or checksum validation.'],
          [<InlineCode key="2">TOKEN_EXPIRED</InlineCode>, 'Access token has passed its one-hour lifetime.'],
          [<InlineCode key="3">RATE_LIMITED</InlineCode>, 'Request quota exceeded for the current window.'],
          [<InlineCode key="4">DUPLICATE_IRN</InlineCode>, 'An IRN already exists for this invoice document.'],
          [<InlineCode key="5">UPSTREAM_TIMEOUT</InlineCode>, 'The government system did not respond in time.'],
        ]}
      />

      <Callout type="tip" title="Retry transient failures">
        Treat <InlineCode>429</InlineCode>, <InlineCode>503</InlineCode>, and{' '}
        <InlineCode>UPSTREAM_TIMEOUT</InlineCode> as retryable. Use exponential backoff and respect
        the reset window — don’t hammer a failing upstream.
      </Callout>

      <DocPager prev={{ label: 'Authentication', to: '/developer/authentication' }} />
    </DocArticle>
  );
}
