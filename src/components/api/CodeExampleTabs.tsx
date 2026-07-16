import React, { useState, useMemo, useRef, useEffect, memo } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import type { NormalizedOperation } from '@/data/openapi-spec';
import { useSpec } from '../../contexts/SpecContext';
import { getAllExamples } from '../../utils/generateExamples';
import MethodBadge from './MethodBadge';
import CopyButton from './CopyButton';

interface Props {
  operation: NormalizedOperation;
  /** Live playground values; empty fields fall back to spec examples. */
  headerValues?: Record<string, string>;
  queryValues?: Record<string, string>;
}

type Lang = 'Node.js' | 'Python' | 'TypeScript' | 'Java' | 'Go' | 'PHP' | 'cURL';
const LANGS: Lang[] = ['Node.js', 'Python', 'TypeScript', 'Java', 'Go', 'PHP', 'cURL'];

/* ─── Syntax highlighting ───────────────────────────────────────────────────
   A lightweight, theme-aware tokenizer. We colour strings, numbers, comments,
   shell/flag tokens and a per-language keyword set; everything else inherits
   the base foreground so it stays legible in both light and dark themes.      */

const KEYWORDS: Record<Lang, Set<string>> = {
  'Node.js': new Set(['const', 'let', 'var', 'await', 'async', 'function', 'return', 'new', 'import', 'from', 'export', 'if', 'else', 'console']),
  TypeScript: new Set(['const', 'let', 'var', 'await', 'async', 'function', 'return', 'new', 'import', 'from', 'export', 'if', 'else', 'console', 'interface', 'type', 'as', 'unknown', 'string', 'number', 'Response', 'Record']),
  Python: new Set(['import', 'from', 'def', 'return', 'if', 'else', 'elif', 'for', 'in', 'print', 'None', 'True', 'False', 'requests']),
  Java: new Set(['import', 'public', 'private', 'static', 'void', 'class', 'new', 'return', 'var', 'String', 'HttpClient', 'HttpRequest', 'HttpResponse', 'System', 'URI']),
  Go: new Set(['package', 'import', 'func', 'var', 'defer', 'return', 'main', 'string', 'nil', 'range']),
  PHP: new Set(['function', 'return', 'echo', 'true', 'false', 'null', 'array', 'php']),
  cURL: new Set(['curl', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'Bearer']),
};

const TOKEN_RE =
  /(\/\/[^\n]*|#[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(-{1,2}[A-Za-z][\w-]*)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)/g;

function highlightLine(line: string, lang: Lang): React.ReactNode[] {
  const keywords = KEYWORDS[lang];
  const parts: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;

  const push = (text: string, color: string) => {
    if (text) parts.push(<span key={key++} style={{ color }}>{text}</span>);
  };

  while ((m = TOKEN_RE.exec(line)) !== null) {
    if (m.index > last) push(line.slice(last, m.index), 'var(--dp-fg)');
    const [tok, comment, str, flag, num, ident] = m;
    if (comment) push(tok, 'var(--dp-fg-faint)');
    else if (str) push(tok, 'var(--dp-str-fg)');
    else if (flag) push(tok, 'var(--dp-kw-fg)');
    else if (num) push(tok, 'var(--dp-type-fg)');
    else if (ident) push(tok, keywords.has(ident) ? 'var(--dp-kw-fg)' : 'var(--dp-fg)');
    last = m.index + tok.length;
  }
  if (last < line.length) push(line.slice(last), 'var(--dp-fg)');
  return parts;
}

function CodeBlock({ code, lang }: { code: string; lang: Lang }): React.ReactElement {
  const lines = code.split('\n');
  const gutterWidth = `${String(lines.length).length}ch`;
  return (
    <>
      {lines.map((line, i) => (
        <div key={i} style={{ display: 'flex', lineHeight: 1.7 }}>
          <span
            style={{
              color: 'var(--dp-fg-faint)',
              fontSize: 11.5,
              textAlign: 'right',
              minWidth: gutterWidth,
              userSelect: 'none',
              paddingRight: 14,
              flexShrink: 0,
            }}
          >
            {i + 1}
          </span>
          <span style={{ flex: 1, whiteSpace: 'pre' }}>{highlightLine(line, lang)}</span>
        </div>
      ))}
    </>
  );
}

/* ─── Language dropdown ─────────────────────────────────────────────────── */

function LangDropdown({
  value, onChange,
}: { value: Lang; onChange: (l: Lang) => void }): React.ReactElement {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: 'var(--dp-surface-3)',
          border: '1px solid var(--dp-border-strong)',
          borderRadius: 7,
          color: 'var(--dp-fg)',
          padding: '5px 9px 5px 11px',
          fontSize: 12.5,
          fontWeight: 500,
          fontFamily: 'var(--dp-font-body)',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        {value}
        <ChevronDown size={14} style={{ opacity: 0.7, transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>

      {open && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 5px)',
            left: 0,
            zIndex: 20,
            minWidth: 150,
            background: 'var(--dp-surface)',
            border: '1px solid var(--dp-border-strong)',
            borderRadius: 9,
            padding: 5,
            boxShadow: '0 10px 30px rgba(0,0,0,0.28)',
          }}
        >
          {LANGS.map(lang => {
            const active = lang === value;
            return (
              <button
                key={lang}
                role="option"
                aria-selected={active}
                onClick={() => { onChange(lang); setOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  width: '100%',
                  background: active ? 'var(--dp-accent-soft)' : 'transparent',
                  border: 'none',
                  borderRadius: 6,
                  color: active ? 'var(--dp-accent)' : 'var(--dp-fg-muted)',
                  padding: '7px 10px',
                  fontSize: 12.5,
                  fontWeight: active ? 600 : 400,
                  fontFamily: 'var(--dp-font-body)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.12s, color 0.12s',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--dp-surface-2)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
              >
                {lang}
                {active && <Check size={14} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Main ──────────────────────────────────────────────────────────────── */

export default memo(function CodeExampleTabs({ operation, headerValues, queryValues }: Props): React.ReactElement {
  const { spec, baseUrl } = useSpec();
  const [activeLang, setActiveLang] = useState<Lang>('Node.js');

  const examples = useMemo(
    () => getAllExamples(operation, baseUrl, spec, { headers: headerValues, query: queryValues }),
    [operation, baseUrl, spec, headerValues, queryValues]
  );

  const activeCode = examples[activeLang];

  const [pathCopied, setPathCopied] = useState(false);
  const [pathHover, setPathHover] = useState(false);

  const handleCopyPath = (): void => {
    navigator.clipboard.writeText(operation.path).then(() => {
      setPathCopied(true);
      window.setTimeout(() => setPathCopied(false), 1500);
    });
  };

  return (
    <div
      style={{
        background: 'var(--dp-code-bg)',
        border: '1px solid var(--dp-border-strong)',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
      }}
    >
      {/* Header: method + path */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 10px',
          borderBottom: '1px solid var(--dp-border)',
          background: 'var(--dp-surface-2)',
          minWidth: 0,
        }}
      >
        <MethodBadge method={operation.method} />
        <code
          role="button"
          tabIndex={0}
          aria-label="Copy path"
          title="Click to copy"
          onClick={handleCopyPath}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCopyPath();
            }
          }}
          onMouseEnter={() => setPathHover(true)}
          onMouseLeave={() => setPathHover(false)}
          style={{
            fontFamily: 'var(--dp-font-mono)',
            fontSize: 12,
            color: 'var(--dp-fg-muted)',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            flex: 1,
            minWidth: 0,
            scrollbarWidth: 'none',
            cursor: 'pointer',
            padding: '3px 6px',
            margin: '-3px -6px',
            borderRadius: 6,
            background: pathHover ? 'var(--dp-surface-3)' : 'transparent',
            transition: 'background 0.15s ease',
          }}
        >
          {operation.path}
        </code>

        {/* Copied toast — rendered on the (non-clipping) header so it can sit above the code */}
        {pathCopied && (
          <span
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 'calc(100% + 8px)',
              transform: 'translateX(-50%)',
              zIndex: 30,
              padding: '4px 10px',
              borderRadius: 7,
              fontSize: 11.5,
              fontWeight: 600,
              fontFamily: 'var(--dp-font-display)',
              color: 'var(--dp-fg)',
              background: 'var(--dp-surface-3)',
              border: '1px solid var(--dp-border-strong)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            Copied!
          </span>
        )}
      </div>

      {/* Toolbar: language dropdown + copy */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          padding: '8px 10px',
          borderBottom: '1px solid var(--dp-border)',
          background: 'var(--dp-surface)',
        }}
      >
        <LangDropdown value={activeLang} onChange={setActiveLang} />
        <CopyButton text={activeCode} label={false} size={13} />
      </div>

      {/* Code */}
      <div
        style={{
          padding: '14px 14px 16px',
          fontFamily: 'var(--dp-font-mono)',
          fontSize: 12.5,
          overflowX: 'auto',
          scrollbarWidth: 'thin',
          maxHeight: 460,
          overflowY: 'auto',
          color: 'var(--dp-fg)',
        }}
      >
        <CodeBlock code={activeCode} lang={activeLang} />
      </div>
    </div>
  );
});
