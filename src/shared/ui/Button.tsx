import React from "react";
import { cn } from "@/shared/lib/cn";
import DpIcon from "@/features/developer/DpIcon";

type ButtonVariant =
    | "primary"
    | "secondary"
    | "ghost"
    | "outline"
    | "white"
    | "whiteOutline"
    | "developerPrimary"
    | "developerGhost"
    | "link";

type ButtonSize = "sm" | "md" | "lg" | "icon";

// `border-solid` is required: preflight is disabled and there is no global
// `border-style: solid` reset, so a bare Tailwind `border` utility leaves the
// native <button> UA default (`outset`), which renders faint/invisible for the
// low-opacity hairline colors (notably the ghost variant in light mode).
const baseClasses =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap no-underline font-medium tracking-[0.005em] border-solid transition-all duration-[160ms] ease-in-out disabled:pointer-events-none disabled:opacity-50";

// Bare underlined text link — no button shell (border/padding/rounded). Kept
// separate so it never inherits `baseClasses`'s `no-underline` (Tailwind emits
// `.no-underline` after `.underline`, so it would win regardless of class order).
const linkClasses =
    "inline-flex items-center gap-2 whitespace-nowrap font-medium text-[15px] text-[var(--fg-primary)] underline decoration-[var(--accent)] decoration-2 underline-offset-[6px] transition-colors hover:text-[var(--accent)]";

const variantClasses: Record<Exclude<ButtonVariant, "link">, string> = {
    primary:
        "border border-[var(--accent)] bg-[var(--accent)] text-white hover:bg-[#e8447a] hover:shadow-[0_8px_24px_-8px_rgba(220,47,101,0.55)] hover:-translate-y-px",
    secondary:
        "border border-[var(--hairline-strong)] bg-transparent text-[var(--fg-secondary)] hover:bg-[var(--surface-hover)] hover:border-[var(--hairline-hover)] hover:text-[var(--fg-primary)]",
    ghost:
        "border border-[var(--hairline-strong)] bg-transparent text-[var(--fg-secondary)] hover:bg-[var(--surface-hover)] hover:border-[var(--hairline-hover)] hover:text-[var(--fg-primary)]",
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
    if (variant === "link") {
        return cn(linkClasses, className);
    }
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
