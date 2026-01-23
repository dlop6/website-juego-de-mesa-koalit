import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { BuyButton } from "./BuyButton";

test("BuyButton renderiza CTA principal y botón bloqueado", () => {
  const html = renderToStaticMarkup(
    <BuyButton purchaseUrl="https://example.com/compra" />
  );

  assert.match(html, /INICIALIZAR_COMPRA/);
  assert.match(html, /DATOS_NO_DISPONIBLES/);
  assert.match(html, /https:\/\/example.com\/compra/);
});
