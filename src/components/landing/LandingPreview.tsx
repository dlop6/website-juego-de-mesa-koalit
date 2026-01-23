import Link from "next/link";

import { PLACEHOLDER_IMAGE_SQUARE } from "@/lib/formatters";

const previewItems = [
  {
    name: "MONOPOLY_1985",
    year: "1985",
    rating: "8.5/10",
    price: "Q450.00",
    image: PLACEHOLDER_IMAGE_SQUARE,
    alt: "Monopoly board game pieces",
  },
  {
    name: "CATAN_COLONOS",
    year: "1995",
    rating: "9.2/10",
    price: "Q520.00",
    image: PLACEHOLDER_IMAGE_SQUARE,
    alt: "Settlers of Catan hexagonal tiles",
  },
  {
    name: "DUNE_IMPERIO",
    year: "2020",
    rating: "9.7/10",
    price: "Q800.00",
    image: PLACEHOLDER_IMAGE_SQUARE,
    alt: "Dune Imperium game box or sci-fi landscape",
  },
];

export function LandingPreview() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between border-b border-primary pb-2">
        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined">grid_view</span>
          VISTA PREVIA DEL ARCHIVO
        </h3>
        <span className="text-xs font-mono text-primary/60">
          MOSTRANDO 3 DE 4208 REGISTROS
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {previewItems.map((item) => (
          <div
            key={item.name}
            className="group border-2 border-primary bg-background-dark p-1 hover:border-white transition-colors duration-300"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-black mb-3 amber-tint-container border border-primary/30">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('${item.image}')` }}
                data-alt={item.alt}
                role="img"
                aria-label={item.alt}
              />
              <div className="absolute top-2 right-2 bg-black/80 border border-primary px-2 py-1 text-xs text-primary font-bold">
                {item.year}
              </div>
            </div>
            <div className="px-2 pb-2">
              <h4 className="text-lg font-bold text-primary truncate group-hover:text-white">
                {item.name}
              </h4>
              <div className="flex justify-between items-center mt-2 text-sm font-mono text-primary/80 border-t border-primary/30 pt-2">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">star</span>
                  {item.rating}
                </span>
                <span>{item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-2">
        <Link
          className="text-primary text-sm font-bold hover:underline flex items-center gap-1"
          href="/catalogo"
        >
          VER_TODAS_LAS_ENTRADAS{" "}
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
    </section>
  );
}
