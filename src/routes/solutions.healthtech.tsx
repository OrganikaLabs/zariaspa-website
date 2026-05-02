import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import img1 from "@/assets/pages/healthtech-1.jpg";
import img2 from "@/assets/pages/healthtech-2.jpg";
import img3 from "@/assets/pages/healthtech-3.jpg";

export const Route = createFileRoute("/solutions/healthtech")({
  head: () => ({
    meta: [
      { title: "Healthcare Technology — Zariaspa Trading" },
      {
        name: "description",
        content:
          "Diagnostics, IoT devices, and hospital information systems integration tailored for institutions across Afghanistan and the wider region.",
      },
    ],
  }),
  component: () => (
    <PageLayout
      tKey="healthtech"
      hero={{ src: img1, alt: "Doctor reviewing patient diagnostics on a tablet", w: 1280, h: 832 }}
      sections={[
        { headingKey: "s1h", paragraphKeys: ["s1p1", "s1p2"] },
        { headingKey: "s2h", paragraphKeys: ["s2p1"] },
        { headingKey: "s3h", paragraphKeys: ["s3p1", "s3p2"] },
      ]}
      gallery={[
        { src: img2, alt: "Portable diagnostic IoT device", w: 1024, h: 1024 },
        { src: img3, alt: "Hospital information system control room", w: 1280, h: 832 },
        { src: img1, alt: "Clinician using tablet diagnostic", w: 1280, h: 832 },
      ]}
    />
  ),
});
