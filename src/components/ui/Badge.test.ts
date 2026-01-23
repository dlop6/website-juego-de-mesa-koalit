import { test } from "node:test";
import assert from "node:assert/strict";

// Test Badge variant logic

type BadgeVariant = "promo" | "sponsor" | "neutral";

const variantClasses: Record<BadgeVariant, string> = {
  promo: "border-info/40 bg-info/10 text-info",
  sponsor: "border-accent/40 bg-accent/10 text-accent",
  neutral: "border-border bg-elevated text-muted",
};

function getVariantClasses(variant: BadgeVariant): string {
  return variantClasses[variant];
}

function shouldShowIcon(variant: BadgeVariant): boolean {
  return variant === "promo" || variant === "sponsor";
}

test("getVariantClasses returns promo classes", () => {
  const classes = getVariantClasses("promo");
  assert.ok(classes.includes("text-info"));
  assert.ok(classes.includes("border-info"));
});

test("getVariantClasses returns sponsor classes", () => {
  const classes = getVariantClasses("sponsor");
  assert.ok(classes.includes("text-accent"));
  assert.ok(classes.includes("border-accent"));
});

test("getVariantClasses returns neutral classes", () => {
  const classes = getVariantClasses("neutral");
  assert.ok(classes.includes("text-muted"));
  assert.ok(classes.includes("border-border"));
});

test("shouldShowIcon true for promo", () => {
  assert.equal(shouldShowIcon("promo"), true);
});

test("shouldShowIcon true for sponsor", () => {
  assert.equal(shouldShowIcon("sponsor"), true);
});

test("shouldShowIcon false for neutral", () => {
  assert.equal(shouldShowIcon("neutral"), false);
});
