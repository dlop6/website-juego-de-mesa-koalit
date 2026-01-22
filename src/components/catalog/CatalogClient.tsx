"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Game } from "@/lib/dal";
import type { GameFilters } from "@/lib/filters/filterGames";
import { filterGames } from "@/lib/filters/filterGames";
import {
  normalizeFilters,
  parseFiltersFromSearchParams,
  serializeFiltersToSearchParams,
} from "@/lib/filters/urlFilters";
import Link from "next/link";
import { GameCard } from "@/components/game/GameCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/states/EmptyState";

const defaultFilters: GameFilters = {
  priceMin: null,
  priceMax: null,
  ratingMin: 0,
  themes: [],
};

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function CatalogClient({ games }: { games: Game[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const initialFiltersRef = useRef<GameFilters | null>(null);
  const didSyncRef = useRef(false);
  const [isPending, startTransition] = useTransition();
  const [showSpinner, setShowSpinner] = useState(false);
  const spinnerTimeout = useRef<number | null>(null);
  const filtersPanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      if (spinnerTimeout.current !== null) {
        window.clearTimeout(spinnerTimeout.current);
        spinnerTimeout.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isPending) {
      return;
    }
    if (!showSpinner) {
      return;
    }
    if (spinnerTimeout.current !== null) {
      window.clearTimeout(spinnerTimeout.current);
    }
    spinnerTimeout.current = window.setTimeout(() => {
      setShowSpinner(false);
      spinnerTimeout.current = null;
    }, 150);
  }, [isPending, showSpinner]);

  const themeOptions = useMemo(() => {
    const seen = new Set<string>();
    const ordered: string[] = [];

    for (const game of games) {
      if (!Array.isArray(game.themes)) {
        continue;
      }
      for (const theme of game.themes) {
        if (typeof theme !== "string") {
          continue;
        }
        const trimmed = theme.trim();
        if (trimmed.length === 0 || seen.has(trimmed)) {
          continue;
        }
        seen.add(trimmed);
        ordered.push(trimmed);
      }
    }

    return ordered;
  }, [games]);

  const initialFilters = useMemo(() => {
    if (initialFiltersRef.current) {
      return initialFiltersRef.current;
    }
    const parsed = parseFiltersFromSearchParams(
      new URLSearchParams(searchParamsString),
      themeOptions
    );
    initialFiltersRef.current = parsed;
    return parsed;
  }, [searchParamsString, themeOptions]);

  const [filters, setFilters] = useState<GameFilters>(initialFilters);

  const normalizedFilters = useMemo(
    () => ({
      ...filters,
      themes: filters.themes && filters.themes.length > 0 ? filters.themes : null,
    }),
    [filters]
  );

  const filteredGames = useMemo(
    () => filterGames(games, normalizedFilters),
    [games, normalizedFilters]
  );

  useEffect(() => {
    if (!didSyncRef.current) {
      didSyncRef.current = true;
      return;
    }
    const params = serializeFiltersToSearchParams(filters, themeOptions);
    const nextQuery = params.toString();
    const nextUrl = nextQuery.length > 0 ? `${pathname}?${nextQuery}` : pathname;
    const currentQuery = searchParamsString;
    const currentUrl =
      currentQuery.length > 0 ? `${pathname}?${currentQuery}` : pathname;

    if (nextUrl !== currentUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [filters, pathname, router, searchParamsString, themeOptions]);

  function startFiltering(update: (prev: GameFilters) => GameFilters) {
    setShowSpinner(true);
    startTransition(() => {
      setFilters((prev) => normalizeFilters(update(prev), themeOptions));
    });
  }

  function updatePriceMin(value: string) {
    const next = value === "" ? null : Number(value);
    startFiltering((prev) => ({
      ...prev,
      priceMin: Number.isFinite(next) ? next : null,
    }));
  }

  function updatePriceMax(value: string) {
    const next = value === "" ? null : Number(value);
    startFiltering((prev) => ({
      ...prev,
      priceMax: Number.isFinite(next) ? next : null,
    }));
  }

  function updateRatingMin(value: number) {
    startFiltering((prev) => ({
      ...prev,
      ratingMin: value,
    }));
  }

  function toggleTheme(theme: string) {
    startFiltering((prev) => {
      const selected = new Set(prev.themes ?? []);
      if (selected.has(theme)) {
        selected.delete(theme);
      } else {
        selected.add(theme);
      }
      const nextThemes = themeOptions.filter((option) => selected.has(option));
      return {
        ...prev,
        themes: nextThemes,
      };
    });
  }

  function clearFilters() {
    startFiltering(() => defaultFilters);
  }

  function focusFilters() {
    if (filtersPanelRef.current) {
      filtersPanelRef.current.scrollIntoView({ block: "start" });
    }
    const input = document.getElementById("price-min");
    if (input instanceof HTMLInputElement) {
      input.focus();
    }
  }

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 lg:px-6">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside
            ref={filtersPanelRef}
            id="filters-panel"
            className="space-y-6 rounded-3 border border-border bg-surface p-4"
          >
            <div className="space-y-4">
              <h2 className="text-600 font-600">Filtros</h2>

              <div className="space-y-2">
                <label className="text-500 font-600" htmlFor="price-min">
                  Precio
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-400 text-muted">Min (GTQ)</span>
                    <input
                      id="price-min"
                      type="number"
                      min={0}
                      inputMode="numeric"
                      className="w-full rounded-2 border border-border bg-elevated px-3 py-2 text-500 text-text"
                      value={filters.priceMin ?? ""}
                      onChange={(event) => updatePriceMin(event.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-400 text-muted">Max (GTQ)</span>
                    <input
                      id="price-max"
                      type="number"
                      min={0}
                      inputMode="numeric"
                      className="w-full rounded-2 border border-border bg-elevated px-3 py-2 text-500 text-text"
                      value={filters.priceMax ?? ""}
                      onChange={(event) => updatePriceMax(event.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span id="rating-label" className="text-500 font-600">
                  Rating
                </span>
                <div className="flex flex-wrap gap-2" aria-labelledby="rating-label">
                  {Array.from({ length: 6 }).map((_, index) => {
                    const isActive = filters.ratingMin === index;
                    return (
                      <button
                        key={`rating-${index}`}
                        type="button"
                        aria-pressed={isActive}
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full border text-500 font-600",
                          isActive
                            ? "border-transparent bg-accent text-white"
                            : "border-border bg-elevated text-muted"
                        )}
                        onClick={() => updateRatingMin(index)}
                      >
                        {index}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <span id="themes-label" className="text-500 font-600">
                  Temas ({filters.themes?.length ?? 0})
                </span>
                <div className="flex flex-wrap gap-2" aria-labelledby="themes-label">
                  {themeOptions.map((theme) => {
                    const isActive = filters.themes?.includes(theme) ?? false;
                    return (
                      <button
                        key={`theme-${theme}`}
                        type="button"
                        aria-pressed={isActive}
                        className={cn(
                          "rounded-full border px-3 py-1 text-500 font-600",
                          isActive
                            ? "border-transparent bg-accent text-white"
                            : "border-border bg-elevated text-muted"
                        )}
                        onClick={() => toggleTheme(theme)}
                      >
                        {theme}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <Button variant="secondary" onClick={clearFilters}>
              Limpiar filtros
            </Button>
          </aside>

          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <h1 className="text-800 font-700">Catálogo de juegos</h1>
                {showSpinner ? (
                  <span className="inline-flex items-center gap-2 text-400 text-muted">
                    <span
                      className="h-3 w-3 animate-spin rounded-full border-2 border-border border-t-accent"
                      aria-hidden="true"
                    />
                    Filtrando
                  </span>
                ) : null}
              </div>
            </div>

            {filteredGames.length === 0 ? (
              <EmptyState
                title="No hay resultados con estos filtros"
                description="Intenta ajustar los filtros para encontrar lo que buscas."
                actionLabel="Limpiar filtros"
                onAction={clearFilters}
                secondaryActionLabel="Ajustar filtros"
                onSecondaryAction={focusFilters}
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredGames.map((game) => (
                  <Link
                    key={game.id}
                    href={`/catalogo/${game.id}`}
                    className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                    aria-label={`Ver detalles de ${game.name}`}
                  >
                    <GameCard
                      id={game.id}
                      name={game.name}
                      imageSrc={game.image?.src ?? ""}
                      imageAlt={game.image?.alt ?? game.name}
                      priceAmount={game.price?.amount ?? 0}
                      priceCurrency={game.price?.currency ?? "GTQ"}
                      ratingValue={game.rating?.value ?? 0}
                      themes={Array.isArray(game.themes) ? game.themes : []}
                    />
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
