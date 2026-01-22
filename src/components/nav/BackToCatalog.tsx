import Link from "next/link";

type SearchParams = Record<string, string | string[] | undefined>;

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
      className="inline-flex items-center gap-2 text-500 font-600 text-muted hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
    >
      Volver al catálogo
    </Link>
  );
}
