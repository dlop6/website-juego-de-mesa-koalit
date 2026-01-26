// se centralizó el acceso a datos leyendo `public/db.json` y simulando red
import { readFile } from "fs/promises";
import path from "path";
import { DataAccessError } from "./errors";
import { simulateNetwork } from "./simulation";
import type { Database, Game, Promotion, Sponsor } from "./types";

const DB_PATH = path.join(process.cwd(), "public", "db.json");
let cache: Database | null = null;

// se leyó y parseó el archivo json; se devolvió cache en producción cuando existió
async function readDatabase(): Promise<Database> {
  try {
    if (cache && process.env.NODE_ENV === "production") {
      return cache;
    }

    // se simuló la latencia de red antes de leer el archivo
    await simulateNetwork();

    const raw = await readFile(DB_PATH, "utf-8");

    // se parseó el json y se almacenó en cache para producción
    cache = JSON.parse(raw) as Database;
    return cache;
  } catch (error) {
    // si se propagó un DataAccessError, se re-lanzó
    if (error instanceof DataAccessError) {
      throw error;
    }

    // si ocurrió otro error, se envolvió en DataAccessError con código FETCH_FAILED
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new DataAccessError("FETCH_FAILED", `Failed to read dataset: ${message}`);
  }
}

// se devolvió la lista completa de juegos obtenida del dataset
export async function getGames(): Promise<Game[]> {
  const { games } = await readDatabase();
  return games;
}

// se buscó un juego por id y se devolvió null si no fue encontrado
export async function getGameById(id: string): Promise<Game | null> {
  const { games } = await readDatabase();
  return games.find((game) => game.id === id) ?? null;
}

// se devolvió la lista de sponsors desde el dataset
export async function getSponsors(): Promise<Sponsor[]> {
  const { sponsors } = await readDatabase();
  return sponsors;
}

// se devolvió la lista de promociones desde el dataset
export async function getPromotions(): Promise<Promotion[]> {
  const { promotions } = await readDatabase();
  return promotions;
}

export { DataAccessError } from "./errors";
export type { Database, Game, Promotion, Sponsor } from "./types";
