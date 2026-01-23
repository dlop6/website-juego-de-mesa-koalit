import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "./page";

test("Landing page integra secciones principales", () => {
  const html = renderToStaticMarkup(<Home />);

  assert.match(html, /ARCHIVANDO EL/);
  assert.match(html, /VISTA PREVIA DEL ARCHIVO/);
  assert.match(html, /Protocolos de Búsqueda/);
});
