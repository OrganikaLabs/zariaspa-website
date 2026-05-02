import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import img1 from "@/assets/pages/network-1.jpg";
import img2 from "@/assets/pages/network-2.jpg";
import img3 from "@/assets/pages/network-3.jpg";
import tankerShip from "@/assets/pages/tanker-ship.jpg";

export const Route = createFileRoute("/network")({
  head: () => ({
    meta: [
      { title: "Caravan Network — Zariaspa Trading" },
      {
        name: "description",
        content:
          "Five offices, three cold-chain hubs, and corridors stretching from Frankfurt to Kabul, Dubai to Samarkand — the modern Zariaspa caravan network.",
      },
    ],
  }),
  component: () => (
    <PageLayout
      tKey="network"
      hero={{ src: tankerShip, alt: "Aerial photography of a red tanker ship in deep blue water", w: 1600, h: 900 }}
      sections={[
        { headingKey: "s1h", paragraphKeys: ["s1p1", "s1p2", "s1p3", "s1p4", "s1p5"] },
        { headingKey: "s2h", paragraphKeys: ["s2p1"] },
        { headingKey: "s3h", paragraphKeys: ["s3p1"] },
      ]}
      gallery={[
        { src: img2, alt: "Cargo plane loading pharmaceutical containers at dusk", w: 1024, h: 1024 },
        { src: img3, alt: "Container ship at port at golden hour", w: 1280, h: 832 },
        { src: img1, alt: "Network map", w: 1600, h: 900 },
      ]}
    />
  ),
});
