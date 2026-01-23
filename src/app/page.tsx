import { SponsorModule } from "@/components/ads/SponsorModule";
import { Badge } from "@/components/ui/Badge";
import { VaultDoorSVG } from "@/components/icons/VaultDoorSVG";
import { FilterIcon, DecideIcon, PlayIcon } from "@/components/icons/HowItWorksIcons";
import { getSponsors } from "@/lib/dal";

export default async function Home() {
  const sponsors = await getSponsors();
  const hasSponsor = sponsors.length > 0;

  return (
    <main className="min-h-screen bg-bg text-text">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(197,139,90,0.15),rgba(11,15,20,0))]" />
          <div className="absolute top-16 right-[5%] h-[260px] w-[520px] bg-[radial-gradient(closest-side,rgba(197,139,90,0.08),rgba(11,15,20,0))]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 lg:px-6 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left - Text Content */}
            <div className="space-y-6">
              <h1 className="text-900 font-700 leading-tight text-text">
                Tu proxima obsesion de mesa esta aqui dentro
              </h1>
              <p className="text-600 leading-relaxed text-muted max-w-lg">
                Catalogo curado · Filtros precisos · Transparencia total
              </p>
              <a
                href="/catalogo"
                className="inline-flex items-center gap-2 rounded-2 bg-accent px-6 py-3 text-600 font-600 text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(197,139,90,0.3)] active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                Explorar Coleccion
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

            {/* Right - Vault Door Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <VaultDoorSVG className="h-64 w-64 lg:h-80 lg:w-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-t border-border bg-surface/50">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-800 font-700 text-text">
              Encuentra exactamente lo que buscas
            </h2>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-3">
            {/* Step 1 - Filter */}
            <div className="group rounded-3 border border-border bg-elevated p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface">
                <FilterIcon className="h-10 w-10" />
              </div>
              <h3 className="text-600 font-700 text-text mb-2">Filtra</h3>
              <p className="text-500 text-muted">
                Precio, rating y tematicas para encontrar tu match perfecto.
              </p>
            </div>

            {/* Step 2 - Decide */}
            <div className="group rounded-3 border border-border bg-elevated p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface">
                <DecideIcon className="h-10 w-10" />
              </div>
              <h3 className="text-600 font-700 text-text mb-2">Decide</h3>
              <p className="text-500 text-muted">
                Compara opciones con informacion clara y sin sorpresas.
              </p>
            </div>

            {/* Step 3 - Play */}
            <div className="group rounded-3 border border-border bg-elevated p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface">
                <PlayIcon className="h-10 w-10" />
              </div>
              <h3 className="text-600 font-700 text-text mb-2">Juega</h3>
              <p className="text-500 text-muted">
                Compra con confianza y disfruta tu nueva adquisicion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-800 font-700 text-text">
              Cero sorpresas, total claridad
            </h2>
          </div>
          
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Promocionado Card */}
            <div className="rounded-3 border-l-4 border-l-info border border-border bg-elevated p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Badge variant="promo">Promocionado</Badge>
                </div>
                <div className="space-y-3">
                  <h3 className="text-600 font-700 text-text">Juegos Destacados</h3>
                  <p className="text-500 text-muted leading-relaxed">
                    Juegos seleccionados por editoriales o tiendas. Siempre etiquetados con el badge visible para que sepas que es contenido promocionado.
                  </p>
                </div>
              </div>
            </div>

            {/* Patrocinado Card */}
            <div className="rounded-3 border-l-4 border-l-accent border border-border bg-elevated p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Badge variant="sponsor">Patrocinado</Badge>
                </div>
                <div className="space-y-3">
                  <h3 className="text-600 font-700 text-text">Contenido de Sponsor</h3>
                  <p className="text-500 text-muted leading-relaxed">
                    Contenido de nuestro patrocinador oficial. Siempre etiquetado y nunca altera el orden organico del catalogo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor Module Section */}
      {hasSponsor ? (
        <section className="border-t border-border bg-surface/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 lg:px-6">
            <div className="max-w-sm mx-auto lg:mx-0">
              <SponsorModule sponsors={sponsors} />
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
