import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { CatalogSkeletonCard } from "./CatalogSkeletonCard";

test("CatalogSkeletonCard renderiza estructura base", () => {
  const html = renderToStaticMarkup(<CatalogSkeletonCard />);

  assert.match(html, /animate-pulse/);
});
