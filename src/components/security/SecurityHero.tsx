import {
    ShieldCheck,
    LockKeyhole,
    Server,
    FileHeart,
    Lock,
    ArrowRightCircle,
    type LucideIcon,
    BrickWallShield,
} from "lucide-react";
import securityShield from "@/assets/resources/security_shield.png";
import { Button, ButtonLink } from "../ui/Button";
import { useNavigate } from "react-router-dom";

const PINK = "#E73476";

/* ------------------------------------------------------------------ */
/*  Left – trust features                                              */
/* ------------------------------------------------------------------ */

const features: { icon: LucideIcon; title: string; desc: string }[] = [
    {
        icon: ShieldCheck,
        title: "99.99% Uptime SLA",
        desc: "High availability you can depend on",
    },
    {
        icon: LockKeyhole,
        title: "TLS 1.2+ & OAuth2",
        desc: "Industry-standard encryption & secure authentication",
    },
    {
        icon: Server,
        title: "Data Residency",
        desc: "Multi-region deployment for data sovereignty",
    },
    {
        icon: FileHeart,
        title: "Audit & Monitoring",
        desc: "Detailed logs & audit trails for complete visibility",
    },
];

function TrustFeature({
    icon: Icon,
    title,
    desc,
}: {
    icon: LucideIcon;
    title: string;
    desc: string;
}) {
    return (
        <div className="px-5 first:pl-0">
            <Icon className="mb-3 h-6 w-6" style={{ color: PINK }} strokeWidth={1.75} />
            <h4 className="text-[15px] font-semibold text-[#111827] dark:text-[var(--fg-primary)]">{title}</h4>
            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-[var(--fg-secondary)]">{desc}</p>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Infrastructure highlights                                          */
/* ------------------------------------------------------------------ */

const infraHighlights: string[] = [
    "Encrypted API communication (TLS 1.2+)",
    "Token-based authentication (OAuth 2.0)",
    "Role-based access controls",
    "Audit logging (immutable, 7-year retention)",
    "Retry & queue mechanisms",
    "High availability (multi-AZ active-active)",
    "Continuous monitoring (24×7 NOC)",
    "Secure cloud infrastructure (ISO 27001)",
    "Disaster recovery processes (RPO < 5 min)",
    "Production-grade deployment pipelines",
];

function HighlightItem({ text }: { text: string }) {
    return (
        <li className="flex items-start gap-3">
            <span
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-[2px]"
                style={{ background: PINK }}
            />
            <span className="text-[15px] leading-6 text-gray-700 dark:text-[var(--fg-secondary)]">{text}</span>
        </li>
    );
}

/* ------------------------------------------------------------------ */
/*  Compliance badges (custom SVGs)                                    */
/* ------------------------------------------------------------------ */

function IsoBadge() {
    return (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="25" stroke={PINK} strokeWidth="2.5" />
            <ellipse cx="30" cy="30" rx="10" ry="25" stroke={PINK} strokeWidth="1.8" />
            <line x1="6" y1="21" x2="54" y2="21" stroke={PINK} strokeWidth="1.8" />
            <line x1="6" y1="39" x2="54" y2="39" stroke={PINK} strokeWidth="1.8" />
            <rect x="13" y="22" width="34" height="16" rx="2" fill="#fff" />
            <text
                x="30"
                y="34"
                textAnchor="middle"
                fontSize="13"
                fontWeight="800"
                fill={PINK}
                fontFamily="Poppins, sans-serif"
            >
                ISO
            </text>
        </svg>
    );
}

function Soc2Badge() {
    return (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="25" stroke={PINK} strokeWidth="2.5" />
            <text
                x="30"
                y="23"
                textAnchor="middle"
                fontSize="7"
                fontWeight="700"
                fill={PINK}
                fontFamily="Poppins, sans-serif"
            >
                AICPA
            </text>
            <text
                x="30"
                y="34"
                textAnchor="middle"
                fontSize="11"
                fontWeight="800"
                fill={PINK}
                fontFamily="Poppins, sans-serif"
            >
                SOC 2
            </text>
            <line x1="13" y1="38" x2="47" y2="38" stroke={PINK} strokeWidth="1.2" />
            <text
                x="30"
                y="46"
                textAnchor="middle"
                fontSize="6"
                fontWeight="700"
                fill={PINK}
                fontFamily="Poppins, sans-serif"
            >
                TYPE II
            </text>
        </svg>
    );
}

function GdprBadge() {
    const stars = Array.from({ length: 12 });
    return (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            {stars.map((_, i) => {
                const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
                const cx = 30 + Math.cos(angle) * 25;
                const cy = 30 + Math.sin(angle) * 25;
                return (
                    <path
                        key={i}
                        transform={`translate(${cx} ${cy})`}
                        d="M0 -3 L0.9 -0.9 L3 -0.9 L1.2 0.6 L1.9 2.8 L0 1.5 L-1.9 2.8 L-1.2 0.6 L-3 -0.9 L-0.9 -0.9 Z"
                        fill={PINK}
                    />
                );
            })}
            <rect x="20" y="28" width="20" height="16" rx="3" fill={PINK} />
            <path
                d="M23 28 V23 a7 7 0 0 1 14 0 V28"
                fill="none"
                stroke={PINK}
                strokeWidth="3"
            />
            <circle cx="30" cy="35" r="2.6" fill="#fff" />
            <rect x="29" y="36" width="2" height="5" rx="1" fill="#fff" />
        </svg>
    );
}

function DpdpaBadge() {
    return (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path
                d="M30 6 L50 14 C50 34 42 47 30 53 C18 47 10 34 10 14 Z"
                fill="none"
                stroke={PINK}
                strokeWidth="2.5"
            />
            <path
                d="M26 17 l6 1 4 4 5 3 -2 6 -6 1 -3 6 -5 -3 -5 1 1 -7 -5 -4 6 -4 Z"
                fill={PINK}
                opacity="0.9"
            />
            <circle cx="42" cy="40" r="8" fill="#fff" stroke={PINK} strokeWidth="2" />
            <path
                d="M38.5 40 l2.5 2.5 4-4.5"
                fill="none"
                stroke={PINK}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function MeityBadge() {
    return (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="18" r="7" fill={PINK} />
            <circle cx="19" cy="20" r="6" fill={PINK} opacity="0.75" />
            <circle cx="41" cy="20" r="6" fill={PINK} opacity="0.75" />
            <rect x="15" y="26" width="30" height="4" rx="1" fill={PINK} />
            <circle cx="30" cy="36" r="6.5" fill="none" stroke={PINK} strokeWidth="1.6" />
            <line x1="30" y1="29.5" x2="30" y2="42.5" stroke={PINK} strokeWidth="1.1" />
            <line x1="23.5" y1="36" x2="36.5" y2="36" stroke={PINK} strokeWidth="1.1" />
            <line x1="25.4" y1="31.4" x2="34.6" y2="40.6" stroke={PINK} strokeWidth="1.1" />
            <line x1="25.4" y1="40.6" x2="34.6" y2="31.4" stroke={PINK} strokeWidth="1.1" />
            <rect x="19" y="43" width="22" height="3.5" rx="1" fill={PINK} />
            <text
                x="30"
                y="55"
                textAnchor="middle"
                fontSize="5"
                fontWeight="600"
                fill={PINK}
                fontFamily="Poppins, sans-serif"
            >
                सत्यमेव जयते
            </text>
        </svg>
    );
}

const compliance: { badge: JSX.Element; title: string; sub: string }[] = [
    { badge: <IsoBadge />, title: "ISO 27001", sub: "Certified" },
    { badge: <Soc2Badge />, title: "SOC 2 Type II", sub: "Certified" },
    { badge: <GdprBadge />, title: "GDPR", sub: "Compliant" },
    { badge: <DpdpaBadge />, title: "DPDPA", sub: "Compliant" },
    // { badge: <MeityBadge />, title: "MeitY", sub: "Compliant" },
];

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function SecurityHero() {
    const navigate = useNavigate();
    return (
        <section className="relative overflow-hidden bg-[#fdf6f9] py-12 dark:bg-[linear-gradient(180deg,#050509_0%,#0d1018_100%)]">
            {/* top radial glow */}
            <div
                className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-60 blur-[160px]"
                style={{ background: "rgba(231,52,118,0.18)" }}
            />

            <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-16">
                {/* ---------- top: copy + illustration ---------- */}
                <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                    {/* LEFT */}
                    <div>
                        {/* badge pill */}
                        <div className="inline-flex items-center gap-2.5 rounded-full border border-pink-100 bg-white py-2 pl-3 pr-5 shadow-sm dark:border-[var(--hairline-strong)] dark:bg-[color-mix(in_srgb,var(--fg-primary)_6%,transparent)] dark:shadow-none dark:backdrop-blur">
                            <BrickWallShield
                                className="h-5 w-5"
                                style={{ color: PINK }}
                                strokeWidth={2}
                            />
                            <span className="text-sm font-semibold text-[#111827] dark:text-[var(--fg-primary)]">
                                Enterprise Security & Reliability
                            </span>
                        </div>

                        {/* heading */}
                        <h1 className="mt-6 text-[2.4rem] font-bold leading-[1.12] tracking-tight text-[#0f172a] dark:text-[var(--fg-primary)] lg:text-[2.6rem] xl:text-[2.85rem]">
                            Enterprise-Grade Security
                            <br />
                            Built for{" "}
                            <span style={{ color: PINK }}>
                                Trust, Scale &amp; Compliance
                            </span>
                        </h1>

                        {/* subtext */}
                        <p className="mt-6 max-w-2xl text-[17px] leading-8 text-gray-600 dark:text-[var(--fg-secondary)]">
                            Every API call is protected by industry-leading security
                            practices, continuous monitoring, and a high-availability
                            infrastructure trusted by 25,000+ businesses.
                        </p>
                    </div>

                    {/* RIGHT – baked illustration (shield, podium, floating cards) */}
                    <div className="relative flex justify-center self-start lg:justify-end">
                        <img
                            src={securityShield}
                            alt="WhiteBooks security — your data, protected, always"
                            className="w-full max-w-[504px] select-none"
                            draggable={false}
                        />
                    </div>
                </div>

                {/* CTAs */}
                <div className="mt-5 flex flex-wrap items-center gap-5">

                    <Button
                        className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-semibold text-white shadow-[0_18px_35px_-12px_rgba(231,52,118,0.6)] transition hover:brightness-105"
                        style={{ background: PINK }}
                        onClick={() => navigate("/developer/overview")}
                    >
                        Read API Guides
                        <ArrowRightCircle className="h-5 w-5" />
                    </Button>
                    <a
                        href="https://whitebooks.in/enterprise/security/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 rounded-full border border-pink-200 bg-white px-8 py-4 text-base font-semibold transition hover:bg-pink-50 dark:border-[var(--hairline-strong)] dark:bg-[color-mix(in_srgb,var(--fg-primary)_4%,transparent)] dark:backdrop-blur dark:hover:border-[var(--hairline-bright)] dark:hover:bg-[color-mix(in_srgb,var(--fg-primary)_8%,transparent)]"
                        style={{ color: PINK }}
                    >
                        <ShieldCheck className="h-5 w-5" />
                        View Security Docs
                    </a>
                </div>


                {/* feature row */}
                <div className="mt-10 grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:divide-x sm:divide-gray-200 dark:sm:divide-[var(--hairline-strong)]">
                    {features.map((f) => (
                        <TrustFeature key={f.title} {...f} />
                    ))}
                </div>
                {/* ---------- bottom: highlights + compliance ---------- */}
                <div className="mt-10 grid gap-6 lg:grid-cols-1">
                    {/* Infrastructure highlights */}
                    <div className="rounded-[28px] bg-white p-8 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.25)] dark:border dark:border-[var(--hairline-strong)] dark:bg-[color-mix(in_srgb,var(--fg-primary)_4%,transparent)] dark:shadow-none dark:backdrop-blur-xl">
                        <h3
                            className="text-xl font-semibold"
                            style={{ color: PINK }}
                        >
                            Infrastructure Highlights
                        </h3>
                        <ul className="mt-6 grid gap-x-10 gap-y-3.5 sm:grid-cols-2">
                            {infraHighlights.map((text) => (
                                <HighlightItem key={text} text={text} />
                            ))}
                        </ul>
                    </div>

                    {/* Compliance */}
                    <div className="rounded-[28px] bg-white p-8 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.25)] dark:border dark:border-[var(--hairline-strong)] dark:bg-[color-mix(in_srgb,var(--fg-primary)_4%,transparent)] dark:shadow-none dark:backdrop-blur-xl">
                        <h3
                            className="text-xl font-semibold"
                            style={{ color: PINK }}
                        >
                            Compliant with Industry Standards
                        </h3>
                        <div className="mt-7 grid grid-cols-3 items-start gap-y-7 sm:grid-cols-5">
                            {compliance.map((c) => (
                                <div
                                    key={c.title}
                                    className="flex flex-col items-center gap-3 text-center"
                                >
                                    <div className="flex h-16 items-center">
                                        {c.badge}
                                    </div>
                                    <div className="leading-tight">
                                        <div className="text-[15px] font-bold text-[#111827] dark:text-[var(--fg-primary)]">
                                            {c.title}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-[var(--fg-tertiary)]">
                                            {c.sub}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ---------- footer statement ---------- */}
                <div className="mt-6 flex items-center gap-4 rounded-[24px] bg-white/60 px-8 py-4 dark:border dark:border-[var(--hairline-strong)] dark:bg-[color-mix(in_srgb,var(--fg-primary)_4%,transparent)] dark:backdrop-blur">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pink-100 dark:bg-[color-mix(in_srgb,var(--fg-primary)_8%,transparent)]">
                        <Lock className="h-5 w-5" style={{ color: PINK }} />
                    </span>
                    <p className="text-[15px] leading-7 text-gray-400 dark:text-[var(--fg-tertiary)]">
                        <span className="font-semibold text-[#111827] dark:text-[var(--fg-primary)]">
                            Security is not just a feature—it's our foundation.
                        </span>{" "}
                        WhiteBooks follows a security-first approach with regular
                        audits, vulnerability assessments, and continuous
                        improvements.
                    </p>
                </div>
            </div>
        </section>
    );
}
