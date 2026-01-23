"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/providers/ThemeProvider";

function VaultIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 9v6" />
      <path d="M9 12h6" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-text transition-colors duration-[var(--duration-2)] ease-[cubic-bezier(0.2,0,0,1)] hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            aria-label="Bóveda de Juegos - Inicio"
          >
            <VaultIcon className="h-6 w-6 text-accent" />
            <span className="text-600 font-700">Bóveda de Juegos</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className={[
                "rounded-2 px-3 py-2 text-500 font-600 transition-colors duration-[var(--duration-2)] ease-[cubic-bezier(0.2,0,0,1)]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
                isActive("/")
                  ? "text-accent"
                  : "text-muted hover:text-text",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={isActive("/") ? "page" : undefined}
            >
              Inicio
            </Link>
            <Link
              href="/catalogo"
              className={[
                "rounded-2 px-3 py-2 text-500 font-600 transition-colors duration-[var(--duration-2)] ease-[cubic-bezier(0.2,0,0,1)]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
                isActive("/catalogo") || pathname?.startsWith("/catalogo/")
                  ? "text-accent"
                  : "text-muted hover:text-text",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={
                isActive("/catalogo") || pathname?.startsWith("/catalogo/")
                  ? "page"
                  : undefined
              }
            >
              Catálogo
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-2 p-2 text-muted transition-colors transition-transform duration-[var(--duration-2)] ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 hover:text-text active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            aria-label="Buscar juegos"
          >
            <SearchIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-2 p-2 text-accent transition-colors transition-transform duration-[var(--duration-2)] ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 hover:text-accent-muted active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            aria-label={
              theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
            }
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
