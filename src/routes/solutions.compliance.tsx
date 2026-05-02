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
          "WHO, ISO 13485, EU GDP, FDA, EMA, and MoPH alignment — dossiers, registrations, and ministerial liaison handled in-house.",
      },
    ],
  }),
  component: () => (
    <PageLayout
      tKey="compliance"
      hero={{ src: img1, alt: "Compliance officer reviewing regulatory documents at a desk", w: 1280, h: 832 }}
      sections={[
        { headingKey: "s1h", paragraphKeys: ["s1p1", "s1p2"] },
        { headingKey: "s2h", paragraphKeys: ["s2p1"] },
        { headingKey: "s3h", paragraphKeys: ["s3p1"] },
      ]}
      gallery={[
        { src: img2, alt: "Quality auditor inspecting documentation", w: 1024, h: 1024 },
        { src: img3, alt: "Stamped regulatory seal on certificate", w: 1280, h: 832 },
        { src: img1, alt: "Regulatory desk", w: 1280, h: 832 },
      ]}
    />
  ),
});
