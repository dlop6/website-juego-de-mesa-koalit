// se centralizaron formateadores y placeholders del dominio de juegos
const PLACEHOLDER_IMAGE_SQUARE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDYwMCA2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMxMDEwMTAiLz48cGF0aCBkPSJNMCAzMDBIMTYwVjMwMEg0NDBWNTQwSDE2MFYzMDBaIiBmaWxsPSIjMjIyIi8+PHBhdGggZD0iTTQ0MCA2MEg1NDBWMTYwSDQ0MFY2MFoiIGZpbGw9IiMyMjIiLz48L3N2Zz4=";

const PLACEHOLDER_IMAGE_WIDE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjM0MCIgdmlld0JveD0iMCAwIDYwMCAzNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSIzNDAiIGZpbGw9IiMxMTEiLz48cGF0aCBkPSJNMCAxNzBIMTYwVjE3MEg0NDBWMzEwSDE2MFYxNzBaIiBmaWxsPSIjMjIyIi8+PC9zdmc+";

const RATING_MAX = 5;

// se formateó un número a string fijo o placeholder si fue inválido
function formatPrice(amount: number, decimals = 2) {
  if (!Number.isFinite(amount)) {
    return "--";
  }
  return amount.toFixed(decimals);
}

// se formateó precio con prefijo moneda guatemalteca
function formatPriceWithQ(amount: number, decimals = 2) {
  return `Q${formatPrice(amount, decimals)}`;
}

// se transformó una temática para display reemplazando espacios por guiones bajos
function formatThemeLabel(theme: string) {
  return theme.replaceAll(" ", "_");
}

// se generó una etiqueta de tema en formato tag (mayúsculas)
function formatThemeTag(theme: string) {
  return formatThemeLabel(theme).toUpperCase();
}

// se formateó el rating en escala 0-5 aplicando clamp y decimales
function formatRatingFiveScale(value: number, decimals = 1) {
  if (!Number.isFinite(value)) {
    return "--";
  }
  const clamped = Math.min(RATING_MAX, Math.max(0, value));
  return clamped.toFixed(decimals);
}

export {
  PLACEHOLDER_IMAGE_SQUARE,
  PLACEHOLDER_IMAGE_WIDE,
  RATING_MAX,
  formatPrice,
  formatPriceWithQ,
  formatThemeLabel,
  formatThemeTag,
  formatRatingFiveScale,
};
