"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";

export interface GameCardProps {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  priceAmount: number;
  priceCurrency: string;
  ratingValue: number;
  themes: string[];
  variant?: "default" | "promo";
  badgeSlot?: ReactNode;
  className?: string;
  imageWrapperClassName?: string;
}

function formatPrice(amount: number) {
  if (!Number.isFinite(amount)) {
    return "--";
  }

  return amount.toFixed(0);
}

function PlaceholderImage({ name }: { name: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface p-6">
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="h-16 w-16 text-border"
        aria-hidden="true"
      >
        <rect x="8" y="12" width="48" height="40" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M16 20h32M16 28h24M16 36h28M16 44h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <p className="text-center text-500 text-muted font-600 line-clamp-2">{name}</p>
    </div>
  );
}

export function GameCard({
  id,
  name,
  imageSrc,
  imageAlt,
  priceAmount,
  priceCurrency,
  ratingValue,
  themes,
  variant = "default",
  badgeSlot,
  className,
  imageWrapperClassName,
}: GameCardProps) {
  const [imageError, setImageError] = useState(false);
  const priceLabel = `${formatPrice(priceAmount)} ${priceCurrency}`;
  
  const imageWrapperClasses = [
    "relative w-full overflow-hidden rounded-2 border border-border bg-surface aspect-[4/3]",
    imageWrapperClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const maxVisibleThemes = 2;
  const visibleThemes = themes.slice(0, maxVisibleThemes);
  const remainingCount = themes.length - maxVisibleThemes;

  return (
    <article
      data-game-id={id}
      className={[
        "group overflow-hidden rounded-3 border border-border bg-elevated",
        "p-4",
        "shadow-[0_8px_16px_rgba(6,10,18,0.25)]",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-1 hover:shadow-lg",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={imageWrapperClasses}>
        {badgeSlot ? (
          <div className="absolute right-2 top-2 z-10 backdrop-blur-sm rounded-full">
            {badgeSlot}
          </div>
        ) : null}
        
        {imageError || !imageSrc ? (
          <PlaceholderImage name={name} />
        ) : (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-600 font-600 text-text line-clamp-2">{name}</h3>
            <p className="text-600 font-700 text-accent mt-1">{priceLabel}</p>
          </div>
          <Rating value={ratingValue} size="sm" showValue ariaLabel={`Rating ${ratingValue} de 5`} />
        </div>

        {themes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {visibleThemes.map((theme) => (
              <Badge key={theme} variant="neutral">
                {theme}
              </Badge>
            ))}
            {remainingCount > 0 && (
              <Badge variant="neutral" title={themes.slice(maxVisibleThemes).join(", ")}>
                +{remainingCount}
              </Badge>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
