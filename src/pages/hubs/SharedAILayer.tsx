import { ArrowRight } from 'lucide-react'
import { ReactNode } from 'react'


export interface ClosingConfig {
    h2: ReactNode
    body: string
    primaryCta?: CtaConfig
    secondaryCta?: CtaConfig
}

export interface CtaConfig {
    label: string
    href?: string
}

export default function SharedAILayer({ h2, body, primaryCta, secondaryCta }: ClosingConfig) {
    return (
        <section
            className="relative bg-[#dc2f65] text-white py-[100px] max-sm:py-[64px] overflow-hidden"
            id="book-demo"
        >
            <div className="closing-pattern" aria-hidden="true" />
            <div className="relative z-10 max-w-[1240px] mx-auto px-8 max-sm:px-5">
                <h2 className="font-display font-semibold text-[clamp(30px,4.5vw,54px)] leading-[1.06] tracking-[-0.025em] max-w-[820px] text-white text-balance">
                    {h2}
                </h2>
                <p className="mt-5 mb-8 max-w-[580px] text-[16.5px] text-white/85 leading-[1.55]">
                    {body}
                </p>
                <div className="flex flex-wrap gap-3">
                    {primaryCta && (
                        <a
                            href={primaryCta.href || '#'}
                            className="inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-lg font-medium text-[15px] bg-white text-[#dc2f65] transition-all duration-150 hover:bg-[#f3f3f5] hover:-translate-y-px"
                        >
                            {primaryCta.label} <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                    )}
                    {secondaryCta && (
                        <a
                            href={secondaryCta.href || '#'}
                            className="inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-lg font-medium text-[15px] text-white border border-white/60 transition-all duration-150 hover:bg-white/10 hover:border-white"
                        >
                            {secondaryCta.label}
                        </a>
                    )}
                </div>
            </div>
        </section>
    )
}
