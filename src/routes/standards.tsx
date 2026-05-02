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
      tKey="standards"
      hero={{ src: img1, alt: "Stack of certification documents bound with a red ribbon", w: 1280, h: 832 }}
      sections={[
        { headingKey: "s1h", paragraphKeys: ["s1p1"] },
        { headingKey: "s2h", paragraphKeys: ["s2p1"] },
        { headingKey: "s3h", paragraphKeys: ["s3p1"] },
        { headingKey: "s4h", paragraphKeys: ["s4p1"] },
      ]}
      gallery={[
        { src: img2, alt: "Lab technician performing quality testing", w: 1024, h: 1024 },
        { src: img3, alt: "Auditor inspecting medical equipment", w: 1280, h: 832 },
        { src: img1, alt: "Certifications bundle", w: 1280, h: 832 },
      ]}
    />
  ),
});
