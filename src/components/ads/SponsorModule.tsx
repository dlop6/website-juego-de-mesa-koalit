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
    <aside className="rounded-3 border border-border bg-surface p-4">
      <div className="space-y-4">
        <Badge variant="sponsor">Patrocinado</Badge>
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 rounded-2 border border-border bg-elevated">
            {sponsor.logo?.src ? (
              <Image
                src={sponsor.logo.src}
                alt={sponsor.logo.alt ?? sponsor.name}
                fill
                sizes="48px"
                className="object-contain p-2"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-500 text-muted">
                {sponsor.name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-600 font-600 text-text">{sponsor.name}</p>
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
          </a>
        ) : null}
      </div>
    </aside>
  );
}
