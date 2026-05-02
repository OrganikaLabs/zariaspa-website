import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import img1 from "@/assets/pages/network-1.jpg";
import img2 from "@/assets/pages/network-2.jpg";
import img3 from "@/assets/pages/network-3.jpg";

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
      eyebrow="THE NETWORK"
      title="A caravan that never"
      italicWord="stops moving."
      lede="Five offices, three cold-chain hubs, and a partner network that touches forty countries — the routes that once carried silk now carry life-saving medicine, every leg watched in real time."
      hero={{ src: img1, alt: "Vintage atlas-style map showing Zariaspa trade routes connecting Kabul, Dubai, Istanbul, Frankfurt, and Samarkand", w: 1600, h: 900 }}
      body={[
        {
          heading: "Hubs along the route",
          paragraphs: [
            "Kabul HQ — our home and operational nerve center, with 3,200 m² of qualified pharmaceutical storage and a 24/7 control tower watching every shipment in motion.",
            "Dubai Hub — the regional consolidation point where Frankfurt's freight forwarders, Mumbai's manufacturers, and East Asia's OEMs converge before the final overland leg.",
            "Istanbul Office — the bridge between European procurement and Central Asian delivery, handling customs preparation and dossier translation.",
            "Samarkand Liaison — our overland gateway, reviving the original Silk Road as a modern corridor for medical cargo.",
            "Frankfurt Desk — embedded with European OEMs and freight forwarders to compress lead times by weeks.",
          ],
        },
        {
          heading: "Corridors, not just routes",
          paragraphs: [
            "We don't ship — we move along corridors. Each one is pre-qualified, thermally mapped, customs-prepared, and equipped with backup contingencies. When one border slows, traffic flows through another within hours, not days.",
          ],
        },
        {
          heading: "A single point of contact",
          paragraphs: [
            "Wherever a shipment is, whoever handles it, the customer talks to one Zariaspa project lead. That accountability is what turns a network into a partner.",
          ],
        },
      ]}
      gallery={[
        { src: img2, alt: "Cargo plane loading pharmaceutical containers at dusk", w: 1024, h: 1024 },
        { src: img3, alt: "Container ship at port at golden hour", w: 1280, h: 832 },
        { src: img1, alt: "Network map", w: 1600, h: 900 },
      ]}
    />
  ),
});
