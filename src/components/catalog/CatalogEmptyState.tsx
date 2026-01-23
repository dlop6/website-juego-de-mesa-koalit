export function CatalogEmptyState({
  onClear,
  onFocus,
}: {
  onClear: () => void;
  onFocus: () => void;
}) {
  return (
    <div className="border border-primary/30 bg-surface-dark/60 p-6 text-center text-primary/80">
      <h3 className="text-lg font-bold text-primary mb-2">
        NO HAY RESULTADOS CON ESTOS FILTROS
      </h3>
      <p className="text-sm text-primary/60 mb-4">
        Ajusta los filtros para encontrar lo que buscas en el archivo.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          onClick={onClear}
          className="border border-primary text-primary px-4 py-2 uppercase tracking-widest hover:bg-primary hover:text-black transition-colors text-xs font-bold"
        >
          LIMPIAR FILTROS
        </button>
        <button
          type="button"
          onClick={onFocus}
          className="border border-primary/50 text-primary/80 px-4 py-2 uppercase tracking-widest hover:bg-primary/20 transition-colors text-xs font-bold"
        >
          AJUSTAR FILTROS
        </button>
      </div>
    </div>
  );
}
