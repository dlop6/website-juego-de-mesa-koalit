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

  assert.match(html, /PARÁMETROS/);
  assert.match(html, /RANGO_DE_PRECIO/);
  assert.match(html, /VALORACIÓN_MÍNIMA/);
  assert.match(html, /TEMÁTICAS/);
});

test("CatalogFilters admite modo mobile con panelId", () => {
  const html = renderToStaticMarkup(
    <CatalogFilters
      mode="mobile"
      panelId="filters-panel-mobile"
      priceMin={100}
      priceMax={500}
      priceBoundMin={50}
      priceBoundMax={1000}
      ratingMin={2.5}
      themes={["Estrategia"]}
      selectedThemes={[]}
      onPriceMinChange={() => {}}
      onPriceMaxChange={() => {}}
      onRatingDecrease={() => {}}
      onRatingIncrease={() => {}}
      onToggleTheme={() => {}}
      onClear={() => {}}
    />
  );

  assert.match(html, /filters-panel-mobile/);
  assert.match(html, /PARÁMETROS/);
});
