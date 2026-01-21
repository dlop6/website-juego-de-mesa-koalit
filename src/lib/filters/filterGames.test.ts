import { test } from "node:test";
import assert from "node:assert/strict";
import type { Game } from "@/lib/dal";
import { filterGames } from "./filterGames";

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

test("precio min y max inclusivo", () => {
  const games = [
    createGame({ id: "g-100", price: { amount: 100, currency: "GTQ" } }),
    createGame({ id: "g-200", price: { amount: 200, currency: "GTQ" } }),
    createGame({ id: "g-201", price: { amount: 201, currency: "GTQ" } }),
  ];

  const result = filterGames(games, { priceMin: 100, priceMax: 200 });
  assert.deepEqual(
    result.map((game) => game.id),
    ["g-100", "g-200"]
  );
});

test("rating minimo inclusivo", () => {
  const games = [
    createGame({ id: "g-4-0", rating: { value: 4, scale: 5 } }),
    createGame({ id: "g-3-9", rating: { value: 3.9, scale: 5 } }),
  ];

  const result = filterGames(games, { ratingMin: 4 });
  assert.deepEqual(
    result.map((game) => game.id),
    ["g-4-0"]
  );
});

test("priceMin mayor que priceMax se normaliza", () => {
  const games = [
    createGame({ id: "g-150", price: { amount: 150, currency: "GTQ" } }),
    createGame({ id: "g-350", price: { amount: 350, currency: "GTQ" } }),
  ];

  const result = filterGames(games, { priceMin: 300, priceMax: 100 });
  assert.deepEqual(
    result.map((game) => game.id),
    ["g-150"]
  );
});

test("ratingMin mayor a 5 se clamp a 5", () => {
  const games = [
    createGame({ id: "g-5-0", rating: { value: 5, scale: 5 } }),
    createGame({ id: "g-4-9", rating: { value: 4.9, scale: 5 } }),
  ];

  const result = filterGames(games, { ratingMin: 6 });
  assert.deepEqual(
    result.map((game) => game.id),
    ["g-5-0"]
  );
});

test("ratingMin menor a 0 se clamp a 0", () => {
  const games = [
    createGame({ id: "g-0-0", rating: { value: 0, scale: 5 } }),
    createGame({ id: "g-1-0", rating: { value: 1, scale: 5 } }),
    createGame({ id: "g-7-0", rating: { value: 7, scale: 5 } }),
  ];

  const result = filterGames(games, { ratingMin: -2 });
  assert.deepEqual(
    result.map((game) => game.id),
    ["g-0-0", "g-1-0"]
  );
});

test("priceMin y priceMax negativos se clamp a 0", () => {
  const games = [
    createGame({ id: "g-0", price: { amount: 0, currency: "GTQ" } }),
    createGame({ id: "g-1", price: { amount: 1, currency: "GTQ" } }),
    createGame({ id: "g-neg", price: { amount: -1, currency: "GTQ" } }),
  ];

  const result = filterGames(games, { priceMin: -5, priceMax: -1 });
  assert.deepEqual(
    result.map((game) => game.id),
    ["g-0"]
  );
});

test("tematicas AND con normalizacion", () => {
  const games = [
    createGame({ id: "g-ok", themes: ["Estrategia", "Familia"] }),
    createGame({ id: "g-one", themes: ["Familia"] }),
  ];

  const result = filterGames(games, { themes: ["  estrategia ", "FAMILIA "] });
  assert.deepEqual(
    result.map((game) => game.id),
    ["g-ok"]
  );
});

test("tematica normaliza trim y case-insensitive", () => {
  const games = [
    createGame({ id: "g-match", themes: ["Estrategia"] }),
    createGame({ id: "g-no", themes: ["Abstracto"] }),
  ];

  const result = filterGames(games, { themes: ["  estrategia  "] });
  assert.deepEqual(
    result.map((game) => game.id),
    ["g-match"]
  );
});

test("rating invalido se excluye cuando hay filtro activo", () => {
  const games = [
    createGame({ id: "g-ok", rating: { value: 4.5, scale: 5 } }),
    createGame({ id: "g-bad", rating: { value: 7, scale: 5 } }),
  ];

  const result = filterGames(games, { ratingMin: 4 });
  assert.deepEqual(
    result.map((game) => game.id),
    ["g-ok"]
  );
});

test("precio invalido se excluye cuando hay filtro activo", () => {
  const games = [
    createGame({ id: "g-ok", price: { amount: 200, currency: "GTQ" } }),
    createGame({ id: "g-bad", price: { amount: -1, currency: "GTQ" } }),
  ];

  const result = filterGames(games, { priceMin: 0, priceMax: 500 });
  assert.deepEqual(
    result.map((game) => game.id),
    ["g-ok"]
  );
});

test("tematicas invalidas se excluyen cuando hay filtro activo", () => {
  const games = [
    createGame({ id: "g-ok", themes: ["Estrategia"] }),
    createGame({ id: "g-bad", themes: [] }),
  ];

  const result = filterGames(games, { themes: ["Estrategia"] });
  assert.deepEqual(
    result.map((game) => game.id),
    ["g-ok"]
  );
});
