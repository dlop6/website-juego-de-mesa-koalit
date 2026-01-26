// define el manejador de error del catálogo que muestra la pantalla offline en cliente.
"use client";

import { OfflineErrorScreen } from "@/components/states/OfflineErrorScreen";

export default function CatalogoError({ reset }: { reset: () => void }) {
  return <OfflineErrorScreen onRetry={reset} />;
}
