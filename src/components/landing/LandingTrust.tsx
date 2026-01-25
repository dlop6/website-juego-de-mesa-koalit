const trustItems = [
  {
    icon: "verified_user",
    title: "[DATOS VERIFICADOS]",
    description:
      "Todas las entradas cruzadas manualmente con archivos físicos.",
  },
  {
    icon: "visibility",
    title: "[PUBLICIDAD TRANSPARENTE]",
    description:
      "Distinción clara entre contenido y registros patrocinados.",
  },
  {
    icon: "accessibility_new",
    title: "[ACCESIBILIDAD CUMPLIDA]",
    description:
      "Diseñado para legibilidad de alto contraste y soporte de lector de pantalla.",
  },
];

export function LandingTrust() {
  return (
    <section className="border-t-2 border-b-2 border-primary py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {trustItems.map((item) => (
          <div key={item.title} className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 flex items-center justify-center border border-primary rounded-full group-hover:bg-primary group-hover:text-black transition-colors text-primary">
              <span className="material-symbols-outlined">{item.icon}</span>
            </div>
            <h5 className="text-primary font-bold text-sm tracking-wider">{item.title}</h5>
            <p className="text-primary/60 text-xs max-w-[200px]">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
