// define el componente `Button` que renderiza un botón estilizado y recibe variantes, tamaño y props nativas.
"use client";

import type { ButtonHTMLAttributes } from "react";

// define las variantes disponibles para el botón.
type ButtonVariant = "primary" | "secondary" | "ghost";
// define los tamaños disponibles para el botón.
type ButtonSize = "sm" | "md";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

// establece las clases base comunes para todos los botones.
const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-2 border border-transparent font-600 transition-colors duration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

// mapea cada variante a sus clases css específicas.
const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent-muted",
  secondary: "border-border bg-transparent text-text hover:bg-elevated",
  ghost: "bg-transparent text-text hover:bg-surface",
};

// mapea cada tamaño a sus clases css específicas.
const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-500",
  md: "px-4 py-2 text-600",
};

// combina clases css filtrando valores undefined.
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
