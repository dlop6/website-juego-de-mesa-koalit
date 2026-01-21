import { getGames } from "@/lib/dal";

export default async function CatalogoPage() {
  const games = await getGames();

  return (
    <main className="min-h-screen bg-bg text-text p-24">
      <h1 className="text-900 font-700 mb-8">Catálogo</h1>
      <p>{games.length} juegos cargados</p>
      <ul className="mt-4 space-y-2">
        {games.slice(0, 5).map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </main>
  );
}
