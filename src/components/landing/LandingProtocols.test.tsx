import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { LandingProtocols } from "./LandingProtocols";

test("LandingProtocols renderiza protocolos y patrocinador", () => {
  const html = renderToStaticMarkup(<LandingProtocols />);

  assert.match(html, /Protocolos de Búsqueda/);
  assert.match(html, /REGISTRO DE PATROCINADORES/);
  assert.match(html, /POR PRECIO/);
});
