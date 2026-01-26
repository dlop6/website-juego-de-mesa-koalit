// se centralizaron helpers de paginación
const DEFAULT_PAGE = 1;

// se intentó convertir un string a número, se devolvió null si no fue válido
function toNumber(value: string | null): number | null {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

// se parseó el parámetro page aplicando fallback y clamp mínimo
export function parsePageParam(value: string | null, fallback = DEFAULT_PAGE) {
  const parsed = toNumber(value);
  if (parsed === null) {
    return fallback;
  }
  return Math.max(1, Math.floor(parsed));
}

// se calculó el total de páginas protegiendo contra valores inválidos
export function getTotalPages(totalItems: number, pageSize: number) {
  if (!Number.isFinite(totalItems) || !Number.isFinite(pageSize)) {
    return 1;
  }
  const safeSize = Math.max(1, Math.floor(pageSize));
  const safeItems = Math.max(0, Math.floor(totalItems));
  return Math.max(1, Math.ceil(safeItems / safeSize));
}

// se garantizó que la página estuviera dentro del rango total
export function clampPage(page: number, totalPages: number) {
  const safeTotal = Math.max(1, Math.floor(totalPages));
  const safePage = Math.max(1, Math.floor(page));
  return Math.min(safePage, safeTotal);
}
