import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { CatalogFilters } from "./CatalogFilters";

test("CatalogFilters muestra controles base", () => {
  const html = renderToStaticMarkup(
    <CatalogFilters
      priceMin={100}
      priceMax={500}
      priceBoundMin={50}
      priceBoundMax={1000}
      ratingMin={2.5}
      themes={["Estrategia", "Familia"]}
      selectedThemes={["Familia"]}
      onPriceMinChange={() => {}}
      onPriceMaxChange={() => {}}
      onRatingDecrease={() => {}}
      onRatingIncrease={() => {}}
      onToggleTheme={() => {}}
      onClear={() => {}}
    />
  );

  assert.match(html, /ENTRADA_DE_PARÁMETROS/);
  assert.match(html, /RANGO_DE_PRECIO/);
  assert.match(html, /VALORACIÓN_MÍNIMA/);
  assert.match(html, /TEMÁTICAS/);
});
