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
/*  Compliance & accreditation matrix                                  */
/* ------------------------------------------------------------------ */

const complianceMatrix: { title: string; desc: string }[] = [
    {
        title: "GSP",
        desc: "GSTN-licensed GST Suvidha Provider — direct API channel to GSTN",
    },
    {
        title: "NIC IRP",
        desc: "Authorised access to NIC Invoice Registration Portal for IRN generation",
    },
    {
        title: "NIC e-Way Bill",
        desc: "Authorised access to NIC e-Way Bill system",
    },
    {
        title: "ZATCA Phase 2",
        desc: "ZATCA-compliant XAdES-BES signing + Fatoora clearance / reporting",
    },
    {
        title: "ISO 27001:2022",
        desc: "Information Security Management System certified — current 2022 revision",
    },
    {
        title: "CERT-In Empanelled Auditor",
        desc: "Annual security audit by CERT-In empanelled firm",
    },
    {
        title: "SHA-256 + TLS 1.2+",
        desc: "Modern cryptography on every endpoint",
    },
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

                    {/* Compliance & accreditation matrix */}
                    <div className="rounded-[28px] bg-white p-8 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.25)] dark:border dark:border-[var(--hairline-strong)] dark:bg-[color-mix(in_srgb,var(--fg-primary)_4%,transparent)] dark:shadow-none dark:backdrop-blur-xl">
                        <h3
                            className="text-xl font-semibold"
                            style={{ color: PINK }}
                        >
                            Compliance &amp; Accreditation Matrix
                        </h3>
                        <div className="mt-7 overflow-hidden rounded-2xl border border-pink-100 dark:border-[var(--hairline-strong)]">
                            {complianceMatrix.map((item, i) => (
                                <div
                                    key={item.title}
                                    className={`grid grid-cols-1 gap-x-8 gap-y-1.5 px-6 py-4 sm:grid-cols-[260px_1fr] sm:items-center ${
                                        i % 2 === 0
                                            ? "bg-pink-50/50 dark:bg-[color-mix(in_srgb,var(--fg-primary)_3%,transparent)]"
                                            : "bg-transparent"
                                    } ${
                                        i !== 0
                                            ? "border-t border-pink-100 dark:border-[var(--hairline-strong)]"
                                            : ""
                                    }`}
                                >
                                    <div
                                        className="text-[15px] font-bold"
                                        style={{ color: PINK }}
                                    >
                                        {item.title}
                                    </div>
                                    <div className="text-[15px] leading-6 text-gray-600 dark:text-[var(--fg-secondary)]">
                                        {item.desc}
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
