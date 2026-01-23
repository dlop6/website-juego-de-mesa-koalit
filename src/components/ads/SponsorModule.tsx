import type { Sponsor } from "@/lib/dal";
import { selectSponsor } from "@/lib/ads/ads";

const sponsorTexture =
  "https://www.transparenttextures.com/patterns/carbon-fibre.png";

export function SponsorModule({
  sponsors,
  className,
}: {
  sponsors: Sponsor[];
  className?: string;
}) {
  const sponsor = selectSponsor(sponsors);

  if (!sponsor) {
    return null;
  }

  const sponsorLabel = sponsor.tagline ?? "ORGANIZADORES DE JUEGOS";

  return (
    <article
      className={[
        "col-span-1 md:col-span-2 xl:col-span-1 group relative flex flex-col justify-center",
        "bg-gradient-to-br from-background-dark to-[#2a2410] border border-[#544c3b] overflow-hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: `url('${sponsorTexture}')` }}
        aria-hidden="true"
      />
      <div className="absolute top-2 right-2 text-[10px] text-[#544c3b] font-mono border border-[#544c3b] px-1">
        // PATROCINADO
      </div>
      <div className="p-6 relative z-10 flex flex-col h-full justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded bg-primary/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">token</span>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold">{sponsor.name}</h3>
            <p className="text-primary text-xs tracking-wider">{sponsorLabel}</p>
          </div>
        </div>
        <p className="text-[#bab09c] text-sm leading-relaxed">
          {sponsor.tagline ??
            "Mejora tus protocolos de almacenamiento. Insertos premium para mayor eficiencia."}
        </p>
        {sponsor.websiteUrl ? (
          <a
            href={sponsor.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 bg-transparent border border-primary text-primary text-xs font-bold hover:bg-primary hover:text-black transition-colors uppercase tracking-widest text-center"
          >
            [ ACCEDER_AL_CATÁLOGO ]
          </a>
        ) : (
          <button className="w-full py-2 bg-transparent border border-primary text-primary text-xs font-bold hover:bg-primary hover:text-black transition-colors uppercase tracking-widest">
            [ ACCEDER_AL_CATÁLOGO ]
          </button>
        )}
      </div>
    </article>
  );
}
