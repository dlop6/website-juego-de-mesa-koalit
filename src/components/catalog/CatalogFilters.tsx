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
}: CatalogFiltersProps) {
  const valueLabel = `${formatPriceWithQ(priceMin, 2)} - ${formatPriceWithQ(priceMax, 2)}`;

  return (
    <aside
      id="filters-panel"
      className="hidden lg:flex flex-col w-80 min-w-[320px] border-r border-[#393328] bg-[#181611] p-6 sticky top-16 overflow-hidden"
    >
      <div className="mb-8">
        <h1 className="text-primary text-xl font-bold tracking-widest mb-1">
          ENTRADA_DE_PARÁMETROS
        </h1>
        <p className="text-[#bab09c] text-xs font-mono border-l-2 border-primary/50 pl-2">
          // CONFIGURAR MATRIZ DE BÚSQUEDA
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white/90">
            <span className="material-symbols-outlined text-primary text-lg">
              currency_bitcoin
            </span>
            <span className="text-sm font-medium tracking-wide">RANGO_DE_PRECIO</span>
          </div>
          <div className="bg-surface-dark p-4 border border-[#393328] rounded">
            <div className="flex justify-between text-xs text-primary font-mono mb-2">
              <span>MIN: {formatPriceWithQ(priceBoundMin, 0)}</span>
              <span>MAX: {formatPriceWithQ(priceBoundMax, 0)}</span>
            </div>
            <div className="relative flex flex-col gap-3">
              <input
                id="price-min"
                className="w-full bg-transparent appearance-none"
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
                className="w-full bg-transparent appearance-none"
                type="range"
                min={priceBoundMin}
                max={priceBoundMax}
                step={1}
                value={priceMax}
                onChange={(event) => onPriceMaxChange(Number(event.target.value))}
                aria-label="Precio máximo"
              />
            </div>
            <div className="mt-3 flex justify-between items-center border-t border-[#393328] pt-2">
              <span className="text-[10px] text-gray-500 uppercase">Valor_Entrada</span>
              <span className="text-primary font-mono font-bold">{valueLabel}</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white/90">
            <span className="material-symbols-outlined text-primary text-lg">grade</span>
            <span className="text-sm font-medium tracking-wide">VALORACIÓN_MÍNIMA</span>
          </div>
          <div className="flex items-center justify-between bg-surface-dark border border-[#393328] rounded p-1">
            <button
              type="button"
              onClick={onRatingDecrease}
              className="size-10 flex items-center justify-center text-primary hover:bg-primary/20 rounded transition-colors"
              aria-label="Disminuir valoración mínima"
            >
              <span className="material-symbols-outlined">remove</span>
            </button>
            <div className="font-mono text-xl font-bold text-white tracking-widest">
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
          <div className="flex items-center gap-2 text-white/90">
            <span className="material-symbols-outlined text-primary text-lg">category</span>
            <span className="text-sm font-medium tracking-wide">TEMÁTICAS</span>
          </div>
          <div className="space-y-2 pl-2 border-l border-[#393328]">
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
                      className="peer h-4 w-4 appearance-none border border-[#544c3b] rounded-sm bg-transparent checked:bg-primary checked:border-primary transition-all"
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggleTheme(theme)}
                    />
                    <span className="material-symbols-outlined absolute text-black text-[14px] opacity-0 peer-checked:opacity-100 pointer-events-none">
                      check
                    </span>
                  </div>
                  <span className="text-sm text-[#bab09c] group-hover:text-primary transition-colors font-mono">
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
