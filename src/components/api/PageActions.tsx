import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, Copy, Check, FileText, ChevronDown } from 'lucide-react';
import type { NormalizedOperation } from '../../data/openapi-spec';
import { useSpec } from '../../contexts/SpecContext';

interface Props {
  operation: NormalizedOperation;
  /** Optional handler for the "Ask a question" action (e.g. open a chat/search). */
  onAsk?: () => void;
}

/** Build a Markdown representation of the operation — used for copy / view / LLM hand-off. */
function operationToMarkdown(op: NormalizedOperation, baseUrl: string): string {
  const lines: string[] = [];
  lines.push(`# ${op.summary}`, '');
  lines.push(`\`${op.method} ${baseUrl}${op.path}\``, '');
  if (op.description) lines.push(op.description, '');

  const params = op.parameters ?? [];
  if (params.length) {
    lines.push('## Parameters', '');
    for (const p of params) {
      const schema = p.schema && !('$ref' in p.schema) ? p.schema : null;
      const type = schema?.type ?? 'string';
      lines.push(`- \`${p.name}\` (${p.in}, ${type}${p.required ? ', required' : ''})${p.description ? ` — ${p.description}` : ''}`);
    }
    lines.push('');
  }

  const codes = Object.keys(op.responses ?? {});
  if (codes.length) {
    lines.push('## Responses', '');
    for (const code of codes) {
      const desc = op.responses?.[code]?.description ?? '';
      lines.push(`- \`${code}\`${desc ? ` — ${desc}` : ''}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

const itemCls =
  'px-2 py-1 rounded-md text-[var(--dp-fg-dim)] whitespace-nowrap hover:bg-[var(--dp-accent-soft)] hover:text-[var(--dp-accent)] transition-colors flex items-center gap-1.5 cursor-pointer text-[13px] font-medium bg-transparent border-0';

const Divider = (): React.ReactElement => (
  <span aria-hidden className="text-[var(--dp-border-strong)] mx-1 select-none">|</span>
);


export default function PageActions({ operation, onAsk }: Props): React.ReactElement {
  const { baseUrl } = useSpec();
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const markdown = useCallback(() => operationToMarkdown(operation, baseUrl), [operation, baseUrl]);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(markdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [markdown]);

  const handleViewMarkdown = useCallback(() => {
    const blob = new Blob([markdown()], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank', 'noopener,noreferrer');
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }, [markdown]);

  const openInLLM = useCallback((base: string) => {
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const prompt = `I'm reading the "${operation.summary}" API reference (${pageUrl}). Help me use this endpoint.`;
    window.open(`${base}${encodeURIComponent(prompt)}`, '_blank', 'noopener,noreferrer');
    setMenuOpen(false);
  }, [operation.summary]);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  return (
    <div className="flex flex-wrap items-center gap-0.5 mb-6 -ml-1">
      {/* <button type="button" onClick={onAsk} className={itemCls} title="Ask a question about this page">
        <Sparkles size={15} /> Ask a question
      </button> */}

      {/* <Divider /> */}

      <button type="button" onClick={handleCopy} className={itemCls} title="Copy this page as Markdown for LLMs">
        {copied ? <Check size={15} /> : <Copy size={15} />}
        <span>{copied ? 'Copied' : 'Copy page'}</span>
      </button>

      <Divider />

      <button type="button" onClick={handleViewMarkdown} className={itemCls} title="View this page as Markdown">
        <FileText size={15} /> View as Markdown
      </button>

      <Divider />

      <div ref={menuRef} className="relative">
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
          className={itemCls}
        >
          More actions
          <ChevronDown size={15} className="transition-transform duration-150" style={{ transform: menuOpen ? 'rotate(180deg)' : 'none' }} />
        </button>

        {menuOpen && (
          <div
            role="menu"
            className="absolute left-0 top-[calc(100%+6px)] z-30 min-w-[200px] rounded-[10px] border border-[var(--dp-border-strong)] bg-[var(--dp-surface)] p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.28)]"
          >
            <button role="menuitem" onClick={() => { handleCopy(); setMenuOpen(false); }} className={`${itemCls} w-full justify-start`}>
              <Copy size={15} /> Copy page as Markdown
            </button>
            <button role="menuitem" onClick={() => { handleViewMarkdown(); setMenuOpen(false); }} className={`${itemCls} w-full justify-start`}>
              <FileText size={15} /> View as Markdown
            </button>
            <div className="my-1 h-px bg-[var(--dp-border)]" />
            <button role="menuitem" onClick={() => openInLLM('https://chatgpt.com/?q=')} className={`${itemCls} w-full justify-start`}>
              <Sparkles size={15} /> Open in ChatGPT
            </button>
            <button role="menuitem" onClick={() => openInLLM('https://claude.ai/new?q=')} className={`${itemCls} w-full justify-start`}>
              <Sparkles size={15} /> Open in Claude
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
