import Link from "next/link";

import type { Game } from "@/lib/dal";
import {
  PLACEHOLDER_IMAGE_SQUARE,
  formatPriceWithQ,
  formatRatingFiveScale,
} from "@/lib/formatters";

const PREVIEW_COUNT = 3;

function normalizePreviewName(name: string) {
  return name
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function pickRandomGames(games: Game[], count: number, random: () => number) {
  const pool = [...games];

  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
  }

  return pool.slice(0, Math.max(0, Math.min(count, pool.length)));
}

export function LandingPreview({
  games,
  promotedGames,
  random = Math.random,
}: {
  games: Game[];
  promotedGames?: Game[];
  random?: () => number;
}) {
  const usePromoted = Boolean(promotedGames && promotedGames.length > 0);
  const sourceGames = usePromoted
    ? promotedGames!.slice(0, PREVIEW_COUNT)
    : pickRandomGames(games, PREVIEW_COUNT, random);
  const previewItems = sourceGames.map((game) => ({
    name: normalizePreviewName(game.name),
    year: game.releaseYear ? `${game.releaseYear}` : "--",
    rating: `${formatRatingFiveScale(game.rating?.value ?? 0)}/5`,
    price: formatPriceWithQ(game.price?.amount ?? 0, 2),
    image: game.image?.src || PLACEHOLDER_IMAGE_SQUARE,
    alt: game.image?.alt ?? game.name,
    promoted: usePromoted,
  }));
  const totalCount = games.length;
  const shownCount = previewItems.length;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between border-b border-primary pb-2">
        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined">grid_view</span>
          VISTA PREVIA DEL ARCHIVO
        </h3>
        <span className="text-xs font-mono text-primary/60">
          MOSTRANDO {shownCount} DE {totalCount} REGISTROS
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {previewItems.map((item) => (
          <div
            key={item.name}
            className="group border-2 border-primary bg-background-dark p-1 hover:border-white transition-colors duration-300"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-black mb-3 border border-primary/30">
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 pointer-events-none" />
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-110 grayscale sepia contrast-125 group-hover:grayscale-0 group-hover:sepia-0 opacity-80 group-hover:opacity-100"
                style={{ backgroundImage: `url('${item.image}')` }}
                data-alt={item.alt}
                role="img"
                aria-label={item.alt}
              />
              {item.promoted ? (
                <div className="absolute top-2 left-2 bg-primary text-background-dark px-2 py-1 text-[10px] font-bold tracking-widest z-20">
                  PROMOCIONADO
                </div>
              ) : null}
              <div className="absolute top-2 right-2 bg-black/80 border border-primary px-2 py-1 text-xs text-primary font-bold z-20">
                {item.year}
              </div>
            </div>
            <div className="px-2 pb-2">
              <h4 className="text-lg font-bold text-primary truncate group-hover:text-white">
                {item.name}
              </h4>
              <div className="flex justify-between items-center mt-2 text-sm font-mono text-primary/80 border-t border-primary/30 pt-2">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs icon-filled">star</span>
                  {item.rating}
                </span>
                <span>{item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-2">
        <Link
          className="text-primary text-sm font-bold hover:underline flex items-center gap-1"
          href="/catalogo"
        >
          VER_TODAS_LAS_ENTRADAS{" "}
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
    </section>
  );
}
