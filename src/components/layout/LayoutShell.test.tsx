import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { ThemeProvider } from "@/providers/ThemeProvider";
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
  const html = renderToStaticMarkup(
    <ThemeProvider>
      <LayoutShell>Contenido</LayoutShell>
    </ThemeProvider>
  );

  assert.match(html, /The Board Game Vault/);
  assert.match(html, /Contenido/);
  assert.match(html, /ESTADO DEL SERVIDOR/);
});
