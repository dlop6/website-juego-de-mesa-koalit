import Link from "next/link";
import type { Game, Promotion } from "@/lib/dal";
import type { GameFilters } from "@/lib/filters/filterGames";
import { Badge } from "@/components/ui/Badge";
import { GameCard } from "@/components/game/GameCard";
import { selectPromotedGames } from "@/lib/ads/ads";

export function PromotedSection({
  promotions,
  gamesById,
  filters,
}: {
  promotions: Promotion[];
  gamesById: Map<string, Game>;
  filters: GameFilters;
}) {
  const promotedGames = selectPromotedGames(promotions, gamesById, filters);

  if (promotedGames.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h2 className="text-700 font-700 text-text">Juegos Promocionados</h2>
        <p className="text-400 text-muted">Selección patrocinada (máx. 3)</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {promotedGames.map(({ game }) => (
          <Link
            key={game.id}
            href={`/catalogo/${encodeURIComponent(game.id)}`}
            className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            aria-label={`Ver detalles de ${game.name}`}
          >
            <GameCard
              id={game.id}
              name={game.name}
              imageSrc={game.image?.src ?? ""}
              imageAlt={game.image?.alt ?? game.name}
              priceAmount={game.price?.amount ?? 0}
              priceCurrency={game.price?.currency ?? "GTQ"}
              ratingValue={game.rating?.value ?? 0}
              themes={Array.isArray(game.themes) ? game.themes : []}
              variant="promo"
              imageWrapperClassName="lg:aspect-[5/2]"
              badgeSlot={<Badge variant="promo">Promocionado</Badge>}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
