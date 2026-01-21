import { DataAccessError } from "./errors";

type DataMode = "test" | "development" | "production";

interface SimulationConfig {
  latencyMs: number;
  jitterMs: number;
  forceError: boolean;
}

const DATA_MODE =
  (process.env.NEXT_PUBLIC_DATA_MODE as DataMode | undefined) ??
  (process.env.DATA_MODE as DataMode | undefined);

const NODE_ENV = process.env.NODE_ENV;

const DATA_LATENCY_MS =
  process.env.NEXT_PUBLIC_DATA_LATENCY_MS ?? process.env.DATA_LATENCY_MS;
const DATA_JITTER_MS =
  process.env.NEXT_PUBLIC_DATA_JITTER_MS ?? process.env.DATA_JITTER_MS;
const DATA_FORCE_ERROR =
  process.env.NEXT_PUBLIC_DATA_FORCE_ERROR ?? process.env.DATA_FORCE_ERROR;

function toNumber(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toBoolean(value: string | undefined) {
  if (!value) return false;
  return value === "1" || value === "true" || value === "yes";
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getSimulationConfig(): SimulationConfig {
  const isTest = DATA_MODE === "test" || NODE_ENV === "test";
  const isDevelopment = NODE_ENV === "development";
  const isProduction = NODE_ENV === "production";

  const baseLatency = isTest ? 20 : isProduction ? 0 : 350;
  const latencyRaw = toNumber(DATA_LATENCY_MS, baseLatency);
  const latencyMs = isTest
    ? 20
    : isDevelopment
      ? clamp(latencyRaw, 250, 450)
      : Math.max(0, latencyRaw);

  const jitterMs = isTest ? 0 : Math.max(0, toNumber(DATA_JITTER_MS, 0));

  return {
    latencyMs,
    jitterMs,
    forceError: toBoolean(DATA_FORCE_ERROR),
  };
}

function delay(ms: number) {
  if (ms <= 0) return Promise.resolve();
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function simulateNetwork() {
  const config = getSimulationConfig();
  await delay(config.latencyMs + config.jitterMs);

  if (config.forceError) {
    throw new DataAccessError("NETWORK_SIMULATED", "Forced data error.");
  }
}
