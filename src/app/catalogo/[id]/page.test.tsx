import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import GameDetailPage from "./page";

test("GameDetailPage renderiza datos con params async", async () => {
  const element = await GameDetailPage({
    params: Promise.resolve({ id: "g-terraforming-mars" }),
  });

  const html = renderToStaticMarkup(element);
  assert.match(html, /Terraforming Mars/);
});
