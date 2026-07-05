// ComplianceSupport.tsx — Section 1 · "Enterprise-grade GST infrastructure".
//
// Stripe-Atlas / Vercel-Enterprise register. Two columns (40 / 60): left holds
// the headline, CTA and an animated infrastructure flow (Request → GST Gateway
// → NIC → Success); right holds a staggered stack of floating glass feature
// cards. Composed entirely from the shared SectionKit primitives.

import {
  CheckCircle2,
  Headset,
  Landmark,
  Network,
  Rocket,
  Send,
  ServerCog,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  AnimationPlaceholder,
  CTAButton,
  FeatureCard,
  SectionHeader,
  SectionShell,
  fadeUp,
  staggerParent,
  type FlowStep,
} from "@/components/ui/SectionKit";
import { COMPLIANCE_SUPPORT, type ComplianceSupportData } from "./compliance-support.data";

const FEATURE_ICON: Record<string, LucideIcon> = {
  gsp: ShieldCheck,
  gateway: Network,
  onboarding: Rocket,
  success: Users,
  support: Headset,
};

const FLOW_ICON: Record<string, LucideIcon> = {
  request: Send,
  gateway: ServerCog,
  nic: Landmark,
  success: CheckCircle2,
};

/** InfrastructureAnimationPlaceholder — the future MP4 of the request lifecycle. */
function InfrastructureAnimationPlaceholder({ flow }: { flow: ComplianceSupportData["flow"] }) {
  // TODO: Replace with MP4 animation
  const steps: FlowStep[] = flow.map((s) => {
    const Icon = FLOW_ICON[s.icon] ?? Send;
    return { icon: <Icon size={16} />, label: s.label, sublabel: s.sublabel };
  });
  return <AnimationPlaceholder steps={steps} badge="Infrastructure" aspect="1/1" />;
}

export function ComplianceSupport({ data = COMPLIANCE_SUPPORT }: { data?: ComplianceSupportData }) {
  return (
    <SectionShell>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
        {/* Left — header, CTA, responsive feature grid */}
        <div className="flex flex-col gap-7">
          <SectionHeader
            eyebrow={data.eyebrow}
            title={
              <>
                Enterprise-grade <span className="text-[var(--brand)]">API infrastructure</span> backed by experts
              </>
            }
            subtitle={data.subtitle}
          />
          <CTAButton href={data.cta.href}>{data.cta.label}</CTAButton>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {data.features.map((f, i) => {
              const Icon = FEATURE_ICON[f.icon] ?? ShieldCheck;
              return (
                <FeatureCard
                  key={f.title}
                  index={i}
                  icon={<Icon size={19} />}
                  title={f.title}
                  description={f.detail}
                />
              );
            })}
          </motion.div>
        </div>

        {/* Right — infrastructure flow visual, vertically centered */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col justify-center"
        >
          <InfrastructureAnimationPlaceholder flow={data.flow} />
        </motion.div>
      </div>
    </SectionShell>
  );
}

export default ComplianceSupport;
