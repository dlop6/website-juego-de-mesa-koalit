import { LoadingState } from "@/components/states/LoadingState";

export default function CatalogoLoading() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 lg:px-6">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-6 rounded-3 border border-border bg-surface p-4">
            <div className="space-y-4">
              <div className="h-4 w-20 rounded-1 bg-border/40" />
              <div className="space-y-2">
                <div className="h-3 w-16 rounded-1 bg-border/30" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-10 rounded-2 bg-border/30" />
                  <div className="h-10 rounded-2 bg-border/30" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-16 rounded-1 bg-border/30" />
                <div className="flex gap-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={`rating-skeleton-${index}`}
                      className="h-8 w-8 rounded-full bg-border/30"
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-20 rounded-1 bg-border/30" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div
                      key={`theme-skeleton-${index}`}
                      className="h-7 w-20 rounded-full bg-border/30"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="h-10 w-full rounded-2 bg-border/30" />
          </aside>

          <section className="space-y-4">
            <div className="h-6 w-48 rounded-1 bg-border/40" />
            <LoadingState />
          </section>
        </div>
      </div>
    </main>
  );
}
