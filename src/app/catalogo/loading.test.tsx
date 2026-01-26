// se definió la prueba que validó la pantalla de carga del catálogo.
import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import CatalogoLoading from "./loading";

test("CatalogoLoading muestra estado de carga accesible", () => {
  const html = renderToStaticMarkup(<CatalogoLoading />);

  assert.match(html, /Cargando catalogo/);
});
