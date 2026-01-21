import { getGameById } from "@/lib/dal";

export default async function GameDetailPage({ params }: { params: { id: string } }) {
  const game = await getGameById(params.id);

  if (!game) {
    return (
      <main className="min-h-screen bg-bg text-text p-24">
        <h1 className="text-900 font-700 mb-8">Juego no encontrado</h1>
        <p>Revisa el identificador o vuelve al catálogo.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg text-text p-24">
      <h1 className="text-900 font-700 mb-8">{game.name}</h1>
      <p>{game.shortDescription}</p>
    </main>
  );
}
