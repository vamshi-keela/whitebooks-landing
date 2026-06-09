import type { ProblemSection as ProblemSectionData } from "../../types/pages.ts";

interface Props {
  data: ProblemSectionData;
}

export function ProblemSection({ data }: Props) {
  const is2col = data.items.length === 2;

  return (
    <section
      className="relative py-[120px] max-[700px]:py-[72px] opacity-100 translate-y-0 transition-[opacity,transform] duration-[600ms] ease-[ease]"
      data-reveal
    >
      <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
        <h2 className="font-[var(--font-display)] font-semibold text-[clamp(28px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 max-w-[780px] [text-wrap:balance]">
          {data.heading}
        </h2>

        <div
          className={`grid gap-[22px] mt-14 ${is2col
            ? "grid-cols-2 max-[900px]:grid-cols-1"
            : "grid-cols-3 max-[900px]:grid-cols-1"
            }`}
        >
          {data.items.map((it, i) => (
            <article
              key={i}
              className={[
                // layout & shape
                "group relative pt-[30px] px-7 pb-7 rounded-2xl overflow-hidden isolate",
                // base background — brand-accent radial overlays sit on top via backgroundImage in style prop
                "bg-[var(--bg-card)]",
                // border — border-solid required because preflight is disabled (no global border-style:solid reset)
                "border border-solid border-[rgba(220,47,101,0.18)]",
                // transitions
                "transition-[transform,border-color,box-shadow] duration-[220ms] ease-[ease]",
                // hover states
                "hover:-translate-y-[2px] hover:border-[rgba(220,47,101,0.45)] hover:shadow-[0_18px_40px_-18px_rgba(220,47,101,0.45)]",
                // ::before — top-edge shimmer line (uses --line-2 so it's visible in both themes)
                "before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-px",
                "before:bg-[linear-gradient(90deg,transparent,var(--line-2),transparent)]",
                "before:pointer-events-none",
                // ::after — dot-grid corner overlay (uses --line so dots are visible in both themes)
                "after:content-[''] after:absolute after:top-0 after:left-0 after:w-[220px] after:h-[200px]",
                "after:[background-image:radial-gradient(circle_at_1px_1px,var(--line-2)_1px,transparent_0)]",
                "after:[background-size:14px_14px]",
                "after:[-webkit-mask-image:radial-gradient(ellipse_60%_80%_at_0%_0%,#000_0%,transparent_75%)]",
                "after:[mask-image:radial-gradient(ellipse_60%_80%_at_0%_0%,#000_0%,transparent_75%)]",
                "after:pointer-events-none after:z-0 after:opacity-70",
              ].join(" ")}
              style={{
                backgroundImage: [
                  "radial-gradient(ellipse 65% 90% at 0% 0%, rgba(220,47,101,0.13), transparent 55%)",
                  "radial-gradient(ellipse 70% 60% at 100% 100%, rgba(220,47,101,0.06), transparent 60%)",
                ].join(", "),
              }}
            >
              {/* radial glow — position: absolute, hover shifts via group */}
              <div
                className="absolute -top-[60px] -left-[80px] w-[280px] h-[280px] rounded-full pointer-events-none z-0 opacity-[0.85] transition-[opacity,transform] duration-[220ms] ease-[ease] group-hover:opacity-100 group-hover:translate-x-[6px] group-hover:translate-y-[6px]"
                aria-hidden="true"
                style={{
                  background: "radial-gradient(circle, rgba(220,47,101,0.30), transparent 65%)",
                  filter: "blur(28px)",
                }}
              />

              {/* icon badge */}
              <div
                className="relative z-[1] w-11 h-11 inline-flex items-center justify-center rounded-xl bg-[rgba(220,47,101,0.10)] border border-solid border-[rgba(220,47,101,0.35)] text-[var(--brand)] shadow-[inset_0_1px_0_var(--line-2),0_8px_24px_-10px_rgba(220,47,101,0.6)] mb-[22px] [&_svg]:w-[22px] [&_svg]:h-[22px] [&_svg]:[filter:drop-shadow(0_0_8px_rgba(220,47,101,0.55))]"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M12 2.5 L13.6 10.4 L21.5 12 L13.6 13.6 L12 21.5 L10.4 13.6 L2.5 12 L10.4 10.4 Z"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </div>

              {/* sequence number */}
              <div className="absolute top-7 right-[26px] z-[1] font-[var(--font-mono)] text-[11px] tracking-[0.14em] text-[var(--muted)]">
                {String(i + 1).padStart(2, "0")}
              </div>

              <h3 className="relative z-[1] font-[var(--font-display)] font-semibold text-[20px] tracking-[-0.01em] leading-[1.25] m-0 mb-3 text-[var(--text)] [text-wrap:balance]">
                {it.title}
              </h3>
              <p className="relative z-[1] m-0 text-[14.5px] leading-[1.6] text-[var(--muted-2)]">
                {it.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
