import type { Sponsor } from "@/lib/dal";
import { selectSponsor } from "@/lib/ads/ads";

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

export function LandingProtocols({ sponsors }: { sponsors?: Sponsor[] }) {
  const sponsor = sponsors && sponsors.length > 0 ? selectSponsor(sponsors) : null;
  const sponsorLabel = sponsor?.tagline ?? "ORGANIZADORES DE JUEGOS";
  const sponsorName = sponsor?.name ?? "GAME_CORP";
  const sponsorLink = sponsor?.websiteUrl;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 border border-primary p-6 relative bg-primary/5">
        <div className="absolute -top-3 left-4 bg-background-dark px-2 text-primary font-bold border border-primary text-sm uppercase">
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
      </div>
      <div className="lg:col-span-1 border-2 border-dashed border-primary p-1 bg-black/40">
        <div className="h-full border border-primary/20 p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-primary font-bold text-lg">REGISTRO DE PATROCINADORES</h4>
            <span className="bg-primary text-black text-[10px] font-bold px-2 py-0.5 rounded-sm">
              PATROCINADO
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-6">
            <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center bg-primary/10">
              <span className="material-symbols-outlined text-3xl text-primary">
                stadia_controller
              </span>
            </div>
            <div>
              <p className="text-white font-bold text-xl tracking-wide">{sponsorName}</p>
              <p className="text-primary/60 text-sm mt-1 font-mono">
                "{sponsorLabel}"
              </p>
            </div>
          </div>
          {sponsorLink ? (
            <a
              href={sponsorLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border border-primary/50 text-primary text-xs py-2 hover:bg-primary hover:text-black transition-colors uppercase text-center"
            >
              VISITAR PATROCINADOR
            </a>
          ) : (
            <button className="w-full border border-primary/50 text-primary text-xs py-2 hover:bg-primary hover:text-black transition-colors uppercase">
              VISITAR PATROCINADOR
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
