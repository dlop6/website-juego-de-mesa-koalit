import type { Game, Promotion, Sponsor } from "@/lib/dal";
import type { GameFilters } from "@/lib/filters/filterGames";
import { filterGames } from "@/lib/filters/filterGames";

export type PromotedGame = {
  promotion: Promotion;
  game: Game;
};

function sortByNameAsc(a: string, b: string) {
  return a.localeCompare(b);
}

export function selectPromotedGames(
  promotions: Promotion[],
  gamesById: Map<string, Game>,
  filters: GameFilters
): PromotedGame[] {
  if (promotions.length === 0) {
    return [];
  }

  const promoGames: Game[] = [];
  for (const promotion of promotions) {
    const game = gamesById.get(promotion.gameId);
    if (game) {
      promoGames.push(game);
    }
  }

  const filteredGames = filterGames(promoGames, filters);
  const allowedIds = new Set(filteredGames.map((game) => game.id));

  const eligible: PromotedGame[] = [];
  for (const promotion of promotions) {
    const game = gamesById.get(promotion.gameId);
    if (!game) {
      continue;
    }
    if (!allowedIds.has(game.id)) {
      continue;
    }
    eligible.push({ promotion, game });
  }

  if (eligible.length === 0) {
    return [];
  }

  const hasWeight = eligible.some(
    (item) => typeof item.promotion.weight === "number"
  );

  const sorted = eligible.slice().sort((left, right) => {
    if (hasWeight) {
      const weightLeft =
        typeof left.promotion.weight === "number" ? left.promotion.weight : -Infinity;
      const weightRight =
        typeof right.promotion.weight === "number" ? right.promotion.weight : -Infinity;
      if (weightLeft !== weightRight) {
        return weightRight - weightLeft;
      }
    } else {
      const ratingLeft = left.game.rating?.value ?? 0;
      const ratingRight = right.game.rating?.value ?? 0;
      if (ratingLeft !== ratingRight) {
        return ratingRight - ratingLeft;
      }
    }

    return sortByNameAsc(left.game.name, right.game.name);
  });

  return sorted.slice(0, 3);
}

export function excludePromotedGames(
  games: Game[],
  promotedGames: PromotedGame[]
): Game[] {
  if (promotedGames.length === 0) {
    return games;
  }

  const promotedIds = new Set(promotedGames.map((item) => item.game.id));
  return games.filter((game) => !promotedIds.has(game.id));
}

export function selectSponsor(sponsors: Sponsor[]): Sponsor | null {
  if (sponsors.length === 0) {
    return null;
  }

  const sorted = sponsors.slice().sort((left, right) => {
    const priorityLeft = typeof left.priority === "number" ? left.priority : 0;
    const priorityRight = typeof right.priority === "number" ? right.priority : 0;
    if (priorityLeft !== priorityRight) {
      return priorityRight - priorityLeft;
    }
    return sortByNameAsc(left.name, right.name);
  });

  return sorted[0] ?? null;
}
