import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import img1 from "@/assets/pages/pharma-1.jpg";
import img2 from "@/assets/pages/pharma-2.jpg";
import img3 from "@/assets/pages/pharma-3.jpg";

export const Route = createFileRoute("/solutions/pharma")({
  head: () => ({
    meta: [
      { title: "Pharmaceutical Supply Chain — Zariaspa Trading" },
      {
        name: "description",
        content:
          "Validated 2–8°C and –20°C cold-chain corridors with real-time temperature, GPS, and chain-of-custody provenance for every pallet.",
      },
    ],
  }),
  component: () => (
    <PageLayout
      tKey="pharma"
      hero={{ src: img1, alt: "Refrigerated pharmaceutical truck on a desert highway at sunset", w: 1280, h: 832 }}
      sections={[
        { headingKey: "s1h", paragraphKeys: ["s1p1", "s1p2"] },
        { headingKey: "s2h", paragraphKeys: ["s2p1", "s2p2"] },
        { headingKey: "s3h", paragraphKeys: ["s3p1"] },
      ]}
      gallery={[
        { src: img2, alt: "Pharmaceutical pallets in a cold-chain warehouse", w: 1024, h: 1024 },
        { src: img3, alt: "Real-time logistics dashboard tracking shipments", w: 1280, h: 832 },
        { src: img1, alt: "Reefer truck on route", w: 1280, h: 832 },
      ]}
    />
  ),
});
