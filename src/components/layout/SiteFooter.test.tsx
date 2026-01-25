import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { SiteFooter } from "./SiteFooter";

test("SiteFooter renderiza secciones base", () => {
  const html = renderToStaticMarkup(<SiteFooter />);

  assert.match(html, /NAVEGACIÓN/);
  assert.match(html, /LEGAL/);
  assert.match(html, /The Board Game Vault/);
});
