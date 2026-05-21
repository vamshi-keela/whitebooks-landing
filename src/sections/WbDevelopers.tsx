import CodeBlock from "@/components/ui/CodeBlock";
export function ForDevelopersSection() {
    return (
        <section className="section hairline relative" style={{ overflow: 'hidden' }}>
            <div className="mesh" style={{ ['--mesh-opacity' as string]: 0.55 * 0.6 } as React.CSSProperties}></div>
            <div className="container relative">
                <div className="wb-dev-grid">
                    <div>
                        <h2 className="h2">The only India compliance API <em>written like a modern API</em> should be.</h2>
                        <p className="lede" style={{ marginTop: 22 }}>
                            REST, idempotent, retryable. Sandbox keys in 5 minutes. Production-grade SLAs. Direct GSTN-licensed pipe — no resold APIs.
                        </p>
                        <div className="wb-dev-stats">
                            {[
                                { k: 'Sub-200ms', v: 'IRN generation (p50)' },
                                { k: '99.95%', v: 'uptime SLA' },
                                { k: 'SOC 2', v: 'Type II in progress' },
                            ].map((s, i) => (
                                <div key={i} className="wb-dev-stat-row">
                                    <span className="wb-dev-stat-key">{s.k}</span>
                                    <span className="wb-dev-stat-lbl">{s.v}</span>
                                </div>
                            ))}
                        </div>
                        <div className="wb-dev-ctas">
                            <a href="API - GST.html" className="btn btn-accent btn-arrow">
                                Read the API docs
                            </a>
                            <a href="#" className="btn btn-ghost" onClick={(e) => e.preventDefault()}>Get sandbox keys</a>
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
