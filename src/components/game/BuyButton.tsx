import { Button } from "@/components/ui/Button";
import { ExternalLink } from "lucide-react";

const linkClasses =
  "inline-flex items-center justify-center gap-2 rounded-2 border border-transparent font-600 transition-colors duration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 bg-accent text-white hover:bg-accent-muted px-4 py-2 text-600";

export function BuyButton({ purchaseUrl }: { purchaseUrl?: string }) {
  if (purchaseUrl) {
    return (
      <a
        href={purchaseUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        Ver opciones de compra
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Button variant="secondary" disabled className="px-4 py-2 text-600">
      Sin enlace disponible
    </Button>
  );
}
