import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import img1 from "@/assets/pages/imaging-1.jpg";
import img2 from "@/assets/pages/imaging-2.jpg";
import img3 from "@/assets/pages/imaging-3.jpg";

export const Route = createFileRoute("/solutions/imaging")({
  head: () => ({
    meta: [
      { title: "Medical Imaging Equipment — Zariaspa Trading" },
      {
        name: "description",
        content:
          "Tier-1 MRI, CT, ultrasound, and surgical imaging procurement, deployment, and lifecycle service across Afghanistan and the region.",
      },
    ],
  }),
  component: () => (
    <PageLayout
      tKey="imaging"
      hero={{ src: img1, alt: "MRI scanner being installed in a modern hospital suite", w: 1600, h: 900 }}
      sections={[
        { headingKey: "s1h", paragraphKeys: ["s1p1", "s1p2"] },
        { headingKey: "s2h", paragraphKeys: ["s2p1", "s2p2"] },
        { headingKey: "s3h", paragraphKeys: ["s3p1"] },
      ]}
      gallery={[
        { src: img2, alt: "Biomedical engineer calibrating CT scanner", w: 1024, h: 1024 },
        { src: img3, alt: "Mobile ultrasound cart in a clinic", w: 1280, h: 832 },
        { src: img1, alt: "MRI installation", w: 1600, h: 900 },
      ]}
    />
  ),
});
