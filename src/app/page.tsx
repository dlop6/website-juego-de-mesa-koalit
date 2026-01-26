import { getGames, getPromotions, getSponsors } from "@/lib/dal";
import { BrandsMarquee } from "@/components/ads/BrandsMarquee";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingPreview } from "@/components/landing/LandingPreview";
import { LandingProtocols } from "@/components/landing/LandingProtocols";
import { LandingTrust } from "@/components/landing/LandingTrust";
import { selectPromotedGames } from "@/lib/ads/ads";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [games, sponsors, promotions] = await Promise.all([
    getGames(),
    getSponsors(),
    getPromotions(),
  ]);
  const gamesById = new Map(games.map((game) => [game.id, game]));
  const promotedGames = selectPromotedGames(promotions, gamesById, {
    priceMin: null,
    priceMax: null,
    ratingMin: 0,
    themes: [],
  }).map(({ game }) => game);

  return (
    <div className="crt bg-bg text-fg min-h-screen flex flex-col overflow-x-hidden">
      <div className="scanline-bar" />
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 flex flex-col gap-16 relative bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwaDIwdjIwSDIwVjIwek0wIDIwaDIwdjIwSDBWMjB6bTIwIDBoMjB2MjBIMjBWMHoiLz48L2c+PC9nPjwvc3ZnPg==')]">
        <LandingHero />
        <LandingPreview games={games} promotedGames={promotedGames} />
        <BrandsMarquee sponsors={sponsors} />
        <LandingProtocols />
        <LandingTrust />
      </main>
    </div>
  );
}
