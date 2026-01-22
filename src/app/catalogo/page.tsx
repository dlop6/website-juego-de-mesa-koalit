import { getGames, getPromotions, getSponsors } from "@/lib/dal";
import { CatalogClient } from "@/components/catalog/CatalogClient";

export default async function CatalogoPage() {
  const [games, promotions, sponsors] = await Promise.all([
    getGames(),
    getPromotions(),
    getSponsors(),
  ]);

  return <CatalogClient games={games} promotions={promotions} sponsors={sponsors} />;
}
