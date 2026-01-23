import Link from "next/link";
import { VaultIcon } from "@/components/icons/VaultIcon";

const primaryLinkClasses =
  "inline-flex items-center justify-center gap-2 rounded-2 border border-transparent font-600 transition-colors duration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 bg-accent text-white hover:bg-accent-muted px-4 py-2 text-600";

export default function GameNotFound() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto w-full max-w-4xl px-4 py-10 lg:px-6">
        <section className="rounded-3 border border-border bg-surface p-6 text-center shadow-[0_18px_36px_rgba(6,10,18,0.35)]">
          <div className="mx-auto w-fit">
            <VaultIcon className="h-20 w-20 text-muted" />
          </div>
          <h1 className="text-800 font-700 text-text">Juego no encontrado</h1>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/catalogo" className={primaryLinkClasses}>
              Volver al catálogo
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
