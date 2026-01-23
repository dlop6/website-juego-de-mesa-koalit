export function CatalogSkeletonCard({ className }: { className?: string }) {
  return (
    <article
      className={[
        "flex flex-col bg-surface-dark border border-[#393328]/50 opacity-40 animate-pulse",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="w-full aspect-video bg-[#2a2410]" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-6 w-3/4 bg-[#393328] rounded" />
        <div className="h-4 w-1/2 bg-[#393328] rounded" />
        <div className="mt-4 flex justify-between">
          <div className="h-4 w-1/4 bg-[#393328] rounded" />
          <div className="h-4 w-1/4 bg-[#393328] rounded" />
        </div>
      </div>
    </article>
  );
}
