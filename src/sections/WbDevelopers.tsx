import CodeBlock from "@/components/ui/CodeBlock";
import { ButtonLink } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import DpIcon, { type IconName } from "@/pages/developer/DpIcon";
import { cn } from "@/lib/cn";
import DataStreamBackground from "@/components/DataStreamBackground";

const METRICS: { k: string; v: string; icon: IconName }[] = [
    { k: 'Sub-200ms', v: 'IRN generation (P50)', icon: 'bolt' },
    { k: '99.95%', v: 'Uptime SLA', icon: 'shield' },
    { k: 'SOC 2', v: 'Type II in progress', icon: 'lock' },
];

export function ForDevelopersSection() {
    const navigate = useNavigate();
    return (
        <section
            className="relative overflow-hidden border-b border-[var(--hairline)] py-24 max-md:py-16 max-sm:py-12"
            style={{
                // Pin the dark theme tokens so this near-black section stays
                // readable regardless of the site's active (light/dark) theme.
                backgroundColor: "#0B0B0F",
                ["--fg-primary" as string]: "#e8e8f0",
                ["--fg-secondary" as string]: "#9a9ab0",
                ["--fg-tertiary" as string]: "#6b6b80",
                ["--hairline" as string]: "rgba(255, 255, 255, 0.06)",
                ["--accent-glow" as string]: "rgba(220, 47, 101, 0.4)",
            } as React.CSSProperties}
        >
            {/* Animated backdrop — invisible streams of financial data quietly
                flowing through the compliance network. */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <DataStreamBackground className="absolute inset-0" />
            </div>

            <div className="relative w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
                <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-16 items-start max-lg:gap-10 max-md:grid-cols-1 max-md:gap-8">
                    {/* Left column */}
                    <div className="max-md:order-1">

                        <h2 className="[font-family:var(--font-serif)] font-semibold text-[clamp(28px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 max-w-[780px] [text-wrap:balance]">
                            The only India compliance API written like a{' '}
                            <span className="text-[var(--accent)]">modern API</span> should be.
                        </h2>

                        <p className="text-[17px] max-sm:text-[15px] text-[var(--fg-secondary)] leading-[1.55] max-w-[600px] m-0 mt-[22px]">
                            REST, idempotent, retryable. Sandbox keys in 5 minutes. Production-grade SLAs. Direct GSTN-licensed pipe — no resold APIs.
                        </p>

                        <div className="mt-9 flex items-center gap-7 flex-wrap max-sm:gap-5">
                            <ButtonLink size="lg" onClick={() => navigate('/apis')}>
                                Read the API docs
                                <DpIcon name="arrow-right" size={15} />
                            </ButtonLink>
                            <a
                                href='https://accounts.whitebooks.in/signup?type=Developer&subscrid=&inviteId'
                                className="inline-flex items-center text-[15px] font-medium text-[var(--fg-primary)] underline decoration-[var(--accent)] decoration-2 underline-offset-[6px] transition-colors hover:text-[var(--accent)] cursor-pointer"
                            >
                                Get sandbox keys
                            </a>
                        </div>
                    </div>

                    {/* Right column — code block */}
                    <div className="max-md:order-2">
                        <CodeBlock samples={{
                            curl: `<span class="com"># Generate an IRN with the WhiteBooks REST API</span>
        <span class="kw">curl</span> https://api.whitebooks.in/v1/einvoice \\
          -H <span class="str">"Authorization: Bearer $WHITEBOOKS_KEY"</span> \\
          -H <span class="str">"Content-Type: application/json"</span> \\
          -d '{
            <span class="str">"supplier_gstin"</span>: <span class="str">"29AAACR5055K1Z5"</span>,
            <span class="str">"buyer_gstin"</span>:    <span class="str">"27AAFCD5862R000"</span>,
            <span class="str">"invoice_no"</span>:     <span class="str">"INV-2026-00421"</span>,
            <span class="str">"invoice_value"</span>:  <span class="num">150000</span>,
            <span class="str">"items"</span>:          [...]
          }'

        <span class="com">→ 200 OK · 182ms · IRN a4f2c91e8b7d3...</span>`,
                            node: `<span class="kw">import</span> { WhiteBooks } <span class="kw">from</span> <span class="str">'@whitebooks/sdk'</span>;
        <span class="kw">const</span> wb = <span class="kw">new</span> <span class="fn">WhiteBooks</span>(process.env.WHITEBOOKS_KEY);

        <span class="kw">const</span> { irn, qr_code, ack_no } = <span class="kw">await</span> wb.einvoice.<span class="fn">create</span>({
          supplier_gstin: <span class="str">'29AAACR5055K1Z5'</span>,
          buyer_gstin:    <span class="str">'27AAFCD5862R000'</span>,
          invoice_no:     <span class="str">'INV-2026-00421'</span>,
          invoice_date:   <span class="str">'2026-05-16'</span>,
          items:          [<span class="com">/* line items */</span>]
        });`,
                            python: `<span class="kw">from</span> whitebooks <span class="kw">import</span> WhiteBooks
        wb = <span class="fn">WhiteBooks</span>(api_key=os.environ[<span class="str">'WHITEBOOKS_KEY'</span>])

        response = wb.einvoice.<span class="fn">create</span>(
            supplier_gstin=<span class="str">'29AAACR5055K1Z5'</span>,
            buyer_gstin=<span class="str">'27AAFCD5862R000'</span>,
            invoice_no=<span class="str">'INV-2026-00421'</span>,
            invoice_date=<span class="str">'2026-05-16'</span>,
            items=[...]
        )`,
                        }} />
                    </div>
                </div>

                {/* Metrics row */}
                <div className="mt-12 max-md:mt-8 grid grid-cols-3 max-sm:grid-cols-1 overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[rgba(255,255,255,0.015)]">
                    {METRICS.map((m, i) => (
                        <div
                            key={m.k}
                            className={cn(
                                "flex items-center gap-4 px-8 py-7 max-lg:px-6 max-md:px-5 max-sm:py-5",
                                i > 0 && "border-l border-[var(--hairline)] max-sm:border-l-0 max-sm:border-t"
                            )}
                        >
                            <span className="grid place-items-center h-11 w-11 shrink-0 rounded-full border border-[var(--accent-glow)] bg-[rgba(220,47,101,0.08)] text-[var(--accent)]">
                                <DpIcon name={m.icon} size={18} />
                            </span>
                            <div>
                                <div className="[font-family:var(--font-serif)] text-[clamp(20px,2vw,26px)] font-semibold tracking-[-0.015em] leading-none">
                                    {m.k}
                                </div>
                                <div className="text-[13px] text-[var(--fg-tertiary)] mt-[6px]">{m.v}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
