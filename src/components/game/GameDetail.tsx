import Image from "next/image";
import type { Game } from "@/lib/dal";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { BuyButton } from "@/components/game/BuyButton";
import { BackToCatalog } from "@/components/nav/BackToCatalog";

type SearchParams = Record<string, string | string[] | undefined>;

function formatPrice(amount: number) {
  if (!Number.isFinite(amount)) {
    return "--";
  }
  return amount.toFixed(0);
}

function formatRange(min?: number, max?: number) {
  if (typeof min !== "number") {
    return null;
  }
  if (typeof max === "number" && max !== min) {
    return `${min}-${max}`;
  }
  return `${min}`;
}

// SVG Icons for quick info
function PlayersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <circle cx="17" cy="10" r="2.5" />
      <path d="M21 21v-1.5a3 3 0 0 0-3-3h-1" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function AgeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="5" />
      <path d="M12 13v8" />
      <path d="M9 18h6" />
    </svg>
  );
}

function ComplexityIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <rect x="3" y="14" width="4" height="7" rx="1" />
      <rect x="10" y="10" width="4" height="11" rx="1" />
      <rect x="17" y="6" width="4" height="15" rx="1" />
    </svg>
  );
}

export function GameDetail({
  game,
  searchParams,
}: {
  game: Game;
  searchParams?: SearchParams;
}) {
  const priceLabel = `${formatPrice(game.price?.amount ?? 0)} ${
    game.price?.currency ?? "GTQ"
  }`;
  const playersLabel = formatRange(game.players?.min, game.players?.max);
  const durationLabel = formatRange(
    game.durationMinutes?.min,
    game.durationMinutes?.max
  );
  const ageLabel = game.age?.min ? `${game.age.min}+` : null;
  const complexityLabel =
    typeof game.complexity === "number" ? `${game.complexity}/5` : null;

  const quickInfo = [
    { icon: PlayersIcon, label: "Jugadores", value: playersLabel },
    { icon: ClockIcon, label: "Duracion", value: durationLabel ? `${durationLabel} min` : null },
    { icon: AgeIcon, label: "Edad", value: ageLabel },
    { icon: ComplexityIcon, label: "Complejidad", value: complexityLabel },
  ].filter(item => item.value !== null);

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 lg:px-6 lg:py-10">
        <BackToCatalog searchParams={searchParams} />

        <section className="mt-5 rounded-3 border border-border bg-surface p-4 shadow-[0_18px_36px_rgba(6,10,18,0.35)] lg:p-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column - Image */}
            <div className="relative overflow-hidden rounded-3 border border-border bg-elevated">
              <div className="relative aspect-[4/3] w-full">
                {game.image?.src ? (
                  <Image
                    src={game.image.src}
                    alt={game.image.alt ?? game.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface to-elevated">
                    <svg viewBox="0 0 64 64" className="h-16 w-16 text-muted/40" aria-hidden="true">
                      <rect x="8" y="12" width="48" height="40" rx="4" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />
                      <circle cx="24" cy="28" r="6" fill="currentColor" fillOpacity="0.5" />
                      <path d="M8 44l16-12 12 8 20-16v24a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V44z" fill="currentColor" fillOpacity="0.4" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Info */}
            <div className="flex flex-col gap-5">
              {/* Title & Price */}
              <div>
                <h1 className="text-800 font-700 text-text leading-tight">{game.name}</h1>
                <p className="mt-1 text-700 font-700 text-accent">{priceLabel}</p>
              </div>

              {/* Rating - Prominent */}
              <div className="flex items-center gap-3 rounded-2 border border-border bg-elevated/50 px-4 py-3">
                <Rating
                  value={game.rating?.value ?? 0}
                  size="lg"
                  ariaLabel={`Rating ${game.rating?.value ?? 0} de 5`}
                />
                <span className="text-700 font-700 text-text">
                  {(game.rating?.value ?? 0).toFixed(1)}
                </span>
                <span className="text-500 text-muted">/ 5</span>
              </div>

              {/* Quick Info Grid */}
              {quickInfo.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {quickInfo.map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 rounded-2 border border-border bg-elevated/30 px-3 py-2"
                    >
                      <Icon className="h-5 w-5 text-accent" />
                      <div>
                        <p className="text-400 text-muted">{label}</p>
                        <p className="text-500 font-600 text-text">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Themes */}
              {Array.isArray(game.themes) && game.themes.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {game.themes.map((theme) => (
                    <Badge key={theme} variant="neutral">
                      {theme}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Mechanics */}
              {Array.isArray(game.mechanics) && game.mechanics.length > 0 && (
                <div className="space-y-2">
                  <span className="text-500 font-600 text-muted">Mecanicas</span>
                  <div className="flex flex-wrap gap-2">
                    {game.mechanics.map((mechanic) => (
                      <span
                        key={mechanic}
                        className="rounded-full border border-border/50 bg-surface px-3 py-1 text-400 text-muted"
                      >
                        {mechanic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Buy Button */}
              <div className="mt-auto pt-2">
                <BuyButton purchaseUrl={game.purchaseUrl} />
              </div>
            </div>
          </div>
        </section>

        {/* Description Section */}
        {game.shortDescription && (
          <section className="mt-6 rounded-3 border border-border bg-surface p-4 shadow-[0_18px_36px_rgba(6,10,18,0.35)] lg:p-6">
            <h2 className="text-700 font-700 text-text">Descripcion</h2>
            <p className="mt-3 text-500 leading-relaxed text-muted">
              {game.shortDescription}
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
