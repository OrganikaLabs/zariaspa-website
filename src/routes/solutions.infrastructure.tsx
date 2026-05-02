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
          "Pharmaceutical-grade cold storage with 2–8°C and –20°C zones across Kabul, Dubai, and Samarkand hubs.",
      },
    ],
  }),
  component: () => (
    <PageLayout
      eyebrow="05 — INFRASTRUCTURE"
      title="Cold-chain infrastructure, ready when the"
      italicWord="caravan arrives."
      lede="Pharmaceutical-grade warehousing across Kabul, Dubai, and Samarkand — backed by redundant power, 24/7 monitoring, and a fleet of validated reefer trucks ready to roll the moment a manifest is signed."
      hero={{ src: img1, alt: "Pharmaceutical cold-chain warehouse interior", w: 1280, h: 832 }}
      body={[
        {
          heading: "Three hubs, one network",
          paragraphs: [
            "Kabul (3,200 m² of qualified GDP storage), Dubai Healthcare City (a regional consolidation center), and Samarkand (our overland gateway from Central Asia) form a triangle that puts 80% of the patients we serve within 36 hours of inventory.",
            "Every hub maintains 2–8°C, –20°C, and ambient zones, plus segregated quarantine and recall areas. All zones are mapped quarterly.",
          ],
        },
        {
          heading: "Resilience engineered in",
          paragraphs: [
            "N+1 redundant cooling, automatic generator failover within 8 seconds, and 72-hour fuel reserves keep temperature compliance unbroken through any grid event.",
            "A dedicated control tower watches every sensor in real time. Anomalies trigger response protocols within 90 seconds — and the duty engineer is on site within 15 minutes.",
          ],
        },
        {
          heading: "A fleet built for the route",
          paragraphs: [
            "Reefer trucks calibrated to ±0.5°C. Insulated last-mile vans for provincial deliveries. Pre-conditioned PCM shippers for air freight. The right vessel for every leg, from Frankfurt's tarmac to a clinic in Bamyan.",
          ],
        },
      ]}
      gallery={[
        { src: img2, alt: "Cold-room temperature gauge showing 4°C", w: 1024, h: 1024 },
        { src: img3, alt: "Aerial view of logistics hub at sunrise", w: 1280, h: 832 },
        { src: img1, alt: "Cold-chain warehouse aisle", w: 1280, h: 832 },
      ]}
    />
  ),
});
