import { Button } from "@/components/ui/Button";

// SVG icons inline para evitar dependencia de lucide
function CartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function DiceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="8" cy="8" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="16" cy="16" r="1.5" />
    </svg>
  );
}

const linkClasses =
  "group inline-flex w-full items-center justify-center gap-2 rounded-2 border border-transparent font-600 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_16px_rgba(197,139,90,0.25)] active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 bg-accent text-white hover:bg-accent-muted px-5 py-3 text-600";

export function BuyButton({ purchaseUrl }: { purchaseUrl?: string }) {
  if (purchaseUrl) {
    return (
      <a
        href={purchaseUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        <CartIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
        Llevarlo a mi mesa
      </a>
    );
  }

  return (
    <div className="space-y-2 text-center">
      <Button variant="secondary" disabled className="w-full px-5 py-3 text-600">
        <DiceIcon className="h-5 w-5" />
        Proximamente disponible
      </Button>
      <p className="text-400 text-muted">Aun no hay tienda asociada</p>
    </div>
  );
}
