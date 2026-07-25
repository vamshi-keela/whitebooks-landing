import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { NormalizedOperation, ApiSpecKey } from '@/data/openapi-spec';
import { API_TYPE_LABELS } from './EnvironmentBar';

interface Props {
  operation: NormalizedOperation;
  apiType: ApiSpecKey;
  /** Extra classes (e.g. margins) for the host context. */
  className?: string;
}

/* API type › tag › summary — the operation's place in the reference hierarchy. */
export default function OperationBreadcrumb({
  operation, apiType, className = '',
}: Props): React.ReactElement {
  return (
    <div className={`flex items-center gap-1.5 text-[12.5px] font-medium ${className}`}>
      <span className="text-[var(--dp-fg-dim)]">{API_TYPE_LABELS[apiType]}</span>
      <ChevronRight size={12} color="var(--dp-fg-faint)" className="shrink-0" />
      <span className="text-[var(--dp-fg-dim)]">{operation.tag}</span>
      <ChevronRight size={12} color="var(--dp-fg-faint)" className="shrink-0" />
      <span className="text-[var(--dp-accent)] truncate">{operation.summary}</span>
    </div>
  );
}
