import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

function LayoutShell({ children }: { children: string }) {
  return (
    <div>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

test("LayoutShell integra header, contenido y footer", () => {
  const html = renderToStaticMarkup(<LayoutShell>Contenido</LayoutShell>);

  assert.match(html, /EL BAÚL/);
  assert.match(html, /Contenido/);
  assert.match(html, /ESTADO DEL SERVIDOR/);
});
