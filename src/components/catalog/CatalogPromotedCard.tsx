import type { Game } from "@/lib/dal";
import {
  PLACEHOLDER_IMAGE_WIDE,
  formatPriceWithQ,
} from "@/lib/formatters";

export function CatalogPromotedCard({ game }: { game: Game }) {
  const imageSrc = game.image?.src?.length
    ? game.image.src
    : PLACEHOLDER_IMAGE_WIDE;
  const priceLabel = formatPriceWithQ(game.price?.amount ?? 0);

  return (
    <article className="group relative flex flex-col bg-[#1a1505] border-2 border-dashed border-primary/50 hover:border-primary transition-all duration-300 h-full">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-3 py-0.5 border border-primary text-primary text-[10px] font-bold tracking-widest z-30 flex items-center gap-1">
        <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
        PROMOCIONADO
      </div>
      <div className="relative w-full aspect-[4/3] sm:aspect-video overflow-hidden border-b border-primary/30 group-hover:border-primary transition-colors">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent z-10 pointer-events-none" />
        <div
          className="w-full h-full bg-cover bg-top sm:bg-center grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500 opacity-90"
          style={{ backgroundImage: `url('${imageSrc}')` }}
          role="img"
          aria-label={game.image?.alt ?? game.name}
        />
      </div>
      <div className="p-3 sm:p-4 flex flex-col gap-2 sm:gap-3 flex-1">
        <div className="flex justify-between items-start">
          <h3 className="text-primary text-base sm:text-lg font-bold leading-tight">
            {game.name}
          </h3>
          <span className="material-symbols-outlined text-primary cursor-pointer">
            shopping_cart
          </span>
        </div>
        <p className="text-[10px] sm:text-xs text-[#bab09c] line-clamp-2">
          {game.shortDescription}
        </p>
        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-primary/20 mt-2">
          <div className="flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-sm">rocket_launch</span>
            <span className="font-mono text-xs">PRE-ORDEN</span>
          </div>
          <div className="font-mono text-white font-bold text-sm sm:text-base">
            {priceLabel}
          </div>
        </div>
      </div>
    </article>
  );
}
