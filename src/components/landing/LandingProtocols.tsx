const protocolItems = [
  {
    icon: "payments",
    title: "POR PRECIO",
    description: "Filtrar por precio",
  },
  {
    icon: "hotel_class",
    title: "POR VALORACIÓN",
    description: "Filtrar por valoración",
  },
  {
    icon: "category",
    title: "POR TEMÁTICA",
    description: "Filtrar por temática",
  },
];

export function LandingProtocols() {
  return (
    <section className="border border-primary p-6 relative bg-primary/5">
      <div className="absolute -top-3 left-4 bg-panel px-2 text-primary font-bold border border-primary text-sm uppercase">
        Protocolos de Búsqueda
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
        {protocolItems.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center p-4 border border-dashed border-primary/40 hover:bg-primary/10 cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-4xl mb-3 text-primary">
                {item.icon}
              </span>
              <h5 className="text-primary font-bold mb-1">{item.title}</h5>
              <p className="text-xs text-primary/70">{item.description}</p>
            </div>
          ))}
      </div>
    </section>
  );
}
