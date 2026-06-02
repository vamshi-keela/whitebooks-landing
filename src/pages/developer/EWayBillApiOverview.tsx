
// export function FinalCTA() {
//   return (
//     <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black px-6 py-16 sm:px-10 lg:px-16">
//       {/* Background Glow */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,47,101,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(220,47,101,0.12),transparent_35%)]" />

import { SIGNUP_URL } from "@/utils/contants";
import { FinalCTA } from "./EinvoiceApiOverview";
import { BestPracticesSection, Divider, GettingStartedSection, GuideArchitecture, HeroSection, SandboxSection, SdkLibrariesSection, StatsSection } from "./GstOverview";
import GstResources from "./GstResources";
import { EWAYBILL_FAQS, EWAYBILL_RESOURCE_ITEMS, EWAYBILL_SANDBOX_SETUP_STEPS, EWAYBILL_SDK_ITEMS, EWAYBILL_STEPS } from "@/data/e-way-bill-api-page-data";

//       <div className="relative z-10 mx-auto max-w-4xl text-center">
//         {/* Badge */}
//         <div className="mb-6 inline-flex items-center rounded-full border border-[#dc2f65]/20 bg-[#dc2f65]/10 px-4 py-1.5 text-sm font-medium text-[#ff9fbc] backdrop-blur">
//           GST Compliant • Real-Time APIs • Logistics Ready
//         </div>

//         {/* Heading */}
//         <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
//           Automate{" "}
//           <span className="bg-gradient-to-r from-[#ff8fb2] to-[#dc2f65] bg-clip-text text-transparent">
//             e-Way Bill Generation
//           </span>{" "}
//           with Powerful APIs
//         </h2>

//         {/* Description */}
//         <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
//           Integrate WhiteBooks e-Way Bill APIs into your ERP, logistics
//           platform, accounting software, or supply chain system to automate
//           e-Way Bill generation, updates, cancellations, and transportation
//           compliance workflows in real time.
//         </p>

//         {/* CTA Buttons */}
//         <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
//           <a
//             href="/contact"
//             className="inline-flex items-center justify-center rounded-xl bg-[#dc2f65] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#c52859]"
//           >
//             Get API Access
//           </a>

//           <a
//             href="/demo"
//             className="inline-flex items-center justify-center rounded-xl border border-[#dc2f65]/30 bg-[#dc2f65]/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-all duration-200 hover:bg-[#dc2f65]/20"
//           >
//             Book a Live Demo
//           </a>
//         </div>

//         {/* Trust Indicators */}
//         <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
//           <span>✓ Real-Time e-Way Bill APIs</span>
//           <span>✓ Vehicle & Transport Updates</span>
//           <span>✓ Sandbox & Production Access</span>
//           <span>✓ Enterprise-Grade Security</span>
//         </div>
//       </div>
//     </section>
//   );
// }
export default function EWayBillApiOverview() {
    return (
        <div className="min-h-screen" style={{ background: 'var(--dp-bg' }}>
            <HeroSection
                title="E-Way Bill APIs for"
                description="The WhiteBooks e-Way Bill API creates, extends, cancels, and verifies e-Way Bills against the NIC e-Way Bill system. Use it from your ERP, dispatch system, or transport-management software to automate EWB at scale."
            />
            <Divider />
            <StatsSection />
            <Divider />
            <GuideArchitecture />
            <Divider />
            <GettingStartedSection steps={EWAYBILL_STEPS} />
            <Divider />
            <SandboxSection
                title='WhiteBooks E-Way Bill API Sandbox Information'
                subTitle='To use E-Way Bill API Sandbox Credentials, follow the steps below to generate your API keys from the developer dashboard.'
                setupSteps={EWAYBILL_SANDBOX_SETUP_STEPS}
                showOTPBlock={false}
            />
            <Divider />
            <BestPracticesSection />

            <Divider />
            <SdkLibrariesSection sdkItems={EWAYBILL_SDK_ITEMS} />
            <Divider />
            {/* gst resources */}
            <GstResources resources={EWAYBILL_RESOURCE_ITEMS} faqs={EWAYBILL_FAQS} />
            <Divider />
            <FinalCTA
                eyebrowLabel="GST SUVIDHA PROVIDER | ISO 27001:2013"
                headingStart='Automate '
                headingAccent='e-Way Bill Generation'
                headingEnd='with Powerful APIs'
                description='Integrate WhiteBooks e-Way Bill APIs into your ERP, logistics platform, accounting software, or supply chain system to automate e-Way Bill generation, updates, cancellations, and transportation compliance workflows in real time.'
                trustItems={['GST Return Filing APIs', 'GSTIN Verification', 'Sandbox & Production Access']}
                primaryButton={{ label: 'Get API Access', href: SIGNUP_URL }}
                secondaryButton={{ label: 'Read the Docs', href: '#' }} />
        </div>
    );
}