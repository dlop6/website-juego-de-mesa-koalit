import { CatalogSkeletonCard } from "@/components/catalog/CatalogSkeletonCard";

function SkeletonLine({ className }: { className: string }) {
  return <div className={`rounded bg-border ${className}`} />;
}

export default function CatalogoLoading() {
  return (
    <div
      className="bg-bg text-fg font-display overflow-x-hidden min-h-screen flex flex-col"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Cargando catalogo</span>
      <div className="scanlines fixed inset-0 z-50 opacity-20 h-full w-full" />
      <div className="flex flex-1 relative max-w-[1920px] mx-auto w-full">
        <aside className="hidden lg:flex flex-col w-80 min-w-[320px] border-r border-border bg-panel p-6 sticky top-16 overflow-hidden">
          <div className="mb-8 animate-pulse space-y-2">
            <SkeletonLine className="h-6 w-4/5" />
            <SkeletonLine className="h-3 w-3/4 bg-border/60" />
          </div>
          <div className="flex flex-col gap-8 animate-pulse">
            <div className="space-y-4">
              <SkeletonLine className="h-4 w-1/2" />
              <div className="bg-panel p-4 border border-border rounded space-y-3">
                <div className="flex justify-between">
                  <SkeletonLine className="h-3 w-1/3" />
                  <SkeletonLine className="h-3 w-1/3" />
                </div>
                <SkeletonLine className="h-2 w-full bg-border/70" />
                <div className="flex justify-between border-t border-border pt-2">
                  <SkeletonLine className="h-3 w-1/4" />
                  <SkeletonLine className="h-3 w-1/2" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <SkeletonLine className="h-4 w-1/2" />
              <div className="flex items-center justify-between bg-panel border border-border rounded p-2">
                <SkeletonLine className="h-8 w-8" />
                <SkeletonLine className="h-6 w-14" />
                <SkeletonLine className="h-8 w-8" />
              </div>
            </div>
            <div className="space-y-4">
              <SkeletonLine className="h-4 w-1/2" />
              <div className="space-y-3 pl-2 border-l border-border">
                <SkeletonLine className="h-3 w-3/4" />
                <SkeletonLine className="h-3 w-2/3" />
                <SkeletonLine className="h-3 w-4/5" />
                <SkeletonLine className="h-3 w-1/2" />
                <SkeletonLine className="h-3 w-3/5" />
              </div>
            </div>
            <div className="mt-auto pt-8">
              <SkeletonLine className="h-10 w-full" />
            </div>
          </div>
        </aside>
        <main className="flex-1 min-w-0 px-3 py-6 sm:px-4 lg:p-10 flex flex-col min-h-screen">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 border-b border-border pb-4">
            <div className="animate-pulse space-y-2">
              <SkeletonLine className="h-3 w-40 bg-border/60" />
              <SkeletonLine className="h-8 w-72" />
            </div>
            <div className="animate-pulse flex items-center gap-4">
              <SkeletonLine className="h-3 w-32 bg-border/60" />
              <SkeletonLine className="hidden sm:block h-3 w-24 bg-border/60" />
              <SkeletonLine className="lg:hidden h-7 w-20" />
            </div>
          </div>
          <div className="catalog-grid grid w-full max-w-full gap-3 sm:gap-6 mb-6 sm:mb-8 lg:[grid-auto-rows:1fr]">
            <div className="col-span-full sm:col-auto lg:col-auto h-full">
              <div className="h-full flex flex-col bg-panel border border-border/50 opacity-40 animate-pulse">
                <div className="w-full aspect-video bg-border/60" />
                <div className="p-4 flex flex-col gap-3">
                  <SkeletonLine className="h-5 w-2/3" />
                  <SkeletonLine className="h-4 w-1/2" />
                  <SkeletonLine className="h-4 w-3/5" />
                  <div className="mt-4 flex justify-between">
                    <SkeletonLine className="h-4 w-1/4" />
                    <SkeletonLine className="h-4 w-1/4" />
                  </div>
                </div>
              </div>
            </div>
            {Array.from({ length: 6 }).map((_, index) => (
              <CatalogSkeletonCard key={`skeleton-${index}`} />
            ))}
            <div className="col-span-full sm:col-auto lg:col-auto h-full">
              <div className="h-full flex flex-col bg-panel border border-border/50 opacity-40 animate-pulse p-6 gap-4">
                <SkeletonLine className="h-4 w-1/2" />
                <SkeletonLine className="h-10 w-10 rounded-full" />
                <SkeletonLine className="h-4 w-3/4" />
                <SkeletonLine className="h-4 w-2/3" />
                <SkeletonLine className="mt-auto h-10 w-full" />
              </div>
            </div>
          </div>
          <div className="mt-auto flex justify-center pb-8 px-3 sm:px-0">
            <div className="w-full max-w-[520px] h-12 border border-border bg-panel/60 animate-pulse" />
          </div>
        </main>
      </div>
    </div>
  );
}
