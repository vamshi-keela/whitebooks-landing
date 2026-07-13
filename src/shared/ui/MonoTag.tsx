// MonoTag.tsx — accent eyebrow: a glowing brand-pink dot + mono-uppercase label.
//
// Extracted from PillarCards so the same "· LABEL" eyebrow reads identically
// across sections. Borderless / no pill background by design — it sits inline
// above a card title. Theme-aware on its own via ThemeContext, so callers just
// pass the text.

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/shared/lib/cn';

interface MonoTagProps {
  label: string;
  /** Font size in px for the label. Defaults to 13. */
  fontSize?: number;
  className?: string;
  showDot?: boolean;
}

export function MonoTag({ label, fontSize = 13, className, showDot = true }: MonoTagProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <span
      className={cn('mono-tag accent', className)}
      style={{
        background: 'transparent',
        border: 'none',
        borderRadius: 0,
        padding: '1px 0',
        boxShadow: 'none',
        fontSize,
        fontWeight: 700,
        letterSpacing: '0.10em',
        color: isDark ? '#ff7aac' : '#c41e57',
      }}
    >
      {showDot && (
        <span
          className="dot"
          style={{
            width: 7,
            height: 7,
            flexShrink: 0,
            boxShadow: isDark
              ? '0 0 10px rgba(220,47,101,0.95), 0 0 4px rgba(220,47,101,0.60)'
              : '0 0 6px rgba(220,47,101,0.60)',
          }}
        />
      )}
      {label}
    </span>
  );
}

export default MonoTag;
