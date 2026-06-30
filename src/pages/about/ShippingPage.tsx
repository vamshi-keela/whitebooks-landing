import { Footer, Header } from "@/layouts/SiteShell";

const wrap = "max-w-[1240px] mx-auto px-8 max-sm:px-5";

export default function ShippingPage() {
    return (
        <div className="min-h-screen bg-[var(--bg)]">
            <Header mode="resources" />
            <main>
                <section className="pt-[170px] pb-[100px]">
                    <div className={wrap}>
                        <h1 className="text-[var(--muted-2)] leading-[1.55]">
                            Shipping is not applicable for business.
                        </h1>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}