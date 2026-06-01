import React, { Suspense, lazy } from 'react';
import { BookOpen } from 'lucide-react';
import type { Environment } from '../../data/environments';

const SwaggerUI = lazy(() => import('swagger-ui-react'));

interface Props {
  environment: Environment;
}

const isPlaceholder = (url: string) =>
  url === 'SWAGGER_SANDBOX_URL_PLACEHOLDER' || url === 'SWAGGER_PRODUCTION_URL_PLACEHOLDER';

export default function SwaggerWrapper({ environment }: Props): React.ReactElement {
  const isSandbox = environment.color === 'emerald';
  const accentColor = isSandbox ? '#22c55e' : '#dc2f65';

  return (
    <section style={{ padding: '0 0 64px' }}>
      {/* Section header */}
      <div style={{ marginBottom: 24 }}>
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
          <BookOpen size={13} color="var(--dp-accent-2)" />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--dp-accent-2)', fontFamily: 'var(--dp-font-mono)' }}>
            API Explorer
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <h2
            style={{
              fontFamily: 'var(--dp-font-display)',
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--dp-fg)',
              margin: 0,
            }}
          >
            Interactive API Reference
          </h2>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: isSandbox ? 'rgba(34,197,94,0.08)' : 'rgba(220,47,101,0.08)',
              border: `1px solid ${isSandbox ? 'rgba(34,197,94,0.22)' : 'rgba(220,47,101,0.22)'}`,
              color: accentColor,
              borderRadius: 999,
              padding: '3px 12px',
              fontSize: 12,
              fontFamily: 'var(--dp-font-mono)',
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: accentColor,
                display: 'inline-block',
                boxShadow: `0 0 6px ${accentColor}`,
              }}
            />
            {environment.name}
          </span>
        </div>
        <p style={{ fontSize: 14, color: 'var(--dp-fg-muted)', margin: '8px 0 0' }}>
          Explore endpoints, run requests, and inspect responses — directly in the browser.
        </p>
      </div>

      {/* Swagger container */}
      <div className="swagger-wrapper" style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--dp-border)' }}>
        {isPlaceholder(environment.swaggerUrl) ? (
          <PlaceholderState environment={environment} />
        ) : (
          <Suspense fallback={<SwaggerSkeleton />}>
            <SwaggerUI
              url={environment.swaggerUrl}
              docExpansion="list"
              defaultModelsExpandDepth={-1}
              persistAuthorization
              displayRequestDuration
            />
          </Suspense>
        )}
      </div>
    </section>
  );
}

function PlaceholderState({ environment }: { environment: Environment }): React.ReactElement {
  return (
    <div
      style={{
        background: 'var(--dp-surface)',
        padding: '64px 32px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: 'var(--dp-accent-soft)',
          border: '1px solid var(--dp-accent-line)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--dp-accent-2)',
        }}
      >
        <BookOpen size={24} />
      </div>
      <div>
        <div
          style={{
            fontFamily: 'var(--dp-font-display)',
            fontWeight: 700,
            fontSize: 18,
            color: 'var(--dp-fg)',
            marginBottom: 8,
          }}
        >
          {environment.name} OpenAPI Spec
        </div>
        <div style={{ fontSize: 14, color: 'var(--dp-fg-muted)', maxWidth: 400 }}>
          The OpenAPI 3.0 specification for the {environment.name.toLowerCase()} environment will be
          loaded here once the Swagger URL is configured.
        </div>
      </div>
      <code
        style={{
          fontFamily: 'var(--dp-font-mono)',
          fontSize: 12,
          color: 'var(--dp-fg-faint)',
          background: 'var(--dp-surface-2)',
          border: '1px solid var(--dp-border)',
          borderRadius: 8,
          padding: '8px 16px',
        }}
      >
        {environment.baseUrl}/openapi.json
      </code>
    </div>
  );
}

function SwaggerSkeleton(): React.ReactElement {
  return (
    <div style={{ background: 'var(--dp-surface)', padding: 32 }}>
      {[1, 2, 3].map(i => (
        <div
          key={i}
          style={{
            height: 52,
            background: 'var(--dp-surface-2)',
            borderRadius: 8,
            marginBottom: 8,
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
      ))}
    </div>
  );
}
