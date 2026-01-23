import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import type { Game } from "@/lib/dal";
import { GameDetail } from "./GameDetail";

const game: Game = {
  id: "g-terraforming-mars",
  name: "Terraforming Mars",
  price: { amount: 549.99, currency: "GTQ" },
  rating: { value: 4.9, scale: 5 },
  themes: ["Estrategia", "Ciencia Ficción"],
  shortDescription: "Terraforma Marte mientras compites por puntos.",
  image: { src: "https://example.com/mars.jpg", alt: "Portada" },
  purchaseUrl: "https://example.com/terraforming",
  players: { min: 1, max: 5 },
  durationMinutes: { min: 90, max: 120 },
  age: { min: 12 },
  complexity: 4,
  mechanics: ["Engine Building"],
};

test("GameDetail renderiza secciones principales", () => {
  const html = renderToStaticMarkup(<GameDetail game={game} />);

  assert.match(html, /CLASIFICADO/);
  assert.match(html, /ESCANEO_DE_IMAGEN/);
  assert.match(html, /Terraforming Mars/);
  assert.match(html, /COSTO_EN_CREDITOS/);
});
