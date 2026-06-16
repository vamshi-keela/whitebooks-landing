import React from 'react';
import { SeoHead } from '../../../seo/components/SeoHead';
import { SITE } from '../../../seo/config/site';
import {
  DocArticle, DocEyebrow, DocTitle, DocLead, DocH2, DocH3, DocP, DocUL, DocLI,
  InlineCode, Callout, CodeSample, DocTable, DocPager,
} from './DocKit';

const TOKEN_CURL = `curl -X GET "https://apisandbox.whitebooks.in/authentication/authtoken" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "client_id: YOUR_CLIENT_ID" \\
  -H "client_secret: YOUR_CLIENT_SECRET"`;

const USE_TOKEN = `curl -X POST "https://apisandbox.whitebooks.in/einvoice/generate-irn" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "invoice": { } }'`;

export default function Authentication(): React.ReactElement {
  return (
    <DocArticle>
      <SeoHead
        title="Authentication — Whitebooks Developer Portal"
        description="How to authenticate with the Whitebooks APIs using OAuth 2.0 bearer tokens, API keys, token refresh, and production security controls."
        canonical={`${SITE.baseUrl}/developer/authentication`}
        robots={SITE.defaultRobots}
      />

      <DocEyebrow>Essentials</DocEyebrow>
      <DocTitle>Authentication</DocTitle>
      <DocLead>
        Every Whitebooks API call is authenticated with OAuth 2.0. You exchange your application
        credentials for a short-lived bearer token, then send that token with each request.
      </DocLead>

      <DocH2 id="credentials">Your credentials</DocH2>
      <DocP>After signing up you receive three values. Treat the secret like a password.</DocP>
      <DocTable
        head={['Credential', 'Sent as', 'Purpose']}
        rows={[
          [<InlineCode key="a">x-api-key</InlineCode>, 'Header', 'Identifies and rate-limits your application.'],
          [<InlineCode key="b">client_id</InlineCode>, 'Header', 'Public identifier for the OAuth client.'],
          [<InlineCode key="c">client_secret</InlineCode>, 'Header', 'Private secret used only to mint tokens.'],
        ]}
      />
      <Callout type="warning" title="Keep your secret server-side">
        Never ship <InlineCode>client_secret</InlineCode> in browser or mobile code. Mint tokens
        from your backend and pass only the resulting bearer token to clients if needed.
      </Callout>

      <DocH2 id="get-token">1 · Request an access token</DocH2>
      <DocP>Call the authentication endpoint with your credentials in the headers:</DocP>
      <CodeSample tabs={[{ label: 'cURL', code: TOKEN_CURL }]} />
      <DocP>
        A successful response returns an <InlineCode>access_token</InlineCode>, a{' '}
        <InlineCode>token_type</InlineCode> of <InlineCode>Bearer</InlineCode>, and{' '}
        <InlineCode>expires_in</InlineCode> seconds.
      </DocP>

      <DocH2 id="use-token">2 · Authenticate requests</DocH2>
      <DocP>
        Attach the token in the <InlineCode>Authorization</InlineCode> header (and keep sending{' '}
        <InlineCode>x-api-key</InlineCode>) on every call:
      </DocP>
      <CodeSample tabs={[{ label: 'cURL', code: USE_TOKEN }]} />

      <DocH2 id="expiry">Token lifetime &amp; refresh</DocH2>
      <DocP>
        Access tokens are valid for <strong>one hour</strong> (<InlineCode>expires_in: 3600</InlineCode>).
        When a token expires the API returns <InlineCode>401 Unauthorized</InlineCode> — request a
        new token and retry. Our official SDKs cache and refresh tokens for you automatically.
      </DocP>
      <Callout type="tip" title="Don’t mint a token per request">
        Re-use a token until it’s close to expiry. Caching it avoids unnecessary auth calls and
        keeps you well within rate limits.
      </Callout>

      <DocH2 id="security">Production security</DocH2>
      <DocP>Production accounts can layer on additional controls:</DocP>
      <DocUL>
        <DocLI><strong>TLS 1.2+</strong> is enforced on all endpoints (TLS 1.3 preferred).</DocLI>
        <DocLI><strong>IP allow-listing</strong> restricts which addresses may use your keys.</DocLI>
        <DocLI><strong>SHA256-RSA request signing</strong> adds payload integrity for sensitive flows.</DocLI>
        <DocLI><strong>Role-based access control</strong> scopes what each key can do.</DocLI>
      </DocUL>

      <DocH3>Common auth errors</DocH3>
      <DocTable
        head={['Status', 'Meaning', 'Fix']}
        rows={[
          [<InlineCode key="1">401</InlineCode>, 'Token missing, invalid, or expired', 'Request a fresh token and retry.'],
          [<InlineCode key="2">403</InlineCode>, 'Key lacks permission or IP not allow-listed', 'Check RBAC scopes and allow-list.'],
          [<InlineCode key="3">429</InlineCode>, 'Rate limit exceeded', 'Back off and retry after the reset window.'],
        ]}
      />

      <DocPager
        prev={{ label: 'Quickstart', to: '/developer/quickstart' }}
        next={{ label: 'Errors & Status Codes', to: '/developer/errors' }}
      />
    </DocArticle>
  );
}
