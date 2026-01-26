"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const activePath = usePathname() ?? "";

  function navClass(isActive: boolean) {
    const base =
      "px-2 rounded-sm transition-colors duration-200 text-sm font-bold tracking-widest uppercase flex items-center gap-1 group";
    if (isActive) {
      return `${base} bg-primary text-background-dark`;
    }
    return `${base} text-primary hover:text-background-dark hover:bg-primary`;
  }

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-bg border-b-2 border-border border-double px-6 py-4">
      <div className="mx-auto max-w-[1200px] flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl text-primary animate-pulse">
            terminal
          </span>
          <span className="text-2xl font-bold tracking-widest text-primary text-glow uppercase">
            The Board Game Vault
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8" aria-label="principal">
          <Link
            className={navClass(activePath === "/")}
            href="/"
            aria-current={activePath === "/" ? "page" : undefined}
          >
            <span className="opacity-0 group-hover:opacity-100">&gt;</span> [INICIO]
          </Link>
          <Link
            className={navClass(activePath.startsWith("/catalogo"))}
            href="/catalogo"
            aria-current={activePath.startsWith("/catalogo") ? "page" : undefined}
          >
            <span className="opacity-0 group-hover:opacity-100">&gt;</span> [CATÁLOGO]
          </Link>
          <ThemeToggle />
        </nav>
        <button
          className="md:hidden text-primary"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen(true)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
      {isMenuOpen ? (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 animate-fade-in"
            aria-label="Cerrar menu"
            onClick={() => setMenuOpen(false)}
          />
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            className="absolute top-0 right-0 h-full w-[75%] max-w-[280px] bg-[#181611] border-l border-primary/40 shadow-[0_0_30px_rgba(0,0,0,0.6)] px-6 py-6 animate-slide-in-right"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-primary font-bold tracking-widest uppercase text-sm">
                Navegación
              </span>
              <button
                type="button"
                className="text-primary"
                aria-label="Cerrar menu"
                onClick={() => setMenuOpen(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <nav className="flex flex-col gap-4" aria-label="principal mobile">
              <Link
                className={navClass(activePath === "/")}
                href="/"
                onClick={() => setMenuOpen(false)}
                aria-current={activePath === "/" ? "page" : undefined}
              >
                <span className="opacity-0 group-hover:opacity-100">&gt;</span> INICIO
              </Link>
              <Link
                className={navClass(activePath.startsWith("/catalogo"))}
                href="/catalogo"
                onClick={() => setMenuOpen(false)}
                aria-current={activePath.startsWith("/catalogo") ? "page" : undefined}
              >
                <span className="opacity-0 group-hover:opacity-100">&gt;</span> CATÁLOGO
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
