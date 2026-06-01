import React, { useState, memo } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { TagGroup } from '../../utils/groupOperations';
import OperationCard from './OperationCard';

interface Props {
  group: TagGroup;
  searchQuery: string;
}

export default memo(function ApiTagSection({ group, searchQuery }: Props): React.ReactElement {
  const [collapsed, setCollapsed] = useState(false);

  const filteredOps = group.operations.filter(op => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      op.path.toLowerCase().includes(q) ||
      op.summary.toLowerCase().includes(q) ||
      (op.description?.toLowerCase().includes(q) ?? false) ||
      op.method.toLowerCase().includes(q)
    );
  });

  if (filteredOps.length === 0) return <></>;

  return (
    <section
      id={`tag-${group.tag.name}`}
      style={{ marginBottom: 48 }}
    >
      {/* Tag heading */}
      <div
        onClick={() => setCollapsed(c => !c)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 16,
          cursor: 'pointer',
          userSelect: 'none',
          paddingBottom: 12,
          borderBottom: '1px solid var(--dp-border)',
        }}
      >
        {collapsed
          ? <ChevronRight size={16} color="var(--dp-fg-dim)" />
          : <ChevronDown size={16} color="var(--dp-fg-dim)" />
        }

        <h2
          style={{
            fontFamily: 'var(--dp-font-display)',
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--dp-fg)',
            margin: 0,
            letterSpacing: '-0.01em',
          }}
        >
          {group.tag.name}
        </h2>

        <span
          style={{
            fontSize: 11,
            fontFamily: 'var(--dp-font-mono)',
            color: 'var(--dp-fg-dim)',
            background: 'var(--dp-surface)',
            border: '1px solid var(--dp-border)',
            borderRadius: 999,
            padding: '1px 8px',
          }}
        >
          {filteredOps.length}
        </span>
      </div>

      {/* Tag description */}
      {!collapsed && group.tag.description && (
        <p
          style={{
            fontSize: 14,
            color: 'var(--dp-fg-muted)',
            marginTop: -8,
            marginBottom: 16,
            lineHeight: 1.6,
          }}
        >
          {group.tag.description}
        </p>
      )}

      {/* Operations */}
      {!collapsed && (
        <div>
          {filteredOps.map(op => (
            <OperationCard key={op.id} operation={op} defaultOpen={false} />
          ))}
        </div>
      )}
    </section>
  );
});
