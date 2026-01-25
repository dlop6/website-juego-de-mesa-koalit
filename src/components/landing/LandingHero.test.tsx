import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { LandingHero } from "./LandingHero";

test("LandingHero renderiza titulo y CTA principal", () => {
  const html = renderToStaticMarkup(<LandingHero />);

  assert.match(html, /ARCHIVANDO EL/);
  assert.match(html, /\[ ACCEDER AL CATÁLOGO \]/);
});
