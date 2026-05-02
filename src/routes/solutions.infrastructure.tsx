import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import img1 from "@/assets/pages/infra-1.jpg";
import img2 from "@/assets/pages/infra-2.jpg";
import img3 from "@/assets/pages/infra-3.jpg";

export const Route = createFileRoute("/solutions/infrastructure")({
  head: () => ({
    meta: [
      { title: "Cold-Chain Infrastructure — Zariaspa Trading" },
      {
        name: "description",
        content:
          "Pharmaceutical-grade warehousing across Kabul, Dubai, and Samarkand with redundant power, 24/7 monitoring, and validated reefer fleet.",
      },
    ],
  }),
  component: () => (
    <PageLayout
      tKey="infra"
      hero={{ src: img1, alt: "Pharmaceutical cold-chain warehouse interior", w: 1280, h: 832 }}
      sections={[
        { headingKey: "s1h", paragraphKeys: ["s1p1", "s1p2"] },
        { headingKey: "s2h", paragraphKeys: ["s2p1", "s2p2"] },
        { headingKey: "s3h", paragraphKeys: ["s3p1"] },
      ]}
      gallery={[
        { src: img2, alt: "Reefer truck fleet in a logistics yard", w: 1024, h: 1024 },
        { src: img3, alt: "Control tower monitoring cold-chain telemetry", w: 1280, h: 832 },
        { src: img1, alt: "Cold storage warehouse", w: 1280, h: 832 },
      ]}
    />
  ),
});
