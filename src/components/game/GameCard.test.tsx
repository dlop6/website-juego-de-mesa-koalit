import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { GameCard } from "./GameCard";

test("GameCard renderiza rating y etiquetas", () => {
  const html = renderToStaticMarkup(
    <GameCard
      id="g-1"
      name="DUNE: IMPERIUM"
      imageSrc=""
      imageAlt="Portada"
      priceAmount={425}
      priceCurrency="GTQ"
      ratingValue={4.35}
      themes={["Ciencia Ficcion", "Estrategia"]}
    />
  );

  assert.match(html, /DUNE: IMPERIUM/);
  assert.match(html, /Q425.00/);
  assert.match(html, /4.3/);
  assert.match(html, /\[CIENCIA_FICCION\]/);
});
