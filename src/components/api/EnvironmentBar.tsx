import React from 'react';
import { Check, Copy, Globe, KeyRound } from 'lucide-react';
import type { Environment as Env } from '../../data/environments';
import type { ApiSpecKey } from '@/data/openapi-spec';
import CopyButton from './CopyButton';
import ApiTypeBadge from './ApiTypeBadge';

interface Props {
  environments: Env[];
  selected: Env;
  onChange: (env: Env) => void;
  /** Which API reference page this bar sits on — the default OTP is only valid
   *  for the GST API sandbox, so it is shown solely there. */
  apiType?: ApiSpecKey;
}

export { API_TYPE_LABELS } from './ApiTypeBadge';

export default function EnvironmentBar({ environments, selected, onChange, apiType }: Props): React.ReactElement {
  const [copied, setCopied] = React.useState(false);

  // Accent for the selected environment (blue = sandbox, green = production),
  // matching the segmented control's dots.
  const selectedAccent = selected.color === 'blue' ? 'var(--dp-info)' : 'var(--dp-success)';
  // The sandbox default OTP is a GST-API-only affordance.
  const isGstApi = apiType === 'gst-api';

  return (
    <div className="bg-[var(--dp-nav-bg)] border-b border-[var(--dp-border)] sticky top-[var(--dp-nav-h)] z-40 backdrop-blur-xl">
      <div className="max-w-[1440px] mx-auto flex flex-wrap items-center gap-2 sm:gap-3 px-4 sm:px-6 py-[7px]">
        {apiType && <ApiTypeBadge apiType={apiType} />}
        <Globe size={13} color="var(--dp-fg-faint)" className="shrink-0" />

        <span className="text-xs text-[var(--dp-fg-dim)] font-body shrink-0">
          Environment:
        </span>

        {/* Segmented control */}
        <div className="flex p-[3px] gap-0.5 rounded-lg bg-[var(--dp-surface-2)] border border-[var(--dp-border)]">
          {environments.map(env => {
            const isSelected = env.key === selected.key;
            const isSandbox = env.color === 'blue';
            const accent = isSandbox ? 'var(--dp-info)' : 'var(--dp-success)';
            return (
              <button
                key={env.key}
                onClick={() => onChange(env)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-[3px] text-xs font-body cursor-pointer transition-all duration-150 border-0"
                style={{
                  background: isSelected ? 'var(--dp-bg)' : 'transparent',
                  boxShadow: isSelected ? '0 1px 3px rgba(0,0,0,0.18)' : 'none',
                  color: isSelected ? 'var(--dp-fg)' : 'var(--dp-fg-dim)',
                  fontWeight: isSelected ? 600 : 400,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    background: isSelected ? accent : 'var(--dp-fg-faint)',
                    boxShadow: isSelected ? `0 0 6px ${accent}` : 'none',
                  }}
                />
                {env.name}
              </button>
            );
          })}
        </div>

        {/* <code className="hidden sm:inline-block font-[family-name:var(--dp-font-mono)] text-[12px] text-[var(--dp-fg-dim)] bg-[var(--dp-surface)] border border-[var(--dp-border)] rounded-md px-2 py-0.5">
        {selected.baseUrl}
      </code> */}
        <div className="hidden sm:flex items-center gap-1.5 min-w-0 bg-[var(--dp-surface-2)] border border-[var(--dp-border-strong)] rounded-[10px] pl-2 pr-2 py-0.5">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: selectedAccent, boxShadow: `0 0 6px ${selectedAccent}` }}
          />
          <code className="py-0.5 font-[family-name:var(--dp-font-mono)] text-[0.78rem] sm:text-[0.81rem] flex-1 min-w-0 overflow-x-auto leading-none self-center flex items-center flex-nowrap gap-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="whitespace-nowrap shrink-0" style={{ color: selectedAccent }}>{selected.baseUrl}</span>
          </code>
        </div>
        <div className="shrink-0">
          <CopyButton text={selected.baseUrl} size={12} label={false} />
        </div>

        {/* Sandbox + GST-API-only default OTP — hidden in production (invalid)
            and on every other API reference page. */}
        {isGstApi && selected.defaultOtp && (
          <div
            className="flex items-center gap-1.5 min-w-0 rounded-[10px] pl-2 pr-1"
            style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.22)' }}
            title="Default OTP for OTP / EVC authentication in sandbox"
          >
            <KeyRound size={12} color="var(--dp-otp-fg)" className="shrink-0" />
            <span className="text-xs font-semibold shrink-0" style={{ color: 'var(--dp-otp-fg)' }}>
              Default OTP
            </span>
            <code className="font-[family-name:var(--dp-font-mono)] font-semibold text-[12.5px] sm:text-[13px] shrink-0" style={{ color: 'var(--dp-otp-fg)' }}>
              {selected.defaultOtp}
            </code>
            <CopyButton text={selected.defaultOtp} size={12} label={false} />
          </div>
        )}

      </div>
    </div>
  );
}
