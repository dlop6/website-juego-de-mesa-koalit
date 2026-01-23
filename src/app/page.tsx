import { SponsorModule } from "@/components/ads/SponsorModule";
import { getSponsors } from "@/lib/dal";

export default async function Home() {
  const sponsors = await getSponsors();
  const hasSponsor = sponsors.length > 0;

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(197,139,90,0.2),rgba(11,15,20,0))]" />
          <div className="absolute top-16 right-[5%] h-[260px] w-[520px] bg-[radial-gradient(closest-side,rgba(197,139,90,0.12),rgba(11,15,20,0))]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-12 lg:px-6 lg:py-16">
          <section className="space-y-5">
            <h1 className="text-900 font-700 leading-tight text-text">
              Encuentra tu próxima mesa.
            </h1>
            <p className="max-w-2xl text-500 leading-relaxed text-muted">
              Filtra juegos de mesa por precio, rating y temática con transparencia y sin
              sorpresas.
            </p>
            <a
              href="/catalogo"
              className="inline-flex items-center justify-center rounded-2 bg-accent px-5 py-2 text-600 font-600 text-white transition-colors duration-2 hover:bg-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              Explorar catálogo
            </a>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-700 font-700 text-text">Descubrimiento</h2>
            <p className="max-w-2xl text-500 leading-relaxed text-muted">
              Filtra juegos de mesa para precio, rating de temática con omaneras
              transparencias y porpesar sinn olon mendas.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-border bg-elevated px-3 py-1 text-500 font-600 text-muted">
                Precio: Min-Max GTQ
              </span>
              <span className="rounded-full border border-border bg-elevated px-3 py-1 text-500 font-600 text-muted">
                Rating: 0-5 stars
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-border bg-elevated px-3 py-1 text-500 font-600 text-muted">
                Temas: Estrategia
              </span>
              <span className="rounded-full border border-border bg-elevated px-3 py-1 text-500 font-600 text-muted">
                Familiar
              </span>
              <span className="rounded-full border border-border bg-elevated px-3 py-1 text-500 font-600 text-muted">
                Economía
              </span>
              <span className="rounded-full border border-border bg-elevated px-3 py-1 text-500 font-600 text-muted">
                Cartas
              </span>
              <span className="rounded-full border border-border bg-elevated px-3 py-1 text-500 font-600 text-muted">
                Sci-Fi
              </span>
            </div>
          </section>

          <section className="mt-12 space-y-6">
            <h2 className="text-700 font-700 text-text">Transparencia</h2>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-2 text-500 leading-relaxed text-muted">
                <p>
                  <span className="font-600 text-text">Promocionado:</span> Juegos
                  destacados por editoriales o tiendas.
                </p>
                <p>Badge [Promocionado] siempre visible.</p>
              </div>
              <div className="space-y-2 text-500 leading-relaxed text-muted">
                <p>
                  <span className="font-600 text-text">Patrocinado:</span> Contenido de
                  nuestro sponsor.
                </p>
                <p>Badge [Patrocinado] siempre visible. No altera el orden orgánico.</p>
              </div>
            </div>
          </section>

          {hasSponsor ? (
            <section className="mt-12 max-w-sm">
              <SponsorModule sponsors={sponsors} />
            </section>
          ) : null}
        </div>
      </div>
    </main>
  );
}
