import { DataAccessError } from "./errors";
import { simulateNetwork } from "./simulation";
import type { Database, Game, Promotion, Sponsor } from "./types";

const DB_PATH = "/db.json";

async function fetchDatabase(): Promise<Database> {
  try {
    await simulateNetwork();
    const response = await fetch(DB_PATH);
    if (!response.ok) {
      throw new DataAccessError(
        "FETCH_FAILED",
        `Failed to fetch dataset: ${response.status}`
      );
    }

    return (await response.json()) as Database;
  } catch (error) {
    if (error instanceof DataAccessError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : "Unknown error";
    throw new DataAccessError("UNKNOWN", message);
  }
}

export async function getGames(): Promise<Game[]> {
  const { games } = await fetchDatabase();
  return games;
}

export async function getGameById(id: string): Promise<Game | null> {
  const { games } = await fetchDatabase();
  return games.find((game) => game.id === id) ?? null;
}

export async function getSponsors(): Promise<Sponsor[]> {
  const { sponsors } = await fetchDatabase();
  return sponsors;
}

export async function getPromotions(): Promise<Promotion[]> {
  const { promotions } = await fetchDatabase();
  return promotions;
}

export { DataAccessError } from "./errors";
export type { Database, Game, Promotion, Sponsor } from "./types";
