import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import type { Game } from "@/lib/dal";
import { getGameById } from "./index";

const ORIGINAL_ENV = {
  DATA_MODE: process.env.DATA_MODE,
  NEXT_PUBLIC_DATA_MODE: process.env.NEXT_PUBLIC_DATA_MODE,
  DATA_FORCE_ERROR: process.env.DATA_FORCE_ERROR,
  NEXT_PUBLIC_DATA_FORCE_ERROR: process.env.NEXT_PUBLIC_DATA_FORCE_ERROR,
};

before(() => {
  process.env.DATA_MODE = "test";
  process.env.NEXT_PUBLIC_DATA_MODE = "test";
  process.env.DATA_FORCE_ERROR = "0";
  process.env.NEXT_PUBLIC_DATA_FORCE_ERROR = "0";
});

after(() => {
  process.env.DATA_MODE = ORIGINAL_ENV.DATA_MODE;
  process.env.NEXT_PUBLIC_DATA_MODE = ORIGINAL_ENV.NEXT_PUBLIC_DATA_MODE;
  process.env.DATA_FORCE_ERROR = ORIGINAL_ENV.DATA_FORCE_ERROR;
  process.env.NEXT_PUBLIC_DATA_FORCE_ERROR = ORIGINAL_ENV.NEXT_PUBLIC_DATA_FORCE_ERROR;
});

test("getGameById devuelve juego con id exacto", async () => {
  const result = await getGameById("g-catan");
  assert.ok(result);
  assert.equal(result?.id, "g-catan");
});

test("getGameById es case-insensitive", async () => {
  const result = await getGameById("G-CATAN");
  assert.ok(result);
  assert.equal(result?.id, "g-catan");
});

test("getGameById retorna null si id es vacio", async () => {
  const result = await getGameById("");
  assert.equal(result, null);
});

test("getGameById no falla con encoding invalido", async () => {
  let result: Game | null = null;
  await assert.doesNotReject(async () => {
    result = await getGameById("%");
  });
  assert.equal(result, null);
});
