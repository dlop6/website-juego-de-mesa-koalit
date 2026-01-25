import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { NotFoundScreen } from "./NotFoundScreen";

test("NotFoundScreen renderiza textos clave y CTAs", () => {
  const html = renderToStaticMarkup(<NotFoundScreen />);

  assert.match(html, /404: SECTOR_NO_ENCONTRADO/);
  assert.match(html, /Redireccionar_Al_Inicio/);
  assert.match(html, /Ver_Catálogo_Completo/);
});
