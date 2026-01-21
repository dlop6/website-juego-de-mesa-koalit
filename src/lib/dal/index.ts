import { readFile } from "fs/promises";
import path from "path";
import { DataAccessError } from "./errors";
import { simulateNetwork } from "./simulation";
import type { Database, Game, Promotion, Sponsor } from "./types";

const DB_PATH = path.join(process.cwd(), "public", "db.json");
let cache: Database | null = null;

async function readDatabase(): Promise<Database> {
  try {
    if (cache) {
      return cache;
    }
    await simulateNetwork();
    const raw = await readFile(DB_PATH, "utf-8");
    cache = JSON.parse(raw) as Database;
    return cache;
  } catch (error) {
    if (error instanceof DataAccessError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : "Unknown error";
    throw new DataAccessError("FETCH_FAILED", `Failed to read dataset: ${message}`);
  }
}

export async function getGames(): Promise<Game[]> {
  const { games } = await readDatabase();
  return games;
}

export async function getGameById(id: string): Promise<Game | null> {
  const { games } = await readDatabase();
  return games.find((game) => game.id === id) ?? null;
}

export async function getSponsors(): Promise<Sponsor[]> {
  const { sponsors } = await readDatabase();
  return sponsors;
}

export async function getPromotions(): Promise<Promotion[]> {
  const { promotions } = await readDatabase();
  return promotions;
}

export { DataAccessError } from "./errors";
export type { Database, Game, Promotion, Sponsor } from "./types";
