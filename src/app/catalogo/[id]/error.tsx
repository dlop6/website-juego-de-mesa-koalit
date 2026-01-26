// define el manejador de error para la ficha que muestra la pantalla offline en cliente.
"use client";

import { OfflineErrorScreen } from "@/components/states/OfflineErrorScreen";

export default function GameDetailError({ reset }: { reset: () => void }) {
  return <OfflineErrorScreen onRetry={reset} />;
}
