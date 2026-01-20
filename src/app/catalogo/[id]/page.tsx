export default function GameDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-bg text-text p-24">
      <h1 className="text-900 font-700 mb-8">Detalle Juego {params.id}</h1>
      <p>placeholder juego</p>
    </main>
  );
}
