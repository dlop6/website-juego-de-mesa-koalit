// define el componente `Rating` que muestra una estrella y el valor formateado dentro de una escala.
"use client";

import type { HTMLAttributes } from "react";
import { Star } from "lucide-react";

export interface RatingProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  scale?: number;
  showValue?: boolean;
  ariaLabel?: string;
}

// limita el valor entre min y max.
function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

// formatea el valor a un decimal.
function formatValue(value: number) {
  return value.toFixed(1);
}

export function Rating({
  value,
  scale = 5,
  showValue = true,
  ariaLabel,
  className,
  ...props
}: RatingProps) {
  const safeScale = Math.max(1, Math.round(scale));
  const clampedValue = clamp(value, 0, safeScale);
  const label = ariaLabel ?? `Rating ${formatValue(clampedValue)} de ${safeScale}`;

  return (
    <div
      role="img"
      aria-label={label}
      className={["inline-flex items-center gap-1 text-500 text-muted", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <Star className="h-4 w-4 text-accent" aria-hidden="true" />
      {showValue ? (
        <span className="font-600 text-text">{formatValue(clampedValue)}</span>
      ) : null}
    </div>
  );
}
