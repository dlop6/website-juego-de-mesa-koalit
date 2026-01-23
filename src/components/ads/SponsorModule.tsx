import Image from "next/image";
import type { Sponsor } from "@/lib/dal";
import { Badge } from "@/components/ui/Badge";
import { selectSponsor } from "@/lib/ads/ads";

const linkClasses =
  "inline-flex items-center justify-center gap-2 rounded-2 border border-transparent font-600 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(197,139,90,0.3)] active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 bg-accent text-white hover:bg-accent-muted px-4 py-2.5 text-600";

export function SponsorModule({ sponsors }: { sponsors: Sponsor[] }) {
  const sponsor = selectSponsor(sponsors);

  if (!sponsor) {
    return null;
  }

  return (
    <aside className="sticky top-20 h-fit rounded-3 border-2 border-accent bg-elevated p-5 shadow-[0_0_20px_rgba(197,139,90,0.15),0_8px_16px_rgba(6,10,18,0.25)] transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(197,139,90,0.25),0_12px_20px_rgba(6,10,18,0.3)]">
      <div className="space-y-4">
        <Badge variant="sponsor">Patrocinador Oficial</Badge>

        <div className="rounded-2 border border-accent/20 bg-surface p-4">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-2 border border-border bg-surface flex-shrink-0">
              {sponsor.logo?.src ? (
                <Image
                  src={sponsor.logo.src}
                  alt={sponsor.logo.alt ?? sponsor.name}
                  fill
                  sizes="64px"
                  className="object-contain p-2"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-700 font-700 text-accent">
                  {sponsor.name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <p className="text-600 font-700 text-text">{sponsor.name}</p>
              {sponsor.tagline ? (
                <p className="text-500 text-muted line-clamp-2">{sponsor.tagline}</p>
              ) : null}
            </div>
          </div>
        </div>

        {sponsor.websiteUrl ? (
          <a
            href={sponsor.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClasses}
          >
            Visitar {sponsor.name}
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        ) : null}
      </div>
    </aside>
  );
}
