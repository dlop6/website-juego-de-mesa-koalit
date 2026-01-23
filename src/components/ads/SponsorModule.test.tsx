import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import type { Sponsor } from "@/lib/dal";
import { SponsorModule } from "./SponsorModule";

const sponsors: Sponsor[] = [
  {
    id: "s-1",
    name: "GAME_CORP",
    logo: { src: "", alt: "" },
    websiteUrl: "https://example.com",
    tagline: "Impulsando la próxima generación.",
  },
];

test("SponsorModule renderiza patrocinador y CTA", () => {
  const html = renderToStaticMarkup(<SponsorModule sponsors={sponsors} />);

  assert.match(html, /GAME_CORP/);
  assert.match(html, /PATROCINADO/);
  assert.match(html, /ACCEDER_AL_CATÁLOGO/);
});
