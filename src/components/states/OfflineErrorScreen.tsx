export function OfflineErrorScreen({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="font-display bg-bg text-fg crt-overlay overflow-x-hidden min-h-full flex flex-col relative selection:bg-selection selection:text-selection-fg">
      <div className="scanline-bar scanline-bar-offline" />
      <main className="px-4 md:px-40 flex flex-1 justify-center py-12 items-center">
        <div className="layout-content-container flex flex-col max-w-[800px] w-full relative">
          <div className="relative bg-terminal-bg border-2 border-primary/30 rounded-lg p-1 border-glow shadow-2xl">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary" />
            <div className="p-6 md:p-12 flex flex-col items-center gap-8 bg-panel/60 rounded inner-shadow">
              <div className="w-full flex justify-between text-xs text-primary/50 font-mono tracking-[0.2em] border-b border-primary/20 pb-2 mb-4">
                <span>// TERMINAL_OVERRIDE_INITIATED</span>
                <span>SYS_ERR_503</span>
              </div>
              <div className="text-primary/80 animate-pulse">
                <span className="material-symbols-outlined text-[80px] md:text-[120px]">
                  wifi_off
                </span>
              </div>
              <div className="text-center space-y-2">
                <h1 className="text-primary tracking-widest text-3xl md:text-5xl font-bold leading-tight px-4 text-center animate-flicker text-glow">
                  ESTADO: DESCONECTADO
                </h1>
                <p className="text-primary/70 text-sm tracking-widest uppercase font-bold">
                  Signal Lost on Port 8080
                </p>
              </div>
              <div className="bg-primary/5 border-l-2 border-primary/40 p-4 w-full max-w-2xl">
                <p className="text-primary text-base md:text-lg font-mono leading-relaxed">
                  <span className="font-bold opacity-100">
                    &gt; PROTOCOLO_DE_RED_FALLIDO:
                  </span>{" "}
                  <span className="opacity-80">
                    No se detecta flujo de datos activo. El Baúl requiere una conexión
                    de red estable para sincronizar archivos de juegos y acceder al
                    mainframe central.
                  </span>
                  <span className="animate-pulse inline-block w-2 h-4 bg-primary ml-1 align-middle" />
                </p>
              </div>
              <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                <div className="flex flex-col gap-1 rounded bg-primary/5 p-4 border border-primary/20">
                  <p className="text-primary/60 text-xs font-bold uppercase tracking-wider">
                    PING
                  </p>
                  <div className="flex items-end justify-between">
                    <p className="text-primary tracking-tight text-xl font-bold">0ms</p>
                    <span className="material-symbols-outlined text-primary/40 text-sm">
                      network_check
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 rounded bg-primary/5 p-4 border border-primary/20">
                  <p className="text-primary/60 text-xs font-bold uppercase tracking-wider">
                    PACKETS
                  </p>
                  <div className="flex items-end justify-between">
                    <p className="text-red-500 tracking-tight text-xl font-bold drop-shadow-sm">
                      LOST
                    </p>
                    <span className="material-symbols-outlined text-primary/40 text-sm">
                      water_loss
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 rounded bg-primary/5 p-4 border border-primary/20">
                  <p className="text-primary/60 text-xs font-bold uppercase tracking-wider">
                    GATEWAY
                  </p>
                  <div className="flex items-end justify-between">
                    <p className="text-red-500 tracking-tight text-xl font-bold drop-shadow-sm">
                      UNREACHABLE
                    </p>
                    <span className="material-symbols-outlined text-primary/40 text-sm">
                      router
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-6 w-full flex flex-col items-center gap-4">
                <button
                  type="button"
                  onClick={onRetry}
                  className="group relative overflow-hidden bg-primary text-ink font-bold text-lg px-8 py-4 rounded w-full sm:w-auto min-w-[280px] hover:bg-white transition-all duration-300 shadow-[0_0_15px_rgba(242,166,13,0.4)] hover:shadow-[0_0_25px_rgba(242,166,13,0.6)] flex items-center justify-center gap-3"
                >
                  <span className="material-symbols-outlined text-2xl group-hover:rotate-180 transition-transform duration-700">
                    refresh
                  </span>
                  RECARGAR_SISTEMA
                  <span className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-10 transform skew-x-12 w-full h-full group-hover:translate-x-full transition-all duration-1000" />
                </button>
                <p className="text-primary/40 text-xs font-mono text-center max-w-md mt-2">
                  // AUTO_RETRY: ENABLED. El sistema intentará reconectar
                  automáticamente al detectar señal de onda portadora.
                </p>
              </div>
            </div>
            <div className="bg-panel/80 h-8 flex items-center px-4 border-t border-primary/20 justify-between text-[10px] text-primary/40 font-mono uppercase tracking-widest">
              <span>Terminal V.4.0.2</span>
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-red-900 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-red-900 animate-pulse delay-75" />
                <span className="w-2 h-2 rounded-full bg-red-900 animate-pulse delay-150" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
