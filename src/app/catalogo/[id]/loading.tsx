export default function GameDetailLoading() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 lg:px-6">
        <div className="h-4 w-40 rounded-1 bg-border/40" />

        <section className="mt-4 rounded-3 border border-border bg-surface p-4 lg:p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="h-64 w-full rounded-2 border border-border bg-elevated sm:h-72 lg:h-80" />
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="h-6 w-48 rounded-1 bg-border/40" />
                <div className="h-4 w-24 rounded-1 bg-border/30" />
              </div>
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`theme-skeleton-${index}`}
                    className="h-6 w-20 rounded-full bg-border/30"
                  />
                ))}
              </div>
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={`detail-skeleton-${index}`}
                    className="h-4 w-40 rounded-1 bg-border/30"
                  />
                ))}
              </div>
              <div className="h-10 w-56 rounded-2 bg-border/30" />
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3 border border-border bg-surface p-4 lg:p-6">
          <div className="h-5 w-32 rounded-1 bg-border/40" />
          <div className="mt-3 space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`desc-skeleton-${index}`}
                className="h-4 w-full rounded-1 bg-border/30"
              />
            ))}
          </div>
        </section>

        <p className="mt-4 text-500 text-muted">Cargando...</p>
      </div>
    </main>
  );
}
