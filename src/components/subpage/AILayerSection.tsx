"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { AISection as AISectionData } from "../../types/pages.ts";

interface Props {
  data: AISectionData;
}

const ICONS: Record<string, ReactNode> = {
  classify: (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 7l4-3 4 3v6l-4 3-4-3z" />
      <path d="M15 14l4-3 4 3v6l-4 3-4-3z" opacity="0.6" />
      <line x1="9" y1="13" x2="15" y2="14" strokeDasharray="1.5 1.5" />
    </svg>
  ),
  anomaly: (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18 L7 14 L11 17 L16 9 L21 14 L25 11" />
      <circle cx="16" cy="9" r="2.4" fill="currentColor" stroke="none" />
      <line x1="16" y1="4.5" x2="16" y2="6" />
    </svg>
  ),
  qa: (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6 h16 a2 2 0 0 1 2 2 v8 a2 2 0 0 1 -2 2 h-8 l-5 4 v-4 H4 a2 2 0 0 1 -2 -2 V8 a2 2 0 0 1 2 -2 Z" />
      <line x1="7" y1="11" x2="15" y2="11" />
      <line x1="7" y1="14" x2="12" y2="14" />
    </svg>
  ),
  match: (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7 C 9 7, 11 14, 17 14 C 23 14, 25 7, 25 7" />
      <path d="M3 21 C 9 21, 11 14, 17 14" opacity="0.55" />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
};

const ICON_ORDER = ["classify", "anomaly", "qa", "match"];

function AISpark() {
  const [t, setT] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      setT((now - start) / 1000);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const nodes = [
    { x: 0, y: 0, base: 0.0, big: true },
    { x: 0, y: -34, base: 0.0 },
    { x: 32, y: -10, base: 0.4 },
    { x: 20, y: 28, base: 0.8 },
    { x: -20, y: 28, base: 1.2 },
    { x: -32, y: -10, base: 1.6 },
  ];
  const edges: [number, number][] = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [2, 3], [3, 4], [4, 5], [5, 1]];

  return (
    <div className="wb-ail2-spark">
      <svg viewBox="-50 -50 100 100" aria-hidden="true">
        <defs>
          <radialGradient id="wbSparkBg" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="rgba(220,47,101,0.18)" />
            <stop offset="65%" stopColor="rgba(220,47,101,0.06)" />
            <stop offset="100%" stopColor="rgba(220,47,101,0)" />
          </radialGradient>
        </defs>
        <circle cx="0" cy="0" r="46" fill="url(#wbSparkBg)" />
        <circle cx="0" cy="0" r="40" fill="none" stroke="rgba(220,47,101,0.25)" strokeWidth="0.5" strokeDasharray="2 3" />

        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="rgba(220,47,101,0.45)"
            strokeWidth="0.55"
            opacity={0.5 + 0.5 * Math.sin(t * 1.4 + i * 0.7)}
          />
        ))}

        {nodes.map((n, i) => {
          const pulse = 0.5 + 0.5 * Math.sin(t * 1.6 + n.base);
          const base = n.big ? 5 : 3;
          const halo = base + 2 + pulse * 4;
          return (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r={halo} fill="rgba(220,47,101,0.30)" opacity={0.4 + pulse * 0.5} />
              <circle cx={n.x} cy={n.y} r={base} fill="#dc2f65" />
              <circle cx={n.x} cy={n.y} r={base - 1.2} fill="#ffd5e2" opacity="0.65" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function AILayerSection({ data }: Props) {
  const label = data.label || "The AI layer";
  return (
    <section className="wb-ail2 wb-reveal" data-reveal>
      <div className="wb-ail2-blob wb-ail2-blob-1" aria-hidden="true" />
      <div className="wb-ail2-blob wb-ail2-blob-2" aria-hidden="true" />
      <div className="wb-wrap">
        <div className="wb-ail2-grid">
          <div className="wb-ail2-intro">
            <AISpark />
            <h2 className="wb-ail2-heading">{data.heading}</h2>
            <p className="wb-ail2-sub">
              Whitebooks runs a shared AI engine across every product. Trained on Indian compliance data, tuned for finance teams, and embedded in the workflows you already use.
            </p>
            {data.note && (
              <div className="wb-ail2-note">
                <span className="wb-ail2-note-dot" />
                <div>{data.note}</div>
              </div>
            )}
          </div>

          <div className="wb-ail2-cards">
            {data.items.slice(0, 4).map((it, i) => {
              const iconKey = ICON_ORDER[i % ICON_ORDER.length];
              return (
                <article key={i} className="wb-ail2-card">
                  <div className="wb-ail2-card-head">
                    <div className="wb-ail2-card-icon">{ICONS[iconKey]}</div>
                    <span className="wb-ail2-card-num">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="wb-ail2-card-title">{it.title}</h3>
                  <p className="wb-ail2-card-body">{it.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
