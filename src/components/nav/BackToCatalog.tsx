// define el componente `BackToCatalog` que construye un enlace de vuelta al catálogo con filtros preservados.
import Link from "next/link";

// define el tipo para los parámetros de búsqueda.
type SearchParams = Record<string, string | string[] | undefined>;

// construye la url del catálogo preservando los filtros de búsqueda.
function buildCatalogHref(searchParams?: SearchParams) {
  if (!searchParams) {
    return "/catalogo";
  }

  const entries = Object.keys(searchParams)
    .sort()
    .flatMap((key) => {
      const value = searchParams[key];
      if (typeof value === "string") {
        return [[key, value]] as Array<[string, string]>;
      }
      if (Array.isArray(value)) {
        return value.map((item) => [key, item] as [string, string]);
      }
      return [];
    });

  if (entries.length === 0) {
    return "/catalogo";
  }

  const params = new URLSearchParams(entries);
  const query = params.toString();
  return query.length > 0 ? `/catalogo?${query}` : "/catalogo";
}

export function BackToCatalog({ searchParams }: { searchParams?: SearchParams }) {
  const href = buildCatalogHref(searchParams);

  return (
    <Link
      href={href}
      className="group flex items-center gap-2 text-primary/70 hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
    >
      <span className="text-sm font-medium font-mono">&lt;&lt; VOLVER_AL_CATÁLOGO</span>
    </Link>
  );
}
