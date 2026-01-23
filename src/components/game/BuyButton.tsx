export function BuyButton({ purchaseUrl }: { purchaseUrl?: string }) {
  return (
    <div className="mt-4 flex flex-col sm:flex-row gap-4 items-center pt-4 border-t border-primary/20">
      {purchaseUrl ? (
        <a
          href={purchaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full sm:w-auto flex-1 h-14 bg-primary text-background-dark rounded font-bold text-lg uppercase tracking-wide hover:bg-white hover:shadow-[0_0_15px_rgba(242,166,13,0.6)] transition-all flex items-center justify-center gap-3 relative overflow-hidden"
        >
          <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-white/20 skew-x-[20deg] group-hover:animate-[shine_1s_infinite]" />
          <span className="material-symbols-outlined">shopping_cart_checkout</span>
          <span>INICIALIZAR_COMPRA</span>
        </a>
      ) : (
        <button
          type="button"
          className="group w-full sm:w-auto flex-1 h-14 bg-primary text-background-dark rounded font-bold text-lg uppercase tracking-wide transition-all flex items-center justify-center gap-3 relative overflow-hidden opacity-60 cursor-not-allowed"
          disabled
        >
          <span className="material-symbols-outlined">shopping_cart_checkout</span>
          <span>INICIALIZAR_COMPRA</span>
        </button>
      )}
      <button
        type="button"
        className="w-full sm:w-auto h-14 px-6 border border-primary/30 text-primary/50 rounded font-bold text-sm uppercase tracking-wide hover:border-primary/80 hover:text-primary transition-all flex items-center justify-center gap-2 bg-transparent cursor-not-allowed opacity-60"
        disabled
      >
        <span className="material-symbols-outlined">lock</span>
        <span>DATOS_NO_DISPONIBLES</span>
      </button>
    </div>
  );
}
