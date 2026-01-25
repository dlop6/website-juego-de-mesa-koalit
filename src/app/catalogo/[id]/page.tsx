import { notFound } from "next/navigation";
import { getGameById } from "@/lib/dal";
import { GameDetail } from "@/components/game/GameDetail";

type PageProps = {
  params: Promise<{ id: string }> | { id: string };
  searchParams?:
    | Promise<Record<string, string | string[] | undefined>>
    | Record<string, string | string[] | undefined>;
};

export default async function GameDetailPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const game = await getGameById(resolvedParams.id);

  if (!game) {
    notFound();
  }

  return <GameDetail game={game} searchParams={resolvedSearchParams} />;
}
