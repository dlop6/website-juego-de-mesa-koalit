"use client";

import { useRouter } from "next/navigation";
import { ErrorState } from "@/components/states/ErrorState";

export default function GameDetailError({ reset }: { reset: () => void }) {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 lg:px-6">
        <ErrorState
          title="No pudimos cargar el juego."
          description="Por favor, intenta de nuevo."
          onRetry={reset}
          secondaryActionLabel="Volver al catálogo"
          onSecondaryAction={() => router.push("/catalogo")}
        />
      </div>
    </main>
  );
}
