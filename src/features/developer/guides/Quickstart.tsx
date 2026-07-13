import React from 'react';
import { SeoHead } from '../../../seo/components/SeoHead';
import { SITE } from '../../../seo/config/site';
import {
  DocArticle, DocEyebrow, DocTitle, DocLead, DocH2, DocP, InlineCode,
  Callout, Steps, Step, CodeSample, DocTable, DocLink, DocPager,
} from './DocKit';

const AUTH_CURL = `curl -X GET "https://apisandbox.whitebooks.in/authentication/authtoken" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "client_id: YOUR_CLIENT_ID" \\
  -H "client_secret: YOUR_CLIENT_SECRET"`;

const AUTH_RESP = `{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6...",
  "token_type": "Bearer",
  "expires_in": 3600
}`;

const FIRST_CALL = `curl -X GET \\
  "https://apisandbox.whitebooks.in/gst/public/search?gstin=29AAACW1234A1Z5" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "x-api-key: YOUR_API_KEY"`;

const FIRST_CALL_NODE = `const res = await fetch(
  "https://apisandbox.whitebooks.in/gst/public/search?gstin=29AAACW1234A1Z5",
  {
    headers: {
      "Authorization": "Bearer YOUR_ACCESS_TOKEN",
      "x-api-key": "YOUR_API_KEY"
    }
  }
);
const data = await res.json();
console.log(data);`;

const FIRST_CALL_PY = `import requests

res = requests.get(
    "https://apisandbox.whitebooks.in/gst/public/search",
    params={"gstin": "29AAACW1234A1Z5"},
    headers={
        "Authorization": "Bearer YOUR_ACCESS_TOKEN",
        "x-api-key": "YOUR_API_KEY",
    },
)
print(res.json())`;

export default function Quickstart(): React.ReactElement {
  return (
    <DocArticle>
      <SeoHead
        title="Quickstart — WhiteBooks Developer Portal"
        description="Authenticate and make your first WhiteBooks API call in under five minutes using the free sandbox environment."
        canonical={`${SITE.baseUrl}/developer/quickstart`}
        robots={SITE.defaultRobots}
      />

      <DocEyebrow>Get Started</DocEyebrow>
      <DocTitle>Quickstart</DocTitle>
      <DocLead>
        Go from zero to your first authenticated API call in about five minutes. Everything here
        runs against the free sandbox — no credit card, no production data.
      </DocLead>

      <Callout type="info" title="Before you begin">
        You’ll need a WhiteBooks developer account. Sign up at{' '}
        <DocLink to="https://accounts.whitebooks.in/signup?type=Developer">accounts.whitebooks.in</DocLink>{' '}
        and choose <strong>Developer</strong> to receive your sandbox credentials.
      </Callout>

      <DocH2 id="steps">Make your first request</DocH2>
      <Steps>
        <Step title="Get your sandbox credentials">
          <DocP>
            After signing up, open your dashboard and copy your <InlineCode>x-api-key</InlineCode>,{' '}
            <InlineCode>client_id</InlineCode>, and <InlineCode>client_secret</InlineCode>. These
            identify your application against the sandbox.
          </DocP>
        </Step>

        <Step title="Note the base URL">
          <DocP>
            All sandbox requests go to <InlineCode>https://apisandbox.whitebooks.in</InlineCode>.
            Each API adds its own prefix — for example <InlineCode>/gst</InlineCode> or{' '}
            <InlineCode>/einvoice</InlineCode>. Switch to{' '}
            <InlineCode>https://api.whitebooks.in</InlineCode> when you go live.
          </DocP>
        </Step>

        <Step title="Exchange your keys for an access token">
          <DocP>
            WhiteBooks uses OAuth 2.0. Call the authentication endpoint to receive a short-lived
            bearer token (valid for one hour).
          </DocP>
          <CodeSample tabs={[{ label: 'cURL', code: AUTH_CURL }]} />
          <DocP>The response contains the token you’ll attach to every subsequent request:</DocP>
          <CodeSample tabs={[{ label: 'JSON', code: AUTH_RESP }]} />
        </Step>

        <Step title="Make an authenticated call">
          <DocP>
            Send the token as a <InlineCode>Bearer</InlineCode> header. This example validates a
            GSTIN using the GST API:
          </DocP>
          <CodeSample
            tabs={[
              { label: 'cURL', code: FIRST_CALL },
              { label: 'Node.js', code: FIRST_CALL_NODE },
              { label: 'Python', code: FIRST_CALL_PY },
            ]}
          />
        </Step>

        <Step title="Go to production">
          <DocP>
            When your integration is ready, swap the base URL to{' '}
            <InlineCode>https://api.whitebooks.in</InlineCode> and use your production credentials.
            Tokens, headers, and payloads stay identical.
          </DocP>
        </Step>
      </Steps>

      <Callout type="success" title="That’s it">
        You’ve made your first authenticated request. Next, read how authentication and token
        refresh work in detail, or jump into the full API Reference.
      </Callout>

      <DocH2 id="environments">Environments</DocH2>
      <DocTable
        head={['Environment', 'Base URL', 'Notes']}
        rows={[
          [<strong key="s">Sandbox</strong>, <InlineCode key="su">https://apisandbox.whitebooks.in</InlineCode>, 'Free. Test data only. 60 requests/min.'],
          [<strong key="p">Production</strong>, <InlineCode key="pu">https://api.whitebooks.in</InlineCode>, 'Live GSTN/NIC submissions. Rate limit by plan.'],
        ]}
      />

      <DocPager
        prev={{ label: 'Overview', to: '/developer/overview' }}
        next={{ label: 'Authentication', to: '/developer/authentication' }}
      />
    </DocArticle>
  );
}
