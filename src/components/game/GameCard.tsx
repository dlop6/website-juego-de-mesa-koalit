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
  badgeSlot?: ReactNode;
  className?: string;
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
  badgeSlot,
  className,
}: GameCardProps) {
  const priceLabel = `${formatPrice(priceAmount)} ${priceCurrency}`;

  return (
    <article
      data-game-id={id}
      className={[
        "overflow-hidden rounded-2 border border-border bg-elevated",
        "p-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative overflow-hidden rounded-2 bg-surface">
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

      <div className="mt-3 space-y-2">
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
