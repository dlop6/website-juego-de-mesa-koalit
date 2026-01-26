import Link from "next/link";

export function NotFoundScreen() {
  return (
    <div className="bg-bg text-fg font-display overflow-x-hidden selection:bg-selection selection:text-selection-fg min-h-full relative">
      <div className="fixed inset-0 z-50 pointer-events-none scanlines opacity-30 h-full w-full" />
      <div className="fixed inset-0 z-40 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      <main className="flex flex-1 items-center justify-center p-4 sm:p-8 relative z-10">
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#f2a60d 1px, transparent 1px), linear-gradient(90deg, #f2a60d 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="w-full max-w-4xl flex flex-col items-center">
          <div className="w-full crt-box-glow bg-panel border-2 border-primary/30 rounded-lg overflow-hidden relative backdrop-blur-md">
            <div className="flex items-center justify-between px-4 py-2 bg-primary/10 border-b border-primary/30">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="text-xs font-mono text-primary/60 tracking-widest uppercase">
                root@vault:~/sectors/404
              </div>
              <span className="material-symbols-outlined text-primary/60 text-sm">
                wifi_tethering_off
              </span>
            </div>
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col items-center text-center gap-8 relative">
              <span className="material-symbols-outlined absolute opacity-5 text-[200px] pointer-events-none select-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                broken_image
              </span>
              <div className="animate-flicker">
                <p className="text-primary/50 font-mono text-sm tracking-[0.2em] mb-2 uppercase">
                  &lt;!!-- SYSTEM_ERROR: 0x404 --!!&gt;
                </p>
                <h2
                  className="text-5xl sm:text-7xl font-bold uppercase tracking-tighter leading-none text-primary crt-glow glitch-text"
                  data-text="404: SECTOR_NO_ENCONTRADO"
                >
                  404: SECTOR_NO_ENCONTRADO
                </h2>
              </div>
              <div className="max-w-xl space-y-4">
                <p className="text-lg sm:text-xl text-primary font-medium leading-relaxed crt-glow">
                  ADVERTENCIA: La ruta de datos solicitada no existe en los sectores
                  del Vault. El archivo puede haber sido movido o purgado del sistema.
                </p>
              </div>
              <div className="w-full max-w-lg mt-4 bg-panel/60 border border-primary/20 rounded p-4 text-left font-mono text-xs sm:text-sm text-primary/80 h-32 overflow-hidden relative shadow-inner">
                <div className="absolute top-0 right-0 p-2">
                  <span className="animate-pulse w-2 h-4 bg-primary inline-block" />
                </div>
                <div className="flex flex-col gap-1 opacity-80">
                  <p className="whitespace-nowrap">&gt; Initiating vault_protocol_v2...</p>
                  <p className="whitespace-nowrap text-primary/60">
                    &gt; Scanning block 7A-F9...
                  </p>
                  <p className="whitespace-nowrap text-red-400">
                    &gt; ERROR: Index mismatch at sector 0000
                  </p>
                  <p className="whitespace-nowrap text-primary/60">
                    &gt; Re-routing signal...
                  </p>
                  <p className="whitespace-nowrap text-red-400">
                    &gt; FATAL: Destination unreachable.
                  </p>
                  <p className="whitespace-nowrap">&gt; Awaiting manual override...</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-panel to-transparent pointer-events-none" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-6">
                <Link
                  href="/"
                  className="group relative overflow-hidden bg-primary text-ink font-bold py-3 px-8 rounded border-2 border-primary hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(242,166,13,0.4)]"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out" />
                  <span className="relative flex items-center gap-2 uppercase tracking-wide">
                    <span className="material-symbols-outlined">restart_alt</span>
                    Redireccionar_Al_Inicio
                  </span>
                </Link>
                <Link
                  href="/catalogo"
                  className="group bg-transparent text-primary font-bold py-3 px-8 rounded border-2 border-primary hover:bg-primary/10 active:scale-95 transition-all uppercase tracking-wide flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">library_books</span>
                  Ver_Catálogo_Completo
                </Link>
              </div>
            </div>
            <div className="flex justify-between items-center px-4 py-1 bg-primary/5 border-t border-primary/20 text-[10px] text-primary/50 font-mono uppercase">
              <span>Mem: 64k OK</span>
              <span className="animate-pulse">_CURSOR_IDLE</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
