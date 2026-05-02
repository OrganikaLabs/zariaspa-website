import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import img1 from "@/assets/pages/compliance-1.jpg";
import img2 from "@/assets/pages/compliance-2.jpg";
import img3 from "@/assets/pages/compliance-3.jpg";

export const Route = createFileRoute("/solutions/compliance")({
  head: () => ({
    meta: [
      { title: "Regulatory Affairs & Compliance — Zariaspa Trading" },
      {
        name: "description",
        content:
          "WHO, ISO 13485, GDP, and MoPH alignment handled end-to-end by Zariaspa's in-house regulatory affairs desk.",
      },
    ],
  }),
  component: () => (
    <PageLayout
      eyebrow="04 — COMPLIANCE"
      title="Regulatory affairs,"
      italicWord="handled."
      lede="A dedicated regulatory desk that speaks fluent WHO, ISO, GDP, FDA, EMA — and Pashto. Dossiers, registrations, and ministry liaison managed in-house so your shipments clear customs the first time."
      hero={{ src: img1, alt: "Compliance officer reviewing regulatory documents at a desk", w: 1280, h: 832 }}
      body={[
        {
          heading: "End-to-end dossier management",
          paragraphs: [
            "Product registrations with the Afghan MoPH, GCC SFDA, and across our partner networks in Central Asia — prepared, submitted, and shepherded to approval by regulatory professionals who know each authority's expectations.",
            "We maintain living dossiers: every variation, renewal, and post-marketing report tracked centrally so nothing lapses.",
          ],
        },
        {
          heading: "Quality systems that scale",
          paragraphs: [
            "Our operations are certified to ISO 13485 for medical devices and operate under EU Good Distribution Practice for pharmaceuticals. Internal audits, CAPA cycles, and supplier qualification are all part of standard practice — not an annual scramble.",
          ],
        },
        {
          heading: "Customs, clearance, and conscience",
          paragraphs: [
            "We handle import permits, free-sale certificates, GS1-coded labelling, and serialization. We refuse business that can't be done cleanly. Provenance, ethics, and patient safety are non-negotiable conditions of every shipment we touch.",
          ],
        },
      ]}
      gallery={[
        { src: img2, alt: "Wax seal on a parchment certificate", w: 1024, h: 1024 },
        { src: img3, alt: "QA specialist inspecting medical equipment", w: 1280, h: 832 },
        { src: img1, alt: "Regulatory documentation review", w: 1280, h: 832 },
      ]}
    />
  ),
});
