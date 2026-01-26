// se implementó el filtrado de juegos por precio, rating y temáticas
import type { Game } from "@/lib/dal";

export interface GameFilters {
  priceMin?: number | null;
  priceMax?: number | null;
  ratingMin?: number | null;
  themes?: string[] | null;
}

interface NormalizedFilters {
  priceMin: number | null;
  priceMax: number | null;
  ratingMin: number | null;
  themes: string[] | null;
}

// se normalizó un valor numérico; se devolvió null si no fue número finito
function normalizeNumber(value: unknown): number | null {
  if (typeof value !== "number") {
    return null;
  }
  if (!Number.isFinite(value)) {
    return null;
  }
  return value;
}

// se limitó un valor dentro de un rango inclusivo
function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

// se normalizaron temáticas eliminando entradas inválidas y duplicados
function normalizeThemes(value: unknown): string[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const normalized = value
    .filter((theme) => typeof theme === "string")
    .map((theme) => theme.trim())
    .filter((theme) => theme.length > 0)
    .map((theme) => theme.toLowerCase());

  if (normalized.length === 0) {
    return null;
  }

  return Array.from(new Set(normalized));
}

// se normalizaron filtros y se resolvieron inconsistencias (swap/clamp)
function normalizeFilters(filters: GameFilters): NormalizedFilters {
  const rawPriceMin = normalizeNumber(filters.priceMin);
  const rawPriceMax = normalizeNumber(filters.priceMax);
  const rawRatingMin = normalizeNumber(filters.ratingMin);

  const priceMin = rawPriceMin === null ? null : Math.max(0, rawPriceMin);
  const priceMax = rawPriceMax === null ? null : Math.max(0, rawPriceMax);
  const ratingMin = rawRatingMin === null ? null : clamp(rawRatingMin, 0, 5);

  let normalizedMin = priceMin;
  let normalizedMax = priceMax;

  if (normalizedMin !== null && normalizedMax !== null && normalizedMin > normalizedMax) {
    const swap = normalizedMin;
    normalizedMin = normalizedMax;
    normalizedMax = swap;
  }

  return {
    priceMin: normalizedMin,
    priceMax: normalizedMax,
    ratingMin,
    themes: normalizeThemes(filters.themes),
  };
}

// se validó que el precio sea número finito y no negativo
function isValidPriceAmount(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

// se validó que el rating fuese número finito en rango 0-5
function isValidRatingValue(value: unknown) {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= 5
  );
}

// se filtró la lista de juegos aplicando cada criterio normalizado
export function filterGames(games: Game[], filters: GameFilters) {
  const normalized = normalizeFilters(filters);

  return games.filter((game) => {
    // se evaluaron límites de precio solo si alguno fue especificado
    if (normalized.priceMin !== null || normalized.priceMax !== null) {
      if (!isValidPriceAmount(game.price?.amount)) {
        return false;
      }
      if (normalized.priceMin !== null && game.price.amount < normalized.priceMin) {
        return false;
      }
      if (normalized.priceMax !== null && game.price.amount > normalized.priceMax) {
        return false;
      }
    }

    // se evaluó el rating mínimo si fue especificado
    if (normalized.ratingMin !== null) {
      if (!isValidRatingValue(game.rating?.value)) {
        return false;
      }
      if (game.rating.value < normalized.ratingMin) {
        return false;
      }
    }

    // se validaron las temáticas requiriendo que el juego contenga todas las solicitadas
    if (normalized.themes) {
      const gameThemes = normalizeThemes(game.themes);
      if (!gameThemes) {
        return false;
      }
      const gameThemeSet = new Set(gameThemes);
      for (const theme of normalized.themes) {
        if (!gameThemeSet.has(theme)) {
          return false;
        }
      }
    }

    return true;
  });
}
