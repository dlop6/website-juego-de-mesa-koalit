import type { Database, Game, Promotion, Sponsor } from "./types";

const DB_PATH = "/db.json";

async function fetchDatabase(): Promise<Database> {
  const response = await fetch(DB_PATH);
  if (!response.ok) {
    throw new Error(`Failed to fetch dataset: ${response.status}`);
  }

  return (await response.json()) as Database;
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

export type { Database, Game, Promotion, Sponsor } from "./types";
