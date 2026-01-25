"use client";

import { useMemo, useRef, useState, useTransition, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Game, Promotion, Sponsor } from "@/lib/dal";
import type { GameFilters } from "@/lib/filters/filterGames";
import { filterGames } from "@/lib/filters/filterGames";
import {
  normalizeFilters,
  parseFiltersFromSearchParams,
  serializeFiltersToSearchParams,
} from "@/lib/filters/urlFilters";
import { clampPage, getTotalPages, parsePageParam } from "@/lib/pagination";
import { excludePromotedGames, selectPromotedGames } from "@/lib/ads/ads";
import { GameCard } from "@/components/game/GameCard";
import { SponsorModule } from "@/components/ads/SponsorModule";
import { BrandsMarquee } from "@/components/ads/BrandsMarquee";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { CatalogPromotedCard } from "@/components/catalog/CatalogPromotedCard";
import { CatalogSkeletonCard } from "@/components/catalog/CatalogSkeletonCard";
import { CatalogEmptyState } from "@/components/catalog/CatalogEmptyState";

const defaultFilters: GameFilters = {
  priceMin: null,
  priceMax: null,
  ratingMin: 0,
  themes: [],
};

const ratingStep = 0.5;
const PAGE_SIZE = 9;

function toCountLabel(value: number) {
  return value.toLocaleString("es-GT");
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
  const initialFiltersRef = useRef<GameFilters | null>(null);
  const didSyncRef = useRef(false);
  const resetPageRef = useRef(false);
  const [isPending, startTransition] = useTransition();

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

  const priceBounds = useMemo(() => {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    for (const game of games) {
      const amount = game.price?.amount;
      if (typeof amount !== "number" || !Number.isFinite(amount)) {
        continue;
      }
      min = Math.min(min, amount);
      max = Math.max(max, amount);
    }

    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      return { min: 0, max: 0 };
    }

    return { min: Math.floor(min), max: Math.ceil(max) };
  }, [games]);

  const gamesById = useMemo(() => {
    const entries: Array<[string, Game]> = games.map((game) => [game.id, game]);
    return new Map(entries);
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
  const [isFiltersOpen, setFiltersOpen] = useState(false);

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

  const totalPages = useMemo(
    () => getTotalPages(baseGames.length, PAGE_SIZE),
    [baseGames.length]
  );

  const currentPage = useMemo(() => {
    const pageParam = parsePageParam(
      new URLSearchParams(searchParamsString).get("page")
    );
    return clampPage(pageParam, totalPages);
  }, [searchParamsString, totalPages]);

  const pagedGames = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return baseGames.slice(startIndex, startIndex + PAGE_SIZE);
  }, [baseGames, currentPage]);

  const hasSponsor = sponsors.length > 0;
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;
  const showPromotedBlocks = currentPage === 1;
  const ratingMin = typeof filters.ratingMin === "number" ? filters.ratingMin : 0;
  const priceMinValue = filters.priceMin ?? priceBounds.min;
  const priceMaxValue = filters.priceMax ?? priceBounds.max;

  useEffect(() => {
    if (!didSyncRef.current) {
      didSyncRef.current = true;
      return;
    }
    const params = serializeFiltersToSearchParams(filters, themeOptions);
    const nextPage = resetPageRef.current ? 1 : currentPage;
    resetPageRef.current = false;
    if (nextPage > 1) {
      params.set("page", String(nextPage));
    }
    const nextQuery = params.toString();
    const nextUrl = nextQuery.length > 0 ? `${pathname}?${nextQuery}` : pathname;
    const currentQuery = searchParamsString;
    const currentUrl =
      currentQuery.length > 0 ? `${pathname}?${currentQuery}` : pathname;

    if (nextUrl !== currentUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [currentPage, filters, pathname, router, searchParamsString, themeOptions]);

  useEffect(() => {
    if (!isFiltersOpen) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFiltersOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isFiltersOpen]);

  function startFiltering(update: (prev: GameFilters) => GameFilters) {
    startTransition(() => {
      resetPageRef.current = true;
      setFilters((prev) => normalizeFilters(update(prev), themeOptions));
    });
  }

  function goToPage(nextPage: number) {
    const clamped = clampPage(nextPage, totalPages);
    if (clamped === currentPage) {
      return;
    }
    const params = serializeFiltersToSearchParams(filters, themeOptions);
    if (clamped > 1) {
      params.set("page", String(clamped));
    }
    const nextQuery = params.toString();
    const nextUrl = nextQuery.length > 0 ? `${pathname}?${nextQuery}` : pathname;
    startTransition(() => {
      router.replace(nextUrl, { scroll: false });
    });
  }

  function updatePriceMinValue(value: number) {
    startFiltering((prev) => {
      const currentMax =
        typeof prev.priceMax === "number" ? prev.priceMax : priceBounds.max;
      return {
        ...prev,
        priceMin: Math.min(value, currentMax),
      };
    });
  }

  function updatePriceMaxValue(value: number) {
    startFiltering((prev) => {
      const currentMin =
        typeof prev.priceMin === "number" ? prev.priceMin : priceBounds.min;
      return {
        ...prev,
        priceMax: Math.max(value, currentMin),
      };
    });
  }

  function increaseRating() {
    const next = Math.min(5, ratingMin + ratingStep);
    startFiltering((prev) => ({ ...prev, ratingMin: next }));
  }

  function decreaseRating() {
    const next = Math.max(0, ratingMin - ratingStep);
    startFiltering((prev) => ({ ...prev, ratingMin: next }));
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

  function openFilters() {
    setFiltersOpen(true);
  }

  function closeFilters() {
    setFiltersOpen(false);
  }

  function focusFilters() {
    if (typeof window !== "undefined") {
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;
      if (isMobile) {
        openFilters();
        return;
      }
    }
    const panel = document.getElementById("filters-panel");
    if (panel) {
      panel.scrollIntoView({ block: "start" });
    }
  }

  return (
    <div className="bg-background-dark text-white font-display overflow-x-hidden selection:bg-primary selection:text-black min-h-screen flex flex-col">
      <div className="scanlines fixed inset-0 z-50 opacity-20 h-full w-full" />
      <div className="flex flex-1 relative max-w-[1920px] mx-auto w-full">
        <CatalogFilters
          priceMin={priceMinValue}
          priceMax={priceMaxValue}
          priceBoundMin={priceBounds.min}
          priceBoundMax={priceBounds.max}
          ratingMin={ratingMin}
          themes={themeOptions}
          selectedThemes={filters.themes ?? []}
          onPriceMinChange={updatePriceMinValue}
          onPriceMaxChange={updatePriceMaxValue}
          onRatingDecrease={decreaseRating}
          onRatingIncrease={increaseRating}
          onToggleTheme={toggleTheme}
          onClear={clearFilters}
        />
        {isFiltersOpen ? (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/70 animate-fade-in"
              aria-label="Cerrar filtros"
              onClick={closeFilters}
            />
            <div
              id="filters-drawer"
              role="dialog"
              aria-modal="true"
              className="absolute top-0 left-0 h-full w-[85%] max-w-[360px] overflow-y-auto border-r border-primary/40 bg-[#181611] shadow-[10px_0_30px_rgba(0,0,0,0.6)] animate-slide-in-left"
            >
              <div className="flex items-center justify-between px-4 pt-4">
                <div className="text-primary font-bold tracking-widest uppercase text-sm">
                  FILTROS
                </div>
                <button
                  type="button"
                  className="text-primary"
                  aria-label="Cerrar filtros"
                  onClick={closeFilters}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <CatalogFilters
                mode="mobile"
                panelId="filters-panel-mobile"
                priceMin={priceMinValue}
                priceMax={priceMaxValue}
                priceBoundMin={priceBounds.min}
                priceBoundMax={priceBounds.max}
                ratingMin={ratingMin}
                themes={themeOptions}
                selectedThemes={filters.themes ?? []}
                onPriceMinChange={updatePriceMinValue}
                onPriceMaxChange={updatePriceMaxValue}
                onRatingDecrease={decreaseRating}
                onRatingIncrease={increaseRating}
                onToggleTheme={toggleTheme}
                onClear={clearFilters}
                className="pt-2"
              />
            </div>
          </div>
        ) : null}
        <main className="flex-1 min-w-0 px-3 py-6 sm:px-4 lg:p-10 flex flex-col min-h-screen">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 border-b border-[#393328] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-1">
                <span>RAÍZ</span>
                <span className="material-symbols-outlined text-[10px]">
                  chevron_right
                </span>
                <span>ARCHIVO_BD</span>
                <span className="material-symbols-outlined text-[10px]">
                  chevron_right
                </span>
                <span className="text-primary">SECTOR_07</span>
              </div>
              <h1 className="text-3xl font-bold text-white uppercase tracking-tight">
                Base de Datos de Juegos
              </h1>
            </div>
            <div className="flex items-center gap-4 text-sm font-mono text-[#bab09c]">
              <span>ENCONTRADOS: {toCountLabel(filteredGames.length)} REGISTROS</span>
              <span className="hidden sm:inline"></span>
                            <button
                type="button"
                className="lg:hidden ml-auto px-3 py-1 border border-primary text-primary text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-colors"
                aria-controls="filters-drawer"
                aria-expanded={isFiltersOpen}
                onClick={openFilters}
              >
                FILTRAR
              </button>
            </div>
          </div>
          <div className="mb-8 w-full max-w-full overflow-hidden">
            <BrandsMarquee sponsors={sponsors} />
          </div>
          {filteredGames.length === 0 ? (
            <CatalogEmptyState onClear={clearFilters} onFocus={focusFilters} />
          ) : (
            <>
              <div className="catalog-grid grid w-full max-w-full gap-3 sm:gap-6 mb-6 sm:mb-8 lg:[grid-auto-rows:1fr]">
                {showPromotedBlocks
                  ? promotedGames.map(({ game }) => (
                      <Link
                        key={`promo-${game.id}`}
                        href={`/catalogo/${game.id}`}
                        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 col-span-full sm:col-auto lg:col-auto h-full"
                        aria-label={`Ver detalles de ${game.name}`}
                      >
                        <CatalogPromotedCard game={game} />
                      </Link>
                    ))
                  : null}
                {pagedGames.map((game, index) => (
                  <Link
                    key={game.id}
                    href={`/catalogo/${game.id}`}
                    className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 h-full"
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
                      badgeSlot={
                        <span className="px-2 py-1 bg-black/80 border border-primary text-primary text-[10px] font-bold tracking-wider uppercase">
                          Rango #{index + 1 + (currentPage - 1) * PAGE_SIZE}
                        </span>
                      }
                    />
                  </Link>
                ))}
                {showPromotedBlocks && hasSponsor ? (
                  <div className="col-span-full sm:col-auto lg:col-auto h-full">
                    <SponsorModule sponsors={sponsors} />
                  </div>
                ) : null}
                <CatalogSkeletonCard />
                <CatalogSkeletonCard className="hidden md:flex" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6 mb-10 sm:mb-12">
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#bab09c]">
                  Página {currentPage} de {totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 border border-primary text-primary text-xs font-bold uppercase tracking-widest transition-colors hover:bg-primary hover:text-black disabled:opacity-40 disabled:cursor-not-allowed"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={!hasPrevPage}
                    aria-disabled={!hasPrevPage}
                  >
                    Anterior
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 border border-primary text-primary text-xs font-bold uppercase tracking-widest transition-colors hover:bg-primary hover:text-black disabled:opacity-40 disabled:cursor-not-allowed"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={!hasNextPage}
                    aria-disabled={!hasNextPage}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </>
          )}
          <div className="mt-auto flex justify-center pb-8 px-3 sm:px-0">
            <button className="relative group w-full max-w-[520px] px-6 sm:px-8 py-3 bg-transparent border border-primary text-primary font-bold tracking-widest uppercase overflow-hidden hover:text-black transition-colors duration-300">
              <span className="absolute inset-0 w-full h-full bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
              <span className="relative flex items-center justify-center gap-2 w-full">
                [ EJECUTAR_SIGUIENTE_LOTE ]
                <span className="material-symbols-outlined animate-bounce">
                  keyboard_double_arrow_down
                </span>
              </span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
