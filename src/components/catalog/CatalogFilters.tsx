import { formatPriceWithQ, formatThemeTag } from "@/lib/formatters";

type CatalogFiltersProps = {
  priceMin: number;
  priceMax: number;
  priceBoundMin: number;
  priceBoundMax: number;
  ratingMin: number;
  themes: string[];
  selectedThemes: string[];
  onPriceMinChange: (value: number) => void;
  onPriceMaxChange: (value: number) => void;
  onRatingDecrease: () => void;
  onRatingIncrease: () => void;
  onToggleTheme: (theme: string) => void;
  onClear: () => void;
  mode?: "desktop" | "mobile";
  panelId?: string;
  className?: string;
};

function toSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function CatalogFilters({
  priceMin,
  priceMax,
  priceBoundMin,
  priceBoundMax,
  ratingMin,
  themes,
  selectedThemes,
  onPriceMinChange,
  onPriceMaxChange,
  onRatingDecrease,
  onRatingIncrease,
  onToggleTheme,
  onClear,
  mode = "desktop",
  panelId,
  className,
}: CatalogFiltersProps) {
  const valueLabel = `${formatPriceWithQ(priceMin, 2)} - ${formatPriceWithQ(priceMax, 2)}`;
  const isMobile = mode === "mobile";
  const baseClass = isMobile
    ? "flex flex-col w-full bg-panel p-4"
    : "hidden lg:flex flex-col w-80 min-w-[320px] border-r border-border bg-panel p-6 sticky top-16 overflow-hidden";
  const resolvedPanelId = panelId ?? (isMobile ? undefined : "filters-panel");

  return (
    <aside
      id={resolvedPanelId}
      className={[baseClass, className].filter(Boolean).join(" ")}
    >
      <div className="mb-8">
        <h1 className="text-primary text-xl font-bold tracking-widest mb-1 break-all leading-tight">
          PARÁMETROS
        </h1>
        <p className="text-fg-muted text-xs font-mono border-l-2 border-primary/50 pl-2">
          {`// CONFIGURAR MATRIZ DE BÚSQUEDA`}
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-fg">
            <span className="material-symbols-outlined text-primary text-lg">
              currency_bitcoin
            </span>
            <span className="text-sm font-medium tracking-wide">RANGO_DE_PRECIO</span>
          </div>
          <div className="bg-panel p-4 border border-border rounded">
            <div className="flex justify-between text-xs text-primary font-mono mb-2">
              <span>MIN: {formatPriceWithQ(priceBoundMin, 0)}</span>
              <span>MAX: {formatPriceWithQ(priceBoundMax, 0)}</span>
            </div>
            <div className="relative h-6">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 rounded bg-border" />
              <input
                id="price-min"
                className="range-thumb absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 w-full z-10"
                type="range"
                min={priceBoundMin}
                max={priceBoundMax}
                step={1}
                value={priceMin}
                onChange={(event) => onPriceMinChange(Number(event.target.value))}
                aria-label="Precio mínimo"
              />
              <input
                id="price-max"
                className="range-thumb absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 w-full z-20"
                type="range"
                min={priceBoundMin}
                max={priceBoundMax}
                step={1}
                value={priceMax}
                onChange={(event) => onPriceMaxChange(Number(event.target.value))}
                aria-label="Precio máximo"
              />
            </div>
            <div className="mt-3 flex justify-between items-center border-t border-border pt-2">
              <span className="text-[10px] text-fg-muted uppercase">Valor_Entrada</span>
              <span className="text-primary font-mono font-bold">{valueLabel}</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-fg">
            <span className="material-symbols-outlined text-primary text-lg">grade</span>
            <span className="text-sm font-medium tracking-wide">VALORACIÓN_MÍNIMA</span>
          </div>
          <div className="flex items-center justify-between bg-panel border border-border rounded p-1">
            <button
              type="button"
              onClick={onRatingDecrease}
              className="size-10 flex items-center justify-center text-primary hover:bg-primary/20 rounded transition-colors"
              aria-label="Disminuir valoración mínima"
            >
              <span className="material-symbols-outlined">remove</span>
            </button>
            <div className="font-mono text-xl font-bold text-fg tracking-widest">
              {ratingMin.toFixed(1)}
            </div>
            <button
              type="button"
              onClick={onRatingIncrease}
              className="size-10 flex items-center justify-center text-primary hover:bg-primary/20 rounded transition-colors"
              aria-label="Aumentar valoración mínima"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-fg">
            <span className="material-symbols-outlined text-primary text-lg">category</span>
            <span className="text-sm font-medium tracking-wide">TEMÁTICAS</span>
          </div>
          <div className="space-y-2 pl-2 border-l border-border">
            {themes.map((theme) => {
              const slug = toSlug(theme);
              const checked = selectedThemes.includes(theme);
              return (
                <label
                  key={theme}
                  htmlFor={`theme-${slug}`}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative flex items-center">
                    <input
                      id={`theme-${slug}`}
                      className="peer h-4 w-4 appearance-none border border-border rounded-sm bg-transparent checked:bg-primary checked:border-primary transition-all"
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggleTheme(theme)}
                    />
                    <span className="material-symbols-outlined absolute text-black text-[14px] opacity-0 peer-checked:opacity-100 pointer-events-none">
                      check
                    </span>
                  </div>
                  <span className="text-sm text-fg-muted group-hover:text-primary transition-colors font-mono">
                    [{formatThemeTag(theme)}]
                  </span>
                </label>
              );
            })}
          </div>
        </div>
        <div className="mt-auto pt-8">
          <button
            type="button"
            onClick={onClear}
            className="w-full flex items-center justify-center gap-2 py-3 border border-primary text-primary hover:bg-primary hover:text-black font-bold text-sm tracking-wider uppercase transition-all duration-300"
          >
            <span className="material-symbols-outlined text-lg">restart_alt</span>
            [ REINICIAR_FILTROS ]
          </button>
        </div>
      </div>
    </aside>
  );
}
