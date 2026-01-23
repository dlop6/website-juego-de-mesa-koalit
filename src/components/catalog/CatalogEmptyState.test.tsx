import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { CatalogEmptyState } from "./CatalogEmptyState";

test("CatalogEmptyState muestra acciones principales", () => {
  const html = renderToStaticMarkup(
    <CatalogEmptyState onClear={() => {}} onFocus={() => {}} />
  );

  assert.match(html, /LIMPIAR FILTROS/);
  assert.match(html, /AJUSTAR FILTROS/);
});
