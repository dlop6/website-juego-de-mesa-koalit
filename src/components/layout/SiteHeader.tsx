import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background-light dark:bg-background-dark border-b-2 border-primary border-double px-6 py-4">
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
            className="text-primary hover:text-white hover:bg-primary hover:px-2 -mx-2 transition-all duration-200 text-sm font-bold tracking-widest uppercase flex items-center gap-1 group"
            href="/"
          >
            <span className="opacity-0 group-hover:opacity-100">&gt;</span> INICIO
          </Link>
          <Link
            className="text-primary hover:text-white hover:bg-primary hover:px-2 -mx-2 transition-all duration-200 text-sm font-bold tracking-widest uppercase flex items-center gap-1 group"
            href="/catalogo"
          >
            <span className="opacity-0 group-hover:opacity-100">&gt;</span> CATÁLOGO
          </Link>
          <ThemeToggle />
        </nav>
        <button className="md:hidden text-primary" type="button" aria-label="Abrir menu">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
}
