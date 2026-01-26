import type { Sponsor } from "@/lib/dal";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function BrandsMarquee({ sponsors }: { sponsors: Sponsor[] }) {
  if (!sponsors || sponsors.length === 0) {
    return null;
  }

  const headingId = "brands-marquee-title";
  const items = sponsors.map((sponsor) => ({
    id: sponsor.id,
    name: sponsor.name,
    logoSrc: sponsor.logo?.src ?? "",
    logoAlt: sponsor.logo?.alt ?? sponsor.name,
    initials: getInitials(sponsor.name),
  }));

  return (
    <section className="space-y-6" aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-primary text-lg font-bold tracking-widest uppercase"
      >
        Patrocinadores
      </h2>
      <div className="marquee w-full max-w-full rounded-lg border border-border/60 bg-panel/70 px-4 py-6">
        <ul className="marquee-track" role="list">
          {items.concat(items).map((item, index) => (
            <li
              key={`${item.id}-${index}`}
              className="marquee-item"
              aria-hidden={index >= items.length}
            >
              {item.logoSrc ? (
                <img
                  src={item.logoSrc}
                  alt={item.logoAlt}
                  className="h-12 w-auto max-w-[160px] object-contain"
                />
              ) : (
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 text-primary text-xs font-bold">
                    {item.initials || "BM"}
                  </span>
                  <span className="text-primary text-sm font-semibold uppercase tracking-widest">
                    {item.name}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
