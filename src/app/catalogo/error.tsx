

import { useRouter } from "next/navigation";
import { ErrorState } from "@/components/states/ErrorState";

export default function CatalogoError({ reset }: { reset: () => void }) {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 lg:px-6">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-6 rounded-3 border border-border bg-surface p-4">
            <div className="space-y-4">
              <h2 className="text-600 font-600">Filtros</h2>
              <div className="space-y-2">
                <span className="text-500 font-600">Precio</span>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    disabled
                    className="w-full rounded-2 border border-border bg-elevated px-3 py-2 text-500 text-muted"
                    placeholder="Min (GTQ)"
                  />
                  <input
                    disabled
                    className="w-full rounded-2 border border-border bg-elevated px-3 py-2 text-500 text-muted"
                    placeholder="Max (GTQ)"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-500 font-600">Rating</span>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <button
                      key={`rating-disabled-${index}`}
                      type="button"
                      disabled
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-elevated text-500 text-muted"
                    >
                      {index}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-500 font-600">Temas (0)</span>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={`theme-disabled-${index}`}
                      className="h-7 w-20 rounded-full border border-border bg-elevated"
                    />
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <section className="space-y-4">
            <ErrorState
              title="No pudimos cargar el catálogo."
              description="Por favor, verifica tu conexión o intenta de nuevo."
              onRetry={reset}
              secondaryActionLabel="Volver a inicio"
              onSecondaryAction={() => router.push("/")}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
