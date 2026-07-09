import { ReactNode } from 'react'
import { ButtonLink } from '@/components/ui/Button'


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
            className="relative bg-[#d33568] text-white py-[100px] max-sm:py-[64px] overflow-hidden"
            id="book-demo"
        >
            <div className="closing-pattern" aria-hidden="true" />
            <div className="relative z-10 max-w-[1240px] mx-auto px-8 max-sm:px-5">
                <h2 className="font-display font-semibold text-[clamp(32px,4.5vw,54px)] leading-[1.06] tracking-[-0.025em] max-w-[820px] text-white text-balance">
                    {h2}
                </h2>
                <p className="mt-5 mb-8 max-w-[580px] text-base md:text-lg text-white/85 leading-[1.55]">
                    {body}
                </p>
                <div className="flex flex-wrap gap-3">
                    {primaryCta && (
                        <ButtonLink href={primaryCta.href || '#'} variant="white" size="lg" arrow>
                            {primaryCta.label}
                        </ButtonLink>
                    )}
                    {secondaryCta && (
                        <ButtonLink href={secondaryCta.href || '#'} variant="whiteOutline" size="lg">
                            {secondaryCta.label}
                        </ButtonLink>
                    )}
                </div>
            </div>
        </section>
    )
}
