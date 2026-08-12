import React from 'react';
import type { ApiSpecKey } from '@/data/openapi-spec';
import { API_TYPE_LABELS, API_TYPE_SHORT_LABELS } from './apiTypeLabels';

export { API_TYPE_LABELS, API_TYPE_SHORT_LABELS, API_TYPE_ORDER } from './apiTypeLabels';

interface Props {
  apiType: ApiSpecKey;
  /** `pill` = accented chip for page chrome; `quiet` = caption inside a control. */
  variant?: 'pill' | 'quiet';
  /** Drop the trailing "API" — for list rows where it repeats on every line. */
  short?: boolean;
  className?: string;
}

/*
 * The API-type tag ("GST API", "E-Invoice API", …).
 *
 * One component so the tag looks the same wherever it appears, and so a page
 * shows it in exactly one place: the environment bar owns it on reference
 * pages, the endpoint switcher owns it inside the playground.
 */
export default function ApiTypeBadge({
  apiType, variant = 'pill', short = false, className = '',
}: Props): React.ReactElement {
  const label = short ? API_TYPE_SHORT_LABELS[apiType] : API_TYPE_LABELS[apiType];

  if (variant === 'quiet') {
    return (
      <span
        className={`block truncate text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[var(--dp-fg-dim)] ${className}`}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      className={`shrink-0 whitespace-nowrap text-[11px] font-semibold tracking-[0.03em] px-2 py-[2px] rounded-md ${className}`}
      style={{
        background: 'var(--dp-accent-soft)',
        color: 'var(--dp-accent)',
        border: '1px solid rgba(220,47,101,0.18)',
      }}
    >
      {label}
    </span>
  );
}
