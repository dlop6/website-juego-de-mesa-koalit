"use client";

import type { HTMLAttributes } from "react";

export interface LoadingStateProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  label?: string;
}

function SkeletonCard() {
  return (
    <div className="rounded-2 border border-border bg-elevated p-3">
      <div className="h-28 w-full animate-pulse rounded-2 bg-border/40" />
      <div className="mt-3 space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded-1 bg-border/40" />
        <div className="h-3 w-1/2 animate-pulse rounded-1 bg-border/30" />
        <div className="flex gap-2">
          <div className="h-5 w-16 animate-pulse rounded-full bg-border/30" />
          <div className="h-5 w-14 animate-pulse rounded-full bg-border/30" />
          <div className="h-5 w-12 animate-pulse rounded-full bg-border/30" />
        </div>
      </div>
    </div>
  );
}

export function LoadingState({
  count = 9,
  label = "Cargando...",
  className,
  ...props
}: LoadingStateProps) {
  return (
    <div className={["space-y-4", className].filter(Boolean).join(" ")} {...props}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonCard key={`skeleton-${index}`} />
        ))}
      </div>
      <p className="text-500 text-muted">{label}</p>
    </div>
  );
}
