import type { Game } from "@/lib/dal";
import { BuyButton } from "@/components/game/BuyButton";
import { BackToCatalog } from "@/components/nav/BackToCatalog";
import {
  RATING_MAX,
  formatPriceWithQ,
  formatRatingFiveScale,
  formatThemeLabel,
} from "@/lib/formatters";

type SearchParams = Record<string, string | string[] | undefined>;

function formatRange(min?: number, max?: number) {
  if (typeof min !== "number") {
    return null;
  }
  if (typeof max === "number" && max !== min) {
    return `${min}-${max}`;
  }
  return `${min}`;
}

function buildSystemId(gameId: string) {
  const cleaned = gameId.toUpperCase().replace(/[^A-Z0-9]+/g, "-");
  return `#${cleaned}`;
}

function getStarIcons(value: number) {
  const clamped = Math.max(0, Math.min(RATING_MAX, value));
  const rounded = Math.round(clamped * 2) / 2;
  const full = Math.floor(rounded);
  const hasHalf = rounded - full >= 0.5;
  const icons: Array<{ icon: string; className: string }> = [];

  for (let index = 0; index < full; index += 1) {
    icons.push({ icon: "star", className: "text-primary/80 icon-filled" });
  }
  if (hasHalf) {
    icons.push({ icon: "star_half", className: "text-primary/80 icon-filled" });
  }
  while (icons.length < RATING_MAX) {
    icons.push({ icon: "star", className: "text-primary/20 icon-outline" });
  }

  return icons.slice(0, RATING_MAX);
}

export function GameDetail({
  game,
  searchParams,
}: {
  game: Game;
  searchParams?: SearchParams;
}) {
  const priceLabel = formatPriceWithQ(game.price?.amount ?? 0, 2);
  const playersLabel = formatRange(game.players?.min, game.players?.max);
  const durationLabel = formatRange(
    game.durationMinutes?.min,
    game.durationMinutes?.max
  );
  const ageLabel = game.age?.min ? `${game.age.min}+` : null;
  const complexityLabel =
    typeof game.complexity === "number" ? `${game.complexity}` : null;
  const systemId = buildSystemId(game.id);
  const ratingValue = game.rating?.value ?? 0;
  const mechanicsLabel = Array.isArray(game.mechanics)
    ? game.mechanics.join(", ")
    : null;
  const summaryPrimary = game.shortDescription;
  const summarySecondary = mechanicsLabel
    ? `> SUB-RUTINA: Mecánicas clave: ${mechanicsLabel}.`
    : "> SUB-RUTINA: Archivo de datos listo para despliegue.";
  const imageSrc = game.image?.src;
  const imageAlt = game.image?.alt ?? game.name;

  return (
    <div className="bg-bg text-fg min-h-screen flex flex-col font-display overflow-x-hidden selection:bg-selection selection:text-selection-fg relative">
      <div className="scanlines fixed inset-0 z-0 opacity-20 h-full w-full" />
      <main className="flex-grow flex flex-col items-center py-6 px-4 sm:px-8 relative">
        <div className="w-full max-w-[1280px] flex flex-col gap-6 relative z-10">
          <div className="flex items-center gap-2 py-2 animate-fade-up anim-delay-1">
            <BackToCatalog searchParams={searchParams} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 flex flex-col gap-4 animate-fade-up anim-delay-2">
              <div className="relative w-full aspect-square rounded-lg border-2 border-primary/20 bg-panel overflow-hidden group anim-float">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary z-20" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary z-20" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary z-20" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary z-20" />
                <div className="absolute inset-2 overflow-hidden bg-bg">
                  {imageSrc ? (
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${imageSrc}')` }}
                      role="img"
                      aria-label={imageAlt}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary/60 text-sm font-mono">
                      IMAGEN_NO_DISPONIBLE
                    </div>
                  )}
                </div>
                <div className="absolute bottom-6 right-6 text-primary text-xs font-mono tracking-widest bg-panel/80 px-2 py-1 border border-primary/30">
                  ESCANEO_DE_IMAGEN
                </div>
              </div>
              <div className="flex justify-between text-xs font-mono text-primary/50 uppercase">
                <span>Res: 4096x4096</span>
                <span>Fuente: Archivo_Profundo_03</span>
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="border-b border-primary/20 pb-6 relative animate-fade-up anim-delay-3">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-ink tracking-widest anim-flicker-soft">
                    CLASIFICADO
                  </span>
                  <span className="text-primary/60 text-xs font-mono tracking-wider">
                    ID: {systemId}
                  </span>
                </div>
                <h1 className="text-primary text-4xl md:text-5xl font-bold uppercase tracking-tight text-glow mb-2 leading-none">
                  {game.name}
                </h1>
                <p className="text-primary/70 text-lg font-normal font-mono">
                  // ARCHIVO_{game.name.toUpperCase().replaceAll(" ", "_")}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-up anim-delay-4">
                <div className="flex flex-col p-4 rounded bg-primary/5 border border-primary/20 relative group hover:bg-primary/10 transition-colors">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/30 group-hover:bg-primary transition-colors" />
                  <span className="text-xs font-mono text-primary/60 mb-1">
                    COSTO_EN_CREDITOS
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-primary">{priceLabel}</span>
                    <span className="text-xs text-primary/40">
                      {game.price?.currency ?? "GTQ"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col p-4 rounded bg-primary/5 border border-primary/20 relative group hover:bg-primary/10 transition-colors">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/30 group-hover:bg-primary transition-colors" />
                  <span className="text-xs font-mono text-primary/60 mb-1">
                    VALORACIÓN
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">
                      {formatRatingFiveScale(ratingValue)}
                    </span>
                    <span className="text-xs text-primary/50">/5</span>
                    <div className="flex text-primary/80">
                      {getStarIcons(ratingValue).map((entry, index) => (
                        <span
                          key={`${entry.icon}-${index}`}
                          className={`material-symbols-outlined text-sm ${entry.className}`}
                        >
                          {entry.icon}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col p-4 rounded bg-primary/5 border border-primary/20 relative group hover:bg-primary/10 transition-colors">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/30 group-hover:bg-primary transition-colors" />
                  <span className="text-xs font-mono text-primary/60 mb-1">
                    JUGADORES
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">
                      {playersLabel ?? "--"}
                    </span>
                    <span className="material-symbols-outlined text-primary/60">group</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 animate-fade-up anim-delay-5">
                {Array.isArray(game.themes)
                  ? game.themes.map((theme) => (
                      <span
                        key={theme}
                        className="px-3 py-1 rounded border border-primary/40 text-primary text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-ink cursor-default transition-colors"
                      >
                        {formatThemeLabel(theme)}
                      </span>
                    ))
                  : null}
              </div>
              <div className="flex flex-col gap-2 p-6 rounded-lg border border-dashed border-primary/30 bg-panel/70 animate-fade-up anim-delay-6">
                <div className="flex items-center gap-2 mb-2 border-b border-primary/10 pb-2">
                  <span className="material-symbols-outlined text-primary/50 text-base">
                    terminal
                  </span>
                  <h3 className="text-sm font-mono text-primary font-bold">
                    // RESUMEN_DE_DATOS
                  </h3>
                </div>
                <div className="text-primary/80 text-base leading-relaxed font-light">
                  <p className="mb-4">
                    [INICIANDO PROTOCOLO DE DESCRIPCIÓN] {summaryPrimary}
                  </p>
                  <p>{summarySecondary}</p>
                </div>
              </div>
              <div className="animate-fade-up anim-delay-6">
                <BuyButton purchaseUrl={game.purchaseUrl} />
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start animate-fade-up anim-delay-6">
                <span className="material-symbols-outlined text-primary/40 text-xs">
                  link
                </span>
                <p className="text-[10px] font-mono text-primary/40 uppercase tracking-widest">
                  Enlace seguro a nodo de vendedor externo
                </p>
              </div>
              {durationLabel || ageLabel || complexityLabel ? (
                <div className="text-xs font-mono text-primary/50 uppercase flex flex-wrap gap-4 animate-fade-up anim-delay-6">
                  {durationLabel ? <span>DURACIÓN: {durationLabel} MIN</span> : null}
                  {ageLabel ? <span>EDAD: {ageLabel}</span> : null}
                  {complexityLabel ? <span>COMPLEJIDAD: {complexityLabel}</span> : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>
      <div className="h-1 w-full bg-primary/20 mt-auto relative">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-primary" />
      </div>
    </div>
  );
}
