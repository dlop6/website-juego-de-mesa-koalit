import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="w-full border-t-4 border-border bg-panel py-8 mt-auto z-40 relative">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-primary tracking-widest uppercase">
            The Board Game Vault
          </h2>
          <div className="text-primary/50 text-xs font-mono space-y-1">
            <p>VERSIÓN DEL SISTEMA v1.0.4</p>
            <p>MEMORIA: 640K OK</p>
            <p>ESTADO DEL SERVIDOR: EN LÍNEA</p>
          </div>
        </div>
        <div className="flex gap-12">
          <div className="flex flex-col gap-2">
            <h4 className="text-primary font-bold text-sm border-b border-primary/30 pb-1 mb-1">
              NAVEGACIÓN
            </h4>
            <Link className="text-primary/70 hover:text-primary text-xs hover:underline" href="/">
              &gt; INICIO
            </Link>
            <Link
              className="text-primary/70 hover:text-primary text-xs hover:underline"
              href="/catalogo"
            >
              &gt; CATÁLOGO
            </Link>
            <a className="text-primary/70 hover:text-primary text-xs hover:underline" href="#">
              &gt; VENDE_TUS_JUEGOS
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-primary font-bold text-sm border-b border-primary/30 pb-1 mb-1">
              LEGAL
            </h4>
            <a className="text-primary/70 hover:text-primary text-xs hover:underline" href="#">
              &gt; PROTOCOLO_PRIVACIDAD
            </a>
            <a className="text-primary/70 hover:text-primary text-xs hover:underline" href="#">
              &gt; TÉRMINOS_DE_USO
            </a>
          </div>
        </div>
        <div className="md:text-right">
          <p className="text-primary/40 text-[10px] font-mono max-w-[200px]">
            © 2024 The Board Game Vault DE LOS JUEGOS.
            <br />
            TODOS LOS DERECHOS ANALÓGICOS RESERVADOS.
            <br />
            DISEÑADO EN UN IBM P70.
          </p>
        </div>
      </div>
    </footer>
  );
}
