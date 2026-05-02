import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import img1 from "@/assets/pages/imaging-1.jpg";
import img2 from "@/assets/pages/imaging-2.jpg";
import img3 from "@/assets/pages/imaging-3.jpg";

export const Route = createFileRoute("/solutions/imaging")({
  head: () => ({
    meta: [
      { title: "Medical Equipment & Imaging — Zariaspa Trading" },
      {
        name: "description",
        content:
          "Tier-1 MRI, CT, ultrasound and surgical systems sourced from Europe and East Asia, deployed with white-glove logistics across the Silk Road corridor.",
      },
    ],
  }),
  component: () => (
    <PageLayout
      eyebrow="01 — IMAGING"
      title="Medical equipment, sourced and"
      italicWord="installed."
      lede="From bore-magnet MRI suites to mobile ultrasound carts, Zariaspa procures, ships, installs, and services hospital-grade imaging from the world's most trusted OEMs — engineered to land safely at the end of any caravan route."
      hero={{
        src: img1,
        alt: "Hospital MRI scanner in a modern imaging suite",
        w: 1280,
        h: 832,
      }}
      body={[
        {
          heading: "Procurement built on provenance",
          paragraphs: [
            "We partner directly with tier-1 manufacturers in Germany, the Netherlands, Japan, and South Korea — bypassing grey-market channels to ensure every unit arrives with a complete chain of custody, original warranty, and certified service log.",
            "Each acquisition is matched to the receiving hospital's clinical caseload, electrical grid, and biomedical engineering capacity. We don't sell catalogue numbers; we deliver imaging programs.",
          ],
        },
        {
          heading: "White-glove deployment",
          paragraphs: [
            "Crating, customs brokerage, climate-controlled freight, on-site rigging, calibration, acceptance testing, and clinician training — all coordinated by a single Zariaspa project lead from purchase order to first patient scan.",
            "Our typical MRI installation lands in Kabul, Mazar-i-Sharif, or Herat within 90 days of contract signature, with a guaranteed 96-hour service response radius across the country.",
          ],
        },
        {
          heading: "Service that outlasts the warranty",
          paragraphs: [
            "Every system is enrolled in our long-term lifecycle program: scheduled preventive maintenance, OEM-certified spares stocked in our Dubai hub, and remote diagnostic support from biomedical engineers fluent in Dari, Pashto, English, and Arabic.",
          ],
        },
      ]}
      gallery={[
        { src: img2, alt: "Radiologist reviewing CT scans", w: 1024, h: 1024 },
        { src: img3, alt: "Engineers installing surgical lighting", w: 1280, h: 832 },
        { src: img1, alt: "MRI scanner detail", w: 1280, h: 832 },
      ]}
    />
  ),
});
