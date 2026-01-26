// define el componente `Badge` que renderiza una etiqueta compacta según variante.
"use client";

import type { HTMLAttributes } from "react";

// define las variantes disponibles para el badge.
type BadgeVariant = "promo" | "sponsor" | "neutral";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

// establece las clases base comunes para todos los badges.
const baseClasses =
  "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-400 font-600 leading-none";

// mapea cada variante a sus clases css específicas.
const variantClasses: Record<BadgeVariant, string> = {
  promo: "border-accent/40 bg-accent/10 text-accent",
  sponsor: "border-border bg-elevated text-text",
  neutral: "border-border bg-surface text-muted",
};

// combina clases css filtrando valores undefined.
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
