function SkeletonLine({ className }: { className: string }) {
  return <div className={`rounded bg-[#393328] ${className}`} />;
}

export default function GameDetailLoading() {
  return (
    <div
      className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display overflow-x-hidden selection:bg-primary selection:text-background-dark relative"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Cargando ficha</span>
      <div className="scanlines fixed inset-0 z-0 opacity-20 h-full w-full" />
      <main className="flex-grow flex flex-col items-center py-6 px-4 sm:px-8 relative">
        <div className="w-full max-w-[1280px] flex flex-col gap-6 relative z-10">
          <div className="flex items-center gap-2 py-2 animate-pulse">
            <SkeletonLine className="h-4 w-48 bg-[#2a2410]" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 flex flex-col gap-4 animate-pulse">
              <div className="relative w-full aspect-square rounded-lg border-2 border-primary/20 bg-black overflow-hidden">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary z-20" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary z-20" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary z-20" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary z-20" />
                <div className="absolute inset-2 bg-[#2a2410]" />
              </div>
              <div className="flex justify-between text-xs font-mono text-primary/50 uppercase">
                <SkeletonLine className="h-3 w-24 bg-[#2a2410]" />
                <SkeletonLine className="h-3 w-32 bg-[#2a2410]" />
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-6 animate-pulse">
              <div className="border-b border-primary/20 pb-6 space-y-3">
                <div className="flex items-center gap-3">
                  <SkeletonLine className="h-4 w-20 bg-[#2a2410]" />
                  <SkeletonLine className="h-3 w-28 bg-[#2a2410]" />
                </div>
                <SkeletonLine className="h-10 w-3/4" />
                <SkeletonLine className="h-4 w-1/2 bg-[#2a2410]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`stat-skeleton-${index}`}
                    className="flex flex-col p-4 rounded bg-primary/5 border border-primary/20"
                  >
                    <SkeletonLine className="h-3 w-3/5 bg-[#2a2410]" />
                    <SkeletonLine className="mt-3 h-6 w-2/3" />
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonLine key={`tag-skeleton-${index}`} className="h-7 w-24" />
                ))}
              </div>
              <div className="flex flex-col gap-2 p-6 rounded-lg border border-dashed border-primary/30 bg-surface-dark/50">
                <SkeletonLine className="h-4 w-48 bg-[#2a2410]" />
                <SkeletonLine className="h-4 w-full" />
                <SkeletonLine className="h-4 w-5/6" />
                <SkeletonLine className="h-4 w-2/3" />
              </div>
              <SkeletonLine className="h-12 w-full max-w-[520px] bg-[#2a2410]" />
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <SkeletonLine className="h-3 w-56 bg-[#2a2410]" />
              </div>
              <div className="flex flex-wrap gap-4">
                <SkeletonLine className="h-3 w-32 bg-[#2a2410]" />
                <SkeletonLine className="h-3 w-24 bg-[#2a2410]" />
                <SkeletonLine className="h-3 w-28 bg-[#2a2410]" />
              </div>
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
