"use client";

import type { ReactNode } from "react";
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
  const priceLabel = `${formatPrice(priceAmount)} ${priceCurrency}`;
  const imageWrapperClasses = [
    "relative w-full overflow-hidden rounded-2 border border-border bg-surface",
    variant === "promo" ? "aspect-[16/9]" : "aspect-[4/3]",
    imageWrapperClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      data-game-id={id}
      className={[
        "overflow-hidden rounded-3 border border-border bg-elevated",
        "p-4",
        "shadow-[0_14px_30px_rgba(6,10,18,0.35)]",
        "transition-transform duration-2 ease-[cubic-bezier(0.2,0,0,1)]",
        "hover:-translate-y-1",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={imageWrapperClasses}>
        {badgeSlot ? <div className="absolute right-2 top-2">{badgeSlot}</div> : null}
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
          loading="lazy"
        />
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-600 font-600 text-text">{name}</h3>
            <p className="text-500 font-600 text-muted">{priceLabel}</p>
          </div>
          <Rating value={ratingValue} showValue ariaLabel={`Rating ${ratingValue} de 5`} />
        </div>

        <div className="flex flex-wrap gap-2">
          {themes.map((theme) => (
            <Badge key={theme} variant="neutral">
              {theme}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
