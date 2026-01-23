import { getGames } from "@/lib/dal";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingPreview } from "@/components/landing/LandingPreview";
import { LandingProtocols } from "@/components/landing/LandingProtocols";

export const dynamic = "force-dynamic";

export default async function Home() {
  const games = await getGames();

  return (
    <div className="crt bg-background-light dark:bg-background-dark text-[#333] dark:text-primary min-h-screen flex flex-col overflow-x-hidden selection:bg-primary selection:text-black">
      <div className="scanline-bar" />
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 flex flex-col gap-16 relative bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwaDIwdjIwSDIwVjIwek0wIDIwaDIwdjIwSDBWMjB6bTIwIDBoMjB2MjBIMjBWMHoiLz48L2c+PC9nPjwvc3ZnPg==')]">
        <LandingHero />
        <LandingPreview games={games} />
        <LandingProtocols />
      </main>
    </div>
  );
}
