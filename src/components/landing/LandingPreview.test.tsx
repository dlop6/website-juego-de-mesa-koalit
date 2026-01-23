import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { LandingPreview } from "./LandingPreview";

test("LandingPreview muestra registros y CTA de catalogo", () => {
  const html = renderToStaticMarkup(<LandingPreview />);

  assert.match(html, /VISTA PREVIA DEL ARCHIVO/);
  assert.match(html, /VER_TODAS_LAS_ENTRADAS/);
  assert.match(html, /MONOPOLY_1985/);
});
