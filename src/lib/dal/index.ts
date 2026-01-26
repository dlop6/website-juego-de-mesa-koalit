// centraliza el acceso a datos leyendo `public/db.json` y simulando red
import { readFile } from "fs/promises";
import path from "path";
import { DataAccessError } from "./errors";
import { simulateNetwork } from "./simulation";
import type { Database, Game, Promotion, Sponsor } from "./types";

const DB_PATH = path.join(process.cwd(), "public", "db.json");
let cache: Database | null = null;

// lee y parsea el archivo json; devuelve cache en producción cuando existe
async function readDatabase(): Promise<Database> {
  try {
    if (cache && process.env.NODE_ENV === "production") {
      return cache;
    }

    // simula la latencia de red antes de leer el archivo
    await simulateNetwork();

    const raw = await readFile(DB_PATH, "utf-8");

    // parsea el json y almacena en cache para producción
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

// devuelve la lista completa de juegos obtenida del dataset
export async function getGames(): Promise<Game[]> {
  const { games } = await readDatabase();
  return games;
}

// busca un juego por id y devuelve null si no fue encontrado
export async function getGameById(id: string): Promise<Game | null> {
  const { games } = await readDatabase();
  return games.find((game) => game.id === id) ?? null;
}

// devuelve la lista de sponsors desde el dataset
export async function getSponsors(): Promise<Sponsor[]> {
  const { sponsors } = await readDatabase();
  return sponsors;
}

// devuelve la lista de promociones desde el dataset
export async function getPromotions(): Promise<Promotion[]> {
  const { promotions } = await readDatabase();
  return promotions;
}

export { DataAccessError } from "./errors";
export type { Database, Game, Promotion, Sponsor } from "./types";
