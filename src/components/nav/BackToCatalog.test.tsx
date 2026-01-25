import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { BackToCatalog } from "./BackToCatalog";

test("BackToCatalog renderiza el texto del enlace", () => {
  const html = renderToStaticMarkup(<BackToCatalog />);

  assert.match(html, /VOLVER_AL_CATÁLOGO/);
});
