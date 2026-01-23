"use client";

import { useEffect, useMemo, useRef, useState, useTransition, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Game, Promotion, Sponsor } from "@/lib/dal";
import type { GameFilters } from "@/lib/filters/filterGames";
import { filterGames } from "@/lib/filters/filterGames";
import {
  normalizeFilters,
  parseFiltersFromSearchParams,
  serializeFiltersToSearchParams,
} from "@/lib/filters/urlFilters";
import { excludePromotedGames, selectPromotedGames } from "@/lib/ads/ads";
import Link from "next/link";
import { GameCard } from "@/components/game/GameCard";
import { PromotedSection } from "@/components/ads/PromotedSection";
import { SponsorModule } from "@/components/ads/SponsorModule";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
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

// Icons for mobile drawer
function FilterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function CatalogClient({
  games,
  promotions,
  sponsors,
}: {
  games: Game[];
  promotions: Promotion[];
  sponsors: Sponsor[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const didSyncRef = useRef(false);
  const [isPending, startTransition] = useTransition();
  const [showSpinner, setShowSpinner] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
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

  const gamesById = useMemo(() => {
    const entries: Array<[string, Game]> = games.map((game) => [game.id, game]);
    return new Map(entries);
  }, [games]);

  const initialFilters = useMemo(() => {
    return parseFiltersFromSearchParams(
      new URLSearchParams(searchParamsString),
      themeOptions
    );
  }, [searchParamsString, themeOptions]);

  const [filters, setFilters] = useState<GameFilters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

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

  const promotedGames = useMemo(
    () => selectPromotedGames(promotions, gamesById, normalizedFilters),
    [promotions, gamesById, normalizedFilters]
  );

  const baseGames = useMemo(
    () => excludePromotedGames(filteredGames, promotedGames),
    [filteredGames, promotedGames]
  );

  // Pagination
  const totalPages = Math.ceil(baseGames.length / ITEMS_PER_PAGE);
  const paginatedGames = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return baseGames.slice(start, start + ITEMS_PER_PAGE);
  }, [baseGames, currentPage]);

  const hasSponsor = sponsors.length > 0;

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
    setCurrentPage(1); // Reset to page 1 when filters change
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

  const openMobileDrawer = useCallback(() => {
    setIsMobileDrawerOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeMobileDrawer = useCallback(() => {
    setIsMobileDrawerOpen(false);
    document.body.style.overflow = "";
  }, []);

  // Count active filters for badge
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.priceMin !== null) count++;
    if (filters.priceMax !== null) count++;
    if ((filters.ratingMin ?? 0) > 0) count++;
    if (filters.themes && filters.themes.length > 0) count += filters.themes.length;
    return count;
  }, [filters]);

  // Close drawer on escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape" && isMobileDrawerOpen) {
        closeMobileDrawer();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileDrawerOpen, closeMobileDrawer]);

  // Filters panel content (reused in both desktop and mobile)
  const filtersContent = (
    <div className="space-y-4">
      <div className="space-y-3">
        <label className="text-500 font-600" htmlFor="price-min">
          Precio (GTQ)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            id="price-min"
            type="number"
            min={0}
            placeholder="Min"
            inputMode="numeric"
            className="w-full rounded-2 border border-border bg-elevated px-3 py-2 text-500 text-text placeholder:text-muted focus:border-accent focus:outline-none"
            value={filters.priceMin ?? ""}
            onChange={(event) => updatePriceMin(event.target.value)}
          />
          <input
            id="price-max"
            type="number"
            min={0}
            placeholder="Max"
            inputMode="numeric"
            className="w-full rounded-2 border border-border bg-elevated px-3 py-2 text-500 text-text placeholder:text-muted focus:border-accent focus:outline-none"
            value={filters.priceMax ?? ""}
            onChange={(event) => updatePriceMax(event.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {[50, 100, 200, 500].map((price) => (
            <button
              key={`quick-price-${price}`}
              type="button"
              className="rounded-full border border-border bg-elevated px-3 py-1 text-400 font-600 text-muted transition-all duration-200 hover:border-accent hover:text-accent hover:-translate-y-0.5"
              onClick={() => {
                startFiltering((prev) => ({ ...prev, priceMax: price }));
              }}
            >
              ≤{price}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <span id="rating-label" className="text-500 font-600">
          Rating minimo
        </span>
        <div className="flex items-center gap-1" aria-labelledby="rating-label">
          {Array.from({ length: 5 }).map((_, index) => {
            const starValue = index + 1;
            const isActive = (filters.ratingMin ?? 0) >= starValue;
            return (
              <button
                key={`rating-star-${index}`}
                type="button"
                aria-label={`Filtrar por rating minimo ${starValue} estrellas`}
                className="transition-all duration-200 hover:scale-110"
                onClick={() => updateRatingMin(starValue)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill={isActive ? "currentColor" : "none"}
                  className={cn(
                    "h-6 w-6",
                    isActive ? "text-accent" : "text-border"
                  )}
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </button>
            );
          })}
          {(filters.ratingMin ?? 0) > 0 && (
            <button
              type="button"
              className="ml-2 text-400 text-muted hover:text-accent transition-colors"
              onClick={() => updateRatingMin(0)}
            >
              Limpiar
            </button>
          )}
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
                  "rounded-full border px-3 py-1 text-500 font-600 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0",
                  isActive
                    ? "border-transparent bg-accent text-white"
                    : "border-border bg-elevated text-muted hover:border-accent hover:text-accent"
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
  );

  return (
    <main className="min-h-screen bg-bg text-text">
      {/* Mobile Drawer Overlay */}
      {isMobileDrawerOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden"
          aria-modal="true"
          role="dialog"
          aria-label="Filtros"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
            onClick={closeMobileDrawer}
          />
          {/* Drawer */}
          <div className="absolute inset-y-0 left-0 w-full max-w-xs transform bg-surface shadow-xl transition-transform">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <h2 className="text-600 font-700">Filtros</h2>
                <button
                  type="button"
                  onClick={closeMobileDrawer}
                  className="rounded-2 p-2 text-muted transition-colors hover:bg-elevated hover:text-text"
                  aria-label="Cerrar filtros"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {filtersContent}
              </div>
              {/* Footer */}
              <div className="border-t border-border p-4 space-y-3">
                <Button 
                  onClick={() => {
                    clearFilters();
                    closeMobileDrawer();
                  }}
                  variant="secondary"
                  className="w-full bg-accent/10 border-accent/40 text-accent hover:bg-accent/20"
                >
                  Limpiar todo
                </Button>
                <Button 
                  onClick={closeMobileDrawer}
                  className="w-full"
                >
                  Ver {filteredGames.length} juegos
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-6 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Desktop Filters Sidebar */}
          <aside
            ref={filtersPanelRef}
            id="filters-panel"
            className="hidden lg:block space-y-6 rounded-3 border border-border bg-surface/90 p-5 shadow-[0_18px_40px_rgba(7,11,18,0.35)]"
          >
            <h2 className="text-600 font-600">Filtros</h2>
            {filtersContent}
            <Button 
              variant="secondary" 
              onClick={clearFilters}
              className="w-full bg-accent/10 border-accent/40 text-accent hover:bg-accent/20 font-600"
            >
              Limpiar todo
            </Button>
          </aside>

          <section className="space-y-6">
            {/* Mobile Filter Button */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={openMobileDrawer}
                className="inline-flex items-center gap-2 rounded-2 border border-border bg-surface px-4 py-2 text-500 font-600 text-text transition-all duration-200 hover:border-accent hover:text-accent"
              >
                <FilterIcon className="h-4 w-4" />
                Filtros
                {activeFilterCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-400 font-700 text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <h1 className="text-800 font-700">La Boveda</h1>
                {showSpinner ? (
                  <span className="inline-flex items-center gap-2 text-400 text-muted">
                    <span
                      className="h-3 w-3 animate-spin rounded-full border-2 border-border border-t-accent"
                      aria-hidden="true"
                    />
                    Buscando...
                  </span>
                ) : (
                  <span className="text-500 text-muted">
                    {filteredGames.length} {filteredGames.length === 1 ? "juego" : "juegos"}
                  </span>
                )}
              </div>
            </div>

            <PromotedSection
              promotions={promotions}
              gamesById={gamesById}
              filters={normalizedFilters}
            />

            {hasSponsor ? (
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px]">
                <div>
                  {filteredGames.length === 0 ? (
                    <EmptyState
                      title="La boveda esta vacia"
                      actionLabel="Limpiar filtros"
                      onAction={clearFilters}
                      secondaryActionLabel="Ajustar busqueda"
                      onSecondaryAction={focusFilters}
                    />
                  ) : (
                    <>
                      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {paginatedGames.map((game) => (
                          <Link
                            key={game.id}
                            href={`/catalogo/${encodeURIComponent(game.id)}`}
                            className="block focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
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
                      {totalPages > 1 && (
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={setCurrentPage}
                        />
                      )}
                    </>
                  )}
                </div>
                <SponsorModule sponsors={sponsors} />
              </div>
            ) : filteredGames.length === 0 ? (
              <EmptyState
                title="La boveda esta vacia"
                actionLabel="Limpiar filtros"
                onAction={clearFilters}
                secondaryActionLabel="Ajustar busqueda"
                onSecondaryAction={focusFilters}
              />
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {paginatedGames.map((game) => (
                    <Link
                      key={game.id}
                      href={`/catalogo/${encodeURIComponent(game.id)}`}
                      className="block focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
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
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
