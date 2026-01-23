import { test } from "node:test";
import assert from "node:assert/strict";

// Test helper functions extracted from GameCard component logic

function formatPrice(amount: number): string {
  if (!Number.isFinite(amount)) {
    return "--";
  }
  return amount.toFixed(0);
}

function getVisibleThemes(themes: string[], maxVisible: number) {
  const visibleThemes = themes.slice(0, maxVisible);
  const remainingCount = themes.length - maxVisible;
  return { visibleThemes, remainingCount };
}

test("formatPrice formats valid numbers", () => {
  assert.equal(formatPrice(549), "549");
  assert.equal(formatPrice(100.99), "101");
  assert.equal(formatPrice(0), "0");
});

test("formatPrice returns -- for invalid numbers", () => {
  assert.equal(formatPrice(NaN), "--");
  assert.equal(formatPrice(Infinity), "--");
  assert.equal(formatPrice(-Infinity), "--");
});

test("getVisibleThemes limits to max visible", () => {
  const themes = ["Strategy", "Family", "Adventure", "Party"];
  const result = getVisibleThemes(themes, 2);
  
  assert.deepEqual(result.visibleThemes, ["Strategy", "Family"]);
  assert.equal(result.remainingCount, 2);
});

test("getVisibleThemes handles fewer themes than max", () => {
  const themes = ["Strategy"];
  const result = getVisibleThemes(themes, 2);
  
  assert.deepEqual(result.visibleThemes, ["Strategy"]);
  assert.equal(result.remainingCount, -1);
});

test("getVisibleThemes handles exact match", () => {
  const themes = ["Strategy", "Family"];
  const result = getVisibleThemes(themes, 2);
  
  assert.deepEqual(result.visibleThemes, ["Strategy", "Family"]);
  assert.equal(result.remainingCount, 0);
});

test("getVisibleThemes handles empty array", () => {
  const result = getVisibleThemes([], 2);
  
  assert.deepEqual(result.visibleThemes, []);
  assert.equal(result.remainingCount, -2);
});
