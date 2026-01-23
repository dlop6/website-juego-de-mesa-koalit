"use client";

import type { HTMLAttributes } from "react";

export interface LoadingStateProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  label?: string;
}

// Vault-themed loading labels
const loadingLabels = [
  "Abriendo la boveda...",
  "Revisando inventario...",
  "Desempolvando cajas...",
];

function getRandomLabel(): string {
  return loadingLabels[Math.floor(Math.random() * loadingLabels.length)] ?? loadingLabels[0] ?? "";
}

function SkeletonCard({ delay = 0 }: { delay?: number }) {
  const animationStyle = {
    animationDelay: `${delay}ms`,
  };

  return (
    <div className="rounded-3 border border-border bg-elevated p-3 transition-opacity">
      {/* Image skeleton with aspect ratio matching GameCard */}
      <div 
        className="relative aspect-[4/3] w-full animate-pulse rounded-2 bg-gradient-to-br from-border/50 to-border/20"
        style={animationStyle}
      >
        {/* Shimmer overlay */}
        <div className="absolute inset-0 overflow-hidden rounded-2">
          <div 
            className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"
            style={animationStyle}
          />
        </div>
        {/* Placeholder icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 48 48" className="h-12 w-12 text-muted/20" aria-hidden="true">
            <rect x="6" y="10" width="36" height="28" rx="3" fill="currentColor" />
            <circle cx="18" cy="22" r="4" fill="currentColor" fillOpacity="0.5" />
            <path d="M6 32l12-8 8 5 16-10v13a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V32z" fill="currentColor" fillOpacity="0.3" />
          </svg>
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="mt-3 space-y-2.5">
        {/* Title */}
        <div 
          className="h-4 w-3/4 animate-pulse rounded-1 bg-border/40"
          style={{ ...animationStyle, animationDelay: `${delay + 100}ms` }}
        />
        {/* Price & Rating row */}
        <div className="flex items-center justify-between">
          <div 
            className="h-4 w-16 animate-pulse rounded-1 bg-accent/20"
            style={{ ...animationStyle, animationDelay: `${delay + 150}ms` }}
          />
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="h-3 w-3 animate-pulse rounded-full bg-border/30"
                style={{ animationDelay: `${delay + 200 + i * 50}ms` }}
              />
            ))}
          </div>
        </div>
        {/* Theme chips */}
        <div className="flex gap-2">
          <div 
            className="h-5 w-14 animate-pulse rounded-full bg-border/30"
            style={{ ...animationStyle, animationDelay: `${delay + 250}ms` }}
          />
          <div 
            className="h-5 w-12 animate-pulse rounded-full bg-border/25"
            style={{ ...animationStyle, animationDelay: `${delay + 300}ms` }}
          />
        </div>
      </div>
    </div>
  );
}

export function LoadingState({
  count = 9,
  label,
  className,
  ...props
}: LoadingStateProps) {
  const displayLabel = label ?? getRandomLabel();
  
  return (
    <div className={["space-y-6", className].filter(Boolean).join(" ")} {...props}>
      {/* Themed loading indicator */}
      <div className="flex items-center justify-center gap-3 py-4">
        <div className="relative">
          {/* Spinning vault wheel */}
          <svg viewBox="0 0 40 40" className="h-8 w-8 animate-spin text-accent" aria-hidden="true">
            <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="3" strokeOpacity="0.2" />
            <path 
              d="M20 4 A16 16 0 0 1 36 20" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-accent" />
          </div>
        </div>
        <p className="text-500 font-500 text-muted animate-pulse">{displayLabel}</p>
      </div>
      
      {/* Skeleton grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonCard key={`skeleton-${index}`} delay={index * 75} />
        ))}
      </div>
    </div>
  );
}
