import React from "react";
import { cn } from "@/lib/cn";
import DpIcon from "@/pages/developer/DpIcon";

type ButtonVariant =
    | "primary"
    | "secondary"
    | "ghost"
    | "outline"
    | "white"
    | "whiteOutline"
    | "developerPrimary"
    | "developerGhost";

type ButtonSize = "sm" | "md" | "lg" | "icon";

const baseClasses =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap no-underline font-medium tracking-[0.005em] transition-all duration-[160ms] ease-in-out disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "border border-[var(--accent)] bg-[var(--accent)] text-white hover:bg-[#e8447a] hover:shadow-[0_8px_24px_-8px_rgba(220,47,101,0.55)] hover:-translate-y-px",
    secondary:
        "border border-[var(--hairline-strong)] bg-transparent text-[var(--fg-secondary)] hover:bg-white/[0.04] hover:border-white/[0.16] hover:text-[var(--fg-primary)]",
    ghost:
        "border border-[var(--hairline-strong)] bg-transparent text-[var(--fg-secondary)] hover:bg-white/[0.04] hover:border-white/[0.16] hover:text-[var(--fg-primary)]",
    outline:
        "border border-[rgba(220,47,101,0.5)] bg-transparent text-[var(--brand,var(--accent))] hover:bg-[var(--brand,var(--accent))] hover:text-white hover:border-[var(--brand,var(--accent))]",
    white:
        "border border-white bg-white text-[#d33568] hover:bg-[#f3f3f5] hover:-translate-y-px",
    whiteOutline:
        "border border-white/60 bg-transparent text-white hover:bg-white/10 hover:border-white",
    developerPrimary:
        "border border-[var(--dp-accent)] bg-[var(--dp-accent)] text-white hover:opacity-85",
    developerGhost:
        "border border-[var(--dp-border)] bg-white/[0.06] text-[var(--dp-fg)] hover:bg-transparent hover:border-[var(--dp-border-strong)]",
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: "rounded-[7px] px-3 py-[7px] text-[11px] font-semibold",
    md: "rounded-lg px-[18px] py-[11px] text-sm",
    lg: "rounded-lg px-[22px] py-[14px] text-[15px]",
    icon: "h-9 w-9 rounded-lg p-0",
};

interface SharedButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    arrow?: boolean;
}

export type ButtonProps = SharedButtonProps &
    React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonLinkProps = SharedButtonProps &
    React.AnchorHTMLAttributes<HTMLAnchorElement>;

function buttonClassName({
    variant = "primary",
    size = "md",
    className,
}: Omit<SharedButtonProps, "arrow"> & { className?: string }) {
    return cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
    );
}

export function Button({
    variant = "primary",
    size = "md",
    arrow = false,
    className,
    children,
    type = "button",
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            className={buttonClassName({ variant, size, className })}
            {...props}
        >
            {children}
            {arrow && <DpIcon name="arrow-right" size={14} />}
        </button>
    );
}

export function ButtonLink({
    variant = "primary",
    size = "md",
    arrow = false,
    className = "cursor-pointer",
    children,
    ...props
}: ButtonLinkProps) {
    return (
        <a
            className={buttonClassName({ variant, size, className })}
            {...props}
        >
            {children}
            {arrow && <DpIcon name="arrow-right" size={14} />}
        </a>
    );
}
