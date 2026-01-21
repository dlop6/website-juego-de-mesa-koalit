import { DataAccessError } from "./errors";

type DataMode = "test" | "development" | "production";

interface SimulationConfig {
  latencyMs: number;
  jitterMs: number;
  errorRate: number;
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
const DATA_ERROR_RATE =
  process.env.NEXT_PUBLIC_DATA_ERROR_RATE ?? process.env.DATA_ERROR_RATE;
const DATA_FORCE_ERROR =
  process.env.NEXT_PUBLIC_DATA_FORCE_ERROR ?? process.env.DATA_FORCE_ERROR;

function toNumber(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toBoolean(value: string | undefined) {
  if (!value) return false;
  return value === '1' || value === 'true' || value === 'yes';
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getSimulationConfig(): SimulationConfig {
  const isTest = DATA_MODE === "test" || NODE_ENV === "test";
  const isProduction = NODE_ENV === "production";

  const baseLatency = isTest ? 20 : isProduction ? 0 : 350;
  const baseJitter = 0;

  return {
    latencyMs: Math.max(0, toNumber(DATA_LATENCY_MS, baseLatency)),
    jitterMs: Math.max(0, toNumber(DATA_JITTER_MS, baseJitter)),
    errorRate: isTest ? 0 : clamp(toNumber(DATA_ERROR_RATE, 0), 0, 1),
    forceError: toBoolean(DATA_FORCE_ERROR),
  };
}

function delay(ms: number) {
  if (ms <= 0) return Promise.resolve();
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function simulateNetwork() {
  const config = getSimulationConfig();
  const jitter =
    config.jitterMs > 0 ? Math.floor(Math.random() * (config.jitterMs + 1)) : 0;

  await delay(config.latencyMs + jitter);

  if (config.forceError) {
    throw new DataAccessError("NETWORK_SIMULATED", "Forced data error.");
  }

  if (config.errorRate > 0 && Math.random() < config.errorRate) {
    throw new DataAccessError("NETWORK_SIMULATED", "Simulated network error.");
  }
}
