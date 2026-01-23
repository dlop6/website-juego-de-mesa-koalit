"use client";

import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-2 border border-transparent font-600 transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:translate-y-0 disabled:shadow-none";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent-muted hover:shadow-[0_0_16px_rgba(197,139,90,0.25)]",
  secondary: "border-border bg-transparent text-text hover:bg-elevated",
  ghost: "bg-transparent text-text hover:bg-surface",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-500",
  md: "px-4 py-2 text-600",
};

function cn(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  );
}
