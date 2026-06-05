import CodeBlock from "@/components/ui/CodeBlock";
import { ButtonLink } from "@/components/ui/Button";

export function ForDevelopersSection() {
    return (
        <section className="relative overflow-hidden border-b border-white/[0.06] py-24 max-md:py-16 max-sm:py-12">
            <div
                className="absolute inset-[-10%] pointer-events-none z-0"
                style={{
                    background: `radial-gradient(ellipse 38% 50% at var(--m1x) var(--m1y), rgba(220,47,101,0.5), transparent 65%),
                        radial-gradient(ellipse 36% 42% at var(--m2x) var(--m2y), rgba(255,110,156,0.42), transparent 70%),
                        radial-gradient(ellipse 30% 36% at var(--m3x) var(--m3y), rgba(255,168,120,0.22), transparent 72%),
                        radial-gradient(ellipse 32% 38% at var(--m4x) var(--m4y), rgba(155,22,68,0.55), transparent 65%)`,
                    filter: 'blur(38px) saturate(160%)',
                    animation: 'wb-mesh-drift 22s ease-in-out infinite alternate',
                    opacity: 0.33,
                } as React.CSSProperties}
            />
            <div className="relative w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
                <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-16 items-center max-lg:gap-10 max-md:grid-cols-1 max-md:gap-8">
                    <div>
                        <h2 className="[font-family:var(--font-serif)] font-semibold text-[clamp(28px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 max-w-[780px] [text-wrap:balance]">
                            The only India compliance API <em>written like a modern API</em> should be.
                        </h2>
                        <p className="text-[17px] max-sm:text-[15px] text-[var(--fg-secondary)] leading-[1.55] max-w-[600px] m-0 mt-[22px]">
                            REST, idempotent, retryable. Sandbox keys in 5 minutes. Production-grade SLAs. Direct GSTN-licensed pipe — no resold APIs.
                        </p>
                        <div className="mt-8 flex flex-col gap-[10px]">
                            {[
                                { k: 'Sub-200ms', v: 'IRN generation (p50)' },
                                { k: '99.95%', v: 'uptime SLA' },
                                { k: 'SOC 2', v: 'Type II in progress' },
                            ].map((s, i) => (
                                <div key={i} className="flex justify-between items-center py-[14px] border-b border-white/[0.06]">
                                    <span className="[font-family:var(--font-serif)] text-[clamp(17px,1.8vw,22px)] tracking-[-0.015em]">{s.k}</span>
                                    <span className="[font-family:var(--font-mono)] text-[12px] text-[var(--fg-tertiary)] tracking-[0.06em] uppercase">{s.v}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 flex gap-[14px] flex-wrap">
                            <ButtonLink href="/apis/gst" arrow>
                                Read the API docs
                            </ButtonLink>
                            <ButtonLink
                                href="#"
                                variant="ghost"
                                onClick={(e) => e.preventDefault()}
                            >
                                Get sandbox keys
                            </ButtonLink>
                        </div>
                    </div>
                    <CodeBlock samples={{
                        curl: `<span class="com"># Generate an IRN with the Whitebooks REST API</span>
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
                        node: `<span class="kw">import</span> { Whitebooks } <span class="kw">from</span> <span class="str">'@whitebooks/sdk'</span>;
        <span class="kw">const</span> wb = <span class="kw">new</span> <span class="fn">Whitebooks</span>(process.env.WHITEBOOKS_KEY);

        <span class="kw">const</span> { irn, qr_code, ack_no } = <span class="kw">await</span> wb.einvoice.<span class="fn">create</span>({
          supplier_gstin: <span class="str">'29AAACR5055K1Z5'</span>,
          buyer_gstin:    <span class="str">'27AAFCD5862R000'</span>,
          invoice_no:     <span class="str">'INV-2026-00421'</span>,
          invoice_date:   <span class="str">'2026-05-16'</span>,
          items:          [<span class="com">/* line items */</span>]
        });`,
                        python: `<span class="kw">from</span> whitebooks <span class="kw">import</span> Whitebooks
        wb = <span class="fn">Whitebooks</span>(api_key=os.environ[<span class="str">'WHITEBOOKS_KEY'</span>])

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
        </section>
    );
}
