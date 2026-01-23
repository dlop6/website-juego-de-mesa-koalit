"use client";

import type { HTMLAttributes } from "react";

export interface RatingProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  scale?: number;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatValue(value: number) {
  return value.toFixed(1);
}

function StarIcon({ filled, half, size }: { filled: boolean; half?: boolean; size: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={size}
      aria-hidden="true"
    >
      {half ? (
        <>
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="currentColor" className="text-accent" />
              <stop offset="50%" stopColor="currentColor" className="text-border opacity-30" />
            </linearGradient>
          </defs>
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="url(#half-fill)"
            stroke="currentColor"
            strokeWidth="1"
            className="text-accent"
          />
        </>
      ) : (
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={filled ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1"
          className={filled ? "text-accent" : "text-border opacity-30"}
        />
      )}
    </svg>
  );
}

export function Rating({
  value,
  scale = 5,
  showValue = true,
  size = "sm",
  ariaLabel,
  className,
  ...props
}: RatingProps) {
  const safeScale = Math.max(1, Math.round(scale));
  const clampedValue = clamp(value, 0, safeScale);
  const label = ariaLabel ?? `Rating ${formatValue(clampedValue)} de ${safeScale}`;

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const fullStars = Math.floor(clampedValue);
  const hasHalfStar = clampedValue % 1 >= 0.25 && clampedValue % 1 < 0.75;
  const emptyStars = safeScale - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div
      role="img"
      aria-label={label}
      className={["inline-flex items-center gap-1", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <div className="inline-flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: fullStars }).map((_, i) => (
          <StarIcon key={`full-${i}`} filled size={sizeClasses[size]} />
        ))}
        {hasHalfStar && <StarIcon filled={false} half size={sizeClasses[size]} />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <StarIcon key={`empty-${i}`} filled={false} size={sizeClasses[size]} />
        ))}
      </div>
      {showValue ? (
        <span className="font-600 text-text text-500">{formatValue(clampedValue)}</span>
      ) : null}
    </div>
  );
}
