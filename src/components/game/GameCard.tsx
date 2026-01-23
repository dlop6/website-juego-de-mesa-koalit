import type { ReactNode } from "react";
import type { CSSProperties } from "react";

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

  return amount.toFixed(2);
}

function formatRating(value: number) {
  if (!Number.isFinite(value)) {
    return "--";
  }
  return (value * 2).toFixed(1);
}

const fallbackImage =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjM0MCIgdmlld0JveD0iMCAwIDYwMCAzNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSIzNDAiIGZpbGw9IiMxMTEiLz48cGF0aCBkPSJNMCAxNzBIMTYwVjE3MEg0NDBWMzEwSDE2MFYxNzBaIiBmaWxsPSIjMjIyIi8+PC9zdmc+";

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
  const priceLabel = `Q${formatPrice(priceAmount)}`;
  const ratingLabel = formatRating(ratingValue);
  const backgroundImage = imageSrc?.length ? imageSrc : fallbackImage;
  const imageStyles: CSSProperties = {
    backgroundImage: `url('${backgroundImage}')`,
  };

  return (
    <article
      data-game-id={id}
      className={[
        "group relative flex flex-col bg-surface-dark border border-[#393328] hover:border-primary transition-all duration-300 hover:shadow-[0_0_20px_rgba(242,166,13,0.1)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative w-full aspect-video overflow-hidden border-b border-[#393328] group-hover:border-primary transition-colors">
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 pointer-events-none" />
        <div
          className="w-full h-full bg-cover bg-center grayscale sepia contrast-125 group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-500 opacity-80 group-hover:opacity-100"
          style={imageStyles}
          role="img"
          aria-label={imageAlt}
        />
        {badgeSlot ? <div className="absolute top-2 right-2 z-20">{badgeSlot}</div> : null}
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex justify-between items-start">
          <h3 className="text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">
            {name}
          </h3>
          <span className="material-symbols-outlined text-[#544c3b] group-hover:text-primary cursor-pointer transition-colors">
            bookmark_add
          </span>
        </div>
        <div className="flex items-center gap-2 mt-auto">
          {themes.map((theme) => (
            <span
              key={theme}
              className="px-2 py-0.5 bg-[#393328] text-[#bab09c] text-xs font-mono rounded-sm"
            >
              [{theme.toUpperCase().replaceAll(" ", "_")}]
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-[#393328] mt-2 group-hover:border-primary/30">
          <div className="flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-sm">star</span>
            <span className="font-mono font-bold">{ratingLabel}</span>
            <span className="text-xs text-[#544c3b]">/10</span>
          </div>
          <div className="font-mono text-white font-bold">{priceLabel}</div>
        </div>
      </div>
    </article>
  );
}
