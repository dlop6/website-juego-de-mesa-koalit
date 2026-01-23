import Image from "next/image";
import type { Sponsor } from "@/lib/dal";
import { Badge } from "@/components/ui/Badge";
import { selectSponsor } from "@/lib/ads/ads";

const linkClasses =
  "inline-flex items-center justify-center gap-2 rounded-2 border border-transparent font-600 transition-colors duration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 bg-accent text-white hover:bg-accent-muted px-4 py-2 text-600";

export function SponsorModule({ sponsors }: { sponsors: Sponsor[] }) {
  const sponsor = selectSponsor(sponsors);

  if (!sponsor) {
    return null;
  }

  return (
    <aside className="rounded-3 border border-border bg-elevated p-5 shadow-[0_14px_30px_rgba(6,10,18,0.35)] transition-transform duration-2 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-1">
      <div className="space-y-4">
        <Badge variant="sponsor">Patrocinado</Badge>

        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 rounded-2 border border-border bg-surface">
            {sponsor.logo?.src ? (
              <Image
                src={sponsor.logo.src}
                alt={sponsor.logo.alt ?? sponsor.name}
                fill
                sizes="56px"
                className="object-contain p-2"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-600 font-700 text-muted">
                {sponsor.name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-600 font-700 text-text">{sponsor.name}</p>
            {sponsor.tagline ? (
              <p className="text-500 text-muted">{sponsor.tagline}</p>
            ) : null}
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
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        ) : null}
      </div>
    </aside>
  );
}
