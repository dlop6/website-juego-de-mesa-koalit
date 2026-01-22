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
    typeof game.complexity === "number" ? `${game.complexity}` : null;

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 lg:px-6">
        <BackToCatalog searchParams={searchParams} />

        <section className="mt-4 rounded-3 border border-border bg-surface p-4 lg:p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="relative h-64 w-full overflow-hidden rounded-2 border border-border bg-elevated sm:h-72 lg:h-80">
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
                <div className="flex h-full w-full items-center justify-center text-500 text-muted">
                  Imagen no disponible
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-800 font-700 text-text">{game.name}</h1>
                  <p className="text-600 font-600 text-muted">{priceLabel}</p>
                </div>
                <Rating
                  value={game.rating?.value ?? 0}
                  showValue
                  ariaLabel={`Rating ${game.rating?.value ?? 0} de 5`}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {Array.isArray(game.themes)
                  ? game.themes.map((theme) => (
                      <Badge key={theme} variant="neutral">
                        {theme}
                      </Badge>
                    ))
                  : null}
              </div>

              <dl className="space-y-2 text-500 text-muted">
                {playersLabel ? (
                  <div className="flex items-center gap-2">
                    <dt className="font-600 text-text">Jugadores:</dt>
                    <dd>{playersLabel}</dd>
                  </div>
                ) : null}
                {durationLabel ? (
                  <div className="flex items-center gap-2">
                    <dt className="font-600 text-text">Duración:</dt>
                    <dd>{durationLabel} min</dd>
                  </div>
                ) : null}
                {ageLabel ? (
                  <div className="flex items-center gap-2">
                    <dt className="font-600 text-text">Edad:</dt>
                    <dd>{ageLabel}</dd>
                  </div>
                ) : null}
                {complexityLabel ? (
                  <div className="flex items-center gap-2">
                    <dt className="font-600 text-text">Complejidad:</dt>
                    <dd>{complexityLabel}</dd>
                  </div>
                ) : null}
              </dl>

              {Array.isArray(game.mechanics) && game.mechanics.length > 0 ? (
                <div className="space-y-2">
                  <span className="text-500 font-600 text-text">Mecánicas</span>
                  <div className="flex flex-wrap gap-2">
                    {game.mechanics.map((mechanic) => (
                      <Badge key={mechanic} variant="neutral">
                        {mechanic}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              <BuyButton purchaseUrl={game.purchaseUrl} />
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3 border border-border bg-surface p-4 lg:p-6">
          <h2 className="text-700 font-700 text-text">Descripción</h2>
          <p className="mt-2 text-500 text-muted">
            {game.shortDescription}
          </p>
        </section>
      </div>
    </main>
  );
}
