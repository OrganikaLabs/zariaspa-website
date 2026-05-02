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
          "Validated cold-chain corridors with real-time temperature and GPS provenance for life-saving pharmaceuticals across Central Asia and the Gulf.",
      },
    ],
  }),
  component: () => (
    <PageLayout
      eyebrow="02 — PHARMA"
      title="A pharmaceutical supply chain you can"
      italicWord="audit."
      lede="Vaccines, biologics, oncology drugs, and essential medicines moved through validated 2–8°C and –20°C corridors — every pallet GPS-tracked, every excursion logged, every recipient on the ledger."
      hero={{ src: img1, alt: "Refrigerated pharmaceutical truck on a desert highway at sunset", w: 1280, h: 832 }}
      body={[
        {
          heading: "Validated cold corridors",
          paragraphs: [
            "Our pharma routes from Frankfurt, Mumbai, and Dubai into Kabul are pre-qualified end-to-end. Every truck, container, and warehouse zone has been thermally mapped and revalidated annually under WHO PQS and EU GDP guidelines.",
            "Pre-conditioned PCM packouts and active reefer containers maintain cargo within ±0.5°C of target — verified by dual NIST-traceable loggers riding alongside every shipment.",
          ],
        },
        {
          heading: "Real-time provenance",
          paragraphs: [
            "Customers receive a live dashboard tracking temperature, humidity, shock, GPS, and door-open events for every pallet. Excursion alerts route to our 24/7 control tower in Kabul within 90 seconds.",
            "On delivery, a tamper-evident digital chain-of-custody report — signed and timestamped — is filed for regulatory audit and ministry release.",
          ],
        },
        {
          heading: "Resilient by design",
          paragraphs: [
            "Three independent border crossings, two airfreight gateways, and contingency stock pre-positioned in Dubai mean a single closure never stops a delivery. We've kept oncology pipelines flowing through every regional disruption since 2019.",
          ],
        },
      ]}
      gallery={[
        { src: img2, alt: "Vials inside a cold storage chamber", w: 1024, h: 1024 },
        { src: img3, alt: "Logistics worker scanning a pharma pallet data logger", w: 1280, h: 832 },
        { src: img1, alt: "Cold-chain truck on Silk Road highway", w: 1280, h: 832 },
      ]}
    />
  ),
});
