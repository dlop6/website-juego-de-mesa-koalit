export default function DocsPage() {
  return (
    <main className="bg-background-light dark:bg-background-dark text-[#333] dark:text-primary min-h-screen flex flex-col overflow-x-hidden selection:bg-primary selection:text-black">
      <div className="scanline-bar" />
      <section className="w-full max-w-[900px] mx-auto px-4 sm:px-6 py-10 space-y-8">
        <header className="border-2 border-primary/40 bg-primary/5 p-6">
          <p className="text-xs font-mono text-primary/60">&gt; PROTOCOLO_DE_USO</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">
            Manual de operación del archivo
          </h1>
          <p className="text-primary/70 mt-2 max-w-2xl">
            Guía rápida para navegar el catálogo, entender etiquetas y aplicar filtros
            sin perder el contexto.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="border border-primary/30 bg-surface-dark/40 p-5 space-y-2">
            <h2 className="text-primary font-bold text-lg">Búsqueda y filtros</h2>
            <p className="text-primary/70 text-sm">
              Ajusta precio, valoración y temática para reducir el archivo. Usa el botón
              “Limpiar filtros” para volver a la vista completa.
            </p>
          </article>
          <article className="border border-primary/30 bg-surface-dark/40 p-5 space-y-2">
            <h2 className="text-primary font-bold text-lg">Etiquetas y ratings</h2>
            <p className="text-primary/70 text-sm">
              Las etiquetas indican temática principal. La valoración está en escala 0–5
              y se refleja en tarjetas y ficha.
            </p>
          </article>
          <article className="border border-primary/30 bg-surface-dark/40 p-5 space-y-2">
            <h2 className="text-primary font-bold text-lg">Detalle del juego</h2>
            <p className="text-primary/70 text-sm">
              Cada ficha contiene imagen, precio, rating, tags y metadata útil
              (jugadores, tiempo, edad si está disponible).
            </p>
          </article>
          <article className="border border-primary/30 bg-surface-dark/40 p-5 space-y-2">
            <h2 className="text-primary font-bold text-lg">Publicidad transparente</h2>
            <p className="text-primary/70 text-sm">
              Los bloques “Patrocinado” y “Promocionado” están marcados para distinguir
              contenido orgánico de contenido pagado.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
