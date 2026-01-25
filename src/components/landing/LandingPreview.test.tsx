import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import type { Game } from "@/lib/dal";
import { LandingPreview } from "./LandingPreview";

test("LandingPreview muestra registros y CTA de catalogo", () => {
  const games: Game[] = [
    {
      id: "g-alpha",
      name: "Alpha Board",
      price: { amount: 100, currency: "GTQ" },
      rating: { value: 4.2, scale: 5 },
      themes: ["Estrategia"],
      shortDescription: "Juego de prueba.",
      image: { src: "https://example.com/alpha.jpg", alt: "Alpha" },
      releaseYear: 2020,
    },
    {
      id: "g-beta",
      name: "Beta Quest",
      price: { amount: 200, currency: "GTQ" },
      rating: { value: 3.8, scale: 5 },
      themes: ["Familiar"],
      shortDescription: "Juego de prueba.",
      image: { src: "https://example.com/beta.jpg", alt: "Beta" },
      releaseYear: 2021,
    },
    {
      id: "g-gamma",
      name: "Gamma Siege",
      price: { amount: 300, currency: "GTQ" },
      rating: { value: 4.6, scale: 5 },
      themes: ["Economía"],
      shortDescription: "Juego de prueba.",
      image: { src: "https://example.com/gamma.jpg", alt: "Gamma" },
      releaseYear: 2022,
    },
  ];
  const html = renderToStaticMarkup(
    <LandingPreview games={games} random={() => 0} />
  );

  assert.match(html, /VISTA PREVIA DEL ARCHIVO/);
  assert.match(html, /VER_TODAS_LAS_ENTRADAS/);
  assert.match(html, /ALPHA_BOARD/);
  assert.match(html, /BETA_QUEST/);
  assert.match(html, /GAMMA_SIEGE/);
});

test("LandingPreview prioriza juegos promocionados", () => {
  const games: Game[] = [
    {
      id: "g-alpha",
      name: "Alpha Board",
      price: { amount: 100, currency: "GTQ" },
      rating: { value: 4.2, scale: 5 },
      themes: ["Estrategia"],
      shortDescription: "Juego de prueba.",
      image: { src: "https://example.com/alpha.jpg", alt: "Alpha" },
      releaseYear: 2020,
    },
    {
      id: "g-beta",
      name: "Beta Quest",
      price: { amount: 200, currency: "GTQ" },
      rating: { value: 3.8, scale: 5 },
      themes: ["Familiar"],
      shortDescription: "Juego de prueba.",
      image: { src: "https://example.com/beta.jpg", alt: "Beta" },
      releaseYear: 2021,
    },
  ];
  const html = renderToStaticMarkup(
    <LandingPreview games={games} promotedGames={[games[1]]} />
  );

  assert.match(html, /BETA_QUEST/);
  assert.match(html, /PROMOCIONADO/);
});
