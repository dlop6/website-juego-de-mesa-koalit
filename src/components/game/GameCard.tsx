import type { CSSProperties, ReactNode } from "react";
import {
  PLACEHOLDER_IMAGE_WIDE,
  formatPriceWithQ,
  formatRatingFiveScale,
  formatThemeTag,
} from "@/lib/formatters";

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
  const priceLabel = formatPriceWithQ(priceAmount);
  const ratingLabel = formatRatingFiveScale(ratingValue);
  const backgroundImage = imageSrc?.length ? imageSrc : PLACEHOLDER_IMAGE_WIDE;
  const imageStyles: CSSProperties = {
    backgroundImage: `url('${backgroundImage}')`,
  };

  return (
    <article
      data-game-id={id}
      className={[
        "group relative flex flex-col bg-panel border border-border hover:border-primary transition-all duration-300 hover:shadow-[0_0_20px_rgba(242,166,13,0.1)] h-full",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative w-full aspect-[4/3] sm:aspect-video overflow-hidden border-b border-border group-hover:border-primary transition-colors">
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 pointer-events-none" />
        <div
          className="w-full h-full bg-cover bg-top sm:bg-center grayscale sepia contrast-125 group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-500 opacity-80 group-hover:opacity-100"
          style={imageStyles}
          role="img"
          aria-label={imageAlt}
        />
        {badgeSlot ? <div className="absolute top-2 right-2 z-20">{badgeSlot}</div> : null}
      </div>

      <div className="p-3 sm:p-4 flex flex-col gap-2 sm:gap-3 flex-1">
        <div className="flex justify-between items-start">
          <h3 className="text-fg text-base sm:text-lg font-bold leading-tight group-hover:text-primary transition-colors">
            {name}
          </h3>
          <span className="material-symbols-outlined text-fg-muted group-hover:text-primary cursor-pointer transition-colors">
            bookmark_add
          </span>
        </div>
        <div className="flex items-center gap-2 mt-auto flex-wrap">
          {themes.map((theme, index) => (
            <span
              key={theme}
              className={[
                "px-2 py-0.5 bg-border/60 text-fg-muted text-[10px] sm:text-xs font-mono rounded-sm",
                index > 1 ? "hidden sm:inline-flex" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              [{formatThemeTag(theme)}]
            </span>
          ))}
          {themes.length > 2 ? (
            <span className="px-2 py-0.5 bg-border/60 text-fg-muted text-[10px] font-mono rounded-sm sm:hidden">
              +{themes.length - 2}
            </span>
          ) : null}
        </div>
        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border mt-2 group-hover:border-primary/30">
          <div className="flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-sm icon-filled">star</span>
            <span className="font-mono font-bold text-sm sm:text-base">{ratingLabel}</span>
            <span className="text-[10px] sm:text-xs text-fg-muted">/5</span>
          </div>
          <div className="font-mono text-fg font-bold text-sm sm:text-base">
            {priceLabel}
          </div>
        </div>
      </div>
    </article>
  );
}
