import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import img1 from "@/assets/pages/standards-1.jpg";
import img2 from "@/assets/pages/standards-2.jpg";
import img3 from "@/assets/pages/standards-3.jpg";

export const Route = createFileRoute("/standards")({
  head: () => ({
    meta: [
      { title: "Standards & Certifications — Zariaspa Trading" },
      {
        name: "description",
        content:
          "WHO PQS, ISO 13485, EU GDP, FDA, EMA, GS1, USP — the certifications and seals that make Zariaspa a trusted partner.",
      },
    ],
  }),
  component: () => (
    <PageLayout
      eyebrow="STANDARDS · SEALS · ALIGNMENT"
      title="The seal of trust, earned"
      italicWord="every shipment."
      lede="WHO, ISO 13485, EU GDP, FDA, EMA, USP, PIC/S, GS1, MoPH, UNICEF Supply — alignment with the bodies whose standards keep medicine safe, and a quality system that earns those alignments anew with every audit."
      hero={{ src: img1, alt: "Stack of certification documents bound with a red ribbon", w: 1280, h: 832 }}
      body={[
        {
          heading: "ISO 13485 — quality for medical devices",
          paragraphs: [
            "Our quality management system is certified to ISO 13485:2016 across procurement, distribution, installation, and post-market surveillance of medical devices. Internal audits run quarterly; external recertification annually.",
          ],
        },
        {
          heading: "EU GDP — pharmaceutical distribution",
          paragraphs: [
            "Every Zariaspa-operated warehouse and route operates under European Good Distribution Practice for human medicinal products. Temperature mapping, deviation management, transport qualification, and supplier audits are continuous, not episodic.",
          ],
        },
        {
          heading: "WHO, FDA, EMA & ministerial alignment",
          paragraphs: [
            "We work only with manufacturers whose products carry valid WHO PQS listings, FDA 510(k) / PMA clearances, or CE marking under EU MDR / IVDR — and we maintain active registration with the Afghan MoPH and partner ministries across the region.",
          ],
        },
        {
          heading: "Serialization, traceability, and GS1",
          paragraphs: [
            "GS1-compliant barcoding and serialized item identification on every saleable unit, integrated with our chain-of-custody platform. From manufacturer pack to clinic shelf, every box can be traced — and every counterfeit caught.",
          ],
        },
      ]}
      gallery={[
        { src: img2, alt: "Lab technician performing quality testing", w: 1024, h: 1024 },
        { src: img3, alt: "Auditor inspecting medical equipment", w: 1280, h: 832 },
        { src: img1, alt: "Certifications bundle", w: 1280, h: 832 },
      ]}
    />
  ),
});
