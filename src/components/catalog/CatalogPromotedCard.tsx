import type { Game } from "@/lib/dal";

function formatPrice(amount: number) {
  if (!Number.isFinite(amount)) {
    return "--";
  }
  return amount.toFixed(2);
}

const fallbackImage =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjM0MCIgdmlld0JveD0iMCAwIDYwMCAzNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSIzNDAiIGZpbGw9IiMxMDEwMTAiLz48cGF0aCBkPSJNMCAxNzBIMTYwVjE3MEg0NDBWMzEwSDE2MFYxNzBaIiBmaWxsPSIjMjIyIi8+PC9zdmc+";

export function CatalogPromotedCard({ game }: { game: Game }) {
  const imageSrc = game.image?.src?.length ? game.image.src : fallbackImage;
  const priceLabel = `Q${formatPrice(game.price?.amount ?? 0)}`;

  return (
    <article className="group relative flex flex-col bg-[#1a1505] border-2 border-dashed border-primary/50 hover:border-primary transition-all duration-300">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-3 py-0.5 border border-primary text-primary text-[10px] font-bold tracking-widest z-30 flex items-center gap-1">
        <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
        PROMOCIONADO
      </div>
      <div className="relative w-full aspect-video overflow-hidden border-b border-primary/30 group-hover:border-primary transition-colors">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent z-10 pointer-events-none" />
        <div
          className="w-full h-full bg-cover bg-center grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500 opacity-90"
          style={{ backgroundImage: `url('${imageSrc}')` }}
          role="img"
          aria-label={game.image?.alt ?? game.name}
        />
      </div>
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex justify-between items-start">
          <h3 className="text-primary text-lg font-bold leading-tight">{game.name}</h3>
          <span className="material-symbols-outlined text-primary cursor-pointer">
            shopping_cart
          </span>
        </div>
        <p className="text-xs text-[#bab09c] line-clamp-2">
          {game.shortDescription}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-primary/20 mt-2">
          <div className="flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-sm">rocket_launch</span>
            <span className="font-mono text-xs">PRE-ORDEN</span>
          </div>
          <div className="font-mono text-white font-bold">{priceLabel}</div>
        </div>
      </div>
    </article>
  );
}
