import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SiteHeader } from "./SiteHeader";

test("SiteHeader renderiza marca y enlaces principales", () => {
  const html = renderToStaticMarkup(
    <ThemeProvider>
      <SiteHeader />
    </ThemeProvider>
  );

  assert.match(html, /EL BAÚL/);
  assert.match(html, /INICIO/);
  assert.match(html, /CATÁLOGO/);
  assert.match(html, /\[MODO\]/);
});
