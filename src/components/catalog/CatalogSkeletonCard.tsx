export function CatalogSkeletonCard({ className }: { className?: string }) {
  return (
    <article
      className={[
        "flex flex-col bg-panel border border-border/50 opacity-40 animate-pulse",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="w-full aspect-video bg-border/60" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-6 w-3/4 bg-border rounded" />
        <div className="h-4 w-1/2 bg-border rounded" />
        <div className="mt-4 flex justify-between">
          <div className="h-4 w-1/4 bg-border rounded" />
          <div className="h-4 w-1/4 bg-border rounded" />
        </div>
      </div>
    </article>
  );
}
