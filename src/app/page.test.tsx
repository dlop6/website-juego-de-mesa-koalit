import { test } from "node:test";
import assert from "node:assert/strict";
import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "./page";

test("Landing page integra secciones principales", async () => {
  const element = (await Home()) as ReactElement;
  const html = renderToStaticMarkup(element);

  assert.match(html, /ARCHIVANDO EL/);
  assert.match(html, /VISTA PREVIA DEL ARCHIVO/);
  assert.match(html, /Protocolos de Búsqueda/);
});
