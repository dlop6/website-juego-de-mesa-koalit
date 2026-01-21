import { getGames } from "@/lib/dal";
import { CatalogClient } from "@/components/catalog/CatalogClient";

export default async function CatalogoPage() {
  const games = await getGames();

  return <CatalogClient games={games} />;
}
