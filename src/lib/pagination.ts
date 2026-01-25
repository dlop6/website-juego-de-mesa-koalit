const DEFAULT_PAGE = 1;

function toNumber(value: string | null): number | null {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function parsePageParam(value: string | null, fallback = DEFAULT_PAGE) {
  const parsed = toNumber(value);
  if (parsed === null) {
    return fallback;
  }
  return Math.max(1, Math.floor(parsed));
}

export function getTotalPages(totalItems: number, pageSize: number) {
  if (!Number.isFinite(totalItems) || !Number.isFinite(pageSize)) {
    return 1;
  }
  const safeSize = Math.max(1, Math.floor(pageSize));
  const safeItems = Math.max(0, Math.floor(totalItems));
  return Math.max(1, Math.ceil(safeItems / safeSize));
}

export function clampPage(page: number, totalPages: number) {
  const safeTotal = Math.max(1, Math.floor(totalPages));
  const safePage = Math.max(1, Math.floor(page));
  return Math.min(safePage, safeTotal);
}
