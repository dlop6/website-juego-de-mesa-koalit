import { test } from "node:test";
import assert from "node:assert/strict";

// Test helper functions extracted from Rating component logic

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function formatValue(value: number): string {
  return value.toFixed(1);
}

function calculateStars(value: number, scale: number) {
  const safeScale = Math.max(1, Math.round(scale));
  const clampedValue = clamp(value, 0, safeScale);
  const fullStars = Math.floor(clampedValue);
  const hasHalfStar = clampedValue % 1 >= 0.25 && clampedValue % 1 < 0.75;
  const emptyStars = safeScale - fullStars - (hasHalfStar ? 1 : 0);
  
  return { fullStars, hasHalfStar, emptyStars, clampedValue };
}

test("clamp values within range", () => {
  assert.equal(clamp(3, 0, 5), 3);
  assert.equal(clamp(-1, 0, 5), 0);
  assert.equal(clamp(10, 0, 5), 5);
  assert.equal(clamp(0, 0, 5), 0);
  assert.equal(clamp(5, 0, 5), 5);
});

test("formatValue formats to one decimal", () => {
  assert.equal(formatValue(4.5), "4.5");
  assert.equal(formatValue(3), "3.0");
  assert.equal(formatValue(4.67), "4.7");
  assert.equal(formatValue(0), "0.0");
});

test("calculateStars full stars correctly", () => {
  const result = calculateStars(4, 5);
  assert.equal(result.fullStars, 4);
  assert.equal(result.hasHalfStar, false);
  assert.equal(result.emptyStars, 1);
});

test("calculateStars detects half stars", () => {
  const result = calculateStars(3.5, 5);
  assert.equal(result.fullStars, 3);
  assert.equal(result.hasHalfStar, true);
  assert.equal(result.emptyStars, 1);
});

test("calculateStars edge case 0", () => {
  const result = calculateStars(0, 5);
  assert.equal(result.fullStars, 0);
  assert.equal(result.hasHalfStar, false);
  assert.equal(result.emptyStars, 5);
});

test("calculateStars edge case max value", () => {
  const result = calculateStars(5, 5);
  assert.equal(result.fullStars, 5);
  assert.equal(result.hasHalfStar, false);
  assert.equal(result.emptyStars, 0);
});

test("calculateStars clamps values above scale", () => {
  const result = calculateStars(7, 5);
  assert.equal(result.clampedValue, 5);
});

test("calculateStars 0.3 counts as half star", () => {
  const result = calculateStars(4.3, 5);
  assert.equal(result.fullStars, 4);
  assert.equal(result.hasHalfStar, true);
});

test("calculateStars 0.74 counts as half star", () => {
  const result = calculateStars(4.74, 5);
  assert.equal(result.fullStars, 4);
  assert.equal(result.hasHalfStar, true);
});

test("calculateStars 0.75 and above not half star", () => {
  const result = calculateStars(4.8, 5);
  assert.equal(result.fullStars, 4);
  assert.equal(result.hasHalfStar, false);
  assert.equal(result.emptyStars, 1);
});
