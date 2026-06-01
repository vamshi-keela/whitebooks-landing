export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: 'What is WhiteBooks GST API?',
    answer:
      'WhiteBooks GST API is a GSP-licensed developer platform that lets you integrate GSTR filing, ITC reconciliation, GSTIN verification, e-Invoicing, e-Way Bill generation, and HSN lookup directly into your ERP, accounting software, or custom application — via a single OpenAPI 3.0-compliant REST interface.',
  },
  {
    question: 'How do I get sandbox access?',
    answer:
      'Register at developer.whitebooks.in to receive a sandbox client_id and client_secret. The sandbox environment mirrors production but routes requests to the GSTN test portal. Test GSTIN: 29AAAAA0000A1Z5, sandbox OTP: 575757.',
  },
  {
    question: 'What data formats are supported?',
    answer:
      'All API requests and responses use JSON. GST return payloads must conform to the GSTN-published JSON schemas (available at developer.gst.gov.in). The API returns structured error objects with GSTN error codes for easy debugging.',
  },
  {
    question: 'Is rate limiting applied?',
    answer:
      'Yes. Sandbox accounts are limited to 100 requests/minute. Production limits depend on your plan: Starter (500 req/min), Growth (2,000 req/min), and Enterprise (custom limits). Rate limit headers (X-RateLimit-Remaining, X-RateLimit-Reset) are returned on every response.',
  },
  {
    question: 'How is the API secured?',
    answer:
      'The API uses OAuth 2.0 client credentials flow. All traffic is encrypted with TLS 1.2+. Bearer tokens expire after 1 hour and must be refreshed. Optional IP allow-listing and SHA256-RSA request signing are available for enterprise accounts.',
  },
  {
    question: 'Which SDKs are supported?',
    answer:
      'Official SDKs are available for Node.js (npm install whitebooks-sdk), Python (pip install whitebooks), and Java (Maven/Gradle). Community SDKs exist for PHP, Go, and Ruby. All SDKs are open-source on GitHub.',
  },
  {
    question: 'How is pricing structured?',
    answer:
      'Pricing is per-API-call with monthly tiers. The Starter plan covers up to 10,000 calls/month. Growth covers 100,000 calls/month. Enterprise plans offer custom volumes with SLA guarantees. Contact sales@whitebooks.in for enterprise pricing.',
  },
];
