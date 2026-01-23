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

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0l7 7m-7-7l7-7" />
    </svg>
  );
}

export function BackToCatalog({ searchParams }: { searchParams?: SearchParams }) {
  const href = buildCatalogHref(searchParams);

  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-500 font-600 text-muted transition-all duration-200 ease-out hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
    >
      <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      Volver a la boveda
    </Link>
  );
}
