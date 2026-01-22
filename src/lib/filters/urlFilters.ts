import type { GameFilters } from "./filterGames";

type SearchParamsLike = URLSearchParams;

function toNumber(value: unknown): number | null {
  if (typeof value !== "number") {
    return null;
  }
  if (!Number.isFinite(value)) {
    return null;
  }
  return value;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function parseNumberParam(value: string | null): number | null {
  if (!value) {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function buildThemeMap(themeOptions: string[]) {
  const map = new Map<string, string>();
  for (const theme of themeOptions) {
    if (typeof theme !== "string") {
      continue;
    }
    const trimmed = theme.trim();
    if (trimmed.length === 0) {
      continue;
    }
    const key = trimmed.toLowerCase();
    if (!map.has(key)) {
      map.set(key, trimmed);
    }
  }
  return map;
}

function normalizeThemes(value: unknown, themeOptions: string[] = []): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  const themeMap = buildThemeMap(themeOptions);
  const useMap = themeMap.size > 0;
  const result: string[] = [];
  const seen = new Set<string>();

  for (const theme of value) {
    if (typeof theme !== "string") {
      continue;
    }
    const trimmed = theme.trim();
    if (trimmed.length === 0) {
      continue;
    }
    const key = trimmed.toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    let canonical = trimmed;
    if (useMap) {
      const mapped = themeMap.get(key);
      if (!mapped) {
        continue;
      }
      canonical = mapped;
    }
    seen.add(key);
    result.push(canonical);
  }

  return result;
}

export function normalizeFilters(
  filters: GameFilters,
  themeOptions: string[] = []
): GameFilters {
  const rawPriceMin = toNumber(filters.priceMin);
  const rawPriceMax = toNumber(filters.priceMax);
  const rawRatingMin = toNumber(filters.ratingMin);

  const priceMin = rawPriceMin === null ? null : Math.max(0, rawPriceMin);
  const priceMax = rawPriceMax === null ? null : Math.max(0, rawPriceMax);
  const ratingMin = rawRatingMin === null ? 0 : clamp(rawRatingMin, 0, 5);

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
    themes: normalizeThemes(filters.themes, themeOptions),
  };
}

export function parseFiltersFromSearchParams(
  searchParams: SearchParamsLike,
  themeOptions: string[] = []
): GameFilters {
  const priceMin = parseNumberParam(searchParams.get("priceMin"));
  const priceMax = parseNumberParam(searchParams.get("priceMax"));
  const ratingMin = parseNumberParam(searchParams.get("ratingMin"));
  const themesParam = searchParams.get("themes");
  const themesRaw = themesParam ? safeDecode(themesParam) : "";
  const themes = themesRaw
    ? themesRaw.split(",").map((item) => safeDecode(item))
    : [];

  return normalizeFilters(
    {
      priceMin,
      priceMax,
      ratingMin,
      themes,
    },
    themeOptions
  );
}

export function serializeFiltersToSearchParams(
  filters: GameFilters,
  themeOptions: string[] = []
): URLSearchParams {
  const normalized = normalizeFilters(filters, themeOptions);
  const params = new URLSearchParams();

  if (normalized.priceMin !== null) {
    params.set("priceMin", String(normalized.priceMin));
  }
  if (normalized.priceMax !== null) {
    params.set("priceMax", String(normalized.priceMax));
  }
  if (normalized.ratingMin !== 0) {
    params.set("ratingMin", String(normalized.ratingMin));
  }
  if (normalized.themes && normalized.themes.length > 0) {
    params.set("themes", normalized.themes.join(","));
  }

  return params;
}
