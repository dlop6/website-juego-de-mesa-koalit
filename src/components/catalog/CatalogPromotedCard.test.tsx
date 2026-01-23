import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import type { Game } from "@/lib/dal";
import { CatalogPromotedCard } from "./CatalogPromotedCard";

const game: Game = {
  id: "g-test",
  name: "VOIDFALL",
  price: { amount: 925, currency: "GTQ" },
  rating: { value: 4.5, scale: 5 },
  themes: ["Estrategia"],
  shortDescription: "Un juego de estrategia 4X espacial.",
  image: { src: "https://example.com/img.jpg", alt: "Portada" },
};

test("CatalogPromotedCard renderiza label y precio", () => {
  const html = renderToStaticMarkup(<CatalogPromotedCard game={game} />);

  assert.match(html, /PROMOCIONADO/);
  assert.match(html, /VOIDFALL/);
  assert.match(html, /Q925.00/);
});
