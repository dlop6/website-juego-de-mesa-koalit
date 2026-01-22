import { test } from "node:test";
import assert from "node:assert/strict";
import type { Game, Promotion } from "@/lib/dal";
import type { GameFilters } from "@/lib/filters/filterGames";
import { excludePromotedGames, selectPromotedGames, selectSponsor } from "./ads";

function createGame(overrides: Partial<Game>): Game {
  return {
    id: overrides.id ?? "g-default",
    name: overrides.name ?? "Juego",
    price: overrides.price ?? { amount: 0, currency: "GTQ" },
    rating: overrides.rating ?? { value: 0, scale: 5 },
    themes: overrides.themes ?? ["Estrategia"],
    shortDescription: overrides.shortDescription ?? "Descripcion",
    image: overrides.image ?? { src: "/images/test.svg", alt: "Portada" },
    purchaseUrl: overrides.purchaseUrl ?? "https://example.com",
    players: overrides.players,
    durationMinutes: overrides.durationMinutes,
    age: overrides.age,
    complexity: overrides.complexity,
    mechanics: overrides.mechanics,
    publisher: overrides.publisher,
    releaseYear: overrides.releaseYear,
  };
}

function createPromotion(overrides: Partial<Promotion>): Promotion {
  return {
    id: overrides.id ?? "p-1",
    gameId: overrides.gameId ?? "g-default",
    label: "Promocionado",
    weight: overrides.weight,
  };
}

const defaultFilters: GameFilters = {
  priceMin: null,
  priceMax: null,
  ratingMin: 0,
  themes: [],
};

test("promo respeta filtros activos", () => {
  const game = createGame({
    id: "g-1",
    rating: { value: 3, scale: 5 },
  });
  const promotions = [createPromotion({ id: "p-1", gameId: "g-1", weight: 2 })];
  const gamesById = new Map<string, Game>([[game.id, game]]);
  const filters = { ...defaultFilters, ratingMin: 4 };

  const result = selectPromotedGames(promotions, gamesById, filters);
  assert.equal(result.length, 0);
});

test("orden deterministico por weight desc y name asc", () => {
  const gameA = createGame({ id: "g-a", name: "Alpha" });
  const gameB = createGame({ id: "g-b", name: "Beta" });
  const gameC = createGame({ id: "g-c", name: "Gamma" });
  const promotions = [
    createPromotion({ id: "p-a", gameId: "g-a", weight: 5 }),
    createPromotion({ id: "p-b", gameId: "g-b", weight: 5 }),
    createPromotion({ id: "p-c", gameId: "g-c", weight: 3 }),
  ];
  const gamesById = new Map<string, Game>([
    [gameA.id, gameA],
    [gameB.id, gameB],
    [gameC.id, gameC],
  ]);

  const result = selectPromotedGames(promotions, gamesById, defaultFilters);
  assert.deepEqual(
    result.map((item) => item.game.id),
    ["g-a", "g-b", "g-c"]
  );
});

test("orden deterministico por rating desc y name asc cuando no hay weight", () => {
  const gameA = createGame({ id: "g-a", name: "Alpha", rating: { value: 4.2, scale: 5 } });
  const gameB = createGame({ id: "g-b", name: "Beta", rating: { value: 4.8, scale: 5 } });
  const gameC = createGame({ id: "g-c", name: "Gamma", rating: { value: 4.8, scale: 5 } });
  const promotions = [
    createPromotion({ id: "p-a", gameId: "g-a" }),
    createPromotion({ id: "p-b", gameId: "g-b" }),
    createPromotion({ id: "p-c", gameId: "g-c" }),
  ];
  const gamesById = new Map<string, Game>([
    [gameA.id, gameA],
    [gameB.id, gameB],
    [gameC.id, gameC],
  ]);

  const result = selectPromotedGames(promotions, gamesById, defaultFilters);
  assert.deepEqual(
    result.map((item) => item.game.id),
    ["g-b", "g-c", "g-a"]
  );
});

test("limite de promos nunca supera 3", () => {
  const games = Array.from({ length: 4 }).map((_, index) =>
    createGame({ id: `g-${index}`, name: `Juego ${index}` })
  );
  const promotions = games.map((game, index) =>
    createPromotion({ id: `p-${index}`, gameId: game.id, weight: 10 - index })
  );
  const gamesById = new Map<string, Game>(games.map((game) => [game.id, game]));

  const result = selectPromotedGames(promotions, gamesById, defaultFilters);
  assert.equal(result.length, 3);
});

test("seccion promo es condicional cuando no hay elegibles", () => {
  const game = createGame({ id: "g-1", name: "Alpha" });
  const promotions = [createPromotion({ id: "p-1", gameId: "g-missing" })];
  const gamesById = new Map<string, Game>([[game.id, game]]);

  const result = selectPromotedGames(promotions, gamesById, defaultFilters);
  assert.equal(result.length, 0);
});

test("no duplicacion entre promos y listado base", () => {
  const gameA = createGame({ id: "g-a" });
  const gameB = createGame({ id: "g-b" });
  const promotions = [createPromotion({ id: "p-a", gameId: "g-a", weight: 1 })];
  const gamesById = new Map<string, Game>([
    [gameA.id, gameA],
    [gameB.id, gameB],
  ]);

  const promoted = selectPromotedGames(promotions, gamesById, defaultFilters);
  const base = excludePromotedGames([gameA, gameB], promoted);
  assert.deepEqual(
    base.map((game) => game.id),
    ["g-b"]
  );
});

test("sponsor deterministico por priority desc y name asc", () => {
  const sponsors = [
    {
      id: "s-1",
      name: "Beta",
      logo: { src: "/logos/beta.svg", alt: "Logo Beta" },
      priority: 2,
    },
    {
      id: "s-2",
      name: "Alpha",
      logo: { src: "/logos/alpha.svg", alt: "Logo Alpha" },
      priority: 2,
    },
    {
      id: "s-3",
      name: "Gamma",
      logo: { src: "/logos/gamma.svg", alt: "Logo Gamma" },
      priority: 1,
    },
  ];

  const result = selectSponsor(sponsors);
  assert.equal(result?.id, "s-2");
});

test("sponsor null cuando no hay sponsors", () => {
  const result = selectSponsor([]);
  assert.equal(result, null);
});
