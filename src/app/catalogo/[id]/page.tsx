import { notFound } from "next/navigation";
import { getGameById } from "@/lib/dal";
import { GameDetail } from "@/components/game/GameDetail";

type PageProps = {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function GameDetailPage({ params, searchParams }: PageProps) {
  const game = await getGameById(params.id);

  if (!game) {
    notFound();
  }

  return <GameDetail game={game} searchParams={searchParams} />;
}
