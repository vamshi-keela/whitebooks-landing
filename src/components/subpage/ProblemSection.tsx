import type { ProblemSection as ProblemSectionData } from "../../types/pages.ts";

interface Props {
  data: ProblemSectionData;
}

export function ProblemSection({ data }: Props) {
  const gridCls = data.items.length === 2 ? "wb-problem-grid-2" : "wb-problem-grid-3";
  return (
    <section className="wb-section wb-reveal wb-problem-section" data-reveal>
      <div className="wb-wrap">
        <h2 className="wb-h2">{data.heading}</h2>
        <div className={`wb-problem-grid ${gridCls}`}>
          {data.items.map((it, i) => (
            <article key={i} className="wb-problem-card">
              <div className="wb-problem-glow" aria-hidden="true" />
              <div className="wb-problem-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.5 L13.6 10.4 L21.5 12 L13.6 13.6 L12 21.5 L10.4 13.6 L2.5 12 L10.4 10.4 Z" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className="wb-problem-num">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="wb-problem-title">{it.title}</h3>
              <p className="wb-problem-body">{it.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
