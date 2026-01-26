import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { OfflineErrorScreen } from "./OfflineErrorScreen";

test("OfflineErrorScreen renderiza estado y CTA", () => {
  const html = renderToStaticMarkup(
    <OfflineErrorScreen onRetry={() => {}} />
  );

  assert.match(html, /ESTADO: DESCONECTADO/);
  assert.match(html, /RECARGAR_SISTEMA/);
  assert.match(html, /SYS_ERR_503/);
});
