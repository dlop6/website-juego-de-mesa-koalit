import { test } from "node:test";
import assert from "node:assert/strict";
import { clampPage, getTotalPages, parsePageParam } from "./pagination";

test("parsePageParam usa fallback y clamp minimo", () => {
  assert.equal(parsePageParam(null), 1);
  assert.equal(parsePageParam("0"), 1);
  assert.equal(parsePageParam("-4"), 1);
  assert.equal(parsePageParam("3.7"), 3);
});

test("parsePageParam acepta fallback personalizado", () => {
  assert.equal(parsePageParam("abc", 2), 2);
});

test("getTotalPages siempre retorna al menos 1", () => {
  assert.equal(getTotalPages(0, 9), 1);
  assert.equal(getTotalPages(10, 9), 2);
  assert.equal(getTotalPages(25, 10), 3);
});

test("clampPage limita al rango disponible", () => {
  assert.equal(clampPage(1, 5), 1);
  assert.equal(clampPage(10, 5), 5);
});
