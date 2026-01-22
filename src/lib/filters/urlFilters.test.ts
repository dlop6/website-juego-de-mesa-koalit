import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseFiltersFromSearchParams,
  serializeFiltersToSearchParams,
} from "./urlFilters";

test("serialize default filters produce empty query", () => {
  const params = serializeFiltersToSearchParams({
    priceMin: null,
    priceMax: null,
    ratingMin: 0,
    themes: [],
  });

  assert.equal(params.toString(), "");
});

test("serialize themes list into comma-separated param", () => {
  const params = serializeFiltersToSearchParams({
    priceMin: null,
    priceMax: null,
    ratingMin: 0,
    themes: ["Estrategia", "Familia"],
  });

  assert.equal(params.get("themes"), "Estrategia,Familia");
});

test("parse clamps ratingMin above 5", () => {
  const params = new URLSearchParams("ratingMin=6");
  const result = parseFiltersFromSearchParams(params);

  assert.equal(result.ratingMin, 5);
});

test("parse swaps priceMin and priceMax when inverted", () => {
  const params = new URLSearchParams("priceMin=300&priceMax=100");
  const result = parseFiltersFromSearchParams(params);

  assert.equal(result.priceMin, 100);
  assert.equal(result.priceMax, 300);
});

test("parse maps themes case-insensitively to canonical options", () => {
  const params = new URLSearchParams({ themes: "  estrategia  " });
  const result = parseFiltersFromSearchParams(params, ["Estrategia", "Familia"]);

  assert.deepEqual(result.themes, ["Estrategia"]);
});

test("parse handles invalid numbers and clamps negatives", () => {
  const params = new URLSearchParams("priceMin=abc&priceMax=-10&ratingMin=NaN");
  const result = parseFiltersFromSearchParams(params);

  assert.equal(result.priceMin, null);
  assert.equal(result.priceMax, 0);
  assert.equal(result.ratingMin, 0);
});
