import { Link } from 'react-router-dom';
import { Icon } from "../icons/Icon";

export type ProductMapKey = "accounting" | "gst" | "e-invoice" | "e-way-bill" | "notice-management";

interface ProductMapProps {
  active?: ProductMapKey;
}

const PRODUCTS: { id: ProductMapKey; label: string; href: string; Icon: typeof Icon.Accounting }[] = [
  { id: "accounting", label: "Accounting", href: "/softwares/accounting", Icon: Icon.Accounting },
  { id: "gst", label: "GST", href: "/softwares/gst", Icon: Icon.GST },
  { id: "e-invoice", label: "e-Invoice", href: "/softwares/e-invoice", Icon: Icon.EInvoice },
  { id: "e-way-bill", label: "e-Way Bill", href: "/softwares/e-way-bill", Icon: Icon.EWayBill },
  { id: "notice-management", label: "Notice Management", href: "/softwares/notice-management", Icon: Icon.KSA },
];

const COLUMN_X = ["10%", "30%", "50%", "70%", "90%"];

const cardBase = [
  "group/card relative block w-full max-w-[196px] aspect-square overflow-hidden rounded-[14px] no-underline text-inherit",
  "border transition-[transform,border-color,background,box-shadow] duration-[220ms]",
  "before:content-[''] before:absolute before:inset-0 before:pointer-events-none",
  "before:transition-opacity before:duration-[220ms]",
  "before:[background:radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(220,47,101,0.06),transparent_70%)]",
].join(" ");

const cardActive = [
  "border-brand before:opacity-100",
  "[background:radial-gradient(ellipse_90%_70%_at_50%_0%,rgba(220,47,101,0.16),transparent_70%),var(--bg-2)]",
  "shadow-[0_0_0_1px_var(--brand)_inset,0_0_70px_-10px_rgba(220,47,101,0.38),0_12px_32px_-14px_rgba(220,47,101,0.32)]",
].join(" ");

const cardInactive = [
  "bg-[var(--bg-2)] border-[var(--line-2)] before:opacity-0",
  "hover:-translate-y-[3px] hover:border-[var(--brand-border)] hover:bg-[var(--bg-elev)]",
  "hover:shadow-[0_12px_32px_-14px_rgba(220,47,101,0.25)] hover:before:opacity-100",
].join(" ");

export function ProductMap({ active }: ProductMapProps) {
  return (
    <section className="relative py-[72px] sm:py-24" data-reveal>
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">

        {/* Heading */}
        <div className="text-center">
          <h2 className="font-display font-semibold text-[clamp(28px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] max-w-[760px] mx-auto [text-wrap:balance]">
            Your end-to-end compliance lifecycle{" "}
            <span className="text-brand">in one place.</span>
          </h2>
          <p className="mt-4 mx-auto text-[16.5px] text-secondary max-w-[640px] leading-[1.55]">
            Five products. One core platform. One contract, one workspace, one ledger of record. So every workflow from book-keeping to dispatch sees the same data.
          </p>
        </div>

        {/* Map */}
        <div className="relative mt-14">

          {/* Product cards row */}
          <div className="grid grid-cols-5">
            {PRODUCTS.map((p) => {
              const isActive = p.id === active;
              const I = p.Icon;
              return (
                <div
                  key={p.id}
                  className="flex justify-center px-[9px] max-[900px]:px-[5px]"
                >
                  <Link
                    to={p.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`${cardBase} ${isActive ? cardActive : cardInactive}`}
                  >
                    {/* Card inner */}
                    <div className="absolute inset-0 flex flex-col items-center justify-between pt-[26px] px-[16px] pb-[22px] max-[900px]:pt-[18px] max-[900px]:px-[8px] max-[900px]:pb-[14px]">

                      {/* Icon wrap */}
                      <div
                        className={[
                          "relative flex-1 w-full flex items-center justify-center text-brand",
                          "transition-[opacity,transform] duration-[220ms]",
                          "[&>svg]:relative [&>svg]:z-[1]",
                          "max-[900px]:[&>svg]:w-8 max-[900px]:[&>svg]:h-8",
                          "max-[600px]:[&>svg]:w-6 max-[600px]:[&>svg]:h-6",
                          isActive
                            ? "opacity-100 drop-shadow-[0_0_14px_rgba(220,47,101,0.42)]"
                            : "opacity-[0.78] group-hover/card:opacity-100 group-hover/card:-translate-y-[2px]",
                        ].join(" ")}
                      >
                        {/* Icon bg */}
                        <div
                          aria-hidden="true"
                          className={[
                            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                            "w-[72px] h-[72px] rounded-[14px] border",
                            "transition-[opacity,transform,box-shadow] duration-[220ms]",
                            "max-[900px]:w-[56px] max-[900px]:h-[56px] max-[900px]:rounded-[12px]",
                            "max-[600px]:w-[44px] max-[600px]:h-[44px] max-[600px]:rounded-[10px]",
                            isActive
                              ? "opacity-100 bg-brand border-brand shadow-[0_0_24px_rgba(220,47,101,0.35)]"
                              : [
                                "bg-[var(--brand-soft)] border-[var(--brand-border)] opacity-[0.55]",
                                "group-hover/card:opacity-100",
                                "group-hover/card:shadow-[0_0_0_1px_var(--brand-border),0_6px_20px_-6px_rgba(220,47,101,0.28)]",
                              ].join(" "),
                          ].join(" ")}
                        />
                        <I
                          width="40"
                          height="40"
                          className={isActive ? "text-white [stroke-width:1.6]" : ""}
                        />
                      </div>

                      {/* Label */}
                      <div
                        className={[
                          "font-display text-[15px] font-semibold tracking-[-0.005em]",
                          "transition-colors duration-[220ms] whitespace-nowrap",
                          "max-[900px]:text-[12px] max-[600px]:text-[10.5px]",
                          isActive
                            ? "text-brand"
                            : "text-secondary group-hover/card:text-primary",
                        ].join(" ")}
                      >
                        {p.label}
                      </div>
                    </div>

                    {/* Active pulse ring */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-[-1px] rounded-[14px] pointer-events-none border border-[rgba(220,47,101,0.6)] animate-pmap-pulse"
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Connector SVG */}
          <svg className="block w-full h-[72px]" width="100%" height="72" preserveAspectRatio="none" aria-hidden="true">
            {COLUMN_X.map((x, i) => {
              const ids: ProductMapKey[] = ["accounting", "gst", "e-invoice", "e-way-bill", "notice-management"];
              const isActive = ids[i] === active;
              return (
                <line
                  key={`v-${i}`}
                  x1={x} y1="0" x2={x} y2="36"
                  stroke={isActive ? "rgba(220,47,101,0.95)" : "rgba(220,47,101,0.55)"}
                  strokeWidth={isActive ? "1.5" : "1"}
                />
              );
            })}
            <line x1="10%" y1="36" x2="90%" y2="36" stroke="rgba(220,47,101,0.45)" strokeWidth="1" />
            <line x1="50%" y1="36" x2="50%" y2="72" stroke="rgba(220,47,101,0.75)" strokeWidth="1.5" />
            {COLUMN_X.map((x, i) => (
              <circle key={`d-${i}`} cx={x} cy="36" r="2.5" fill="rgba(220,47,101,0.85)" />
            ))}
          </svg>

          {/* Core platform badge */}
          <div className="flex justify-center">
            <div className={[
              "inline-flex items-center gap-[14px] py-[14px] pr-[22px] pl-[18px]",
              "bg-[var(--bg-2)] border border-solid border-brand rounded-[12px] relative",
              "shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset,0_8px_20px_-8px_rgba(220,47,101,0.32)]",
              "before:content-[''] before:absolute before:inset-[-1px] before:rounded-[13px] before:-z-[1]",
              "before:[background:linear-gradient(180deg,rgba(220,47,101,0.35),transparent_60%)]",
              "before:blur-[6px] before:opacity-70",
            ].join(" ")}>
              <span
                aria-hidden="true"
                className="w-[9px] h-[9px] rounded-full bg-brand shrink-0 shadow-[0_0_12px_rgba(220,47,101,0.56),0_0_0_3px_rgba(220,47,101,0.13)] animate-pmap-coredot"
              />
              <div>
                <div className="font-display font-semibold text-[16px] text-primary tracking-[-0.005em] leading-[1.1]">
                  Core Platform
                </div>
                <div className="mt-1 font-mono text-[10.5px] tracking-[0.08em] text-muted uppercase max-[900px]:hidden">
                  GSP pipe · IRP gateway · Identity · Audit log
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
