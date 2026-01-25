import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import GameDetailLoading from "./loading";

test("GameDetailLoading anuncia carga de ficha", () => {
  const html = renderToStaticMarkup(<GameDetailLoading />);

  assert.match(html, /Cargando ficha/);
});
