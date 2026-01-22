"use client";

import { useEffect, useState } from "react";

export function Footer() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-500 text-muted">
            <span className="font-600 text-text">Koalit</span>
            <span>×</span>
            <span className="font-600 text-text">Ludica Works</span>
          </div>

          <div className="flex items-center gap-4 text-500 text-muted">
            <span>2025</span>
            {prefersReducedMotion && (
              <span className="text-400">*prefers-reduced-motion enabled*</span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
