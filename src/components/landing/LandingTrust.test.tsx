import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { LandingTrust } from "./LandingTrust";

test("LandingTrust incluye secciones de confianza", () => {
  const html = renderToStaticMarkup(<LandingTrust />);

  assert.match(html, /DATOS VERIFICADOS/);
  assert.match(html, /PUBLICIDAD TRANSPARENTE/);
  assert.match(html, /ACCESIBILIDAD CUMPLIDA/);
});
