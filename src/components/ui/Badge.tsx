"use client";

import type { HTMLAttributes, ReactNode } from "react";

type BadgeVariant = "promo" | "sponsor" | "neutral";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  icon?: ReactNode;
}

const baseClasses =
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-400 font-600 leading-none";

const variantClasses: Record<BadgeVariant, string> = {
  promo: "border-info/40 bg-info/10 text-info",
  sponsor: "border-accent/40 bg-accent/10 text-accent",
  neutral: "border-border bg-elevated text-muted",
};

function cn(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function PromoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M8 0l2.4 4.8 5.3.8-3.8 3.7.9 5.3L8 12.4l-4.8 2.2.9-5.3L.3 5.6l5.3-.8L8 0z" />
    </svg>
  );
}

function SponsorIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M8 1l1.5 3 3.3.5-2.4 2.3.6 3.2L8 8.5 5 10l.6-3.2L3.2 4.5l3.3-.5L8 1z" />
      <path d="M4 11l.8 1.6L6.4 13l-1.6.8L4 15.6l-.8-1.6L1.6 13l1.6-.8L4 11zM12 11l.8 1.6 1.6.8-1.6.8-.8 1.6-.8-1.6-1.6-.8 1.6-.8.8-1.6z" />
    </svg>
  );
}

export function Badge({ variant = "neutral", icon, className, children, ...props }: BadgeProps) {
  const defaultIcon =
    variant === "promo" ? <PromoIcon /> : variant === "sponsor" ? <SponsorIcon /> : null;

  const displayIcon = icon !== undefined ? icon : defaultIcon;

  return (
    <span
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {displayIcon}
      {children}
    </span>
  );
}
