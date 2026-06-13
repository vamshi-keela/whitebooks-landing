import React, { useRef } from 'react';
import { Search, X } from 'lucide-react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search APIs...' }: Props): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="dp-searchbar"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'var(--dp-surface)',
        border: '1px solid var(--dp-border-strong)',
        borderRadius: 8,
        padding: '7px 10px',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
      onClick={() => inputRef.current?.focus()}
      onFocusCapture={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--dp-input-border-focus)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 3px var(--dp-accent-soft)';
      }}
      onBlurCapture={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--dp-border-strong)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      <Search size={14} color="var(--dp-fg-dim)" style={{ flexShrink: 0 }} />
      <input
        ref={inputRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1,
          minWidth: 0,
          background: 'none',
          border: 'none',
          outline: 'none',
          color: 'var(--dp-fg)',
          fontSize: 13,
          fontFamily: 'var(--dp-font-body)',
        }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--dp-fg-dim)',
            cursor: 'pointer',
            display: 'flex',
            padding: 0,
          }}
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
}
