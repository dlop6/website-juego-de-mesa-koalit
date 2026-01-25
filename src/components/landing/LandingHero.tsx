import Link from "next/link";

export function LandingHero() {
  return (
    <section className="w-full pt-8 pb-4">
      <div className="border-4 border-primary rounded-lg p-1 bg-primary/5 shadow-glow">
        <div className="border-2 border-primary/50 rounded p-6 md:p-12 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
          <div className="flex-1 z-10 space-y-6 text-left">
            <div className="text-xs md:text-sm font-mono text-primary/70 mb-2">
              &gt; INICIAR_SISTEMA... OK
              <br />
              &gt; CARGAR_MÓDULO: PANTALLA_PRINCIPAL
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-primary leading-tight tracking-tighter text-glow">
              ARCHIVANDO EL
              <br />
              MUNDO ANALÓGICO.
            </h2>
            <p className="text-lg md:text-xl text-primary/80 font-mono max-w-lg border-l-2 border-primary pl-4">
              El sitio digital definitivo para el descubrimiento y colección de
              juegos de mesa.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/catalogo"
                className="relative bg-primary text-background-dark text-lg font-bold px-8 py-3 rounded-none uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-glow hover:shadow-lg active:translate-y-1"
              >
                [ ACCEDER AL CATÁLOGO ]
              </Link>
              <Link
                href="/docs"
                className="border border-primary text-primary px-6 py-3 uppercase tracking-widest hover:bg-primary/20 transition-all font-bold text-sm flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">info</span> LEER_DOCS
              </Link>
            </div>
          </div>
          <div className="w-full md:w-5/12 aspect-video bg-black border-2 border-primary/50 relative p-4 rounded shadow-[inset_0_0_20px_rgba(242,166,13,0.2)] flex flex-col justify-center items-center">
            <div className="absolute top-2 left-2 right-2 h-px bg-primary/30" />
            <div className="text-primary font-mono text-xs md:text-sm leading-relaxed w-full">
              <span className="text-primary-dim">C:\VAULT&gt;</span> ejecutar_diagnostico.exe
              <br />
              <span className="text-green-500">Verificando memoria...</span> 640K OK
              <br />
              <span className="text-green-500">Cargando recursos...</span>{" "}
              <span className="animate-pulse">LISTO</span>
              <br />
              <span className="text-primary-dim">C:\VAULT&gt;</span> montar_unidad A:
              <br />
              <span className="text-primary-dim">C:\VAULT&gt;</span>{" "}
              <span className="blink-cursor">_</span>
            </div>
            <div className="mt-4 w-full h-32 border border-primary/30 relative overflow-hidden amber-tint-container">
              <div
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center"
                data-alt="Retro computer board or detailed map"
                role="img"
                aria-label="Retro computer board or detailed map"
              />
              <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
