"use client";

import type { HTMLAttributes } from "react";

type BadgeVariant = "promo" | "sponsor" | "neutral";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const baseClasses =
  "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-400 font-600 leading-none";

const variantClasses: Record<BadgeVariant, string> = {
  promo: "border-accent/40 bg-accent/10 text-accent",
  sponsor: "border-border bg-elevated text-text",
  neutral: "border-border bg-surface text-muted",
};

function cn(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  );
}
