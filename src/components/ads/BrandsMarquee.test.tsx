import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { BrandsMarquee } from "./BrandsMarquee";

test("BrandsMarquee renderiza marcas", () => {
  const html = renderToStaticMarkup(
    <BrandsMarquee
      sponsors={[
        {
          id: "s-hasbro",
          name: "Hasbro",
          logo: { src: "", alt: "Logo Hasbro" },
          websiteUrl: "",
          tagline: "Editorial",
          priority: 10,
        },
        {
          id: "s-asmodee",
          name: "Asmodee",
          logo: { src: "", alt: "Logo Asmodee" },
          websiteUrl: "",
          tagline: "Editorial",
          priority: 9,
        },
      ]}
    />
  );

  assert.match(html, /Marcas/);
  assert.match(html, /Hasbro/);
  assert.match(html, /aria-hidden=\"true\"/);
});
